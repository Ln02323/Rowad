# Rowad -  Business Solutions Management and Recommendation System

## Problem:
Starting and managing a business can be challenging for entrepreneurs due to the difficulty of identifying profitable opportunities, selecting suitable business locations, and accessing affordable professional guidance. Business incubators and consulting services may also be costly or difficult to access, leaving many business owners without the resources needed to make informed decisions.

## Solution:
Rowad is a web-based platform designed to support entrepreneurs and business owners by bringing essential business planning and development services together in one place. It uses geographical and market data to recommend suitable business opportunities and locations based on business type, competition, and customer ratings. The platform also provides tools for generating business identities, exploring AI-assisted interior design ideas, analyzing financial performance, generating business names, and creating personalized color palettes.

## Methods and Technologies:
- **Frontend:** HTML, CSS, and JavaScript to build the user interface and interactive features.
- **Backend:** Node.js to handle application logic and service requests.
- **Database:** MongoDB and Mongoose to store and manage user account information.
- **Location-Based Recommendations:** Google Maps data, collected using Octoparse, was processed to build a business dataset. The K-Means clustering algorithm was used to group similar businesses and support location suitability recommendations.
- **Data Analysis:** Python, Pandas, and Principal Component Analysis (PCA) were used to process business data, analyze patterns, and visualize clusters.
- **AI-Assisted Services:** Image-generation functionality supports interior design ideas and business identity creation using API.
- **Financial Analysis:** JavaScript-based calculations and charts display profit or loss, profit margin, and return on investment (ROI).

![image alt](https://github.com/Ln02323/Rowad/blob/4509a2c464b7f021fd1fd29c60f86a595167fc9b/rowad.png)
