import { useState, useEffect, useRef } from 'react';
import CardPreview from './CardPreview';
import { CardCreator } from './cardCreator';
import { getAssetPath } from './assetPaths';
import FormattingToolbar from './FormattingToolbar';
import CreatureSelector from './CreatureSelector';
import { getCreatureById } from './CreatureDatabase';
import BatchGeneratorUI from './BatchGeneratorUI';

const CARD_SYMBOLS = [
  // Ability elements
  { code: ':fire:', label: 'Fire', icon: getAssetPath('img/icons/abilityfire.png') },
  { code: ':air:', label: 'Air', icon: getAssetPath('img/icons/abilityair.png') },
  { code: ':earth:', label: 'Earth', icon: getAssetPath('img/icons/abilityearth.png') },
  { code: ':water:', label: 'Water', icon: getAssetPath('img/icons/abilitywater.png') },

  // Discipline elements
  { code: ':courage:', label: 'Courage', icon: getAssetPath('img/icons/courage.png') },
  { code: ':power:', label: 'Power', icon: getAssetPath('img/icons/power.png') },
  { code: ':wisdom:', label: 'Wisdom', icon: getAssetPath('img/icons/wisdom.png') },
  { code: ':speed:', label: 'Speed', icon: getAssetPath('img/icons/speed.png') },  

  // Tribe elements
  { code: ':overworld:', label: 'OverWorld', icon: getAssetPath('img/icons/overworld.png') },
  { code: ':underworld:', label: 'UnderWorld', icon: getAssetPath('img/icons/underworld.png') },
  { code: ':mipedian:', label: 'Mipedian', icon: getAssetPath('img/icons/mipedian.png') },
  { code: ':danian:', label: 'Danian', icon: getAssetPath('img/icons/danian.png') },
  { code: ':marrillian:', label: 'Marrillian', icon: getAssetPath('img/icons/marrillian.png') },
  { code: ':past:', label: 'Past', icon: getAssetPath('img/icons/tribeless.png') },

  // Mugic icons - OverWorld
  { code: ':overworldmugic:', label: 'OverWorld Mugic', icon: getAssetPath('img/icons/mugic/overworld.png') },
  { code: ':overworldmugic0:', label: 'OverWorld Mugic 0', icon: getAssetPath('img/icons/mugic/overworld_0.png') },
  { code: ':overworldmugicX:', label: 'OverWorld Mugic X', icon: getAssetPath('img/icons/mugic/overworld_x.png') }, 

  // Mugic icons - UnderWorld
  { code: ':underworldmugic:', label: 'UnderWorld Mugic', icon: getAssetPath('img/icons/mugic/underworld.png') },
  { code: ':underworldmugic0:', label: 'UnderWorld Mugic 0', icon: getAssetPath('img/icons/mugic/underworld_0.png') },
  { code: ':underworldmugicX:', label: 'UnderWorld Mugic X', icon: getAssetPath('img/icons/mugic/underworld_x.png') },

  // Mugic icons - Mipedian
  { code: ':mipedianmugic:', label: 'Mipedian Mugic', icon: getAssetPath('img/icons/mugic/mipedian.png') },
  { code: ':mipedianmugic0:', label: 'Mipedian Mugic 0', icon: getAssetPath('img/icons/mugic/mipedian_0.png') },
  { code: ':mipedianmugicX:', label: 'Mipedian Mugic X', icon: getAssetPath('img/icons/mugic/mipedian_x.png') },

  // Mugic icons - Danian
  { code: ':danianmugic:', label: 'Danian Mugic', icon: getAssetPath('img/icons/mugic/danian.png') },
  { code: ':danianmugic0:', label: 'Danian Mugic 0', icon: getAssetPath('img/icons/mugic/danian_0.png') },
  { code: ':danianmugicX:', label: 'Danian Mugic X', icon: getAssetPath('img/icons/mugic/danian_x.png') },
  
  // Mugic icons - M'arrillian
  { code: ':marrillianmugic:', label: "M'arrillian Mugic", icon: getAssetPath('img/icons/mugic/m\'arrillian.png') },
  { code: ':marrillianmugic0:', label: "M'arrillian Mugic 0", icon: getAssetPath('img/icons/mugic/marrillian.png') },
  { code: ':marrillianmugicX:', label: "M'arrillian Mugic X", icon: getAssetPath('img/icons/mugic/marrillian_x.png') },
  { code: ':marrillianmugic10:', label: "M'arrillian Mugic 10", icon: getAssetPath('img/icons/mugic/marrillian10.png') },
  
  // Mugic icons - Generic
  { code: ':genericmugic:', label: 'Generic Mugic', icon: getAssetPath('img/icons/mugic/generic.png') },
  { code: ':genericmugic0:', label: 'Generic Mugic 0', icon: getAssetPath('img/icons/mugic/generic_0.png') },
  { code: ':genericmugicX:', label: 'Generic Mugic X', icon: getAssetPath('img/icons/mugic/generic_x.png') }
];

