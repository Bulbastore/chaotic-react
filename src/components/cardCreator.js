
// src/components/cardCreator.js
import { getAssetPath } from './assetPaths';

//high-quality image scaling

const createHighQualityCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    return { canvas, ctx };
};
const fontLoader = {
    loaded: false,
    promises: [],
    init() {

        if (this.loaded) return Promise.resolve();
        const fonts = [
            new FontFace('Eurostile Medium', 'url(/fonts/EurostileMedium.woff2)'),
            new FontFace('Eurostile Heavy', 'url(/fonts/EurostileHeavy.woff2)'),
            new FontFace('Eurostile Extd Black', 'url(/fonts/EurostileExtdBlack.woff2)'),
            new FontFace('Arial Black', 'url(/fonts/ArialBlack.woff2)'),
            new FontFace('Arial Bold', 'url(/fonts/ArialBold.woff2)'),
            new FontFace('Arial Narrow Italic', 'url(/fonts/ArialNarrowItalic.woff2)'),
            new FontFace('Century Gothic Bold', 'url(/fonts/CenturyGothicBold.woff2)'),
            new FontFace('Eurostile Heavy Italic', 'url(/fonts/EurostileHeavyItalic.woff2)'),
            new FontFace('Eurostile Cond Heavy Italic', 'url(/fonts/EurostileCondHeavyItalic.woff2)'),
            new FontFace('Eurostile-BoldExtendedTwo', 'url(/fonts/EurostileBoldExtendedTwo.woff2)'),
            new FontFace('Eurostile Medium Italic', 'url(/fonts/EurostileMediumItalic.woff2)')
        ];
        this.promises = fonts.map(font => 
            font.load().then(loadedFont => {
                document.fonts.add(loadedFont);
                return loadedFont;
            })
        );
        return Promise.all(this.promises).then(() => {
            this.loaded = true;
        });
    }
};

// Helper function to measure text width with current font settings

function measureTextWidth(text, ctx) {
    return ctx.measureText(text).width / scale;
}

// Process text with bold and italic formatting

function processFormattedText(text, ctx, x, y, fontSize) {

    // Split text keeping the tags
    const parts = text.split(/(<\/?[bi]>)/);
    let currentX = x * scale;
    let isBold = false;
    let isItalic = false;

    // Process each part

    for (const part of parts) {

        // Handle formatting tags

        if (part === '<b>') {
            isBold = true;
            continue;
        } else if (part === '</b>') {
            isBold = false;
            continue;
        } else if (part === '<i>') {
            isItalic = true;
            continue;
        } else if (part === '</i>') {
            isItalic = false;
            continue;
        }

        // Skip empty parts

        if (!part) continue;

        // Set appropriate font based on formatting
        let fontStyle;

        if (isBold && isItalic) {
            fontStyle = 'Eurostile Heavy Italic';
        } else if (isBold) {
            fontStyle = 'Eurostile Heavy';
        } else if (isItalic) {
            fontStyle = 'Eurostile Medium Italic';
        } else {
            fontStyle = 'Eurostile Medium';
        }

        // Set font and draw text
        ctx.font = `${fontSize * scale}px "${fontStyle}"`;
        ctx.fillStyle = '#000000';
        ctx.fillText(part, currentX, y * scale);

        // Move cursor for next piece of text
        currentX += ctx.measureText(part).width;
    }

    // Return total width of rendered text
    return (currentX - (x * scale)) / scale;
}

// Add the SYMBOL_MAPPINGS constant
const SYMBOL_MAPPINGS = {

    // Ability elements
    ':fire:': { img: 'img/icons/abilityfire.png' },
    ':air:': { img: 'img/icons/abilityair.png' },
    ':earth:': { img: 'img/icons/abilityearth.png' },
    ':water:': { img: 'img/icons/abilitywater.png' },

     // Discipline elements
    ':courage:': { img: 'img/icons/courage.png' },
    ':power:': { img: 'img/icons/power.png' },
    ':wisdom:': { img: 'img/icons/wisdom.png' },
    ':speed:': { img: 'img/icons/speed.png' },   

     // Tribe elements
    ':overworld:': { img: 'img/icons/overworld.png' },
    ':underworld:': { img: 'img/icons/underworld.png' },
    ':mipedian:': { img: 'img/icons/mipedian.png' },
    ':danian:': { img: 'img/icons/danian.png' }, 
    ':marrillian:': { img: 'img/icons/marrillian.png' },
    ':tribeless:': { img: 'img/icons/tribeless.png' }, 
    ':panivian:': { img: 'img/icons/panivian.png' },
    ':umbrian:': { img: 'img/icons/umbrian.png' },
    ':frozen:': { img: 'img/icons/frozen.png' },

    // Mugic icons - Danian
    ':danianmugic:': { img: 'img/icons/mugic/danian.png' },
    ':danianmugic0:': { img: 'img/icons/mugic/danian_0.png' },
    ':danianmugicX:': { img: 'img/icons/mugic/danian_x.png' },

    // Mugic icons - Generic
    ':genericmugic:': { img: 'img/icons/mugic/generic.png' },
    ':genericmugic0:': { img: 'img/icons/mugic/generic_0.png' },
    ':genericmugicX:': { img: 'img/icons/mugic/generic_x.png' },

    // Mugic icons - M'arrillian
    ':marrillianmugic:': { img: 'img/icons/mugic/m\'arrillian.png' },
    ':marrillianmugic0:': { img: 'img/icons/mugic/marrillian.png' },
    ':marrillianmugicX:': { img: 'img/icons/mugic/marrillian_x.png' },
    ':marrillianmugic10:': { img: 'img/icons/mugic/marrillian10.png' },

    // Mugic icons - Mipedian
    ':mipedianmugic:': { img: 'img/icons/mugic/mipedian.png' },
    ':mipedianmugic0:': { img: 'img/icons/mugic/mipedian_0.png' },
    ':mipedianmugicX:': { img: 'img/icons/mugic/mipedian_x.png' },

    // Mugic icons - OverWorld
    ':overworldmugic:': { img: 'img/icons/mugic/overworld.png' },
    ':overworldmugic0:': { img: 'img/icons/mugic/overworld_0.png' },
    ':overworldmugicX:': { img: 'img/icons/mugic/overworld_x.png' },

    // Mugic icons - UnderWorld
    ':underworldmugic:': { img: 'img/icons/mugic/underworld.png' },
    ':underworldmugic0:': { img: 'img/icons/mugic/underworld_0.png' },
    ':underworldmugicX:': { img: 'img/icons/mugic/underworld_x.png' },

    // Mugic icons - Panivian
    ':panivianmugic:': { img: 'img/icons/mugic/panivian.png' },
    ':panivianmugic0:': { img: 'img/icons/mugic/panivian_0.png' },
    ':panivianmugicX:': { img: 'img/icons/mugic/panivian_x.png' },

    // Mugic icons - Umbrian
    ':umbrianmugic:': { img: 'img/icons/mugic/umbrian.png' },
    ':umbrianmugic0:': { img: 'img/icons/mugic/umbrian_0.png' },
    ':umbrianmugicX:': { img: 'img/icons/mugic/umbrian_x.png' },

    // Mugic icons - Frozen
    ':frozenmugic:': { img: 'img/icons/mugic/frozen.png' },
    ':frozenmugic0:': { img: 'img/icons/mugic/frozen_0.png' },
    ':frozenmugicX:': { img: 'img/icons/mugic/frozen_x.png' }
};


