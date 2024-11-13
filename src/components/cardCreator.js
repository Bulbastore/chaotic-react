// src/components/cardCreator.js
import { getAssetPath } from './assetPaths';

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

// Canvas setup
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const scale = 2;
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
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = width;
    canvas.style.height = height;
}

function wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        const testLine = currentLine + (currentLine !== '' ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth * scale) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    });
    
    if (currentLine !== '') {
        lines.push(currentLine);
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
            templatePath = getAssetPath(`img/template/${cardData.tribe.toLowerCase()}.png`);
        } else if (cardData.type === 'mugic' && cardData.tribe) {
            templatePath = getAssetPath(`img/template/mugic/${cardData.tribe.toLowerCase()}.png`);
        } else {
            templatePath = getAssetPath(`img/template/${cardData.type.toLowerCase()}.png`);
        }
        
        promises.push(loadAsset('template', templatePath)
            .then(img => assets.template = img));
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

    // Art remains the same since it's uploaded by user
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
    } catch (error) {
        console.error('Error loading assets:', error);
        // You might want to show an error message to the user here
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

function drawCard(cardData, assets) {
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
        typeText += ` - ${formatTribe(cardData.tribe)}`;
        if (cardData.subtype) {
            typeText += ` ${cardData.subtype}`;
        }
    } else if (cardData.subtype) {
        typeText += ` - `;
        typeText += cardData.subtype;
    }

    fillText(typeText, 43, 220);
}

    let abilityBottom = 235;

// Draw ability text
if (cardData.ability) {
    setFont(10.3, 'Eurostile Medium');
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.lineWidth = 0.3;

    const maxWidth = 172;
    const lines = wrapText(cardData.ability, maxWidth);
    
    lines.forEach((line, i) => {
        ctx.globalAlpha = 0.8; // Add slight transparency
        fillText(line, 43, abilityBottom + (i * 12));
        ctx.globalAlpha = 1.0; // Reset transparency
    });
    
    abilityBottom = abilityBottom + (lines.length * 12) + 4;
}

// Draw status indicators with proper spacing
if (cardData.unique || cardData.legendary || cardData.loyal) {
    setFont(10.3, 'Eurostile Heavy');
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';

    let statusText = [];
    if (cardData.legendary) {
        statusText.push('Legendary');
        if (cardData.loyal) statusText.push(', ');
    } else if (cardData.unique) {
        statusText.push('Unique');
        if (cardData.loyal) statusText.push(', ');
    }
    
    if (cardData.loyal) {
        statusText.push('Loyal');
        if (cardData.loyalRestriction) {
            statusText.push(` - ${cardData.loyalRestriction}`);
        }
    }
    
    fillText(statusText.join(''), 43, abilityBottom);
    abilityBottom += 16;
}

// Draw flavor text
if (cardData.flavorText) {
    setFont(9, 'Arial Narrow Italic');
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';

    const maxWidth = 172;
    const lines = wrapText(cardData.flavorText, maxWidth);
    const lineHeight = 10;
    const bottomY = 315;
    
    // Calculate starting Y position ensuring no overlap
    const startY = Math.min(abilityBottom + 8, bottomY - (lines.length * lineHeight));
    
    lines.forEach((line, i) => {
        fillText(line, 43, startY + (i * lineHeight));
    });
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
const spacingAmount = 2; // Adjust this number for different spacing
const spacedCode = cardCode.split('').map((char, i) => 
    i === cardCode.length - 1 ? char : char + ' '.repeat(spacingAmount)
).join('');
setFont(8, 'Century Gothic Bold');
ctx.fillStyle = '#000000';
ctx.textAlign = 'left';
fillText(spacedCode, 62, 333);

    // Draw copywrite info
setFont(5, 'Eurostile Cond Heavy Italic');
ctx.fillStyle = '#FFFFFF';
ctx.letterSpacing = "0.3px";
fillText(`${cardData.serialNumber || '--/100'}    ©2024 4Kids and Chaotic USA. Chaotic® Home Focus.`, 49, 344);
ctx.letterSpacing = "0px";

    // Draw artist name
if (cardData.artist) {
    ctx.save();
    setFont(5, 'Eurostile Cond Heavy Italic');
    ctx.fillStyle = '#FFFFFF';
    ctx.letterSpacing = "0.3px";
    ctx.translate(485, 250);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    fillText(`Art by ${cardData.artist}`, 0, 0);
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

    if (cardData.stats.mugic) {
        fillText(cardData.stats.mugic.toString(), 17, 336);
    }

    // Energy stat
    setFont(18, 'Arial Black');  // Increased font size
    ctx.textAlign = 'center';
    
    if (cardData.stats.energy) {
        fillText(cardData.stats.energy.toString(), 219, 335);
    }

    setFont(8, 'Arial Bold');
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';

    const stats = [
        { key: 'courage', y: 232 },
        { key: 'power', y: 257 },
        { key: 'wisdom', y: 281 },
        { key: 'speed', y: 305 }
    ];

    stats.forEach(({ key, y }) => {
        if (cardData.stats[key]) {
            fillText(cardData.stats[key].toString(), 37, y);
        }
    });
}


function drawAttack(cardData) {
    setFont(18, 'Arial', 'bold');
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';

    if (cardData.buildPoints) {
        fillText(cardData.buildPoints.toString(), 20, 25);    
    }

    setFont(22, 'Eurostile-BoldExtendedTwo', 'bold');
    if (cardData.base) {
        fillText(cardData.base.toString(), 39, 247);
    }

    setFont(10, 'Eurostile-BoldExtendedTwo', 'bold');
    ctx.textAlign = 'center';

    const elementPositions = [
        { key: 'fire', x: 96 },
        { key: 'air', x: 139 },
        { key: 'earth', x: 181 },
        { key: 'water', x: 224 }
    ];

    elementPositions.forEach(({ key, x }) => {
        if (cardData.elements[key]) {
            fillText(cardData.elements[key].toString(), x, 242);
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