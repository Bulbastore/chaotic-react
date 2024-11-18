// src/components/cardCreator.js
import { getAssetPath } from './assetPaths';

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
            new FontFace('Eurostile-BoldExtendedTwo', 'url(/fonts/EurostileBoldExtendedTwo.woff2)')
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

function calculateFontSize(text, maxWidth, maxHeight, initialSize = 10.3) {
    let fontSize = initialSize;
    setFont(fontSize, 'Eurostile Medium');
    
    const lines = wrapText(text, maxWidth);
    const totalHeight = lines.length * (fontSize + 2);
    
    if (totalHeight > maxHeight) {
        fontSize = (maxHeight / lines.length) - 2;
    }
    
    return fontSize;
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

// Add the drawTextWithSymbols function
async function drawTextWithSymbols(text, x, y, fontSize) {
    const words = text.split(' ');
    let currentX = x * scale;
    const symbolHeight = fontSize * scale;

    for (const word of words) {
        const symbolInfo = SYMBOL_MAPPINGS[word];

        if (symbolInfo) {
            const img = await loadAsset(word, getAssetPath(symbolInfo.img));
            const aspectRatio = img.width / img.height;
            const symbolWidth = symbolHeight * aspectRatio;

            // Align bottom of symbol with text baseline
            const symbolY = (y * scale) - symbolHeight + (fontSize * 0.2 * scale);

            ctx.drawImage(
                img,
                currentX,
                symbolY,
                symbolWidth,
                symbolHeight
            );
            currentX += symbolWidth + (fontSize * 0.3 * scale); // Add smaller space after symbols
        } else {
            // Adjust font size dynamically
            const maxWidth = 172;
            const textWidth = ctx.measureText(word + ' ').width;
            const scaledWidth = textWidth / scale;

            if (scaledWidth > maxWidth) {
                const newFontSize = (fontSize * maxWidth) / scaledWidth;
                setFont(newFontSize, 'Eurostile Medium');
            } else {
                setFont(fontSize, 'Eurostile Medium'); // Use the passed fontSize instead of hardcoded 10.3
            }

            ctx.fillText(word, currentX, y * scale);
            currentX += ctx.measureText(word + ' ').width;
        }
    }
}

const CardCreator = {
    async createCard(cardData) {
        const assets = await loadAssets(cardData);
        return drawCard(cardData, assets);
    },

    downloadCard(canvas, name = 'card.png') {
        const link = document.createElement('a');
        link.download = name;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
};

export { CardCreator };

// Canvas 
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const scale = 4;
let height = 0, width = 0;

// Helper drawing functions
function drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
    ctx.drawImage(image, 
        sx, sy, sw, sh,
        dx * scale, dy * scale, 
        dw * scale, dh * scale
    );
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

function setCanvas(x, y) {
    width = x;
    height = y;
    canvas.width = width * 4;
    canvas.height = height * 4;
    canvas.style.width = 'auto';
    canvas.style.height = 'auto';
}

function wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    let currentLineWidth = 0;
    const symbolWidth = ctx.font.match(/\d+/)[0] * 1.2; // Approximate width of symbol images

    for (const word of words) {
        const symbolInfo = SYMBOL_MAPPINGS[word];
        let wordWidth;
        
        if (symbolInfo) {
            // Use a smaller width for symbols since they're visually more compact
            wordWidth = symbolWidth;
        } else {
            wordWidth = ctx.measureText(word + ' ').width;
        }

        if (currentLineWidth + wordWidth > maxWidth * scale) {
            if (currentLine !== '') {
                lines.push(currentLine.trim());
                currentLine = '';
                currentLineWidth = 0;
            }
            
            // If this is a single word that's too long, force it onto its own line
            if (wordWidth > maxWidth * scale) {
                lines.push(word);
                currentLine = '';
                currentLineWidth = 0;
                continue;
            }
        }

        currentLine += word + ' ';
        currentLineWidth += wordWidth;
    }

    if (currentLine !== '') {
        lines.push(currentLine.trim());
    }

    return lines;
}


function formatTribe(tribe) {
    if (!tribe) return "";
    switch (tribe.toLowerCase()) {
        case "danian": return "Danian";
        case "overworld": return "OverWorld";
        case "mipedian": return "Mipedian";
        case "underworld": return "UnderWorld";
        case "m'arrillian": return "M'arrillian";
        case "tribeless": return "Tribeless";
        case "generic": return "Generic";
        default: return tribe;
    }
}

async function loadAssets(cardData) {
    const assets = {};
    const promises = [];

    // Template
    if (cardData.type) {
        let templatePath;
        if (cardData.type === 'creature' && cardData.tribe) {
            // Check for brainwashed state
            if (cardData.brainwashed) {
                templatePath = getAssetPath(`img/template/${cardData.tribe.toLowerCase()}bw.png`);
                console.log('Loading brainwashed template:', templatePath);
            } else {
                templatePath = getAssetPath(`img/template/${cardData.tribe.toLowerCase()}.png`);
                console.log('Loading normal template:', templatePath);
            }
        } else if (cardData.type === 'mugic' && cardData.tribe) {
            templatePath = getAssetPath(`img/template/mugic/${cardData.tribe.toLowerCase()}.png`);
        } else {
            templatePath = getAssetPath(`img/template/${cardData.type.toLowerCase()}.png`);
        }
        
        promises.push(loadAsset('template', templatePath)
            .then(img => assets.template = img));
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
        ).then(img => assets.symbol = img));
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
        
        img.onload = () => {
            console.log(`Successfully loaded: ${key} from ${path}`);
            resolve(img);
        };
        
        img.onerror = (error) => {
            console.error(`Failed to load ${key} from ${path}`, error);
            // Try without the leading slash as a fallback
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
    
    setCanvas(isLocation ? 350 : 250, isLocation ? 250 : 350);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw art
    if (assets.art) {
        if (isLocation) {
            drawImage(assets.art, 0, 0, assets.art.width, assets.art.height, 35, 34, 306, 137);
        } else if (cardData.type === 'mugic') {
            drawImage(assets.art, 0, 0, assets.art.width, assets.art.height, 0, 0, width, height);
        } else {
            drawImage(assets.art, 0, 0, assets.art.width, assets.art.height, 9, 22, 235.81, 197.66);
        }
    }

    // Draw template and elements
    if (assets.template) {
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
        drawImage(assets.symbol, 0, 0, assets.symbol.width, assets.symbol.height, width - 34, 10, 20, 20);
    }

// Draw name and subname with effects
if (cardData.name) {
    const name = cardData.name.toUpperCase();
    const offsetX = width / 2;
    const maxWidth = isLocation ? 272 : 170;

    // Add text effects
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

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
    // Special handling for attack cards - always show "Attack"
    setFont(7, 'Eurostile Heavy Italic');
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = 0.5;
    ctx.shadowColor = "#696969";
    fillText("Attack", 18, 218.5);

} 
if (cardData.subtype || cardData.tribe) {
    setFont(7.5, 'Eurostile Heavy Italic');
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0.5;
    ctx.shadowOffsetY = 0.5;
    ctx.shadowColor = "#696969";

    let typeText = cardData.type.charAt(0).toUpperCase() + cardData.type.slice(1);
    if (cardData.tribe) {
        typeText += ` - ${cardData.past ? 'Past ' : ''}${formatTribe(cardData.tribe)}`;
        if (cardData.subtype) {
            typeText += ` ${cardData.subtype}`;
        }
    } else if (cardData.subtype) {
        typeText += ` - ${cardData.subtype}`;
    }

    fillText(typeText, 43, 220);
}

    let abilityBottom = 235;

// First, update the calculateFontSize function to be more accurate:
function calculateFontSize(text, maxWidth, maxHeight, initialSize = 10.3) {
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
    // Combine all text to calculate total space needed
    const totalText = [
        cardData.ability,
        cardData.brainwashed ? '\n'.repeat(2) + cardData.brainwashedText : [
            [cardData.unique && 'Unique', cardData.legendary && 'Legendary', cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')].filter(Boolean).join(', '),
            cardData.flavorText
        ].filter(Boolean).join('\n')
    ].filter(Boolean).join('\n');
    
    // Calculate appropriate font size for all content
    const fontSize = calculateFontSize(totalText, 172, 85);
    const lineHeight = fontSize * 1.2;
    let currentY = 235;
    
// Draw ability text
if (cardData.ability) {
    setFont(fontSize, 'Eurostile Medium');
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    
    // Special handling for attack cards
    if (cardData.type === 'attack') {
        const topBoundary = 255;
        const bottomBoundary = 320;
        const availableHeight = bottomBoundary - topBoundary;
        
        const lines = wrapText(cardData.ability, 215);
        const totalTextHeight = lines.length * lineHeight;
        const startY = topBoundary + ((availableHeight - totalTextHeight) / 2);
        
        for (let i = 0; i < lines.length; i++) {
            const yPos = startY + (i * lineHeight);
            if (yPos + lineHeight <= bottomBoundary) {
                await drawTextWithSymbols(lines[i], 18, yPos, fontSize);
            }
        }
    } else {
        // Original code for non-attack cards
        const lines = wrapText(cardData.ability, 172);
        for (let i = 0; i < lines.length; i++) {
            ctx.globalAlpha = 1.0;
            await drawTextWithSymbols(lines[i], 43, currentY + (i * lineHeight), fontSize);
            ctx.globalAlpha = 1.0;
        }
        currentY += lines.length * lineHeight + fontSize/2;
    }
}

// Draw brainwashed text if applicable
    if (cardData.brainwashed && cardData.brainwashedText) {
        // Calculate space needed for brainwashed text
        const brainwashedLines = wrapText(cardData.brainwashedText, 172);
        const totalBrainwashedHeight = brainwashedLines.length * lineHeight;
        
        // Calculate optimal bar position based on available space
        let barY;
        if (cardData.ability) {
            // If there's ability text, position relative to ability text height
            const abilityLines = wrapText(cardData.ability, 172);
            const abilityHeight = abilityLines.length * lineHeight;
            
            // Position bar after ability text while ensuring enough space for brainwashed text
            barY = Math.min(
                currentY, // Current Y position after ability text
                315 - totalBrainwashedHeight - 25 // Leave space for brainwashed text
            );
        } else {
            // If no ability text, start from default position
            barY = Math.min(250, 315 - totalBrainwashedHeight - 25);
        }

        // Draw the brainwashed bar
        if (assets.brainwashedBar) {
            drawImage(
                assets.brainwashedBar,
                0, 0,
                assets.brainwashedBar.width,
                assets.brainwashedBar.height,
                43, barY,
                173, 13
            );
        }

        // Draw brainwashed text with proper spacing
        const brainwashedTextY = barY + 23; // Increased spacing after bar
        setFont(fontSize, 'Eurostile Medium');
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        
        for (let i = 0; i < brainwashedLines.length; i++) {
            const yPos = brainwashedTextY + (i * lineHeight);
            if (yPos + lineHeight <= 315) { // Check if text fits within card boundary
                ctx.globalAlpha = 1.0;
                await drawTextWithSymbols(brainwashedLines[i], 45, yPos, fontSize);
                ctx.globalAlpha = 1.0;
            }
        }

    } else if (!cardData.brainwashed) {
        // Draw non-brainwashed elements (unique, legendary, loyal, flavor text)
        if (cardData.unique || cardData.legendary || cardData.loyal) {
            setFont(fontSize, 'Eurostile Heavy');
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'left';
            
            let statusText = [
                cardData.legendary && 'Legendary',
                cardData.unique && 'Unique',
                cardData.loyal && (cardData.loyalRestriction ? `Loyal - ${cardData.loyalRestriction}` : 'Loyal')
            ].filter(Boolean).join(', ');
            
            fillText(statusText, 43, currentY);
            currentY += lineHeight;
        }
        
        if (cardData.flavorText) {
            setFont(fontSize * 0.9, 'Arial Narrow Italic');
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'left';
            
            const lines = wrapText(cardData.flavorText, 172);
            lines.forEach((line, i) => {
                const yPos = currentY + (i * lineHeight);
                if (yPos <= 315) {
                    fillText(line, 43, yPos);
                }
            });
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
if (cardData.type === 'attack') {
    setFont(5, 'Eurostile Cond Heavy Italic');
    ctx.fillStyle = '#a7b1c3';
    ctx.strokeStyle = '#262730';
    ctx.lineWidth = 0.25;
    ctx.textAlign = 'left';
    ctx.letterSpacing = "0.3px";
    
    const copyrightText = `${cardData.serialNumber || '--/100'}    ©2024 4Kids and Chaotic USA. Chaotic® Home Focus.`;
    
    // Draw stroke first
    ctx.strokeText(copyrightText, 63 * scale, 344 * scale);
    // Then fill
    fillText(copyrightText, 63, 344);
} else {
    setFont(5, 'Eurostile Cond Heavy Italic');
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.letterSpacing = "0.3px";
    fillText(`${cardData.serialNumber || '--/100'}    ©2024 4Kids and Chaotic USA. Chaotic® Home Focus.`, 49, 344);
}

ctx.letterSpacing = "0px";

// Draw artist name with special styling for attack cards
if (cardData.artist) {
    ctx.save();
    setFont(5, 'Eurostile Cond Heavy Italic');
    if (cardData.type === 'attack') {
        ctx.fillStyle = '#a7b1c3';
        ctx.strokeStyle = '#262730';
        ctx.lineWidth = 0.25;
    } else {
        ctx.fillStyle = '#FFFFFF';
    }
    ctx.letterSpacing = "0.3px";
    ctx.translate(975, 480);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    
    const artistText = `Art by ${cardData.artist}`;
    if (cardData.type === 'attack') {
        // Draw stroke first
        ctx.strokeText(artistText, 0, 0);
    }
    // Then fill
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
        case 'battlegear': drawBattlegear(cardData); break;
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
        fillText(cardData.stats[key] === 0 ? '0' : cardData.stats[key].toString(), 37, y);
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