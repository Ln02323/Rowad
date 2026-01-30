document.getElementById("imageForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    if (!type || !description) {
        alert("Please complete all fields.");
        return;
    }

    const prompt = `${type === 'interior' ? 'Interior design:' : 'Logo design:'} ${description}`;
    const apiKey = "a0942614-3fdf-41a4-8ba6-d34146f36fde";

    const loader = document.getElementById("loader");
    const imgElement = document.getElementById("generatedImage");
    const downloadBtn = document.getElementById("downloadBtn");

    // Show loader and hide image/download button
    loader.style.display = "block";
    imgElement.style.display = "none";
    downloadBtn.style.display = "none";

    try {
        const imageUrl = await generateImage(prompt, apiKey);
        displayImage(imageUrl);
    } catch (error) {
        alert("Error generating image. Please try again later.");
        console.error(error);
    } finally {
        loader.style.display = "none"; // Hide loader
    }
});


async function generateImage(prompt, apiKey) {
    const response = await fetch('https://api.deepai.org/api/text2img', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Key": apiKey,
        },
        body: `text=${encodeURIComponent(prompt)}`,
    });
    

    if (!response.ok) {
        throw new Error("API request failed");
    }

    const data = await response.json();
    return data.output_url; // URL of the generated image
}

function displayImage(imageUrl) {
    const imgElement = document.getElementById("generatedImage");
    imgElement.src = imageUrl;
    imgElement.style.display = "block";

    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.style.display = "inline-block";  // Show download button

    // Add event listener for the download button
    downloadBtn.onclick = function() {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated-image.png';  // Specify a file name
        link.click();  // Trigger the download
    };
}

