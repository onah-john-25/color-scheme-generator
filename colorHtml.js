export function colorHtml(color) { 
    const label = color.name.value 
    const hex = color.hex.value     

    // Create main container
    const colorEl = document.createElement("div");
    colorEl.className = "color";
    colorEl.tabIndex = 0;
    colorEl.setAttribute("aria-label", `${label}, ${hex}`);
    colorEl.dataset.hex = hex;

    // Create swatch
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.setAttribute("aria-hidden", "true");
    swatch.style.backgroundColor = hex

    // Copy icon
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-copy";

    // Tooltip
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = "Copied!";

    // Append icon + tooltip to swatch
    swatch.appendChild(icon);
    swatch.appendChild(tooltip);

    // Color label
    const colorLabel = document.createElement("span");
    colorLabel.className = "color-label";
    colorLabel.textContent = hex;

    // Append swatch and label to main container
    colorEl.appendChild(swatch);
    colorEl.appendChild(colorLabel);

    return colorEl
}



                