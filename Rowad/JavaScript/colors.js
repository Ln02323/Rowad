// Generate lighter and darker shades of a color
function generateShades(hex) {
    const shades = [];
    for (let i = 1; i <= 5; i++) {
      const lighter = adjustBrightness(hex, i * 20); // Lighter
      const darker = adjustBrightness(hex, -i * 20); // Darker
  
      // Exclude black and white based on brightness
      if (!isBlackOrWhite(lighter)) shades.push(lighter);
      if (!isBlackOrWhite(darker)) shades.push(darker);
    }
    return shades;
  }
  
  // Adjust brightness of a color
  function adjustBrightness(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
  
    r = Math.min(255, Math.max(0, r + (r * percent) / 100));
    g = Math.min(255, Math.max(0, g + (g * percent) / 100));
    b = Math.min(255, Math.max(0, b + (b * percent) / 100));
  
    return `#${[r, g, b]
      .map((x) => Math.round(x).toString(16).padStart(2, "0"))
      .join("")}`;
  }
  
  // Check if the color is too close to black or white
  function isBlackOrWhite(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    // Calculate brightness (simple formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    // Exclude colors that are too close to white or black
    return brightness > 240 || brightness < 30;
  }
  
  // Generate the color palette and display it
  document.getElementById("generateBtn").addEventListener("click", function () {
    const baseColor = document.getElementById("baseColor").value;
    const paletteDiv = document.getElementById("palette");
    paletteDiv.innerHTML = ""; // Clear previous palette
  
    const shades = generateShades(baseColor);
    shades.forEach((shade) => {
      const colorDiv = document.createElement("div");
      colorDiv.style.backgroundColor = shade;
  
      // Tooltip with the color code
      const tooltip = document.createElement("span");
      tooltip.textContent = shade;
      colorDiv.appendChild(tooltip);
  
      paletteDiv.appendChild(colorDiv);
    });
  });
  