const SymbolBar = ({ onSymbolSelect }) => {
  const categories = [
    {
      name: "Elements",
      symbols: CARD_SYMBOLS.slice(0, 4)
    },
    {
      name: "OverWorld",
      symbols: CARD_SYMBOLS.slice(16, 19)
    },
    {
      name: "UnderWorld",
      symbols: CARD_SYMBOLS.slice(19, 22)
    },
    {
      name: "Mipedian",
      symbols: CARD_SYMBOLS.slice(13, 16)
    },
    {
      name: "Danian",
      symbols: CARD_SYMBOLS.slice(4, 7)
    },
    {
      name: "M'arrillian",
      symbols: CARD_SYMBOLS.slice(10, 13)
    },
    {
      name: "Generic",
      symbols: CARD_SYMBOLS.slice(7, 10)
    }
  ];

  const isMobile = window.innerWidth < 1024;

  if (isMobile) {
    return (
      <div className="bg-black rounded-t border-b border-gray-700">
        <div className="flex flex-wrap justify-start gap-1 p-1">
          {CARD_SYMBOLS.map(({ code, label, icon }) => (
            <button
              key={code}
              onClick={() => onSymbolSelect(code)}
            className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              <img 
                src={icon} 
                alt={label}
                className="h-5 w-5 object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Original desktop version
  return (
    <div className="bg-black rounded-t border-b border-gray-700">
      <div className="flex flex-wrap justify-center gap-1 p-1">
        {CARD_SYMBOLS.map(({ code, label, icon }) => (
          <button
            key={code}
            onClick={() => onSymbolSelect(code)}
            className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            <img 
              src={icon} 
              alt={label}
              className="h-5 w-5 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const TextAreaWithSymbols = ({ value, onChange, allowFormatting = true }) => {
  const textareaRef = useRef(null);
  const [forceUpdate, setForceUpdate] = useState({});

  const toggleFormatting = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    // Helper function to unwrap a specific tag
    const unwrapTag = (text, tagToRemove) => {
      const regex = new RegExp(`<${tagToRemove}>(.*?)</${tagToRemove}>`, 'gs');
      return text.replace(regex, (match, content) => content);
    };

    // Helper function to check if text has a specific tag
    const hasTag = (text, tagToCheck) => {
      const regex = new RegExp(`<${tagToCheck}>(.*?)</${tagToCheck}>`, 's');
      return regex.test(text);
    };

    // Check if the current selection has the tag we're toggling
    if (hasTag(selectedText, tag)) {
      // Remove only this specific tag while preserving other formatting
      const newText = unwrapTag(selectedText, tag);
      const updatedText = `${value.substring(0, start)}${newText}${value.substring(end)}`;
      onChange(updatedText);

      // Restore selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + newText.length);
      }, 0);
    } else {
      // Add new tag while preserving existing formatting
      const formattedText = `<${tag}>${selectedText}</${tag}>`;
      const newText = `${value.substring(0, start)}${formattedText}${value.substring(end)}`;
      onChange(newText);

      // Restore selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length);
      }, 0);
    }
  };

  const handleBold = () => toggleFormatting('b');
  const handleItalic = () => toggleFormatting('i');

  // Modified to check for specific tag regardless of nesting
  const checkFormatting = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return false;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 's');
    return regex.test(selectedText);
  };

  const insertSymbol = (symbolCode) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    // Only add a space if we're not at the end of a word/line
    // and the next character isn't already a space or newline
    const needsSpace = afterText.length > 0 && 
                      !afterText.startsWith(' ') && 
                      !afterText.startsWith('\n');
    
    const newValue = `${beforeText}${symbolCode}${needsSpace ? ' ' : ''}${afterText}`;
    const newCursorPos = start + symbolCode.length + (needsSpace ? 1 : 0);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === ':') {
      const start = e.target.selectionStart;
      const beforeText = value.substring(0, start - 1);
      const lastColon = beforeText.lastIndexOf(':');
      
      if (lastColon !== -1) {
        const potentialCode = `:${beforeText.substring(lastColon + 1)}:`;
        const matchingSymbol = CARD_SYMBOLS.find(symbol => symbol.code === potentialCode);
        
        if (matchingSymbol) {
          e.preventDefault();
          const afterText = value.substring(start);
          const spaceAfterSymbol = afterText.startsWith(' ') ? '' : ' ';
          const newValue = value.substring(0, lastColon) + potentialCode + spaceAfterSymbol + afterText;
          onChange(newValue);
        }
      }
    }
  };

  return (
    <div className="flex flex-col rounded border border-gray-700 bg-black hover:border-[#9FE240] focus-within:border-[#9FE240] transition-colors">
      {allowFormatting && (
        <FormattingToolbar 
          onBold={handleBold} 
          onItalic={handleItalic}
          isBold={checkFormatting('b')}
          isItalic={checkFormatting('i')}
        />
      )}
    <textarea 
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      onSelect={() => setForceUpdate({})}
      className="w-full p-2 bg-black text-white h-20 focus:outline-none rounded-t leading-relaxed"
      style={{ letterSpacing: 'normal', whiteSpace: 'pre-wrap' }}
      placeholder="Type : to use symbols (e.g., :fire:) or click icons below to insert"
    />
      <SymbolBar onSymbolSelect={insertSymbol} />
    </div>
  );
};

// Helper function for tick marks
const generateTicks = (min, max, type) => {
  switch(type) {
    case 'stats':
      return [0, 50, 100, 160, 220];
    case 'elements':
      return [0, 10, 25, 35, 50];
    case 'small':
      return [0, 1, 2, 3, 4, 5];
    case 'base':
      return [0, 10, 20, 30, 40, 50];
    default:
      return [min, max];
  }
};

// Round to nearest step
const roundToStep = (value, step) => Math.round(value / step) * step;

