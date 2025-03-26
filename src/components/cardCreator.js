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
    ':underworldmugicX:': { img: 'img/icons/mugic/underworld_x.png' }
};

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
    // Double all spaces in the original text to make them wider
    const textWithWiderSpaces = text.replace(/ /g, '   ');

    // Split text into paragraphs
    const paragraphs = text.split('\n');
    const allLines = [];
    
    for (const paragraph of paragraphs) {
        if (paragraph === '') {
            allLines.push('');
            continue;
        }

        const words = paragraph.split(/(\s+|:[\w']+:|<\/?[bi]>)/);
        let currentLine = '';
        let testLine = '';
        let currentWidth = 0;
        let isInBold = false;
        let isInItalic = false;
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (!word) continue;
            
            // Handle formatting tags
            if (word === '<b>') {
                isInBold = true;
                testLine += word;
                continue;
            } else if (word === '</b>') {
                isInBold = false;
                testLine += word;
                continue;
            } else if (word === '<i>') {
                isInItalic = true;
                testLine += word;
                continue;
            } else if (word === '</i>') {
                isInItalic = false;
                testLine += word;
                continue;
            }
            
            testLine += word;
            
            // Skip measuring for tags
            if (word.match(/^<\/?[bi]>$/)) continue;
            
            const metrics = ctx.measureText(testLine);
            currentWidth = metrics.width;
            
            if (currentWidth > maxWidth * scale && i > 0) {
                // Complete any open tags before breaking the line
                let endLine = currentLine;
                if (isInBold) endLine += '</b>';
                if (isInItalic) endLine += '</i>';
                
                allLines.push(endLine);
                
                // Start a new line with any active formatting
                currentLine = '';
                if (isInBold) currentLine += '<b>';
                if (isInItalic) currentLine += '<i>';
                
                // Add the current word (but don't add leading spaces to a new line)
                currentLine += word.trimStart();
                
                // Reset test line
                testLine = currentLine;
            } else {
                currentLine = testLine;
            }
        }
        
        // Add the last line
        if (currentLine) {
            // Close any open tags
            if (isInBold) currentLine += '</b>';
            if (isInItalic) currentLine += '</i>';
            allLines.push(currentLine);
        }
    }

    return allLines;
}

function formatTribe(tribe) {
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
        const useBleed = cardData.useBleedTemplates || false;
        const templateFolder = useBleed ? 'img/template/bleed' : 'img/template';
        
        console.log(`Template settings - Type: ${cardData.type}, Tribe: ${cardData.tribe}, UseBleed: ${useBleed}`);
        console.log(`Template folder path: ${templateFolder}`);
        
        if (cardData.type === 'creature' && cardData.tribe) {
            // Check for hybrid template
            if (cardData.hybridTemplate === 'mipedianow') {
                templatePath = getAssetPath(`${templateFolder}/mipedianow.png`);
                console.log('Loading hybrid Mipedian + OverWorld template:', templatePath);
            } else if (cardData.brainwashed) {
                templatePath = getAssetPath(`${templateFolder}/${cardData.tribe.toLowerCase()}bw.png`);
                console.log('Loading brainwashed template:', templatePath);
            } else {
                templatePath = getAssetPath(`${templateFolder}/${cardData.tribe.toLowerCase()}.png`);
                console.log('Loading normal template:', templatePath);
            }
        } else if (cardData.type === 'mugic' && cardData.tribe) {
            // For mugic cards, we need to maintain the mugic subdirectory
            if (useBleed) {
                // For bleed templates, check if there's a specific mugic bleed folder
                templatePath = getAssetPath(`${templateFolder}/mugic/${cardData.tribe.toLowerCase()}.png`);
                console.log('Loading mugic bleed template:', templatePath);
            } else {
                templatePath = getAssetPath(`img/template/mugic/${cardData.tribe.toLowerCase()}.png`);
                console.log('Loading mugic standard template:', templatePath);
            }
        } else {
            templatePath = getAssetPath(`${templateFolder}/${cardData.type.toLowerCase()}.png`);
            console.log(`Loading ${cardData.type} template:`, templatePath);
        }
        
        promises.push(loadAsset('template', templatePath)
            .then(img => {
                assets.template = img;
                console.log(`Template loaded successfully: ${templatePath}`);
            })
            .catch(error => {
                console.error(`Failed to load template: ${templatePath}`, error);
                // Try a fallback path without the bleed folder if we're using bleed templates
                if (useBleed) {
                    const fallbackPath = templatePath.replace('/bleed/', '/');
                    console.log(`Trying standard template fallback: ${fallbackPath}`);
                    return loadAsset('template', fallbackPath)
                        .then(img => {
                            console.log('Fallback template loaded successfully');
                            assets.template = img;
                        });
                }
                return Promise.reject(error);
            }));
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

    // Rest of loadAssets function remains the same...
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
        if (cardData.elements?.fire) {
            promises.push(loadAsset('fireattack', getAssetPath('img/fireattack.png'))
                .then(img => assets.fireattack = img));
        }
        if (cardData.elements?.air) {
            promises.push(loadAsset('airattack', getAssetPath('img/airattack.png'))
                .then(img => assets.airattack = img));
        }
        if (cardData.elements?.earth) {
            promises.push(loadAsset('earthattack', getAssetPath('img/earthattack.png'))
                .then(img => assets.earthattack = img));
        }
        if (cardData.elements?.water) {
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
    const isLocation = cardData.type === 'location';
    const useBleed = cardData.useBleedTemplates || false;
    
    // Get template dimensions
    const templateWidth = isLocation ? 350 : 250;
    const templateHeight = isLocation ? 250 : 350;
    
    // Set up canvas with appropriate dimensions and get offsets
    const { offsetX, offsetY } = setCanvas(templateWidth, templateHeight, useBleed);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw art
    if (assets.art) {
        if (isLocation) {
            drawImage(assets.art, 0, 0, assets.art.width, assets.art.height, 35, 34, 306, 137);
        } else if (cardData.type === 'mugic') {
            drawImage(assets.art, 0, 0, assets.art.width, assets.art.height, 0, 0, templateWidth, templateHeight);
        } else {
            drawImage(assets.art, 0, 0, assets.art.width, assets.art.height, 9, 22, 235.81, 197.66);
        }
    }

    // Draw template and elements
    if (assets.template) {
        console.log(`Drawing template: ${cardData.useBleedTemplates ? 'Bleed' : 'Standard'}`);
        console.log(`Template dimensions: ${assets.template.width}x${assets.template.height}`);
        
        // Draw the template normally regardless of bleed setting
        // The bleed templates will be loaded from a different directory but drawn the same way
        drawImage(assets.template, 0, 0, assets.template.width, assets.template.height, 0, 0, width, height);
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
        assets.symbol.dataset.isSymbol = 'true'; // Mark as symbol for special handling
        drawImage(
            assets.symbol,
            0, 0, assets.symbol.width, assets.symbol.height,
            width - 37, 6.5, 24, 24
        );
    }

// Draw name and subname with effects
if (cardData.name) {
    const name = cardData.name.toUpperCase();
    const offsetX = width / 2;
    const maxWidth = isLocation ? 272 : 170;

    // Add text effects
    ctx.shadowColor = "rgba(0, 0, 0, 5)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2.5;
    ctx.shadowOffsetY = 2.5;

    ctx.fillStyle = "#fff";
    ctx.textAlign = 'center';
    ctx.strokeStyle = "#696969";
    ctx.lineWidth = 0.5;

    if (cardData.subname) {
        const subname = cardData.subname.toUpperCase();
        setFont(11.5, 'Eurostile Extd Black');
        // Draw stroke first
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
    const formattedTribe = formatTribe(cardData.tribe);
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

    fillText(typeText, 43, 220);
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
    const topBoundary = 255;
    const bottomBoundary = 310;
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
    const textBoxMiddle = (topBoundary + bottomBoundary) / 2;
    
    // Calculate flavor text height first
    let flavorHeight = 0;
    if (!cardData.brainwashed && cardData.flavorText) {
        setFont(fontSize * 0.9, 'Arial Narrow Italic');
        const flavorLines = wrapText(cardData.flavorText, 172);
        flavorHeight = flavorLines.length * lineHeight;
    }

    if (cardData.ability) {
        setFont(fontSize, 'Eurostile Medium');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';

        const lines = wrapText(cardData.ability, 172);
        for (let i = 0; i < lines.length; i++) {
            const yPos = topBoundary + (i * lineHeight);
            if (yPos + lineHeight <= bottomBoundary - flavorHeight) {
                await drawTextWithSymbols(lines[i], 18, yPos, fontSize);
            }
        }
        currentY = topBoundary + (lines.length * lineHeight) + 4;

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
        ctx.textAlign = 'left'; // Changed from 'center' to 'left'

        let statusText = [
            cardData.legendary && 'Legendary',
            cardData.unique && 'Unique',
            cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
        ].filter(Boolean).join(', ');

        const lines = wrapText(statusText, 172);
        const statusHeight = lines.length * lineHeight;
        currentY = textBoxMiddle - (statusHeight / 2);

        fillText(statusText, 18, currentY); // Changed x-coordinate to 18
        currentY += lineHeight;
    }

    if (!cardData.brainwashed && cardData.flavorText) {
        setFont(fontSize * 0.9, 'Arial Narrow Italic');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';

        const lines = wrapText(cardData.flavorText, 172);
        const flavorStartY = bottomBoundary - (lines.length * lineHeight);

        lines.forEach((line, i) => {
            const yPos = flavorStartY + (i * lineHeight);
            if (yPos <= bottomBoundary) {
                fillText(line, 18, yPos);
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

    // Adjust font size to fit text within the defined area
    while (fontSize > 5) {
        setFont(fontSize, 'Eurostile Medium');
        lineHeight = fontSize * 1.2;

        // Keep formatting tags when wrapping text
        abilityLines = cardData.ability ? wrapText(cardData.ability, 172) : [];
        brainwashedLines = cardData.brainwashedText ? wrapText(cardData.brainwashedText, 172) : [];
        abilityHeight = abilityLines.length * lineHeight;
        brainwashedHeight = brainwashedLines.length * lineHeight;
        totalHeight = abilityHeight + barHeight + lineHeight + brainwashedHeight;

        if (totalHeight <= textBoxHeight) {
            break;
        }

        fontSize -= 0.5;
    }

    // Calculate positions
    const abilityStartY = textBoxTop;
    const barY = abilityStartY + abilityHeight;
    const brainwashedStartY = barY + barHeight + lineHeight + 10;

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
           const paddingSides = 5 * scale;
           const paddingTop = 10 * scale;    
           const paddingBottom = 5 * scale;  // Added bottom padding
           const backgroundWidth = 160 * scale;
           const maxBackgroundHeight = (textBoxBottom - brainwashedStartY - 10) * scale; // Limit height
           const backgroundHeight = Math.min((brainwashedHeight + 5) * scale, maxBackgroundHeight);
           const backgroundX = 50 * scale;
           const backgroundY = (brainwashedStartY - 2) * scale;

           // Reset any existing shadows/effects
           ctx.shadowColor = 'transparent';
           ctx.shadowBlur = 0;
           ctx.shadowOffsetX = 0;
           ctx.shadowOffsetY = 0;
           ctx.strokeStyle = 'transparent';
           ctx.lineWidth = 0;

           ctx.fillStyle = 'rgb(220, 220, 220)';
           ctx.beginPath();
           ctx.roundRect(
               backgroundX - paddingSides,
               backgroundY - paddingTop,
               backgroundWidth + (paddingSides * 2),
               backgroundHeight + paddingTop + paddingBottom,
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
// Draw brainwashed text
if (cardData.brainwashedText) {
    const brainwashedMaxWidth = 164;
    const maxTextBottom = textBoxBottom - 3;
    
    // Use same exact font settings as ability text
    setFont(fontSize, 'Eurostile Medium');
    ctx.fillStyle = '#000000';
    
    brainwashedLines = wrapText(cardData.brainwashedText, brainwashedMaxWidth);
    
    // Calculate total height needed and adjust font size if necessary
    let adjustedFontSize = fontSize;
    let adjustedLineHeight = lineHeight;
    while ((brainwashedStartY + (brainwashedLines.length * adjustedLineHeight)) > maxTextBottom && adjustedFontSize > 5) {
        adjustedFontSize -= 0.5;
        adjustedLineHeight = adjustedFontSize * 1.2;
        setFont(adjustedFontSize, 'Eurostile Medium');
        brainwashedLines = wrapText(cardData.brainwashedText, brainwashedMaxWidth);
    }

    // Draw text with exact same settings as ability text
    for (let i = 0; i < brainwashedLines.length; i++) {
        const yPos = brainwashedStartY + (i * adjustedLineHeight);
        if (yPos + adjustedLineHeight <= maxTextBottom) {
            await drawTextWithSymbols(brainwashedLines[i], 50, yPos, adjustedFontSize);
        }
    }
}
} else {

   // Calculate flavor text height and font size first
   let flavorFontSize = fontSize * 0.9;
   let flavorLineHeight = flavorFontSize * 1.1;
   let flavorLines = [];
   let flavorTextHeight = 0;

   if (!cardData.brainwashed && cardData.flavorText) {
       // Keep reducing font size until flavor text fits
       while (flavorFontSize > 5) {  // Minimum font size of 5
           setFont(flavorFontSize, 'Arial Narrow Italic');
           ctx.letterSpacing = "1px";

           flavorLines = wrapText(cardData.flavorText, 172);
           flavorTextHeight = flavorLines.length * flavorLineHeight;
           
           // Check if text fits vertically
           if (flavorTextHeight <= 50) { // Maximum height for flavor text
               break;
           }
           
           flavorFontSize -= 0.5;
           flavorLineHeight = flavorFontSize * 1.1;
       }
       ctx.letterSpacing = "0px";
   }

   if (cardData.ability) {
       setFont(fontSize, 'Eurostile Medium');
       ctx.fillStyle = '#000000';
       ctx.textAlign = 'left';
       const lines = wrapText(cardData.ability, 172);
       const totalHeight = lines.length * lineHeight;
       const hasStatusLine = !cardData.brainwashed && (cardData.unique || cardData.legendary || cardData.loyal);
       const hasFlavorText = !cardData.brainwashed && cardData.flavorText;
       
       let startY = textBoxTop;
       let availableHeight = textBoxHeight - (hasFlavorText ? flavorTextHeight + 5 : 0);

       if (hasStatusLine) {
           startY = textBoxTop + (availableHeight - (totalHeight + lineHeight)) / 2;
       } else {
           startY = textBoxTop + (availableHeight - totalHeight) / 2;
       }

       for (let i = 0; i < lines.length; i++) {
           ctx.globalAlpha = 1.0;
           await drawTextWithSymbols(lines[i], 45, startY + (i * lineHeight), fontSize);
           ctx.globalAlpha = 1.0;
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

           fillText(statusText, 45, currentY);
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

           fillText(statusText, 45, textBoxMiddle);
       }
   }

   // Always draw flavor text at the bottom if it exists
   if (!cardData.brainwashed && cardData.flavorText) {
       setFont(flavorFontSize, 'Arial Narrow Italic');
       ctx.fillStyle = '#000000';
       ctx.textAlign = 'left';

       // Add a slight letter spacing
       ctx.letterSpacing = "1px";  // Very subtle spacing

       const flavorStartY = absoluteBottom - flavorTextHeight - 5;
       flavorLines.forEach((line, i) => {
           fillText(line, 45, flavorStartY + (i * flavorLineHeight));
       });

       // Reset letter spacing after drawing flavor text
       ctx.letterSpacing = "0px";
   }

}
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
fillText(spacedCode, 62, 333);

// Draw copywrite info
if (cardData.type === 'creature' && cardData.showCopyright !== false) {
    setFont(5, 'Eurostile Cond Heavy Italic');
    ctx.letterSpacing = "0.3px";
    ctx.textAlign = 'left';
    
    const copyrightText = `${cardData.serialNumber || '--/100'}    ©2024 4Kids and Chaotic USA. Chaotic® Home Focus.`;
    
    switch(cardData.tribe?.toLowerCase()) {
        case 'overworld':
            ctx.fillStyle = '#c7e4ef';
            break;
        case 'underworld':
            ctx.fillStyle = '#e1b0b3';
            break;
        case 'mipedian':
            ctx.fillStyle = '#b1a277';
            ctx.strokeStyle = '#6a5d35';
            ctx.lineWidth = 2;
            ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
            break;
        case 'danian':
            ctx.fillStyle = '#c5ad95';
            break;
        case "m'arrillian":
            ctx.fillStyle = '#cac8ba';
            break;
        case 'tribeless':
            ctx.fillStyle = '#000000';
            ctx.strokeStyle = '#cad1d9';
            ctx.lineWidth = 4;
            ctx.strokeText(copyrightText, 49 * scale, 344 * scale);
            break;
    }
    
    fillText(copyrightText, 49, 344);
}

// Draw artist name with special styling for attack cards
if (cardData.artist && cardData.showArtist !== false) {
    ctx.save();
    setFont(5, 'Eurostile Cond Heavy Italic');
    ctx.letterSpacing = "0.3px";
    ctx.translate(971, 480);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    
    const artistText = `Art by ${cardData.artist}`;
    
    if (cardData.type === 'creature') {
        switch(cardData.tribe?.toLowerCase()) {
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
                ctx.fillStyle = '#cac8ba';
                break;
            case 'tribeless':
                ctx.fillStyle = '#000000';
                break;
        }
    }
    
    fillText(artistText, 0, 0);
    ctx.letterSpacing = "0px";
    ctx.restore();
}

    // Draw type-specific elements
    switch (cardData.type) {
        case 'attack': drawAttack(cardData); break;
        case 'creature': drawCreature(cardData); break;
        case 'mugic': drawMugic(cardData); break;
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
        if (cardData.elements[key]) {
            fillText(cardData.elements[key].toString(), x, y);
        }
});
}

function drawMugic(cardData) {
    setFont(24, 'Eurostile Heavy');
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';

    if (cardData.mugicCost) {
        fillText(cardData.mugicCost.toString(), 18, 230);
    }
}

function drawLocation(cardData) {
    setFont(8.5, 'Arial', 'bold');
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';

    if (cardData.initiative) {
        fillText(`Initiative: ${cardData.initiative}`, 41, 188);
    }
}

function drawBattlegear(cardData) {
    if (cardData.ability) {
        setFont(10.3, 'Arial');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        fillText(cardData.ability, 21.2, 225);
    }
}