async function processCustomTribeLogo(logo, color, scale) {

  if (!logo) return null;
  console.log("Processing custom tribe logo:", logo);

  // Create an image from the logo file
  const img = new Image();

  // Wait for the image to load
  await new Promise((resolve, reject) => {
    img.onload = () => {
      console.log("Logo loaded successfully with dimensions:", img.width, img.height);
      resolve();
    };
    img.onerror = (err) => {
      console.error("Error loading logo:", err);
      reject(err);
    };

    // Create an object URL for the logo file

    if (logo instanceof File) {
      img.src = URL.createObjectURL(logo);
    } else if (logo instanceof Image) {
      img.src = logo.src;
    } else {
      img.src = logo;
    }
  });

  // Create a temporary canvas for processing the logo
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  // Set the canvas size based on the image dimensions
  tempCanvas.width = img.width;
  tempCanvas.height = img.height;

  // Draw the original logo without color modification
  tempCtx.drawImage(img, 0, 0);

  // Apply outer glow effect without changing original colors
  const glowCanvas = document.createElement('canvas');
  const glowCtx = glowCanvas.getContext('2d');

  // Make the glow canvas larger to accommodate the glow
  const glowSize = 10;
  glowCanvas.width = tempCanvas.width + glowSize * 2;
  glowCanvas.height = tempCanvas.height + glowSize * 2;

  // Create a glow effect by drawing the logo multiple times with blur

  // Use a neutral white glow instead of colorized glow
  glowCtx.shadowColor = "rgba(255, 255, 255, 0.58)";
  glowCtx.shadowBlur = 5;
  glowCtx.shadowOffsetX = 0;
  glowCtx.shadowOffsetY = 0;

  // Draw the shape with glow
  glowCtx.drawImage(tempCanvas, glowSize, glowSize);

  // Create a colorized version of the logo for the background
  const colorizedCanvas = document.createElement('canvas');
  const colorizedCtx = colorizedCanvas.getContext('2d');

  // Make it the same size as the glow canvas
  colorizedCanvas.width = glowCanvas.width;
  colorizedCanvas.height = glowCanvas.height;

  // Draw the original logo
  colorizedCtx.drawImage(tempCanvas, glowSize, glowSize);

  // Apply colorization if a color is provided

  if (color) {

    // Get image data to process pixel by pixel
    const imageData = colorizedCtx.getImageData(0, 0, colorizedCanvas.width, colorizedCanvas.height);
    const data = imageData.data;

    // Use the selected hue and saturation
    const targetHue = color.h;

    // Use a higher saturation for the background logo
    const targetSaturation = Math.min(0.9, color.s * 1.2);

    // Use a higher lightness for the background logo
    const targetLightness = Math.min(0.9, color.l * 1.5);

    // Process each pixel (RGBA values)

    for (let i = 0; i < data.length; i += 4) {

      // Skip fully transparent pixels

      if (data[i + 3] === 0) continue;

      // Calculate luminance (brightness) of the pixel

      // Using the luminosity formula: 0.21*R + 0.72*G + 0.07*B
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      const luminance = 0.21 * r + 0.72 * g + 0.07 * b;

      // Skip pure black and white pixels (preserve them)

      if (luminance <= 0.05 || luminance >= 0.95) continue;

      // Convert the target HSL to RGB
      let newR, newG, newB;

      // HSL to RGB conversion focusing on hue
      const hueToRgb = (p, q, t) => {

        if (t < 0) t += 1;

        if (t > 1) t -= 1;

        if (t < 1/6) return p + (q - p) * 6 * t;

        if (t < 1/2) return q;

        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      // Normalize hue to 0-1 range
      const h = targetHue / 360;

      // Lighten the color to make it more visible as a background
      const l = Math.min(0.9, luminance * targetLightness);

      // Calculate RGB based on HSL
      let q = l < 0.5 ? l * (1 + targetSaturation) : l + targetSaturation - l * targetSaturation;
      let p = 2 * l - q;
      newR = hueToRgb(p, q, h + 1/3);
      newG = hueToRgb(p, q, h);
      newB = hueToRgb(p, q, h - 1/3);

      // Set the new RGB values back
      data[i] = Math.round(newR * 255);
      data[i + 1] = Math.round(newG * 255);
      data[i + 2] = Math.round(newB * 255);

      // Reduce alpha to make it semi-transparent
      data[i + 3] = Math.min(data[i + 3], 40); // Set transparency
    }

    // Put the modified image data back
    colorizedCtx.putImageData(imageData, 0, 0);
  } else {

    // If no color provided, just make it semi-transparent
    const imageData = colorizedCtx.getImageData(0, 0, colorizedCanvas.width, colorizedCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

      // Only process non-transparent pixels

      if (data[i + 3] > 0) {

        // Keep RGB values unchanged, just reduce alpha
        data[i + 3] = Math.min(data[i + 3], 30); // Very transparent
      }
    }

    // Put the modified image data back
    colorizedCtx.putImageData(imageData, 0, 0);
  }

  // Clean up the object URL if we created one

  if (logo instanceof File && img.src.startsWith('blob:')) {
    URL.revokeObjectURL(img.src);
  }
  console.log("Processed logo without colorization");

  // Return the final processed image
  return glowCanvas;
}

// Updated drawTextWithSymbols function to work with formatted text


async function drawTextWithSymbols(text, x, y, fontSize) {

    // Split text into lines first
    const lines = text.split('\n');
    let currentY = y;
    const lineHeight = fontSize * 1.2;
    const spaceWidth = ctx.measureText(' ').width * 0.5; // 70% of standard space width

    // Process each line separately

    for (const line of lines) {

        // Keep track of formatting state
        let currentFormatting = { isBold: false, isItalic: false };
        let currentX = x * scale;

        // Split line into parts including symbols, formatting tags, and spaces
        const parts = line.split(/(:[\w']+:|<\/?[bi]>|( +))/);

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (!part) continue; // Skip empty parts

            // Handle symbols

            if (SYMBOL_MAPPINGS[part]) {
                const symbolInfo = SYMBOL_MAPPINGS[part];
                const img = await loadAsset(part, getAssetPath(symbolInfo.img));
                const aspectRatio = img.width / img.height;
                const symbolHeight = fontSize * scale;
                const symbolWidth = symbolHeight * aspectRatio;
                const symbolY = currentY * scale - symbolHeight + (fontSize * 0.2 * scale);
                ctx.drawImage(img, currentX, symbolY, symbolWidth, symbolHeight);
                currentX += symbolWidth + (fontSize * 0.1 * scale);
                continue;
            }

            // Handle formatting tags

            if (part === '<b>') {
                currentFormatting.isBold = true;
                continue;
            }

            if (part === '</b>') {
                currentFormatting.isBold = false;
                continue;
            }

            if (part === '<i>') {
                currentFormatting.isItalic = true;
                continue;
            }

            if (part === '</i>') {
                currentFormatting.isItalic = false;
                continue;
            }

            // Apply current formatting
            let fontStyle = 'Eurostile Medium';

            if (currentFormatting.isBold && currentFormatting.isItalic) {
                fontStyle = 'Eurostile Heavy Italic';
            } else if (currentFormatting.isBold) {
                fontStyle = 'Eurostile Heavy';
            } else if (currentFormatting.isItalic) {
                fontStyle = 'Eurostile Medium Italic';
            }

            // Draw text with adjusted spaces
            ctx.font = `${fontSize * scale}px "${fontStyle}"`;
            ctx.fillStyle = '#000000';

            if (part.match(/^ +$/)) {

                // For consecutive spaces, use reduced width
                const numSpaces = part.length;
                currentX += spaceWidth * numSpaces;
            } else {

                // For normal text
                ctx.fillText(part, currentX, currentY * scale);
                currentX += ctx.measureText(part).width;
            }
        }

        // Move to next line with consistent spacing
        currentY += line === '' ? lineHeight * 0.5 : lineHeight;
    }
}
const CardCreator = {
    async createCard(cardData) {
        const assets = await loadAssets(cardData);
        return drawCard(cardData, assets);
    },
    downloadCard(canvas, name = 'card.png') {

        // Create a temporary canvas that will contain just the card without any scaling
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        // Set the temporary canvas to the exact dimensions of the original canvas
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        // Draw the original canvas content to our temporary canvas
        tempCtx.drawImage(canvas, 0, 0);

        // Create a download link and trigger the download
        const link = document.createElement('a');
        link.download = name;
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    }
};
export { CardCreator };

// Canvas 
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const scale = 4;
let height = 0, width = 0;

// Art placement configuration for each card type
const ART_PLACEMENT_CONFIG = {
  creature: { x: 7, y: 22.5, width: 236, height: 198 },
  attack: { x: 0, y: 35, width: 251, height: 171 },
  battlegear: { x: 0, y: 35, width: 251, height: 171 },
  location: { x: 33, y: 9, width: 129, height: 306 },
  mugic: { x: 0, y: 0, width: 250, height: 350 } // Uses full template size
};

//drawScaledImage function

const drawScaledImage = (ctx, img, x, y, width, height, scale) => {

    // Create a temporary canvas for high-quality scaling
    const scalingFactor = 4;
    const { canvas: tempCanvas, ctx: tempCtx } = createHighQualityCanvas(
        width * scalingFactor,
        height * scalingFactor
    );

    // Draw at larger size first
    tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

    // Enable high-quality scaling on main context
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw scaled version to main canvas
    ctx.drawImage(
        tempCanvas,
        0, 0, tempCanvas.width, tempCanvas.height,  // Source
        x * scale, y * scale, width * scale, height * scale  // Destination
    );

    // Reset smoothing for other elements
    ctx.imageSmoothingEnabled = false;
};

// Helper drawing functions

function drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {

    if (image.dataset?.isSymbol) {

        // Use high-quality scaling for symbols
        drawScaledImage(ctx, image, dx, dy, dw, dh, scale);
    } else {

        // Use normal drawing for other images
        ctx.drawImage(image, 
            sx, sy, sw, sh,
            dx * scale, dy * scale, 
            dw * scale, dh * scale
        );
    }
}

function setFont(size, style, weight) {
    ctx.font = `${weight ? `${weight} ` : ''}${size * scale}px ${style}`;
}

function fillText(text, x, y, maxWidth) {

    if (maxWidth !== undefined) {
        ctx.fillText(text, x * scale, y * scale, maxWidth * scale);
    } else {
        ctx.fillText(text, x * scale, y * scale);
    }
}

function setCanvas(x, y, useBleed = false) {

  // Store the template dimensions for the card
  width = x;
  height = y;

  // Set the canvas dimensions
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = 'auto';
  canvas.style.height = 'auto';

  // Calculate offsets if using bleed template
  let offsetX = 0;
  let offsetY = 0;

  if (useBleed) {

    // Adjust these values as needed to center content on your bleed template
    offsetX = 15; // Start with this value and adjust as needed
    offsetY = 15; // Start with this value and adjust as needed
  }
  return { offsetX, offsetY };
}

function wrapText(text, maxWidth) {

    // Split text into paragraphs
    const paragraphs = text.split('\n');
    const allLines = [];

    for (const paragraph of paragraphs) {

        if (paragraph === '') {
            allLines.push('');
            continue;
        }
        const words = paragraph.split(' ');
        let currentLine = '';
        let testLine = '';
        let currentWidth = 0;
        let isInBold = false;
        let isInItalic = false;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];

            if (!word) continue;

            // Check if the word contains symbols and measure accordingly
            const hasSymbol = word.match(/:[a-z0-9']+:/);
            let wordWidth;

            if (hasSymbol) {

                // Calculate an estimated width for symbols in the word

                // This estimation mimics how drawTextWithSymbols will render it
                let estimatedWidth = 0;
                let remainingWord = word;
                let symbolMatch;

                // Custom regex to match :symbol: patterns
                const symbolRegex = /:[a-z0-9']+:/g;

                // Track position in the string
                let lastIndex = 0;

                while ((symbolMatch = symbolRegex.exec(word)) !== null) {

                    // Text before the symbol
                    const textBefore = word.substring(lastIndex, symbolMatch.index);

                    if (textBefore) {
                        estimatedWidth += ctx.measureText(textBefore).width;
                    }

                    // The symbol itself
                    const symbolCode = symbolMatch[0];

                    if (SYMBOL_MAPPINGS && SYMBOL_MAPPINGS[symbolCode]) {

                        // Use a width proportional to current font size
                        const fontSize = parseInt(ctx.font) / scale;
                        estimatedWidth += fontSize * 1.2 * scale;
                    } else {

                        // Fallback if symbol not found
                        estimatedWidth += ctx.measureText(symbolCode).width;
                    }
                    lastIndex = symbolMatch.index + symbolMatch[0].length;
                }

                // Add any remaining text after the last symbol
                const textAfter = word.substring(lastIndex);

                if (textAfter) {
                    estimatedWidth += ctx.measureText(textAfter).width;
                }
                wordWidth = estimatedWidth;
            } else {

                // For regular words, use standard text measurement
                wordWidth = ctx.measureText(word).width;
            }

            // For the first word, don't add space width
            const spaceWidth = i > 0 ? ctx.measureText(' ').width : 0;

            // Test if adding this word would exceed the maximum width

            if (currentWidth + wordWidth + spaceWidth > maxWidth * scale && i > 0) {

                // Complete any open tags before breaking the line
                let endLine = currentLine;

                if (isInBold) endLine += '</b>';

                if (isInItalic) endLine += '</i>';
                allLines.push(endLine);

                // Start a new line with any active formatting
                currentLine = '';
                testLine = '';

                if (isInBold) {
                    currentLine += '<b>';
                    testLine += '<b>';
                }

                if (isInItalic) {
                    currentLine += '<i>';
                    testLine += '<i>';
                }

                // Process formatting tags in this word

                // Handle <b> and </b> tags
                let processedWord = word;
                let boldTagsFound = false;
                let italicTagsFound = false;

                if (word.includes('<b>')) {
                    isInBold = true;
                    boldTagsFound = true;
                }

                if (word.includes('</b>')) {
                    isInBold = false;
                    boldTagsFound = true;
                }

                if (word.includes('<i>')) {
                    isInItalic = true;
                    italicTagsFound = true;
                }

                if (word.includes('</i>')) {
                    isInItalic = false;
                    italicTagsFound = true;
                }
                currentLine += processedWord;
                testLine = currentLine;
                currentWidth = wordWidth;
            } else {

                // Add a space before the current word if it's not the first word

                if (i > 0) {
                    currentLine += ' ';
                    testLine += ' ';
                    currentWidth += spaceWidth;
                }

                // Process formatting tags in this word

                if (word.includes('<b>')) {
                    isInBold = true;
                }

                if (word.includes('</b>')) {
                    isInBold = false;
                }

                if (word.includes('<i>')) {
                    isInItalic = true;
                }

                if (word.includes('</i>')) {
                    isInItalic = false;
                }
                currentLine += word;
                testLine = currentLine;
                currentWidth += wordWidth;
            }
        }

        // Add the last line if it exists

        if (currentLine) {

            // Close any open tags

            if (isInBold) currentLine += '</b>';

            if (isInItalic) currentLine += '</i>';
            allLines.push(currentLine);
        }
    }
    return allLines;
}

function formatTribe(tribe, mainTribe = '') {

    // Special handling for tribeless as main tribe

    if (mainTribe && mainTribe.toLowerCase() === 'tribeless') {

        // For tribeless + another tribe, show "Past [SecondaryTribe]"

        // Extract the secondary tribe from the combined tribe name
        const tribeLower = tribe.toLowerCase();
        const mainTribeLower = mainTribe.toLowerCase();

        // Remove the main tribe from the combined name to get secondary tribe
        let secondaryTribe = '';

        if (tribeLower.startsWith(mainTribeLower)) {
            secondaryTribe = tribeLower.substring(mainTribeLower.length);
        } else if (tribeLower.endsWith(mainTribeLower)) {
            secondaryTribe = tribeLower.substring(0, tribeLower.length - mainTribeLower.length);
        }

        // Format the secondary tribe
        const formattedSecondary = formatSingleTribe(secondaryTribe);
        return formattedSecondary ? `Past ${formattedSecondary}` : '';
    }

    // Use mainTribe for other mixed tribes, otherwise use regular tribe
    const tribeToFormat = mainTribe || tribe;
    return formatSingleTribe(tribeToFormat);
}

function formatSingleTribe(tribe) {

    if (!tribe) return "";

    switch (tribe.toLowerCase()) {
        case "danian": return "Danian";
        case "overworld": return "OverWorld";
        case "mipedian": return "Mipedian";
        case "underworld": return "UnderWorld";
        case "m'arrillian": return "M'arrillian";
        case "tribeless": return "";
        case "generic": return "Generic";
        case "mipedianow": return "Mipedian OverWorld";
        case "panivian": return "Panivian";
        case "umbrian": return "Umbrian";
        case "frozen": return "Frozen";
        case "custom": return "";
        default: return tribe;
    }
}

async function loadAssets(cardData) {
    const assets = {};
    const promises = [];

    // Determine if bleed templates should be used
    const useBleed = cardData.useBleedTemplates || false;

// Template

if (cardData.type) {
    let templatePath;

    // Use different folder path based on bleed preference
    const templateFolder = useBleed ? 'img/template/blended bleed' : 'img/template/blended';
    const standardTemplateFolder = useBleed ? 'img/template/bleed' : 'img/template';
    console.log(`Template settings - Type: ${cardData.type}, Tribe: ${cardData.tribe}, UseBleed: ${useBleed}`);

    if (cardData.type === 'creature' && cardData.tribe) {

        // Check if this is a mixed tribe (contains two tribe names concatenated)
        const mixedTribePatterns = [

            // OverWorld combinations
            'overworldunderworld', 'underworldoverworld',
            'overworldmipedian', 'mipedianoverworld', 
            'overworlddanian', 'danianoverworld',
            "overworldm'arrillian", "m'arrillianoverworld",
            'overworldtribeless', 'tribelessoverworld',
            'overworldpanivian', 'panivianoverworld',
            'overworldumbrian', 'umbrianoverworld',
            'overworldfrozen', 'frozenoverworld',

            // UnderWorld combinations
            'underworldmipedian', 'mipedianunderworld',
            'underworlddanian', 'danianunderworld', 
            "underworldm'arrillian", "m'arrillianunderworld",
            'underworldtribeless', 'tribelessunderworld',
            'underworldpanivian', 'panivianunderworld',
            'underworldumbrian', 'umbrianunderworld',
            'underworldfrozen', 'frozenunderworld',

            // Mipedian combinations
            'mipediandanian', 'danianmipedian',
            "mipedianm'arrillian", "m'arrillianmipedian",
            'mipediantribeless', 'tribelessmipedian',
            'mipedianpanivian', 'panivianmipedian',
            'mipedianumbrian', 'umbrianmipedian',
            'mipedianfrozen', 'frozenmipedian',

            // Danian combinations
            "danianm'arrillian", "m'arrilliandanian",
            'daniantribeless', 'tribelessdanian',
            'danianpanivian', 'paniviandanian',
            'danianumbrian', 'umbriandanian',
            'danianfrozen', 'frozendanian',

            // M'arrillian combinations
            "m'arrilliantribeless", "tribelessm'arrillian",
            "m'arrillianpanivian", "panivianm'arrillian",
            "m'arrillianumbrian", "umbrianm'arrillian",
            "m'arrillianfrozen", "frozenm'arrillian",

            // Tribeless combinations
            'tribelesspanivian', 'paniviantribeless',
            'tribelessumbrian', 'umbriantribeless',
            'tribelessfrozen', 'frozentribeless',

            // Panivian combinations
            'panivianumbrian', 'umbrianpanivian',
            'panivianfrozen', 'frozenpanivian',

            // Umbrian combinations
            'umbrianfrozen', 'frozenumbrian'
        ];
        const isMixedTribe = mixedTribePatterns.includes(cardData.tribe.toLowerCase());

        if (isMixedTribe) {

            // Use blended template for mixed tribes
            templatePath = getAssetPath(`${templateFolder}/${cardData.tribe.toLowerCase()}.png`);
            console.log('Loading mixed tribe template:', templatePath);
        } else if (cardData.brainwashed) {
            templatePath = getAssetPath(`${standardTemplateFolder}/${cardData.tribe.toLowerCase()}bw.png`);
            console.log('Loading brainwashed template:', templatePath);
        } else {
            templatePath = getAssetPath(`${standardTemplateFolder}/${cardData.tribe.toLowerCase()}.png`);
            console.log('Loading normal template:', templatePath);
        }
    } else if (cardData.type === 'mugic' && cardData.tribe) {

        // FIXED MUGIC TEMPLATE LOADING

        if (useBleed) {

            // For bleed templates, use mugic.png directly from the bleed folder
            templatePath = getAssetPath(`${standardTemplateFolder}/mugic.png`);
            console.log('Loading mugic bleed template:', templatePath);
        } else {

            // For standard templates, use tribe-specific mugic templates
            templatePath = getAssetPath(`img/template/mugic/${cardData.tribe.toLowerCase()}.png`);
            console.log('Loading mugic standard template:', templatePath);
        }
    } else {
        templatePath = getAssetPath(`${standardTemplateFolder}/${cardData.type.toLowerCase()}.png`);
        console.log(`Loading ${cardData.type} template:`, templatePath);
    }
    promises.push(loadAsset('template', templatePath)
        .then(img => {
            assets.template = img;
            console.log(`Template loaded successfully: ${templatePath}`);
        })
        .catch(error => {
            console.error(`Failed to load template: ${templatePath}`, error);

            // Try a fallback path

            if (templatePath.includes('/blended')) {

                // If mixed tribe template fails, try standard template as fallback
                const fallbackPath = templatePath.replace('/blended bleed/', '/bleed/').replace('/blended/', '/');
                console.log(`Trying standard template fallback: ${fallbackPath}`);
                return loadAsset('template', fallbackPath)
                    .then(img => {
                        console.log('Fallback template loaded successfully');
                        assets.template = img;
                    });
            } else if (useBleed) {
                const fallbackPath = templatePath.replace('/bleed/', '/');
                console.log(`Trying non-bleed template fallback: ${fallbackPath}`);
                return loadAsset('template', fallbackPath)
                    .then(img => {
                        console.log('Non-bleed fallback template loaded successfully');
                        assets.template = img;
                    });
            }
            return Promise.reject(error);
        }));
}

    // MOVED OUT OF ERROR HANDLER: Add elements overlay loading for custom tribe

    if (cardData.type === 'creature' && cardData.tribe === 'custom') {
        const elementsFolder = useBleed ? 'img/template/bleed' : 'img/template';

        // Load the appropriate elements overlay based on brainwashed status
        const elementsFile = cardData.brainwashed ? 'elementsbw.png' : 'elements.png';
        const elementsPath = getAssetPath(`${elementsFolder}/${elementsFile}`);
        console.log(`Loading elements overlay: ${elementsPath}`);
        promises.push(loadAsset('elementsOverlay', elementsPath)
            .then(img => {
                assets.elementsOverlay = img;
                console.log('Elements overlay loaded successfully');
            })
            .catch(error => {
                console.error(`Failed to load elements overlay: ${elementsPath}`, error);

                // Try fallback to non-bleed version if using bleed templates

                if (useBleed) {
                    const fallbackPath = elementsPath.replace('/bleed/', '/');
                    console.log(`Trying standard elements overlay fallback: ${fallbackPath}`);
                    return loadAsset('elementsOverlay', fallbackPath)
                        .then(img => {
                            console.log('Fallback elements overlay loaded successfully');
                            assets.elementsOverlay = img;
                        });
                }
            }));
    }

    if (cardData.tribeLogo) {
        console.log('Loading custom tribe logo');
        promises.push(
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        assets.tribeLogo = img;
                        console.log('Tribe logo loaded successfully');
                        resolve();
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(cardData.tribeLogo);
            })
        );
    }

    // If brainwashed, load the brainwashed bar

    if (cardData.type === 'creature' && cardData.brainwashed) {
        console.log('Loading brainwashed bar');
        promises.push(loadAsset('brainwashedBar', 
            getAssetPath('img/brainwashed_bar.png')
        ).then(img => {
            console.log('Brainwashed bar loaded successfully');
            assets.brainwashedBar = img;
        }));
    }

    // Set symbol

    if (cardData.set && cardData.rarity) {
        promises.push(loadAsset('symbol', 
            getAssetPath(`img/set/${cardData.set.toLowerCase()}/${cardData.rarity.toLowerCase()}.png`)
        ).then(img => {
            img.dataset.isSymbol = 'true';
            assets.symbol = img;
        }));
    }

    // Elements for creatures

    if (cardData.type === 'creature') {

        if (cardData.elements?.fire) {
            promises.push(loadAsset('firecreature', getAssetPath('img/firecreature.png'))
                .then(img => assets.firecreature = img));
        }

        if (cardData.elements?.air) {
            promises.push(loadAsset('aircreature', getAssetPath('img/aircreature.png'))
                .then(img => assets.aircreature = img));
        }

        if (cardData.elements?.earth) {
            promises.push(loadAsset('earthcreature', getAssetPath('img/earthcreature.png'))
                .then(img => assets.earthcreature = img));
        }

        if (cardData.elements?.water) {
            promises.push(loadAsset('watercreature', getAssetPath('img/watercreature.png'))
                .then(img => assets.watercreature = img));
        }
    }

    // Load elements for attacks

    if (cardData.type === 'attack') {

      if (cardData.elements?.fire !== null && cardData.elements?.fire !== undefined) {
        promises.push(loadAsset('fireattack', getAssetPath('img/fireattack.png'))
          .then(img => assets.fireattack = img));
      }

      if (cardData.elements?.air !== null && cardData.elements?.air !== undefined) {
        promises.push(loadAsset('airattack', getAssetPath('img/airattack.png'))
          .then(img => assets.airattack = img));
      }

      if (cardData.elements?.earth !== null && cardData.elements?.earth !== undefined) {
        promises.push(loadAsset('earthattack', getAssetPath('img/earthattack.png'))
          .then(img => assets.earthattack = img));
      }

      if (cardData.elements?.water !== null && cardData.elements?.water !== undefined) {
        promises.push(loadAsset('waterattack', getAssetPath('img/waterattack.png'))
          .then(img => assets.waterattack = img));
      }
    }

    // Art

    if (cardData.art) {
        promises.push(
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        assets.art = img;
                        resolve();
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(cardData.art);
            })
        );
    }

// Preload mugic icons if this is a mugic card

if (cardData.type === 'mugic' && cardData.tribe && cardData.mugicCost !== undefined && cardData.mugicCost !== "") {
    const cost = cardData.mugicCost.toString().toUpperCase();
    const tribeLower = cardData.tribe.toLowerCase();

    // Determine which icon to preload
    let iconPath;

    if (cost === '0') {
        iconPath = `img/icons/mugic/${tribeLower}_0.png`;
    } else if (cost === 'X') {
        iconPath = `img/icons/mugic/${tribeLower}_x.png`;
    } else {
        iconPath = `img/icons/mugic/${tribeLower}.png`;
    }

    // Add to loading promises
    console.log(`Preloading mugic icon: ${iconPath}`);
    promises.push(loadAsset('mugicIcon', getAssetPath(iconPath))
        .then(img => {
            assets.mugicIcon = img;
            console.log('Mugic icon preloaded successfully');
        })
        .catch(error => {
            console.error(`Failed to preload mugic icon: ${iconPath}`, error);
        })
    );
}

// Preload mugic note assets if this is a mugic card with notes

if (cardData.type === 'mugic' && cardData.mugicNotes && cardData.mugicNotes.length > 0) {

    // Create a list of all required assets based on the notes
    const noteAssets = new Set();
    cardData.mugicNotes.forEach(note => {

        if (note) {

            // Add the main note letter
            noteAssets.add(`img/Mugic Notes/${note.letter}.png`);

            // Add the length indicator
            noteAssets.add(`img/Mugic Notes/${note.length}.png`);

            // Add modifiers if present

            if (note.sharp) noteAssets.add('img/Mugic Notes/Sharp.png');

            if (note.flat) noteAssets.add('img/Mugic Notes/Flat.png');
        }
    });

    // Add loading promises for each asset
    noteAssets.forEach(path => {
        console.log(`Preloading mugic note asset: ${path}`);
        promises.push(
            loadAsset(`mugicNoteAsset_${path}`, getAssetPath(path))
                .then(img => {
                    assets[`mugicNoteAsset_${path}`] = img;
                    console.log(`Mugic note asset loaded: ${path}`);
                })
                .catch(error => {
                    console.error(`Failed to load mugic note asset: ${path}`, error);
                })
        );
    });
}
try {
    await Promise.all(promises);
    console.log('All assets loaded successfully:', assets);
} catch (error) {
    console.error('Error loading assets:', error);
}
return assets;
}