// Enhanced Number Slider Component
const NumberSlider = ({ value, onChange, min = 0, max = 4, step = 1, label, type = 'small' }) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const ticks = generateTicks(min, max, type);
  
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const newValue = parseInt(e.target.value) || 0;
  };

  const handleInputBlur = () => {
    let newValue = parseInt(inputValue) || 0;
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    
    if (type === 'stats' || type === 'elements' || type === 'base') {
      newValue = Math.round(newValue / 5) * 5;
    }
    
    setInputValue(newValue.toString());
    onChange({ target: { value: newValue } });
  };

  return (
    <div className="flex items-center gap-2 w-full px-2">
      <label className="w-16 text-right font-bold text-white text-sm whitespace-nowrap">{label}</label>
      <div className="flex-1 mx-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          step={step}
          className="w-full h-3 bg-gray-900 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #9FE240 0%, #9FE240 ${(value/max)*100}%, #333 ${(value/max)*100}%, #333 100%)`
          }}
        />
        <div className="w-full flex justify-between mt-1">
          {ticks.map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div className="h-2 w-px bg-gray-700"></div>
              <span className="text-sm text-white">{num}</span>
            </div>
          ))}
        </div>
      </div>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min={min}
        max={max}
        className="w-14 h-10 text-center border-2 border-gray-700 rounded-lg bg-black text-white focus:border-[#9FE240] focus:outline-none text-lg font-bold"
      />
    </div>
  );
};

// Input Field Component
const InputField = ({ label, type = "text", ...props }) => (
  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
    <label className="font-bold lg:w-24 lg:text-right text-left">{label}</label>
    <input 
      type={type} 
      className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
      {...props}
    />
  </div>
);

// Select Field Component
const SelectField = ({ label, options, ...props }) => (
  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
    <label className="font-bold lg:w-24 lg:text-right text-left">{label}</label>
    <select 
      className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
      {...props}
    >
      <option value="" className="text-gray-500">Select {label}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const ELEMENT_ICONS = {
    fire: {
        creature: getAssetPath('img/icons/fire.png'),
        attack: getAssetPath('img/icons/fire.png')
    },
    air: {
        creature: getAssetPath('img/icons/air.png'),
        attack: getAssetPath('img/icons/air.png')
    },
    earth: {
        creature: getAssetPath('img/icons/earth.png'),
        attack: getAssetPath('img/icons/earth.png')
    },
    water: {
        creature: getAssetPath('img/icons/water.png'),
        attack: getAssetPath('img/icons/water.png')
    }
};


const ElementItem = ({ element, value, onChange, type = 'creature' }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={`${type}-${element}`}
      checked={value > 0}
      onChange={onChange}
      className="w-4 h-4 accent-[#9FE240]"
    />
    <label htmlFor={`${type}-${element}`} className="flex items-center gap-1">
      <img 
        src={ELEMENT_ICONS[element][type]}
        alt={element}  // Simplified alt text
        className="w-5 h-5 object-contain"
        style={{ imageRendering: 'pixelated' }}
      />
      <span className="capitalize">{element}</span>
    </label>
  </div>
);

// Main Form Component
const CardForm = () => {
  const [brainwashed, setBrainwashed] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const [showBatchGenerator, setShowBatchGenerator] = useState(false);
  const [brainwashedText, setBrainwashedText] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [showCopyright, setShowCopyright] = useState(true);
  const [showArtist, setShowArtist] = useState(true);
  const [useBleedTemplates, setUseBleedTemplates] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [canvasRef, setCanvasRef] = useState(null);
  const [name, setName] = useState('');
  const [subname, setSubname] = useState('');
  const [tribe, setTribe] = useState('');
  const [art, setArt] = useState(null);
  const [set, setSet] = useState('');
  const [rarity, setRarity] = useState('');
  const [subtype, setSubtype] = useState('');
  const [ability, setAbility] = useState('');
  const [flavorText, setFlavorText] = useState('');
  const [artist, setArtist] = useState('');
  const [unique, setUnique] = useState(false);
  const [legendary, setLegendary] = useState(false);
  const [loyal, setLoyal] = useState(false);
  const [loyalRestriction, setLoyalRestriction] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);
  const getFormattedSubtype = (type, tribe, subtype, isPast) => {
    if (!tribe) return '';

    const formattedTribe = {
      'overworld': 'OverWorld',
      'underworld': 'UnderWorld',
      'mipedian': 'Mipedian',
      'danian': 'Danian',
      "m'arrillian": "M'arrillian",
      'tribeless': 'Past'
    }[tribe.toLowerCase()];

    // Only add 'Past ' prefix if the tribe is not already tribeless/Past
    const pastPrefix = (isPast && tribe.toLowerCase() !== 'tribeless') ? 'Past ' : '';
    return `${type.charAt(0).toUpperCase() + type.slice(1)} - ${pastPrefix}${formattedTribe}${subtype ? ` ${subtype}` : ''}`;
  };
  const [stats, setStats] = useState({
    energy: 0,
    courage: 0,
    power: 0,
    wisdom: 0,
    speed: 0,
    mugic: 0
  });
  const [elements, setElements] = useState({
    fire: null,
    air: null,
    earth: null,
    water: null
  });
  const [loadedIcons, setLoadedIcons] = useState({});
const resetForm = () => {
  setName('');
  setSubname('');
  setTribe('');
  setArt(null);
  setSet('');
  setRarity('');
  setSubtype('');
  setAbility('');
  setFlavorText('');
  setArtist('');
  setUnique(false);
  setLegendary(false);
  setLoyal(false);
  setLoyalRestriction('');
  setStats({
    energy: 0,
    courage: 0,
    power: 0,
    wisdom: 0,
    speed: 0,
    mugic: 0
  });
  setElements({
    fire: null,
    air: null,
    earth: null,
    water: null
  });
  setBuildPoints(0);
  setMugicCost(0);
  setBase(0);
  setSerialNumber('');
  setShowCopyright(true);
setShowArtist(true);
  setBrainwashedText('');
};

  // Function to determine if card type can have legendary/loyal properties
  const canHaveSpecialProperties = (type) => {
    return type === 'creature' || type === 'battlegear';
  };

  // Add the loadImageFromUrl function right here
  const loadImageFromUrl = async (url) => {
    if (!url) return null;
    
    try {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Convert image to File object
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            const fileName = url.split('/').pop() || 'card-image.jpg';
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            resolve(file);
          }, 'image/jpeg');
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
      });
    } catch (err) {
      console.error('Error loading image:', err);
      return null;
    }
  };
  
  // Add useEffect to preload icons
  useEffect(() => {
    const preloadIcons = async () => {
      const loadedImages = {};
      for (const [element, { path }] of Object.entries(ELEMENT_ICONS)) {
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = path;
          });
          loadedImages[element] = true;
        } catch (error) {
          console.error(`Failed to load ${element} icon:`, error);
          loadedImages[element] = false;
        }
      }
      setLoadedIcons(loadedImages);
    };
    preloadIcons();
  }, []);

  const [buildPoints, setBuildPoints] = useState(0);
  const [mugicCost, setMugicCost] = useState(0);
  const [base, setBase] = useState(0);

