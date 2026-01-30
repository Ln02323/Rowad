from flask import Flask, render_template, request
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load the model and data
with open("kmeans_model.pkl", "rb") as f:
    kmeans_model = pickle.load(f)

df = pd.read_excel("./ROWAD .xlsx", sheet_name="MERGE DATA")

# Preprocess the data
df['RATING'] = df['RATING'].replace(0, np.nan).astype(float).fillna(df['RATING'].median())
df['LOCATION_encoded'] = df['LOCATION'].astype('category').cat.codes
df['TYPE_encoded'] = df['TYPE'].astype('category').cat.codes

locations = df['LOCATION'].unique().tolist()
business_types = df['TYPE'].unique().tolist()

scaler = StandardScaler()
scaled_features = scaler.fit_transform(df[['LOCATION_encoded', 'TYPE_encoded', 'RATING']])

# Dynamically add the 'Cluster' column by predicting for each row
df['Cluster'] = kmeans_model.predict(scaled_features)

def recommend_suitable_locations(business_type, user_location=None):
    # Filter locations with low competition and good ratings
    suitable_data = df[
        (df['TYPE'] == business_type) &  # Filter for the specific business type
        (df['RATING'] <= 3)             # Locations with low or average ratings
    ].sort_values(by=['RATING', 'LOCATION'])  # Sort by rating and location

    # Exclude the user-provided location, if any
    if user_location:
        suitable_data = suitable_data[suitable_data['LOCATION'] != user_location]
        suitable_data = suitable_data.sort_values(by=['RATING', 'LOCATION'])  # Sort again after filtering

    if suitable_data.empty:
        return None  # Return None if no suitable locations

    # Return the filtered data as a list of dictionaries
    return suitable_data[['LOCATION', 'RATING']].to_dict(orient="records")


@app.route("/", methods=["GET", "POST"])
def index():
    recommendation = None
    suitable_locations = None

    if request.method == "POST":
        user_location = request.form.get("location")
        user_type = request.form.get("business_type")

        # Validate inputs
        if user_location not in df['LOCATION'].values or user_type not in df['TYPE'].values:
            recommendation = "Invalid location or business type. Please try again."
        else:
            user_location_encoded = df.loc[df['LOCATION'] == user_location, 'LOCATION_encoded'].iloc[0]
            user_type_encoded = df.loc[df['TYPE'] == user_type, 'TYPE_encoded'].iloc[0]
            num_businesses = len(df[(df['LOCATION'] == user_location) & (df['TYPE'] == user_type)])
            avg_rating = df[(df['LOCATION'] == user_location) & (df['TYPE'] == user_type)]['RATING'].mean()

            user_location_encoded = 0 if pd.isna(user_location_encoded) else user_location_encoded
            user_type_encoded = 0 if pd.isna(user_type_encoded) else user_type_encoded
            avg_rating = 0 if pd.isna(avg_rating) else avg_rating

            # Predict the cluster for the user inputs
            cluster_prediction = kmeans_model.predict([[user_location_encoded, user_type_encoded, avg_rating]])[0]
            cluster_data = df[df['Cluster'] == cluster_prediction]

            # Generate recommendations using the updated function
            suitable_locations = recommend_suitable_locations(user_type, user_location)

            if num_businesses == 0 and avg_rating <= 3:
                recommendation = f"The location <b>'{user_location}'</b> <b>is suitable</b> for your business <b>({user_type})</b> because it has <b>no competition</b> and a <b>low or average rating</b>."
            elif num_businesses > 0 and avg_rating <= 3:
                recommendation = f"The location <b>'{user_location}'</b> has <b>some competition</b> but is <b>suitable</b> for your business <b>({user_type})</b>. The average rating is {avg_rating:.2f}, and there is <b>potential competition</b>."
            elif num_businesses == 0 and avg_rating > 3:
                recommendation = f"The location <b>'{user_location}'</b> is <b>highly rated</b> with <b>no competition</b> for your business <b>({user_type})</b>. However, this may indicate a saturated market. <b>Proceed with caution</b>."
            elif num_businesses > 0 and avg_rating > 3:
                recommendation = f"The location <b>'{user_location}'</b> has <b>high competition</b> and a <b>high rating</b>, making it <b>unsuitable</b> for your business <b>({user_type})</b>."

    return render_template(
        "index.html",
        locations=locations,
        business_types=business_types,
        recommendation=recommendation,
        suitable_locations=suitable_locations,  # Pass the suitable locations
    )

if __name__ == "__main__":
    app.run(port=8000,debug=True)