async function loadAsset(key, path) {
    console.log(`Loading asset: ${key} from path: ${path}`);
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            console.log(`Successfully loaded: ${key} from ${path}`);
            console.log(`Original dimensions: ${img.width}x${img.height}`);

            // For set symbols, pre-process the image for better quality

            if (key === 'symbol') {
                const { canvas, ctx } = createHighQualityCanvas(img.width, img.height);
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Create a new image from the high-quality canvas
                const processedImg = new Image();
                processedImg.onload = () => {
                    console.log(`Processed ${key} for high-quality scaling`);
                    resolve(processedImg);
                };
                processedImg.src = canvas.toDataURL('image/png');
            } else {
                resolve(img);
            }
        };
        img.onerror = (error) => {
            console.error(`Failed to load ${key} from ${path}`, error);

            // Special handling for bleed templates

            if (path.includes('/bleed/')) {
                console.log(`Bleed template failed to load. Attempting to use regular template as fallback.`);

                // Create a fallback path by replacing bleed with the standard path
                const fallbackPath = path.replace('/bleed/', '/');
                console.log(`Trying fallback path: ${fallbackPath}`);
                const fallbackImg = new Image();
                fallbackImg.crossOrigin = 'anonymous';
                fallbackImg.onload = () => {
                    console.log(`Successfully loaded fallback for ${key}: ${fallbackPath}`);
                    resolve(fallbackImg);
                };
                fallbackImg.onerror = () => {
                    console.error(`Fallback also failed for ${key}`);
                    reject(new Error(`Failed to load ${key} image from both ${path} and fallback`));
                };
                fallbackImg.src = fallbackPath;
                return;
            }

            // Try removing the leading slash if present

            if (path.startsWith('/')) {
                const altPath = path.substring(1);
                console.log(`Attempting alternate path: ${altPath}`);
                img.src = altPath;
            } else {
                reject(new Error(`Failed to load ${key} image from ${path}`));
            }
        };
        img.src = path;
    });
}