// Keep your existing download function
const handleDownload = () => {
  const previewCanvas = document.querySelector('#preview-canvas');
  if (previewCanvas) {
    console.log('Canvas for download:', previewCanvas);
    const filename = name ? 
      `${name}${subname ? `, ${subname}` : ''}.png` : 
      'card.png';
    CardCreator.downloadCard(previewCanvas, filename);
  }
};

// handleBleedDownload function with fix for brainwashed templates
const handleBleedDownload = async () => {
  const previewCanvas = document.querySelector('#preview-canvas');
  if (!previewCanvas) return;
  
  try {
    // Get the standard card canvas
    const standardCard = previewCanvas;
    console.log(`Standard card dimensions: ${standardCard.width}x${standardCard.height}`);
    
    // Create a new canvas for the bleed version
    const bleedCanvas = document.createElement('canvas');
    const bleedCtx = bleedCanvas.getContext('2d');
    
    // Determine which border frame to use based on tribe and brainwashed status
    let borderPath;
    if (selectedType === 'creature' && tribe) {
      // Check if this is a brainwashed creature
      if (brainwashed) {
        // Use brainwashed-specific border for creatures
        borderPath = getAssetPath(`img/template/bleed/${tribe.toLowerCase()}bw.png`);
        console.log('Loading brainwashed bleed border from:', borderPath);
      } else {
        // Use tribe-specific border for normal creatures
        borderPath = getAssetPath(`img/template/bleed/${tribe.toLowerCase()}.png`);
        console.log('Loading normal creature bleed border from:', borderPath);
      }
    } else if (selectedType === 'mugic' && tribe) {
      // For mugic cards, we need to maintain the mugic subdirectory
      borderPath = getAssetPath(`img/template/bleed/mugic/${tribe.toLowerCase()}.png`);
      console.log('Loading mugic bleed border from:', borderPath);
    } else {
      // Use a type-specific border for non-creatures (attack, battlegear, etc.)
      borderPath = getAssetPath(`img/template/bleed/${selectedType.toLowerCase()}.png`);
      console.log('Loading type-specific bleed border from:', borderPath);
    }
    
    // Load the border frame image
    const borderImg = new Image();
    borderImg.crossOrigin = 'anonymous';
    
    // Wait for the border image to load
    await new Promise((resolve, reject) => {
      borderImg.onload = () => {
        console.log(`Border image loaded: ${borderImg.width}x${borderImg.height}`);
        resolve();
      };
      
      borderImg.onerror = (err) => {
        console.error('Failed to load border image:', err);
        // Try a fallback to a generic border
        const fallbackPath = getAssetPath('img/template/bleed/border.png');
        console.log('Trying fallback path:', fallbackPath);
        borderImg.src = fallbackPath;
        borderImg.onload = resolve;
        borderImg.onerror = reject;
      };
      
      borderImg.src = borderPath;
    });
    
    // Set the canvas size to the border image size
    bleedCanvas.width = borderImg.width;
    bleedCanvas.height = borderImg.height;
    
    // Fill with white background
    bleedCtx.fillStyle = '#ffffff';
    bleedCtx.fillRect(0, 0, bleedCanvas.width, bleedCanvas.height);
    
    // Fine-tuned parameters based on your feedback
    const scaleFactor = 0.949798; // Your specified value that works for scaling
    
    // Adjust the position - positive X moves right, negative Y moves up
    const offsetXAdjust = 1.28;    // Move 2px to the right
    const offsetYAdjust = -3.95;   // Move 2px up
    
    // Calculate base scale to fill the border
    const scaleX = borderImg.width / standardCard.width;
    const scaleY = borderImg.height / standardCard.height;
    const baseScale = Math.min(scaleX, scaleY);
    
    // Apply the scaling adjustment
    const finalScale = baseScale * scaleFactor;
    
    // Calculate the dimensions after scaling
    const scaledWidth = standardCard.width * finalScale;
    const scaledHeight = standardCard.height * finalScale;
    
    // Center the card in the border with the position adjustments
    const centerX = (borderImg.width - scaledWidth) / 2 + offsetXAdjust;
    const centerY = (borderImg.height - scaledHeight) / 2 + offsetYAdjust;
    
    // Draw the scaled card first
    bleedCtx.drawImage(
      standardCard, 
      0, 0, standardCard.width, standardCard.height, // Source rectangle
      centerX, centerY, scaledWidth, scaledHeight     // Destination rectangle (scaled)
    );
    
    // Then draw the border on top
    bleedCtx.drawImage(borderImg, 0, 0, bleedCanvas.width, bleedCanvas.height);
    
    // Log the settings for debugging
    console.log(`Using scale factor: ${scaleFactor}, Final scale: ${finalScale.toFixed(3)}`);
    console.log(`Card position: ${centerX.toFixed(1)},${centerY.toFixed(1)} with size ${scaledWidth.toFixed(1)}x${scaledHeight.toFixed(1)}`);
    
    // Create filename
    const filename = name ? 
      `${name}${subname ? `, ${subname}` : ''}_bleed.png` : 
      'card_bleed.png';
    
    // Download the bleed card
    CardCreator.downloadCard(bleedCanvas, filename);
    
    console.log('Bleed card created and downloaded successfully');
    
  } catch (error) {
    console.error('Error creating bleed card:', error);
    
    // Try a simpler approach as fallback
    try {
      const previewCanvas = document.querySelector('#preview-canvas');
      if (previewCanvas) {
        const filename = name ? 
          `${name}${subname ? `, ${subname}` : ''}_bleed.png` : 
          'card_bleed.png';
        CardCreator.downloadCard(previewCanvas, filename);
        alert('Used standard card as fallback (bleed border not available)');
      }
    } catch (fallbackError) {
      alert('Error creating bleed card. Check console for details.');
    }
  }
};

return (
<div className="container mx-auto flex flex-col lg:flex-row gap-0 p-2 lg:p-4 min-h-screen w-full max-w-none">
  <div className="w-full lg:w-1/2 bg-black text-white flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">

      {/* Card Type Selection */}
      <div className="p-4 border border-gray-700 rounded-lg bg-black">
        <div className="flex justify-center items-center gap-4">
          <label htmlFor="type" className="font-bold">Card Type</label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => {
              const newType = e.target.value;
              setSelectedType(newType);
              resetForm();
              // Reset related states when changing card type
              setTribe('');
              setElements({
                fire: 0,
                air: 0,
                earth: 0,
                water: 0
              });
              // Reset other relevant states
              setStats({
                energy: 0,
                courage: 0,
                power: 0,
                wisdom: 0,
                speed: 0,
                mugic: 0
              });
              setBuildPoints(0);
              setMugicCost(0);
              setBase(0);
            }}
            className="w-48 p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
          >
            <option value="" className="text-gray-500">Select Card Type</option>
            <option value="creature">Creature</option>
            <option value="attack">Attack</option>
            <option value="battlegear">Battlegear</option>
            <option value="mugic">Mugic</option>
            <option value="location">Location</option>
          </select>
        </div>
      </div>

{selectedType === 'creature' && (
  <div className="p-4 border border-gray-700 rounded-lg bg-black">
    <CreatureSelector
      onSelectCreature={(creatureId, loyalRestriction) => {
        const cardData = getCreatureById(creatureId);
        if (!cardData) return;
        
        // Get brainwashed text
        const hasBrainwashedText = cardData.brainwashedText && cardData.brainwashedText.trim().length > 0;
        
        // Set basic card information
        setName(cardData.name || '');
        setSubname(cardData.subname || '');
        setTribe(cardData.tribe?.toLowerCase() || '');
        setSet(cardData.set?.toLowerCase() || '');
        setRarity(cardData.rarity || '');
        setSubtype(cardData.subtype || '');
        setAbility(cardData.ability || '');
        setFlavorText(cardData.flavorText || '');
        setBrainwashedText(cardData.brainwashedText || '');
        
        // Infer brainwashed state from either explicit flag or presence of brainwashed text
        setBrainwashed(cardData.brainwashed || hasBrainwashedText);
        
        // If inferred as brainwashed, make sure to hide incompatible properties
        if (cardData.brainwashed || hasBrainwashedText) {
          setUnique(false);
          setLegendary(false);
          setLoyal(false);
          // Optionally clear flavor text as well since it's not shown for brainwashed creatures
          setFlavorText('');
        } else {
          setUnique(cardData.unique || false);
          setLegendary(cardData.legendary || false);
          setLoyal(cardData.loyal || false);
        }
        
        // Use the provided loyalRestriction if the creature is loyal
        if (cardData.loyal) {
          setLoyalRestriction(cardData.loyalRestriction || loyalRestriction || '');
        } else {
          setLoyalRestriction('');
        }
        
        setArtist(cardData.artist || '');
        setSerialNumber(cardData.serialNumber || '');
        
        // Set stats
        setStats({
          energy: cardData.stats.energy || 0,
          courage: cardData.stats.courage || 0,
          power: cardData.stats.power || 0,
          wisdom: cardData.stats.wisdom || 0,
          speed: cardData.stats.speed || 0,
          mugic: cardData.stats.mugic || 0
        });
        
        // Set elements
        setElements({
          fire: cardData.elements.fire || 0,
          air: cardData.elements.air || 0,
          earth: cardData.elements.earth || 0,
          water: cardData.elements.water || 0
        });
        
        // Load image if available
        if (cardData.imageUrl) {
          loadImageFromUrl(cardData.imageUrl)
            .then(imageFile => {
              if (imageFile) {
                setArt(imageFile);
              }
            })
            .catch(err => {
              console.error('Failed to load image:', err);
            });
        }
        
        // Set Past flag based on isPast property only
        setIsPast(!!cardData.isPast);

        // Then, create a sequence of re-renders with increasing delays
        setTimeout(() => {
          setForceUpdate(prev => !prev);
          
          // Second re-render after a longer delay
          setTimeout(() => {
            setForceUpdate(prev => !prev);
          }, 300);
        }, 100);
      }}
    />
  </div>
)}

      {selectedType && (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
            {/* Tribe Selection */}
{selectedType === 'creature' && (
  <div className="space-y-4">
    <div>
      <SelectField
        label="Tribe"
        value={tribe}
        onChange={(e) => setTribe(e.target.value)}
        options={[
          { value: 'overworld', label: 'OverWorld' },
          { value: 'underworld', label: 'UnderWorld' },
          { value: 'mipedian', label: 'Mipedian' },
          { value: 'danian', label: 'Danian' },
          { value: "m'arrillian", label: "M'arrillian" },
          { value: 'tribeless', label: 'Tribeless' },
          { value: 'mipedianow', label: 'Mipedian OverWorld' }
        ]}
      />
    </div>
  </div>
)}
    {/* Tribe for Mugic */}
    {selectedType === 'mugic' && (
      <SelectField
        label="Tribe"
        value={tribe}
        onChange={(e) => setTribe(e.target.value)}
        options={[
          { value: 'overworld', label: 'OverWorld' },
          { value: 'underworld', label: 'UnderWorld' },
          { value: 'mipedian', label: 'Mipedian' },
          { value: 'danian', label: 'Danian' },
          { value: "m'arrillian", label: "M'arrillian" },
          { value: 'generic', label: 'Generic' }
        ]}
      />
    )}

        <div className="flex items-center gap-4">
          <label className="w-24 text-right font-bold">Art</label>
          <div className="flex-1 overflow-hidden">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setArt(e.target.files[0])}
              className="w-full max-w-[calc(100vw-8rem)] lg:max-w-none"
            />
          </div>
        </div>
            <InputField 
              label="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            {['creature'].includes(selectedType) && (
            <InputField 
              label="Subname" 
              value={subname}
              onChange={(e) => setSubname(e.target.value)}
            />
          )}

            <SelectField
              label="Set"
              value={set}
              onChange={(e) => setSet(e.target.value)}
              options={[
                { value: 'dop', label: 'Dawn Of Perim' },
                { value: 'zoth', label: 'Zenith of the Hive' },
                { value: 'ss', label: 'Silent Sands' },
                { value: 'btd', label: "Beyond the Doors" },
                { value: 'roto', label: 'Rise of the Oligarch' },
                { value: 'tott', label: 'Turn of the Tide' },
                { value: 'fun', label: 'Forged Unity' },
                { value: 'au', label: 'Alliances Unraveled' },
                { value: 'fas', label: 'Fire and Stone' },
                { value: 'op', label: 'Organized Play' }
              ]}
            />

            <SelectField
              label="Rarity"
              value={rarity}
              onChange={(e) => setRarity(e.target.value)}
              options={[
                { value: 'promo', label: 'Promo' },
                { value: 'ultra rare', label: 'Ultra Rare' },
                { value: 'super rare', label: 'Super Rare' },
                { value: 'rare', label: 'Rare' },
                { value: 'uncommon', label: 'Uncommon' },
                { value: 'common', label: 'Common' }
              ]}
            />