async function drawCard(cardData, assets) {
    const useBleed = cardData.useBleedTemplates || false;

    // FIXED: All card types use the same orientation (250x350)
    const templateWidth = 250;
    const templateHeight = 350;

    // Set up canvas with appropriate dimensions and get offsets
    const { offsetX, offsetY } = setCanvas(templateWidth, templateHeight, useBleed);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw art

if (assets.art) {

  // Get placement config for this card type
  const artPlacement = ART_PLACEMENT_CONFIG[cardData.type.toLowerCase()] || ART_PLACEMENT_CONFIG.creature;

  // If we have art position data AND this is not a database card

  if (cardData.artPosition && cardData.artPosition.width > 0 && !cardData.isFromDatabase) {

    // Calculate the source coordinates based on the art position

    // This converts the visual positioning to source coordinates for the image
    const sourceWidth = assets.art.width;
    const sourceHeight = assets.art.height;

    // Calculate the scaling factor from original image to the rendered size
    const scaleFactorX = sourceWidth / cardData.artPosition.width;
    const scaleFactorY = sourceHeight / cardData.artPosition.height;

    // Calculate the source coordinates
    const sourceX = -cardData.artPosition.x * scaleFactorX;
    const sourceY = -cardData.artPosition.y * scaleFactorY;

    // Calculate how much of the source image to use
    const sourceCropWidth = artPlacement.width * scaleFactorX;
    const sourceCropHeight = artPlacement.height * scaleFactorY;

    // Draw the art with the calculated crop
    drawImage(
      assets.art,
      sourceX, sourceY,
      sourceCropWidth, sourceCropHeight,
      artPlacement.x, artPlacement.y,
      artPlacement.width, artPlacement.height
    );
  } else {

    // Original code for when no position data is available

    // This just scales/stretches the image to fit
    drawImage(
      assets.art, 
      0, 0, 
      assets.art.width, assets.art.height, 
      artPlacement.x, artPlacement.y, 
      artPlacement.width, artPlacement.height
    );
  }
}

if (assets.template) {
    console.log(`Drawing template: ${cardData.useBleedTemplates ? 'Bleed' : 'Standard'}`);
    console.log(`Template dimensions: ${assets.template.width}x${assets.template.height}`);

if (cardData.tribe === 'custom' && cardData.customColor) {
    console.log("CUSTOM TRIBE DETECTED - Using Photoshop-like Colorize effect");
    console.log("Custom color values:", {
        hue: cardData.customColor.h,
        saturation: cardData.customColor.s,
        lightness: cardData.customColor.l
    });
    try {

        // Create a temporary canvas with the same dimensions as the template
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = assets.template.width;
        tempCanvas.height = assets.template.height;

        // Draw the original template onto the temporary canvas
        tempCtx.drawImage(assets.template, 0, 0);

        // Get the image data to process pixel by pixel - this is key to true colorization
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;

        // Use the selected hue and saturation
        const targetHue = cardData.customColor.h;
        const targetSaturation = cardData.customColor.s;

        // Process each pixel (RGBA values)

        for (let i = 0; i < data.length; i += 4) {

            // Skip fully transparent pixels

            if (data[i + 3] === 0) continue;

            // Calculate luminance (brightness) of the pixel

            // Using the luminosity formula: 0.21*R + 0.72*G + 0.07*B
            const r = data[i] / 255;
            const g = data[i + 1] / 255;
            const b = data[i + 2] / 255;
            const luminance = 0.21 * r + 0.72 * g + 0.07 * b;

            // Skip pure black and white pixels (preserve them)

            if (luminance <= 0.05 || luminance >= 0.95) continue;

            // Convert the target HSL to RGB
            let newR, newG, newB;

            // Simplified HSL to RGB conversion focusing on hue
            const hueToRgb = (p, q, t) => {

                if (t < 0) t += 1;

                if (t > 1) t -= 1;

                if (t < 1/6) return p + (q - p) * 6 * t;

                if (t < 1/2) return q;

                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            // Normalize hue to 0-1 range
            const h = targetHue / 360;

            // Use the target saturation directly (already 0-1)
            const s = targetSaturation; 

            // Use the original pixel's luminance for l
            const l = luminance;

            // Calculate RGB based on HSL
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            newR = hueToRgb(p, q, h + 1/3);
            newG = hueToRgb(p, q, h);
            newB = hueToRgb(p, q, h - 1/3);

            // Set the new RGB values back
            data[i] = Math.round(newR * 255);
            data[i + 1] = Math.round(newG * 255);
            data[i + 2] = Math.round(newB * 255);

            // Alpha remains unchanged
        }

        // Put the modified image data back
        tempCtx.putImageData(imageData, 0, 0);

        // Draw the colorized template onto the main canvas
        drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, width, height);
        console.log("Photoshop-like colorization completed successfully");
    } catch (error) {
        console.error("Error during colorization:", error);

        // Fallback to normal template if colorization fails
        drawImage(assets.template, 0, 0, assets.template.width, assets.template.height, 0, 0, width, height);
    }
} else {

    // Normal template drawing for non-custom tribes
    console.log("Drawing normal template (non-custom tribe)");
    drawImage(assets.template, 0, 0, assets.template.width, assets.template.height, 0, 0, width, height);
}

  // After drawing the base template (colorized or normal), add the elements overlay if it exists

  if (cardData.tribe === 'custom' && assets.elementsOverlay) {
    console.log("Drawing elements overlay on top of custom tribe template");
    drawImage(
      assets.elementsOverlay, 
      0, 0, 
      assets.elementsOverlay.width, assets.elementsOverlay.height, 
      0, 0, 
      width, height
    );
  }
}

    if (cardData.type === 'creature') {

        if (assets.firecreature) {
            drawImage(assets.firecreature, 0, 0, assets.firecreature.width, assets.firecreature.height, 0, 0, width, height);
        }

        if (assets.aircreature) {
            drawImage(assets.aircreature, 0, 0, assets.aircreature.width, assets.aircreature.height, 0, 0, width, height);
        }

        if (assets.earthcreature) {
            drawImage(assets.earthcreature, 0, 0, assets.earthcreature.width, assets.earthcreature.height, 0, 0, width, height);
        }

        if (assets.watercreature) {
            drawImage(assets.watercreature, 0, 0, assets.watercreature.width, assets.watercreature.height, 0, 0, width, height);
        }
    }

    // Draw elements for attacks

    if (cardData.type === 'attack') {

        if (assets.fireattack) {
            drawImage(assets.fireattack, 0, 0, assets.fireattack.width, assets.fireattack.height, 0, 0, width, height);
        }

        if (assets.airattack) {
            drawImage(assets.airattack, 0, 0, assets.airattack.width, assets.airattack.height, 0, 0, width, height);
        }

        if (assets.earthattack) {
            drawImage(assets.earthattack, 0, 0, assets.earthattack.width, assets.earthattack.height, 0, 0, width, height);
        }

        if (assets.waterattack) {
            drawImage(assets.waterattack, 0, 0, assets.waterattack.width, assets.waterattack.height, 0, 0, width, height);
        }
    }

    // Draw set symbol

    if (assets.symbol) {
        assets.symbol.dataset.isSymbol = 'true';

        if (cardData.type === 'location') {

            // Rotate and position for location cards
            ctx.save();
            ctx.translate(18.5 * scale, 175 * scale);
            ctx.rotate(-Math.PI / 2);
            drawImage(
                assets.symbol,
                0, 0, assets.symbol.width, assets.symbol.height,
                139, -14, 24, 24
            );
            ctx.restore();
        } else {

            // Original position for other card types
            drawImage(
                assets.symbol,
                0, 0, assets.symbol.width, assets.symbol.height,
                width - 37, 6.5, 24, 24
            );
        }
    }

// Draw name and subname with effects

if (cardData.name) {
    const name = cardData.name.toUpperCase();
    const maxWidth = cardData.type === 'location' ? 265 : 170;

    // Add text effects
    ctx.shadowColor = "rgba(0, 0, 0, 5)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2.5;
    ctx.shadowOffsetY = 2.5;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#696969";
    ctx.lineWidth = 0.5;

    if (cardData.type === 'location') {

        // Location cards - rotate text 90 degrees counter-clockwise
        ctx.save();
        ctx.translate(20 * scale, 170 * scale);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';

        if (cardData.subname) {
            const subname = cardData.subname.toUpperCase();

            // FIXED: Adjusted positioning to properly stack name and subname
            setFont(11.5, 'Eurostile Extd Black');
            ctx.strokeText(name, 0, -4 * scale, maxWidth * scale); // Move name up
            fillText(name, 0, -4, maxWidth);
            setFont(7, 'Eurostile Extd Black');
            ctx.strokeText(subname, 0, 4 * scale, maxWidth * scale); // Position subname below
            fillText(subname, 0, 4, maxWidth);
        } else {
            setFont(11.5, 'Eurostile Extd Black');
            ctx.strokeText(name, 0, 0, maxWidth * scale);
            fillText(name, 0, 0, maxWidth);
        }
        ctx.restore();
    } else {

        // Original code for other card types
        const offsetX = width / 2;
        ctx.textAlign = 'center';

        if (cardData.subname) {
            const subname = cardData.subname.toUpperCase();
            setFont(11.5, 'Eurostile Extd Black');
            ctx.strokeText(name, offsetX * scale, 18 * scale, maxWidth * scale);
            fillText(name, offsetX, 18, maxWidth);
            setFont(7, 'Eurostile Extd Black');
            ctx.strokeText(subname, offsetX * scale, 27 * scale, maxWidth * scale);
            fillText(subname, offsetX, 27, maxWidth);
        } else {
            setFont(11.5, 'Eurostile Extd Black');
            ctx.strokeText(name, offsetX * scale, 23 * scale, maxWidth * scale);
            fillText(name, offsetX, 23, maxWidth);
        }
    }

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

// Draw subtype and tribe

if (cardData.type === 'attack') {
    setFont(7, 'Eurostile Heavy Italic');
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = 0.5;
    ctx.shadowColor = "#696969";
    fillText("Attack", 17, 218.5);
} else if (cardData.type === 'battlegear') {
    setFont(7.5, 'Eurostile Heavy Italic');
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = 0.5;
    ctx.shadowColor = "#696969"; 
    fillText("Battlegear", 17, 218);    
} else if (cardData.type === 'location') {
    // Location cards - rotate text 90 degrees counter-clockwise
    setFont(7.5, 'Eurostile Heavy Italic');
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = 0.5;
    ctx.shadowColor = "#696969";
    ctx.save();
    ctx.translate(173 * scale, 310 * scale);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'left';  // Changed from 'center' to 'left'
    
    // Build the location type text with optional subtype
    let locationText = "Location";
    if (cardData.subtype) {
        locationText += ` - ${cardData.subtype}`;
    }
    
    fillText(locationText, 0, 0);
    ctx.restore();
} else if (cardData.subtype || cardData.tribe) {
    setFont(7.5, 'Eurostile Heavy Italic');
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = 0.5;
    ctx.shadowColor = "#696969";
    let typeText = cardData.type.charAt(0).toUpperCase() + cardData.type.slice(1);

    if (cardData.tribe) {
        typeText += ` - `;

        if (cardData.past) {
            typeText += 'Past ';
        }
        const formattedTribe = formatTribe(cardData.tribe, cardData.mainTribe);

        if (formattedTribe) {
            typeText += formattedTribe;
        }

        if (cardData.subtype) {

            if (formattedTribe) {
                typeText += ` ${cardData.subtype}`;
            } else {
                typeText += cardData.subtype;
            }
        }
    } else if (cardData.subtype) {
        typeText += ` - ${cardData.subtype}`;
    }

    if (cardData.type === 'mugic') {
        fillText(typeText, 15, 225);
    } else {
        fillText(typeText, 43, 220);
    }
}
    let abilityBottom = 235;

// First, update the calculateFontSize function to be more accurate:

function calculateFontSize(text, maxWidth, maxHeight, initialSize = 10) {
    let fontSize = initialSize;
    setFont(fontSize, 'Eurostile Medium');

    // Split text into paragraphs
    const paragraphs = text.split('\n').filter(Boolean);
    let totalLines = 0;

    // Calculate total lines needed at current font size

    for (const paragraph of paragraphs) {
        const lines = wrapText(paragraph, maxWidth);
        totalLines += lines.length;
    }

    // Calculate total height needed
    const lineHeight = fontSize * 1.2;
    const totalHeight = totalLines * lineHeight;

    // If too tall, reduce font size

    if (totalHeight > maxHeight) {
        const ratio = maxHeight / totalHeight;
        fontSize = Math.max(7, fontSize * ratio); // Don't go smaller than 7pt
    }
    return fontSize;
}

if (cardData.ability || cardData.flavorText || cardData.unique || cardData.legendary || cardData.loyal || cardData.brainwashedText) {
    const totalText = [
        cardData.ability,
        cardData.brainwashed ? '\n'.repeat(2) + cardData.brainwashedText : [
            [cardData.unique && 'Unique', cardData.legendary && 'Legendary', cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')].filter(Boolean).join(', '),
            cardData.flavorText
        ].filter(Boolean).join('\n')
    ].filter(Boolean).join('\n');
    const fontSize = calculateFontSize(totalText, 172, 85);
    const lineHeight = fontSize * 1.2;
    let currentY = 235;

if (cardData.type === 'attack') {
    const topBoundary = 263.5;
    const bottomBoundary = 318.5;
    const availableHeight = bottomBoundary - topBoundary;

    if (cardData.ability) {
        setFont(fontSize, 'Eurostile Medium');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        const lines = wrapText(cardData.ability, 215);
        const totalTextHeight = lines.length * lineHeight;
        const startY = topBoundary + ((availableHeight - totalTextHeight) / 2);

        for (let i = 0; i < lines.length; i++) {
            const yPos = startY + (i * lineHeight);

            if (yPos + lineHeight <= bottomBoundary) {
                await drawTextWithSymbols(lines[i], 18, yPos, fontSize);
            }
        }
        currentY = startY + totalTextHeight + 4;

        if (!cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal)) {
            setFont(fontSize, 'Eurostile Heavy');
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'left';
            let statusText = [
                cardData.legendary && 'Legendary',
                cardData.unique && 'Unique',
                cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
            ].filter(Boolean).join(', ');
            fillText(statusText, 18, currentY);
            currentY += lineHeight;
        }
    } else if (!cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal)) {
        setFont(fontSize, 'Eurostile Heavy');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        let statusText = [
            cardData.legendary && 'Legendary',
            cardData.unique && 'Unique',
            cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
        ].filter(Boolean).join(', ');
        const textY = topBoundary + (availableHeight / 2);
        fillText(statusText, 18, textY);
        currentY = textY + lineHeight;
    }
} else if (cardData.type === 'battlegear') {
    const topBoundary = 235;
    const bottomBoundary = 315;
    const textBoxHeight = bottomBoundary - topBoundary;

    // Calculate flavor text height first
    let flavorHeight = 0;

    if (!cardData.brainwashed && cardData.flavorText) {
        setFont(fontSize * 0.9, 'Arial Narrow Italic');
        const flavorLines = wrapText(cardData.flavorText, 205);
        flavorHeight = flavorLines.length * lineHeight;
    }

    // Calculate special status height
    let statusHeight = 0;

    if (!cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal)) {
        setFont(fontSize, 'Eurostile Heavy');
        let statusText = [
            cardData.legendary && 'Legendary',
            cardData.unique && 'Unique',
            cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
        ].filter(Boolean).join(', ');
        statusHeight = lineHeight;
    }

    // Calculate available space for ability text
    const availableHeight = textBoxHeight - flavorHeight - statusHeight - 4; // 4px gap

    if (cardData.ability) {
        setFont(fontSize, 'Eurostile Medium');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        const lines = wrapText(cardData.ability, 205);
        const abilityHeight = lines.length * lineHeight;

        // Calculate starting Y position to center ability text in available space
        const startY = topBoundary + ((availableHeight - abilityHeight) / 2);

        for (let i = 0; i < lines.length; i++) {
            const yPos = startY + (i * lineHeight);

            if (yPos + lineHeight <= bottomBoundary - flavorHeight - statusHeight) {
                drawTextWithSymbols(lines[i], 21, yPos, fontSize);
            }
        }

        // Position for status text (directly below ability text)
        currentY = startY + abilityHeight + 4;

        if (!cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal)) {
            setFont(fontSize, 'Eurostile Heavy');
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'left';
            let statusText = [
                cardData.legendary && 'Legendary',
                cardData.unique && 'Unique',
                cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
            ].filter(Boolean).join(', ');
            fillText(statusText, 21, currentY);
        }
    } else if (!cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal)) {
        setFont(fontSize, 'Eurostile Heavy');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        let statusText = [
            cardData.legendary && 'Legendary',
            cardData.unique && 'Unique',
            cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
        ].filter(Boolean).join(', ');

        // Center the status text vertically in the available space
        const textY = topBoundary + ((textBoxHeight - flavorHeight - statusHeight) / 2);
        fillText(statusText, 21, textY);
    }

    if (!cardData.brainwashed && cardData.flavorText) {
        setFont(fontSize * 0.9, 'Arial Narrow Italic');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        const lines = wrapText(cardData.flavorText, 205);
        const flavorStartY = bottomBoundary - (lines.length * lineHeight);
        lines.forEach((line, i) => {
            const yPos = flavorStartY + (i * lineHeight);

            if (yPos <= bottomBoundary) {
                fillText(line, 21, yPos);
            }
        });
    }
} else {
   const textBoxTop = 233.5;
   const textBoxBottom = 315;
   const absoluteBottom = 320;
   const textBoxHeight = textBoxBottom - textBoxTop;
   const textBoxMiddle = (textBoxTop + textBoxBottom) / 2;

if (cardData.brainwashed && (cardData.ability || cardData.brainwashedText)) {
    let fontSize = 12; // Starting font size
    let lineHeight = fontSize * 1.2;
    const barHeight = 4;
    let abilityLines = [];
    let brainwashedLines = [];
    let abilityHeight, brainwashedHeight, totalHeight;

    // Define fixed positions for unique text and margin
    const uniqueTextY = 308;
    const uniqueTextTopMargin = 4; // Space between brainwashed text and unique line

    // Adjust font size to fit text within the defined area 

    while (fontSize > 5) {
        setFont(fontSize, 'Eurostile Medium');
        lineHeight = fontSize * 1.2;

        // Keep formatting tags when wrapping text
        abilityLines = cardData.ability ? wrapText(cardData.ability, 172) : [];
        brainwashedLines = cardData.brainwashedText ? wrapText(cardData.brainwashedText, 172) : [];
        abilityHeight = abilityLines.length * lineHeight;
        brainwashedHeight = brainwashedLines.length * lineHeight;

        // Calculate total height adjusted for unique text if needed
        const effectiveTextBoxHeight = cardData.unique ? 
            (uniqueTextY - uniqueTextTopMargin) - textBoxTop : 
            textBoxHeight;
        totalHeight = abilityHeight + barHeight + lineHeight + brainwashedHeight;

        if (totalHeight <= effectiveTextBoxHeight) {
            break;
        }

        // Reduce font size
        fontSize -= 0.5;
    }

    // Only center when both content areas have just 1 line
    let verticalOffset = 0;

    if (abilityLines.length === 1 && brainwashedLines.length === 1) {

        // Add a fixed offset to move everything down slightly
        verticalOffset = 15; // Adjust this value as needed (10-20px)
    }
    const abilityStartY = textBoxTop + verticalOffset;
    const barY = abilityStartY + abilityHeight - 6;
    const brainwashedStartY = barY + barHeight + lineHeight + 9;

    // Draw ability text with preserved formatting

    if (cardData.ability) {
        ctx.fillStyle = '#000000';
        let currentFormatting = { isBold: false, isItalic: false };

        for (let i = 0; i < abilityLines.length; i++) {
            const line = abilityLines[i];

            // Preserve formatting state from previous line
            const formattingPrefix = (currentFormatting.isBold ? '<b>' : '') + 
                                   (currentFormatting.isItalic ? '<i>' : '');
            await drawTextWithSymbols(
                formattingPrefix + line, 
                45, 
                abilityStartY + (i * lineHeight), 
                fontSize
            );

            // Update formatting state for next line
            currentFormatting.isBold = (line.includes('<b>') && !line.includes('</b>')) || 
                                     (currentFormatting.isBold && !line.includes('</b>'));
            currentFormatting.isItalic = (line.includes('<i>') && !line.includes('</i>')) || 
                                       (currentFormatting.isItalic && !line.includes('</i>'));
        }
    }

    // Draw light grey background for brainwashed text

    if (cardData.brainwashedText) {

        // First calculate what the text will look like
        const brainwashedMaxWidth = 166;

        // Set up font for calculation
        setFont(fontSize, 'Eurostile Heavy');
        brainwashedLines = wrapText(cardData.brainwashedText, brainwashedMaxWidth);

        // Calculate and adjust font size if needed
        let adjustedFontSize = fontSize;
        let adjustedLineHeight = lineHeight;

        // Calculate the maximum text position based on unique text
        const maxTextBottom = cardData.unique ? 
            uniqueTextY - uniqueTextTopMargin : 
            textBoxBottom;

        while ((brainwashedStartY + (brainwashedLines.length * adjustedLineHeight)) > maxTextBottom && adjustedFontSize > 5) {
            adjustedFontSize -= 0.5;
            adjustedLineHeight = adjustedFontSize * 1.2;
            setFont(adjustedFontSize, 'Eurostile Heavy');
            brainwashedLines = wrapText(cardData.brainwashedText, brainwashedMaxWidth);
        }

        // Now we know the exact height needed for the text
        const actualTextHeight = brainwashedLines.length * adjustedLineHeight;

        // Configure background dimensions
        const paddingSides = 5 * scale;
        const paddingTop = 10 * scale;
        const paddingBottom = -5; // Small fixed padding at bottom
        const backgroundWidth = 160 * scale;
        const backgroundX = 50 * scale;
        const backgroundY = (brainwashedStartY - 2) * scale;

        // DEFINE MAXIMUM Y POSITION FOR GREY BOX BOTTOM
        const maxGreyBoxBottom = cardData.unique ? 
            (uniqueTextY - uniqueTextTopMargin) * scale : 
            315 * scale;

        // Calculate total height and resulting bottom position
        let totalBackgroundHeight = (actualTextHeight * scale) + paddingTop + paddingBottom;
        const calculatedBottom = backgroundY + totalBackgroundHeight;

        // Reset any existing shadows/effects
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = 'transparent';
        ctx.lineWidth = 0;

        // Draw the background using the actual text dimensions
        ctx.fillStyle = 'rgb(220, 220, 220)';
        ctx.beginPath();
        ctx.roundRect(
            backgroundX - paddingSides,
            backgroundY - paddingTop,
            backgroundWidth + (paddingSides * 2),
            totalBackgroundHeight, // Use the potentially adjusted height here
            [0, 0, 5 * scale, 5 * scale]
        );
        ctx.fill();

        // Ensure no stroke is drawn
        ctx.strokeStyle = 'transparent';
        ctx.stroke();
    }

    // Draw brainwashed bar

    if (assets.brainwashedBar) {
        const barWidth = 170;
        const barStartX = 45;
        drawImage(
            assets.brainwashedBar,
            0,
            0,
            assets.brainwashedBar.width,
            assets.brainwashedBar.height,
            45,
            barY,
            barWidth,
            18
        );
    }

    // Draw brainwashed text

    if (cardData.brainwashedText) {
        const brainwashedMaxWidth = 166;

        // Set up font
        setFont(fontSize, 'Eurostile Heavy');
        ctx.fillStyle = '#000000';
        brainwashedLines = wrapText(cardData.brainwashedText, brainwashedMaxWidth);

        // Calculate total height needed and adjust font size if necessary
        let adjustedFontSize = fontSize;
        let adjustedLineHeight = lineHeight;

        // Calculate the maximum text position based on unique text
        const maxTextBottom = cardData.unique ? 
            uniqueTextY - uniqueTextTopMargin : 
            textBoxBottom;

        while ((brainwashedStartY + (brainwashedLines.length * adjustedLineHeight)) > maxTextBottom && adjustedFontSize > 5) {
            adjustedFontSize -= 0.5;
            adjustedLineHeight = adjustedFontSize * 1.2;
            setFont(adjustedFontSize, 'Eurostile Heavy');
            brainwashedLines = wrapText(cardData.brainwashedText, brainwashedMaxWidth);
        }

        // Draw text with bold effect using multiple passes

        for (let i = 0; i < brainwashedLines.length; i++) {
            const yPos = brainwashedStartY + (i * adjustedLineHeight);

            if (yPos + adjustedLineHeight <= maxTextBottom) {

                // First pass - draw the text normally
                await drawTextWithSymbols(brainwashedLines[i], 48, yPos, adjustedFontSize);

                // Second pass - draw the same text with slight offset

                // This creates a subtle bolding effect
                await drawTextWithSymbols(brainwashedLines[i], 48.3, yPos, adjustedFontSize);
            }
        }
    }

    // Draw "Unique" text at fixed position if the card is unique

    if (cardData.unique) {

        // Set font to match the rest of the card text
        setFont(fontSize, 'Eurostile Heavy');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';

        // Draw at fixed y position
        fillText("Unique", 45, uniqueTextY);
    }
} else {

   // Define clear boundaries for the text box with adjusted values for mugic and location cards
   const textBoxTop = cardData.type === 'mugic' ? 252 : cardData.type === 'location' ? 60 : 233.5;
   const textBoxBottom = cardData.type === 'location' ? 280 : 315;
   const absoluteBottom = cardData.type === 'location' ? 285 : 320;
   const textBoxHeight = textBoxBottom - textBoxTop;
   const textBoxMiddle = (textBoxTop + textBoxBottom) / 2;

   // Calculate flavor text height and font size first
   let flavorFontSize = fontSize * 0.9;
   let flavorLineHeight = flavorFontSize * 1.1;
   let flavorLines = [];
   let flavorTextHeight = 0;

   // For mugic cards, we'll position the flavor text at a fixed location near the bottom
   const flavorBottomMargin = 0; // Space between flavor text and absolute bottom

if (!cardData.brainwashed && cardData.flavorText) {
    setFont(flavorFontSize, 'Arial Narrow Italic');
    const maxWidth = cardData.type === 'location' ? 270 : (cardData.type === 'creature' ? 160 : 195);
    flavorLines = wrapText(cardData.flavorText, maxWidth);
    flavorTextHeight = flavorLines.length * flavorLineHeight;
}

    // Updated drawMugic function with more balanced positioning for mugic cards

    if (cardData.type === 'mugic' && cardData.ability) {
        setFont(fontSize, 'Eurostile Medium');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        const maxWidth = 210; // Wider width for mugic cards
        const lines = wrapText(cardData.ability, maxWidth);
        const abilityHeight = lines.length * lineHeight;

        // ADJUSTED: Start from a fixed position below the mugic cost - slightly lower than original
        const mugicCostBottom = 247; // Toned back from 250 to 247

        // Calculate where flavor text would start if present
        let flavorTextTop;

        if (!cardData.brainwashed && cardData.flavorText) {
            flavorTextTop = absoluteBottom - flavorTextHeight - 5;
        } else {
            flavorTextTop = textBoxBottom;
        }

        // Calculate the space available for ability text
        const availableHeight = flavorTextTop - mugicCostBottom;

        // Determine total content height (ability + status line if present)
        const hasStatusLine = !cardData.brainwashed && cardData.unique;
        const totalContentHeight = abilityHeight + (hasStatusLine ? lineHeight + 5 : 0);

        // Calculate starting Y position to center content in available space

        // ADJUSTED: Reduced vertical offset to a more balanced value
        let startY = mugicCostBottom + (availableHeight - totalContentHeight) / 2 + 6; // Reduced from +10 to +6

        // ADJUSTED: Smaller adjustment for unique line

        if (hasStatusLine) {
            startY -= 2; // Reduced from -4 to -2
        }

        // Draw each line of ability text
        const abilityX = 18;

        for (let i = 0; i < lines.length; i++) {
            await drawTextWithSymbols(lines[i], abilityX, startY + (i * lineHeight), fontSize);
        }

        // Update the position for unique status if present

        // ADJUSTED: Moderate spacing between ability text and unique line
        const currentY = startY + abilityHeight + 5; // Reduced from 6 to 5

        // Draw "Unique" status if needed

        if (hasStatusLine) {
            setFont(fontSize, 'Eurostile Heavy');
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'left';
            fillText("Unique", abilityX, currentY);
        }
    } 

// Location card handling
    else if (cardData.type === 'location' && (cardData.ability || (!cardData.brainwashed && cardData.unique))) {
        ctx.save();
        ctx.translate(112 * scale, 310 * scale);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        
        // Define boundaries in rotated coordinates
        const initiativeBottom = 2; // More accurate space after initiative line
        const abilityBoxBottom = 220; // Bottom of the ability text box
        
        // Check what content we have
        const hasAbility = cardData.ability;
        const cleanedAbility = hasAbility ? cardData.ability.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n') : '';
        const hasUnique = !cardData.brainwashed && cardData.unique;
        const hasFlavor = !cardData.brainwashed && cardData.flavorText;
        
        // Calculate where content area ends - accounting for WHERE flavor text actually STARTS
        let contentAreaBottom = abilityBoxBottom;
        if (hasFlavor) {
            // Flavor text sits at the bottom, so we need to find where it STARTS (top of flavor text)
            const flavorStartY = abilityBoxBottom - flavorTextHeight;
            contentAreaBottom = flavorStartY - 5; // 5px gap above flavor text
        }
        
        // Calculate available space for ability+unique content
        const availableSpace = contentAreaBottom - initiativeBottom;
        
        if (hasAbility && cleanedAbility) {
            setFont(fontSize, 'Eurostile Medium');
            const maxWidth = 300;
            const lines = wrapText(cleanedAbility, maxWidth);
            const abilityHeight = lines.length * lineHeight;
            
            // Calculate unique line height if present
            const uniqueHeight = hasUnique ? lineHeight : 0;
            const gapBetweenAbilityAndUnique = hasUnique ? 0 : 0;
            
            // Calculate total content height (ability + gap + unique)
            const totalContentHeight = abilityHeight + gapBetweenAbilityAndUnique + uniqueHeight;
            
            // Center the total content in available space, but ensure minimum spacing from initiative
            const startY = initiativeBottom + ((availableSpace - totalContentHeight) / 2);

            // Draw ability text
            for (let i = 0; i < lines.length; i++) {
                const yPos = startY + (i * lineHeight);
                await drawTextWithSymbols(lines[i], 0, yPos, fontSize);
            }

            // Draw unique line if present
            if (hasUnique) {
                const uniqueY = startY + abilityHeight + gapBetweenAbilityAndUnique;
                setFont(fontSize, 'Eurostile Heavy');
                fillText("Unique", 0, uniqueY);
            }
        } else if (hasUnique) {
            // Only unique text, no ability
            setFont(fontSize, 'Eurostile Heavy');
            
            // Center unique text in available space
            const uniqueY = initiativeBottom + (availableSpace / 2);
            fillText("Unique", 0, uniqueY);
        }
        
        ctx.restore();
    }

// Also handle location cards with only status text (no ability)
    else if (cardData.type === 'location' && !cardData.ability && !cardData.brainwashed && cardData.unique) {
        ctx.save();
        ctx.translate(112 * scale, 310 * scale);
        ctx.rotate(-Math.PI / 2);
        setFont(fontSize, 'Eurostile Heavy');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        
        // Define boundaries in rotated coordinates
        const initiativeBottom = 10; // Space after initiative line
        const abilityBoxBottom = 220; // Bottom of the ability text box
        
        // Check if flavor text is present
        const hasFlavor = !cardData.brainwashed && cardData.flavorText;
        
        // Calculate available space for unique line
        let flavorTopY = abilityBoxBottom;
        if (hasFlavor) {
            flavorTopY = abilityBoxBottom - flavorTextHeight - 5; // Fixed position for flavor text
        }
        
        // Center unique text in available space
        const availableSpace = flavorTopY - initiativeBottom;
        const uniqueY = initiativeBottom + (availableSpace / 2);
        
        fillText("Unique", 0, uniqueY);
        ctx.restore();
    }

    // Also update the section for mugic cards with only status text (no ability)
    else if (cardData.type === 'mugic' && !cardData.ability && !cardData.brainwashed && cardData.unique) {
        setFont(fontSize, 'Eurostile Heavy');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';

        // ADJUSTED: More balanced position for the unique status when it appears alone
        const midY = 280; // Adjusted from 285 to 280
        const midStatusX = 18;
        fillText("Unique", midStatusX, midY);
    }

   // Original handling for non-mugic, non-location cards with ability text
   else if (cardData.ability) {
       setFont(fontSize, 'Eurostile Medium');
       ctx.fillStyle = '#000000';
       ctx.textAlign = 'left';

       // Original code for non-mugic, non-location cards
       const maxWidth = 172;
       const lines = wrapText(cardData.ability, maxWidth);
       const totalHeight = lines.length * lineHeight;
       const hasStatusLine = !cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal);
       const hasFlavorText = !cardData.brainwashed && cardData.flavorText;

       // Calculate available vertical space
       let availableHeight = textBoxHeight - (hasFlavorText ? flavorTextHeight + 5 : 0);
       let startY;

       if (hasStatusLine) {
           startY = textBoxTop + (availableHeight - (totalHeight + lineHeight)) / 2;
       } else {
           startY = textBoxTop + (availableHeight - totalHeight) / 2;
       }

       // Draw each line of text
       const abilityX = 45; // Standard X position for non-Mugic, non-Location cards

       for (let i = 0; i < lines.length; i++) {
           await drawTextWithSymbols(lines[i], abilityX, startY + (i * lineHeight), fontSize);
       }
       currentY = startY + totalHeight + fontSize / 2;

       if (hasStatusLine) {
           setFont(fontSize, 'Eurostile Heavy');
           ctx.fillStyle = '#000000';
           ctx.textAlign = 'left';
           let statusText = [
               cardData.legendary && 'Legendary',
               cardData.unique && 'Unique',
               cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
           ].filter(Boolean).join(', ');
           fillText(statusText, abilityX, currentY);
       }
   } else {

       // Handle case when there's no ability text
       const hasStatusLine = !cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal);

       if (hasStatusLine) {
           setFont(fontSize, 'Eurostile Heavy');
           ctx.fillStyle = '#000000';
           ctx.textAlign = 'left';
           let statusText = [
               cardData.legendary && 'Legendary',
               cardData.unique && 'Unique',
               cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
           ].filter(Boolean).join(', ');

// For Location cards with only status text, use specific positioning

               if (cardData.type === 'location') {
                   ctx.save();
                   ctx.translate(112 * scale, 310 * scale);
                   ctx.rotate(-Math.PI / 2);
                   
                   // Define boundaries in rotated coordinates
                   const initiativeBottom = 15;
                   const abilityBoxBottom = 220; // Bottom of the ability text box
                   
                   // Check if flavor text is present
                   const hasFlavor = !cardData.brainwashed && cardData.flavorText;
                   
                   // Calculate where content area ends - accounting for WHERE flavor text actually STARTS
                   let contentAreaBottom = abilityBoxBottom;
                   if (hasFlavor) {
                       // Flavor text sits at the bottom, so we need to find where it STARTS (top of flavor text)
                       const flavorStartY = abilityBoxBottom - flavorTextHeight;
                       contentAreaBottom = flavorStartY - 5; // 5px gap above flavor text
                   }
                   
                   // Center status text in available space
                   const availableSpace = contentAreaBottom - initiativeBottom;
                   const statusY = initiativeBottom + (availableSpace / 2);
                   
                   fillText(statusText, 0, statusY);
                   ctx.restore();
               } else {

               // For Mugic cards with only status text, use specific positioning
               const midY = cardData.type === 'mugic' 
                   ? 275  // Lower position for Mugic status-only text
                   : textBoxMiddle;
               const midStatusX = cardData.type === 'mugic' ? 18 : 45;
               fillText(statusText, midStatusX, midY);
           }
       }
   }

   // Draw flavor text - use rotated positioning for location cards

   if (!cardData.brainwashed && cardData.flavorText) {
       setFont(flavorFontSize, 'Arial Narrow Italic');
       ctx.fillStyle = '#000000';
       ctx.letterSpacing = "1px";  // Subtle spacing

       if (cardData.type === 'location') {

           // Rotated flavor text for location cards
           ctx.save();
           ctx.translate(29 * scale, 310 * scale);
           ctx.rotate(-Math.PI / 2);
           ctx.textAlign = 'left';
           const flavorStartY = 220 - flavorTextHeight - 5; // Position in rotated coordinates
           flavorLines.forEach((line, i) => {
               fillText(line, 0, flavorStartY + (i * flavorLineHeight));
           });
           ctx.restore();
       } else {

           // Use fixed position for mugic cards' flavor text
           const flavorStartY = cardData.type === 'mugic' 
               ? absoluteBottom - flavorTextHeight - flavorBottomMargin
               : absoluteBottom - flavorTextHeight - 5;
           const flavorX = cardData.type === 'mugic' ? 18 : 45;
           ctx.textAlign = 'left';
           flavorLines.forEach((line, i) => {
               fillText(line, flavorX, flavorStartY + (i * flavorLineHeight));
           });
       }
       ctx.letterSpacing = "0px";
   }
}
}
}