{selectedType === 'creature' && tribe && (
  <InputField 
    label="Subtype" 
    value={subtype}
    onChange={(e) => setSubtype(e.target.value)}
    placeholder={getFormattedSubtype(selectedType, tribe, '', isPast) + ' [your input]'}
  />
)}
{selectedType === 'creature' && tribe && (
  <div className="flex justify-center items-center gap-8">
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="brainwashed"
        checked={brainwashed}
        onChange={(e) => {
          setBrainwashed(e.target.checked);
          if (e.target.checked) {
            setUnique(false);
            setLegendary(false);
            setLoyal(false);
            setFlavorText('');
          }
        }}
        className="w-4 h-4 accent-[#9FE240]"
      />
      <label htmlFor="brainwashed" className="text-white">Brainwashed</label>
    </div>
    
    {/* Always show the Past checkbox, regardless of tribe */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="past"
        checked={isPast}
        onChange={(e) => setIsPast(e.target.checked)}
        className="w-4 h-4 accent-[#9FE240]"
      />
      <label htmlFor="past" className="text-white">Past</label>
    </div>
  </div>
)}

<div className="space-y-4 rounded-lg bg-black">
  {/* Ability Section */}
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="font-bold">Ability</label>
      <span className={`text-sm ${ability.length > 350 ? 'text-red-500' : 'text-gray-400'}`}>
        {350 - ability.length} characters remaining
      </span>
    </div>
    <TextAreaWithSymbols 
      value={ability}
      onChange={(newValue) => {
        if (newValue.length <= 350) {
          setAbility(newValue);
        }
      }}
    />
  </div>

  {/* Brainwashed Text - Only show if brainwashed is checked */}
  {brainwashed && selectedType === 'creature' && (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-bold">Brainwashed</label>
        <span className={`text-sm ${brainwashedText.length > 350 ? 'text-red-500' : 'text-gray-400'}`}>
          {350 - brainwashedText.length} characters remaining
        </span>
      </div>
      <TextAreaWithSymbols 
        value={brainwashedText}
        onChange={(newValue) => {
          if (newValue.length <= 350) {
            setBrainwashedText(newValue);
          }
        }}
        allowFormatting={false}  // Disable formatting for brainwashed text
      />
    </div>
  )}

  {/* Flavor Text - Only show if NOT brainwashed */}
{!brainwashed && ['creature', 'location', 'mugic', 'battlegear'].includes(selectedType) && (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="font-bold">Flavor Text</label>
      <span className={`text-sm ${flavorText.length > 200 ? 'text-red-500' : 'text-gray-400'}`}>
        {200 - flavorText.length} characters remaining
      </span>
    </div>
    <div className="border border-gray-700 rounded bg-black hover:border-[#9FE240] focus-within:border-[#9FE240] transition-colors">
    <div className="flex gap-2 p-2 border-b border-gray-700">
      <button
        onClick={() => {
          const textarea = document.querySelector('textarea[name="flavorText"]');
          if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = flavorText.slice(0, start) + '—' + flavorText.slice(end);
            if (newValue.length <= 200) {
              setFlavorText(newValue);
              setTimeout(() => {
                textarea.focus();
                textarea.selectionStart = textarea.selectionEnd = start + 1;
              }, 0);
            }
          }
        }}
        className="px-3 py-1 rounded transition-colors bg-gray-800 hover:bg-gray-700 text-white relative top-[1px]"
        title="Em Dash"
      >
        —
      </button>
    </div>
      <textarea 
        name="flavorText"
        value={flavorText}
        onChange={(e) => {
          if (e.target.value.length <= 200) {
            setFlavorText(e.target.value);
          }
        }}
        className="w-full p-2 bg-black text-white h-16 focus:outline-none rounded-b" 
        style={{ whiteSpace: 'pre-wrap' }}
      />
    </div>
  </div>
)}

  {/* Elements Section */}
  {selectedType === 'creature' && (
    <div className="pt-0 border-gray-700">
      <div className="flex justify-around items-center w-full">
        {Object.entries(elements).map(([element, value]) => (
          <ElementItem
            key={element}
            element={element}
            value={value}
            onChange={(e) => setElements(prev => ({
              ...prev,
              [element]: e.target.checked ? 1 : 0
            }))}
          />
        ))}
      </div>
    </div>
  )}

{/* Card Properties (Only show if not brainwashed and is creature/battlegear) */}
{!brainwashed && ['creature', 'battlegear'].includes(selectedType) && (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-0 border-gray-700">
        <div className="flex items-center gap-2">
            <label className="font-bold">Unique</label>
            <input 
                type="checkbox" 
                checked={unique}
                onChange={(e) => setUnique(e.target.checked)}
                className="w-4 h-4 accent-[#9FE240]" 
            />
        </div>
        
        <div className="flex items-center gap-2">
            <label className="font-bold">Legendary</label>
            <input 
                type="checkbox" 
                checked={legendary}
                onChange={(e) => setLegendary(e.target.checked)}
                className="w-4 h-4 accent-[#9FE240]" 
            />
        </div>
        
        <div className="flex items-center gap-2">
            <label className="font-bold">Loyal</label>
            <input 
                type="checkbox" 
                checked={loyal}
                onChange={(e) => setLoyal(e.target.checked)}
                className="w-4 h-4 accent-[#9FE240]" 
            />
            <input 
                type="text" 
                value={loyalRestriction}
                onChange={(e) => setLoyalRestriction(e.target.value)}
                className="w-32 p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none" 
                placeholder="Restriction" 
            />
        </div>
    </div>
)}
</div>

<div className="flex flex-wrap items-center justify-center gap-10 pt-0 border-gray-700">
    {['attack', 'mugic', 'location'].includes(selectedType) && (
        <div className="flex items-center gap-2">
            <label className="font-bold">Unique</label>
            <input 
                type="checkbox" 
                checked={unique}
                onChange={(e) => setUnique(e.target.checked)}
                className="w-4 h-4 accent-[#9FE240]" 
            />
        </div>
    )}
    
<div className="flex flex-col gap-1">
    <div className="flex items-center gap-2">
        <label className="font-bold">Artist</label>
        <input 
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
            className="w-48 p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
        />
    </div>
    <div className="flex items-center gap-2 ml-2">
        <input 
            type="checkbox" 
            id="show-artist"
            checked={showArtist}
            onChange={(e) => setShowArtist(e.target.checked)}
            className="w-4 h-4 accent-[#9FE240]" 
        />
        <label htmlFor="show-artist" className="text-sm text-gray-300">Show artist line</label>
    </div>
</div>

<div className="flex flex-col gap-1">
    <div className="flex items-center gap-2">
        <label className="font-bold">Serial #</label>
        <input 
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="##/100"
            className="w-20 p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
        />
    </div>
    <div className="flex items-center gap-2 ml-2">
        <input 
            type="checkbox" 
            id="show-copyright"
            checked={showCopyright}
            onChange={(e) => setShowCopyright(e.target.checked)}
            className="w-4 h-4 accent-[#9FE240]" 
        />
        <label htmlFor="show-copyright" className="text-sm text-gray-300">Show copyright line</label>
    </div>