if (cardData.tribe === 'custom' && assets.tribeLogo) {
  try {
    console.log("Rendering custom tribe logo:", assets.tribeLogo);

    // Process the tribe logo without colorization
    const processedLogo = await processCustomTribeLogo(assets.tribeLogo, null, scale);

    if (processedLogo) {
      console.log("Successfully processed logo, rendering to card");

      // Get the original aspect ratio
      const logoAspectRatio = processedLogo.width / processedLogo.height;

      // SEPARATE SCALING FACTORS FOR EACH LOGO

      // 1. Top logo scaling
      const topLogoScaleFactor = .45; // Smaller value = smaller logo
      const topLogoX = 6 * scale; // Move right by increasing this value
      const topLogoY = 4 * scale; // Move down by increasing this value

      // Calculate top logo dimensions based on its scale factor
      const topLogoHeight = width * topLogoScaleFactor;
      const topLogoWidth = topLogoHeight * logoAspectRatio; // Width maintains aspect ratio

      // Draw the small logo at the top with preserved aspect ratio
      ctx.drawImage(
        processedLogo,
        0, 0, processedLogo.width, processedLogo.height,
        topLogoX, topLogoY, topLogoWidth, topLogoHeight
      );

      // Create a semi-transparent version for background
      const lightLogo = document.createElement('canvas');
      const lightCtx = lightLogo.getContext('2d');

      // Size matches original logo
      lightLogo.width = processedLogo.width;
      lightLogo.height = processedLogo.height;

      // Draw the original logo
      lightCtx.drawImage(processedLogo, 0, 0);

      // Just reduce opacity without changing colors
      const imageData = lightCtx.getImageData(0, 0, lightLogo.width, lightLogo.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {

        // Only process non-transparent pixels

        if (data[i + 3] > 0) {

          // Keep RGB values unchanged, just reduce alpha
          data[i + 3] = Math.min(data[i + 3], 30); // Very transparent (30 instead of 40)
        }
      }

      // Put the modified image data back
      lightCtx.putImageData(imageData, 0, 0);

      // 2. Background logo scaling
      const bgLogoScaleFactor = 1.4; // Adjust this for absolute size of background logo
      const largeLogoHeight = width * bgLogoScaleFactor;
      const largeLogoWidth = largeLogoHeight * logoAspectRatio; // Keep aspect ratio

      // Position for ability text box background
      const abilityBoxX = 45 * scale;
      const abilityBoxY = 222.5 * scale;
      const abilityBoxWidth = 172 * scale;
      const abilityBoxHeight = 90 * scale;

      // Center in the ability box
      const largeLogoX = abilityBoxX + (abilityBoxWidth - largeLogoWidth) / 2;
      const largeLogoY = abilityBoxY + (abilityBoxHeight - largeLogoHeight) / 2;

      // Draw the background logo
      ctx.drawImage(
        lightLogo,
        0, 0, lightLogo.width, lightLogo.height,
        largeLogoX, largeLogoY, largeLogoWidth, largeLogoHeight
      );
    }
  } catch (error) {
    console.error('Error processing tribe logo:', error);
  }
}

// Generate random code

const generateCode = () => {
    const chars = '0123456789ABCDEF';
    let code = '';

    for (let i = 0; i < 12; i++) {

        if (i > 0 && i % 4 === 0) code += ' ';
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
};
const cardCode = generateCode();
const spacingAmount = 2;
const spacedCode = cardCode.split('').map((char, i) => 
    i === cardCode.length - 1 ? char : char + ' '.repeat(spacingAmount)
).join('');
setFont(8, 'Century Gothic Bold');
ctx.fillStyle = '#000000';
ctx.textAlign = 'left';

// Adjust position for mugic cards

if (cardData.type === 'mugic') {
    fillText(spacedCode, 65, 333);
} else {
    fillText(spacedCode, 62, 333);
}

// Draw copyright info
if (cardData.showCopyright !== false) {
    ctx.save(); // Save current context state
    setFont(5, 'Eurostile Cond Heavy Italic');
    ctx.letterSpacing = "0.3px";
    
    // New copyright text
    const serialNum = cardData.serialNumber || cardData.id || '--/100';
    let copyrightText = `${serialNum}    This is a non-authentic proxy card made at Bulbastore.com`;
    
    // For mugic and location cards, append the artist info to copyright text if available
    if ((cardData.type === 'mugic' || cardData.type === 'location') && cardData.artist && cardData.showArtist !== false) {
        copyrightText += `    Art by ${cardData.artist}`;
    }
    
    if (cardData.type === 'attack' || cardData.type === 'battlegear') {
        // Attack and Battlegear styling
        ctx.textAlign = 'center';
        const copyrightX = 122.5; // Explicitly position the text

        // Update colors based on type
        if (cardData.type === 'attack') {
            ctx.fillStyle = '#a7b1c3';
            ctx.strokeStyle = '#262730';
            ctx.lineWidth = 0.5;
            ctx.strokeText(copyrightText, copyrightX * scale, 344 * scale);
        } else if (cardData.type === 'battlegear') {
            ctx.fillStyle = '#2d3350';
        }
        
        fillText(copyrightText, copyrightX, 344);
} else if (cardData.type === 'location') {
    // Location cards styling - green like Panivian
    ctx.textAlign = 'center';  // <-- Change to center
    ctx.fillStyle = '#e8f7cb';
    ctx.strokeStyle = '#344f30';
    ctx.lineWidth = 2;
    ctx.strokeText(copyrightText, 122.5 * scale, 344 * scale);  // <-- Use centered position
    fillText(copyrightText, 122.5, 344);  // <-- Use centered position
    } else if ((cardData.type === 'creature' || cardData.type === 'mugic') && cardData.tribe) {
        // Creature and Mugic styling share the same tribe-based coloring
        
        // For mugic cards, center align the text
        if (cardData.type === 'mugic' || cardData.type === 'location') {
            ctx.textAlign = 'center';
            // Center position for mugic and location cards
            const textPosition = 122.5;
        } else {
            // Left align for creatures
            ctx.textAlign = 'left';
        }
        
        // Special handling for custom tribe
        if (cardData.tribe.toLowerCase() === 'custom' && cardData.customColor) {
            // Get the HSL values
            const h = cardData.customColor.h;
            const s = cardData.customColor.s;
            const l = cardData.customColor.l;
            
            // Calculate lighter and darker shades for text and stroke
            const lighterL = Math.min(0.95, l + 0.3); // Lighter shade for fill
            const darkerL = Math.max(0.15, l - 0.2);  // Darker shade for stroke
            
            // Set adaptive colors
            ctx.fillStyle = `hsl(${h}, ${s * 100}%, ${lighterL * 100}%)`;
            ctx.strokeStyle = `hsl(${h}, ${s * 100}%, ${darkerL * 100}%)`;
            ctx.lineWidth = 2;
            
            if (cardData.type === 'mugic') {
                ctx.strokeText(copyrightText, 122.5 * scale, 344 * scale);
                fillText(copyrightText, 122.5, 344);
            } else {
                ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
                fillText(copyrightText, 49, 344);
            }
        } else {
            // Original tribe coloring logic
            switch(cardData.tribe.toLowerCase()) {
                case 'overworld':
                    ctx.fillStyle = '#c7e4ef';
                    break;
                case 'underworld':
                    ctx.fillStyle = '#e1b0b3';
                    break;
                case 'mipedian':
                    ctx.fillStyle = '#d2c39b';
                    ctx.strokeStyle = '#8a7d55';
                    ctx.lineWidth = 2;
                if (cardData.type === 'mugic' || cardData.type === 'location') {
                    ctx.strokeText(copyrightText, 122.5 * scale, 344 * scale);
                } else {
                    ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
                }
                    break;
                case 'danian':
                    ctx.fillStyle = '#c5ad95';
                    break;
                case "m'arrillian":
                case "marrillian":
                    ctx.fillStyle = '#cac8ba';
                    break;
                case 'generic':
                    ctx.fillStyle = '#a0a0a0';
                    break;
                case 'tribeless':
                    ctx.fillStyle = '#000000';
                    ctx.strokeStyle = '#cad1d9';
                    ctx.lineWidth = 4;
                    if (cardData.type === 'mugic') {
                        ctx.strokeText(copyrightText, 122.5 * scale, 344 * scale);
                    } else {
                        ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
                    }
                    break;
                case 'umbrian':
                    ctx.fillStyle = '#bda0e6';
                    ctx.strokeStyle = '#56436e';
                    ctx.lineWidth = 2;
                    if (cardData.type === 'mugic') {
                        ctx.strokeText(copyrightText, 122.5 * scale, 344 * scale);
                    } else {
                        ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
                    }
                    break;
                case 'panivian':
                    ctx.fillStyle = '#6da566';
                    ctx.strokeStyle = '#344f30';
                    ctx.lineWidth = 2;
                    if (cardData.type === 'mugic') {
                        ctx.strokeText(copyrightText, 122.5 * scale, 344 * scale);
                    } else {
                        ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
                    }
                    break;          
                case 'frozen':
                    ctx.fillStyle = '#98d3db';
                    ctx.strokeStyle = '#3a96a3';
                    ctx.lineWidth = 2;
                    if (cardData.type === 'mugic') {
                        ctx.strokeText(copyrightText, 122.5 * scale, 344 * scale);
                    } else {
                        ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
                    }
                    break;
                default:
                    ctx.fillStyle = '#000000';
            }
        }
        
        // Draw the text at the appropriate position
    if (cardData.type === 'mugic' || cardData.type === 'location') {
        fillText(copyrightText, 122.5, 344);
    } else {
        fillText(copyrightText, 49, 344);
    }
    } else {
        // Default styling for other card types
        ctx.textAlign = 'left';
        ctx.fillStyle = '#000000';
        fillText(copyrightText, 49, 344);
    }
    
    ctx.restore(); // Restore previous context state
}

// Draw artist name with special styling - Only needed for non-mugic cards now

if (cardData.artist && cardData.showArtist !== false && cardData.type !== 'mugic' && cardData.type !== 'location') {
    ctx.save(); // Save current context state
    setFont(5, 'Eurostile Cond Heavy Italic');
    ctx.letterSpacing = "0.3px";

    // Use 979 for attack and battlegear, 971 for others
    const xPosition = (cardData.type === 'attack' || cardData.type === 'battlegear') ? 976 : 971;
    const yPosition = 480;
    ctx.translate(xPosition, yPosition);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    const artistText = `Art by ${cardData.artist}`;

    if (cardData.type === 'attack' || cardData.type === 'battlegear') {

        // Attack and Battlegear styling

        if (cardData.type === 'attack') {
            ctx.fillStyle = '#a7b1c3';
        } else {
            ctx.fillStyle = '#3d4360';
        }
        fillText(artistText, 0, 0);
    } else if (cardData.type === 'creature') {

        // Creature styling - now only used for creature cards

        // Special handling for custom tribe

        if (cardData.tribe?.toLowerCase() === 'custom' && cardData.customColor) {

            // Get the HSL values
            const h = cardData.customColor.h;
            const s = cardData.customColor.s;
            const l = cardData.customColor.l;

            // Calculate lighter and darker shades for text and stroke
            const lighterL = Math.min(0.95, l + 0.3); // Lighter shade for fill
            const darkerL = Math.max(0.15, l - 0.2);  // Darker shade for stroke

            // Set adaptive colors
            ctx.strokeStyle = `hsl(${h}, ${s * 100}%, ${darkerL * 100}%)`;
            ctx.lineWidth = 2;
            ctx.strokeText(artistText, 0, 0);
            ctx.fillStyle = `hsl(${h}, ${s * 100}%, ${lighterL * 100}%)`;
        } else {

            // Original tribe-based styling

            switch (cardData.tribe?.toLowerCase()) {
                case 'overworld':
                    ctx.strokeStyle = '#5272bc';
                    ctx.lineWidth = 2;
                    ctx.strokeText(artistText, 0, 0);
                    ctx.fillStyle = '#c7e4ef';
                    break;
                case 'underworld':
                    ctx.strokeStyle = '#b23727';
                    ctx.lineWidth = 2;
                    ctx.strokeText(artistText, 0, 0);
                    ctx.fillStyle = '#e1b0b3';
                    break;
                case 'mipedian':
                    ctx.fillStyle = '#6d5630';
                    break;
                case 'danian':
                    ctx.strokeStyle = '#87664f';
                    ctx.lineWidth = 2;
                    ctx.strokeText(artistText, 0, 0);
                    ctx.fillStyle = '#c5ad95';
                    break;
                case "m'arrillian":
                case "marrillian":
                    ctx.fillStyle = '#cac8ba';
                    break;
                case 'generic':
                    ctx.fillStyle = '#a0a0a0';
                    break;
                case 'tribeless':
                    ctx.fillStyle = '#000000';
                    break;
                case 'umbrian':
                    ctx.strokeStyle = '#56436e';
                    ctx.lineWidth = 2;
                    ctx.strokeText(artistText, 0, 0);
                    ctx.fillStyle = '#c4addf';
                    break;
                case 'panivian':
                    ctx.strokeStyle = '#344f30';
                    ctx.lineWidth = 2;
                    ctx.strokeText(artistText, 0, 0);
                    ctx.fillStyle = '#8cbe85';
                    break;       
                case 'frozen':
                    ctx.strokeStyle = '#3a96a3';
                    ctx.lineWidth = 2;
                    ctx.strokeText(artistText, 0, 0);
                    ctx.fillStyle = '#bce4ea';
                    break;
                default:
                    ctx.fillStyle = '#000000';
            }
        }
        fillText(artistText, 0, 0);
    } else {

        // Default styling for other card types
        ctx.fillStyle = '#000000';
        fillText(artistText, 0, 0);
    }
    ctx.letterSpacing = "0px";
    ctx.restore(); // Restore previous context state
}

    // Draw type-specific elements

    switch (cardData.type) {
        case 'attack': drawAttack(cardData); break;
        case 'creature': drawCreature(cardData); break;
        case 'mugic': 

            // Modified to pass the assets parameter
            const mugicResult = await drawMugic(cardData, assets);
            break;
        case 'location': drawLocation(cardData); break;
    }
return canvas;
}

function drawCreature(cardData) {

    // Mugic stat
    setFont(18, 'Eurostile Heavy');
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';

    // Changed to explicit check and conversion
    fillText(cardData.stats.mugic === 0 ? '0' : cardData.stats.mugic.toString(), 17, 336);

    // Energy stat
    setFont(18, 'Arial Black');
    ctx.textAlign = 'center';

    // Changed to explicit check and conversion
    fillText(cardData.stats.energy === 0 ? '0' : cardData.stats.energy.toString(), 219, 335);
    setFont(9, 'Arial Bold');
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    const stats = [
        { key: 'courage', y: 232 },
        { key: 'power', y: 257 },
        { key: 'wisdom', y: 281 },
        { key: 'speed', y: 305 }
    ];
    stats.forEach(({ key, y }) => {

        // Changed to explicit check and conversion
        fillText(cardData.stats[key] === 0 ? '0' : cardData.stats[key].toString(), 38, y);
    });
}

function drawAttack(cardData) {
    setFont(14, 'Eurostile Black');
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';

    if (cardData.buildPoints !== undefined) {
        fillText(cardData.buildPoints === 0 ? '0' : cardData.buildPoints.toString(), 21, 23.5);    
    }
    setFont(22, 'Eurostile Extd Black');

    if (cardData.base !== undefined) {
        fillText(cardData.base === 0 ? '0' : cardData.base.toString(), 40, 244);
    }
    setFont(12, 'Arial Black');
    ctx.textAlign = 'center';
    const elementPositions = [
        { key: 'fire', x: 98, y: 241 },
        { key: 'air', x: 140, y: 241 },
        { key: 'earth', x: 183, y: 241 },
        { key: 'water', x: 224.5, y: 241 }
    ];
  elementPositions.forEach(({ key, x, y }) => {

    if (cardData.elements[key] !== null && cardData.elements[key] !== undefined) {
      fillText(cardData.elements[key].toString(), x, y);
    }
});
}

// Updated drawMugic function with proper tribe-specific note handling

async function drawMugic(cardData, assets) {

  // First, draw the mugic cost number and icons as before
  setFont(24, 'Eurostile Heavy');
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'left';

  // Draw mugic counters above the ability text

  if (cardData.tribe && cardData.mugicCost !== undefined && cardData.mugicCost !== "") {
    try {
      const cost = cardData.mugicCost.toString().toUpperCase();
      let iconCount = 1;
      let iconPath = "";

      // Same logic as before for determining icon path
      const tribeLower = cardData.tribe.toLowerCase();

      if (cost === '0') {
        iconPath = `img/icons/mugic/${tribeLower}_0.png`;
      } else if (cost === 'X') {
        iconPath = `img/icons/mugic/${tribeLower}_x.png`;
      } else {
        iconPath = `img/icons/mugic/${tribeLower}.png`;
        iconCount = parseInt(cost, 10);

        if (isNaN(iconCount) || iconCount < 1) iconCount = 1;

        if (iconCount > 9) iconCount = 9;
      }
      const fullPath = getAssetPath(iconPath);

      // Load the icon image
      const mugicIcon = new Image();
      await new Promise((resolve, reject) => {
        mugicIcon.onload = resolve;
        mugicIcon.onerror = reject;
        mugicIcon.src = fullPath;
      });

      // Draw icons as before

      if (cost === '0' || cost === 'X') {
        const iconWidth = 13;
        const iconHeight = 13;
        const startX = 15;
        const startY = 232;
        ctx.drawImage(
          mugicIcon,
          0, 0, mugicIcon.width, mugicIcon.height,
          startX * scale, startY * scale,
          iconWidth * scale, iconHeight * scale
        );
      } else {
        const iconWidth = 13;
        const iconHeight = 13;
        const startX = 15;
        const startY = 232;
        const gap = 2;

        for (let i = 0; i < iconCount; i++) {
          ctx.drawImage(
            mugicIcon,
            0, 0, mugicIcon.width, mugicIcon.height,
            (startX + (i * (iconWidth + gap))) * scale, startY * scale,
            iconWidth * scale, iconHeight * scale
          );
        }
      }

// Updated mugic notes section with tribe-specific image handling

if (cardData.mugicNotes && cardData.mugicNotes.length > 0) {

  // Clear any shadow settings before drawing notes
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Define positions and dimensions
  const startX = 165; // Starting X position
  const baseY = 220;  // Base Y position
  const spacing = 9; // Space between notes

  // Different scale factors for each component type
  const scaleFactors = {
    letter: 0.02,   // Base note size
    length: 0.03,  // Length indicator size
    sharp: 0.02,   // Sharp symbol size
    flat: 0.02     // Flat symbol size
  };

  // Define tribes that use white note variants
  const whiteNotesTribes = ['overworld', 'underworld', 'danian', 'generic', 'panivian', 'umbrian'];
  const useWhiteNotes = whiteNotesTribes.includes(cardData.tribe.toLowerCase());
  const noteSuffix = useWhiteNotes ? 'w' : '';

  console.log(`Using ${useWhiteNotes ? 'white' : 'regular'} notes for tribe: ${cardData.tribe}`);

  // Pre-calculate the height of the tallest possible note (note with both sharp and flat)
  // to ensure consistent vertical alignment
  const calculateTotalNoteHeight = async () => {

    // Load sample assets to calculate heights - use appropriate suffix
    const sampleLetter = await loadAssetAndGetDimensions(`img/Mugic Notes/C${noteSuffix}.png`, 'letter');
    const sampleSharp = await loadAssetAndGetDimensions(`img/Mugic Notes/Sharp${noteSuffix}.png`, 'sharp');
    const sampleFlat = await loadAssetAndGetDimensions(`img/Mugic Notes/Flat${noteSuffix}.png`, 'flat');

    // Calculate the total height including sharp above and flat below
    const letterHeight = sampleLetter.height;
    const sharpHeight = sampleSharp.height;
    const flatHeight = sampleFlat.height;

    // Add a small gap between components (0.5 units)
    const totalHeight = letterHeight + sharpHeight + flatHeight + 1;

    // Calculate the y-position for each component relative to the center
    return {
      totalHeight,
      sharpY: -letterHeight/2 - sharpHeight/2 + 1.5, // Sharp above note with small gap
      letterY: 0, // Center of the note is at baseY
      flatY: letterHeight/2 + flatHeight/2 + 2.5 // Flat below note with small gap
    };
  };

  // Helper function to load and get dimensions of an asset
  const loadAssetAndGetDimensions = async (assetPath, type) => {

    // Extract just the filename from the path for the asset key
    const filename = assetPath.split('/').pop();
    const assetKey = `mugicNoteAsset_${assetPath}`;
    let img = assets[assetKey];

    if (!img) {
      console.log(`Loading mugic note asset: ${assetPath}`);
      try {
        img = await loadAsset(assetKey, getAssetPath(assetPath));
        assets[assetKey] = img;
      } catch (error) {
        console.error(`Failed to load mugic note asset: ${assetPath}`, error);
        
        // If white note fails to load, try fallback to regular note
        if (noteSuffix === 'w') {
          const fallbackPath = assetPath.replace(/w\.png$/, '.png');
          console.log(`Trying fallback path: ${fallbackPath}`);
          try {
            img = await loadAsset(`mugicNoteAsset_${fallbackPath}`, getAssetPath(fallbackPath));
            assets[`mugicNoteAsset_${fallbackPath}`] = img;
          } catch (fallbackError) {
            console.error(`Fallback also failed: ${fallbackPath}`, fallbackError);
            throw fallbackError;
          }
        } else {
          throw error;
        }
      }
    }
    
    const scaleFactor = scaleFactors[type];
    return {
      width: img.width * scaleFactor,
      height: img.height * scaleFactor,
      img: img,
      originalWidth: img.width,
      originalHeight: img.height
    };
  };

  // Get vertical positioning information
  const verticalInfo = await calculateTotalNoteHeight();

  // Process each note
  for (let i = 0; i < Math.min(cardData.mugicNotes.length, 7); i++) {
    const note = cardData.mugicNotes[i];

    if (!note) continue;
    const xPos = startX + (i * spacing);

    // Load assets for this note - using tribe-specific suffix
    const letterPath = `img/Mugic Notes/${note.letter}${noteSuffix}.png`;
    const lengthPath = `img/Mugic Notes/${note.length}${noteSuffix}.png`;
    
    console.log(`Loading note components: ${letterPath}, ${lengthPath}`);
    
    const letterDims = await loadAssetAndGetDimensions(letterPath, 'letter');
    const lengthDims = await loadAssetAndGetDimensions(lengthPath, 'length');

    // Calculate the scaled dimensions
    const scaledLetterWidth = letterDims.originalWidth * scaleFactors.letter;

    // Draw length indicator - hugging close to the left side of the note
    // Calculate y-offset to center length vertically with the note
    const lengthYOffset = (letterDims.height - lengthDims.height) / 2;
    ctx.drawImage(
      lengthDims.img,
      0, 0, lengthDims.img.width, lengthDims.img.height,
      (xPos - 1.2) * scale, // Closer to note
      (baseY + lengthYOffset) * scale,
      lengthDims.img.width * scaleFactors.length * scale,
      lengthDims.img.height * scaleFactors.length * scale
    );

    // Draw sharp if present - horizontally centered with the note
    if (note.sharp) {
      const sharpPath = `img/Mugic Notes/Sharp${noteSuffix}.png`;
      const sharpDims = await loadAssetAndGetDimensions(sharpPath, 'sharp');

      // Calculate the scaled dimensions of the sharp
      const scaledSharpWidth = sharpDims.originalWidth * scaleFactors.sharp;

      // Calculate x-offset to center the sharp horizontally with the note
      const sharpXOffset = (scaledLetterWidth - scaledSharpWidth) / 2;
      ctx.drawImage(
        sharpDims.img,
        0, 0, sharpDims.img.width, sharpDims.img.height,
        (xPos + sharpXOffset) * scale, // Centered with note
        (baseY + verticalInfo.sharpY) * scale, // Positioned above note
        sharpDims.img.width * scaleFactors.sharp * scale,
        sharpDims.img.height * scaleFactors.sharp * scale
      );
    }

    // Draw the main note
    ctx.drawImage(
      letterDims.img,
      0, 0, letterDims.img.width, letterDims.img.height,
      xPos * scale,
      (baseY + verticalInfo.letterY) * scale, // Centered at baseY
      letterDims.img.width * scaleFactors.letter * scale,
      letterDims.img.height * scaleFactors.letter * scale
    );

    // Draw flat if present - horizontally centered with the note
    if (note.flat) {
      const flatPath = `img/Mugic Notes/Flat${noteSuffix}.png`;
      const flatDims = await loadAssetAndGetDimensions(flatPath, 'flat');

      // Calculate the scaled dimensions of the flat
      const scaledFlatWidth = flatDims.originalWidth * scaleFactors.flat;

      // Calculate x-offset to center the flat horizontally with the note
      const flatXOffset = (scaledLetterWidth - scaledFlatWidth) / 2;
      ctx.drawImage(
        flatDims.img,
        0, 0, flatDims.img.width, flatDims.img.height,
        (xPos + flatXOffset) * scale, // Centered with note
        (baseY + verticalInfo.flatY) * scale, // Positioned below note
        flatDims.img.width * scaleFactors.flat * scale,
        flatDims.img.height * scaleFactors.flat * scale
      );
    }
  }
}
      return { mugicIconsDrawn: true };
    } catch (err) {
      console.error(`Failed to load or draw mugic icons:`, err);
      return { mugicIconsDrawn: false };
    }
  }
  return { mugicIconsDrawn: false };
}

async function drawLocation(cardData) {

    // All text for location cards should be rotated 90 degrees counter-clockwise

    // Draw Initiative at the top of the location box

    if (cardData.initiative) {
        ctx.save();
        ctx.translate(186 * scale, 310 * scale);
        ctx.rotate(-Math.PI / 2);
        setFont(10, 'Eurostile Medium'); // Set to 10 to match ability text
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';

        // Check if initiative contains symbols and process accordingly

        if (cardData.initiative.includes(':')) {

            // Process initiative text to show both symbol and text, then add "Initiative: " prefix
            const processedInitiative = await processInitiativeText(cardData.initiative);
            await drawTextWithSymbols(`Initiative: ${processedInitiative}`, 0, 0, 10); // Changed from 8.5 to 10
        } else {
            fillText(`Initiative: ${cardData.initiative}`, 0, 0);
        }
        ctx.restore();
    }
}

// Helper function to process initiative text with symbols

async function processInitiativeText(initiativeText) {

    // Replace symbol codes with both symbol and text
    let processedText = initiativeText;

    // Map of symbol codes to their text equivalents
    const symbolTextMap = {
        ':fire:': ':fire: Fire',
        ':air:': ':air: Air', 
        ':earth:': ':earth: Earth',
        ':water:': ':water: Water',
        ':courage:': ':courage: Courage',
        ':power:': ':power: Power',
        ':wisdom:': ':wisdom: Wisdom', 
        ':speed:': ':speed: Speed',
        ':overworld:': ':overworld: OverWorld',
        ':underworld:': ':underworld: UnderWorld',
        ':mipedian:': ':mipedian: Mipedian',
        ':danian:': ':danian: Danian',
        ':marrillian:': ':marrillian: M\'arrillian',
        ':tribeless:': ':tribeless: Tribeless',
        ':panivian:': ':panivian: Panivian',
        ':umbrian:': ':umbrian: Umbrian',
        ':frozen:': ':frozen: Frozen'
    };

    // Replace each symbol code with symbol + text

    for (const [symbolCode, replacement] of Object.entries(symbolTextMap)) {
        processedText = processedText.replace(new RegExp(symbolCode, 'g'), replacement);
    }
    return processedText;
}
    function drawBattlegear(cardData) {

        if (cardData.ability) {
            setFont(10.3, 'Arial');
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'left';
            fillText(cardData.ability, 21.2, 225);
        }
    }