</div>
</div>
          </div>

          {/* Stats Sections */}
{selectedType === 'attack' && (
  <div className="space-y-6">
    <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
      {/* Element icons for Attack */}
      <div className="flex justify-around items-center w-full">
        {Object.entries(elements).map(([element, value]) => (
          <ElementItem
            key={element}
            element={element}
            value={value}
            onChange={(e) => setElements(prev => ({
              ...prev,
              [element]: e.target.checked ? 5 : 0
            }))}
            type="attack"
          />
        ))}
      </div>

      {/* Stats sliders for Attack */}
      <div className="space-y-4">
        <NumberSlider
          label="Base"
          value={base !== undefined ? base : 0}
          onChange={(e) => setBase(parseInt(e.target.value) || 0)}
          min={0}
          max={50}
          step={5}
          type="base"
        />
        {Object.entries(elements).map(([element, value]) => (
          <div key={element} style={{ display: value > 0 ? 'block' : 'none' }}>
            <NumberSlider
              label={element.charAt(0).toUpperCase() + element.slice(1)}
              value={value}
              onChange={(e) => setElements(prev => ({
                ...prev,
                [element]: parseInt(e.target.value)
              }))}
              min={0}
              max={50}
              step={5}
              type="elements"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)}
          </div>
        )}

{/* Download Buttons for Non-Attack Cards */}
{selectedType && selectedType !== 'attack' && (
  <div className="flex justify-center gap-4 mt-5">
    <button 
      onClick={handleDownload}
      className="px-6 py-2 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors"
    >
      Download Standard
    </button>
    <button 
      onClick={handleBleedDownload}
      className="px-6 py-2 bg-[#FF9933] text-black font-bold rounded hover:bg-[#FF8822] transition-colors"
    >
      Download with Bleed
    </button>
  </div>
)}
      </div>
    </div>
<div className="w-full lg:w-1/2 flex flex-col h-full lg:ml-5">
  <div className="flex items-start justify-start">
    <CardPreview 
      cardData={{
        selectedType,
        tribe,
        art,
        name,
        subname,
        set,
        rarity,
        subtype,
        ability,
        flavorText,
        unique,
        legendary,
        artist,
        loyal,
        loyalRestriction,
        stats,
        elements,
        buildPoints,
        base,
        mugicCost,
        serialNumber,
        brainwashed,
        brainwashedText,
        past: isPast,
        showCopyright,
        showArtist,
        useBleedTemplates: true
      }} 
    />
  </div>

{/* Build Points section with Download Buttons */}
{selectedType === 'attack' && (
  <div className="max-w-[620px] w-full space-y-4 mt-5">
    <div className="bg-black border border-gray-700 rounded-lg p-4">
      <NumberSlider
        label="Build Points"
        value={buildPoints}
        onChange={(e) => setBuildPoints(parseInt(e.target.value))}
        max={5}
        type="small"
      />
    </div>
    <div className="flex justify-center gap-4">
      <button 
        onClick={handleDownload}
        className="px-6 py-2 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors"
      >
        Download Standard
      </button>
      <button 
        onClick={handleBleedDownload}
        className="px-6 py-2 bg-[#FF9933] text-black font-bold rounded hover:bg-[#FF8822] transition-colors"
      >
        Download with Bleed
      </button>
    </div>
  </div>
)}

{/* Stats Section - Mobile Only */}
<div className="lg:hidden flex flex-col mb-20">
  {selectedType === 'creature' && (
    <div className="w-full bg-black border border-gray-700 rounded-lg mb-4">
      <div className="grid grid-cols-1 gap-0 p-2">
        {Object.entries(stats).map(([stat, value]) => (
          <NumberSlider
            key={stat}
            label={stat.charAt(0).toUpperCase() + stat.slice(1)}
            value={value}
            onChange={(e) => setStats(prev => ({
              ...prev,
              [stat]: parseInt(e.target.value)
            }))}
            max={stat === 'mugic' ? 5 : 220}
            step={stat === 'mugic' ? 1 : 5}
            type={stat === 'mugic' ? 'small' : 'stats'}
          />
        ))}
      </div>
    </div>
  )}

</div>

{/* Stats Section - Desktop Only */}
<div className="hidden lg:block">
  {selectedType === 'creature' && (
    <div className="max-w-[620px] w-full bg-black border border-gray-700 rounded-lg mt-5">
      <div className="grid grid-cols-1 gap-0 p-2">
        {Object.entries(stats).map(([stat, value]) => (
          <NumberSlider
            key={stat}
            label={stat.charAt(0).toUpperCase() + stat.slice(1)}
            value={value}
            onChange={(e) => setStats(prev => ({
              ...prev,
              [stat]: parseInt(e.target.value)
            }))}
            max={stat === 'mugic' ? 5 : 220}
            step={stat === 'mugic' ? 1 : 5}
            type={stat === 'mugic' ? 'small' : 'stats'}
          />
        ))}
      </div>
    </div>
  )}

</div>
</div>

{/* Download Buttons - Mobile Only */}
<div className="lg:hidden sticky bottom-0 w-full bg-black p-4 border-t border-gray-700">
  <div className="flex gap-2">
    <button
      onClick={handleDownload}
      className="w-1/2 px-6 py-2 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors"
    >
      Standard
    </button>
    <button
      onClick={handleBleedDownload}
      className="w-1/2 px-6 py-2 bg-[#FF9933] text-black font-bold rounded hover:bg-[#FF8822] transition-colors"
    >
      With Bleed
    </button>
  </div>
</div>

</div>
);
};

export default CardForm;