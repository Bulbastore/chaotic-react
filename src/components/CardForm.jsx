import { useState, useEffect, useRef } from 'react';
import CardPreview from './CardPreview';
import { CardCreator } from './cardCreator';
import { getAssetPath } from './assetPaths';
import FormattingToolbar from './FormattingToolbar';
import CreatureSelector from './CreatureSelector';
import { getCreatureById } from './CreatureDatabase';
import BatchGeneratorUI from './BatchGeneratorUI';
import { urlToFile, loadAndCacheImage } from './imageCache';
import AttackSelector from './AttackSelector';
import BattlegearSelector from './BattlegearSelector';
import MugicSelector from './MugicSelector';
import LocationSelector from './LocationSelector';
import PhotoshopColorPicker from './PhotoshopColorPicker';
import CustomTribeLogoUploader from './CustomTribeLogoUploader';
import CardArtPositioner from './CardArtPositioner';

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
      <div className="flex flex-wrap justify-center gap-[2px] p-1">
        {CARD_SYMBOLS.map(({ code, label, icon }) => (
          <button
            key={code}
            onClick={() => onSymbolSelect(code)}
            className="p-[3px] bg-gray-200 rounded hover:bg-gray-300 transition-colors"
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

const LoadingIndicator = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-lg pointer-events-none">
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 border-4 border-[#9FE240] border-t-transparent rounded-full animate-spin"></div>
      <div className="mt-3 text-[#9FE240] font-bold text-lg animate-pulse">Loading...</div>
    </div>
  </div>
);

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

// Enhanced Number Slider Component with value-based coloring
const NumberSlider = ({ value, onChange, min = 0, max = 4, step = 1, label, type = 'small', useOrangeColor = false }) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const ticks = generateTicks(min, max, type);
  
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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

  // Convert to numbers for comparison
  const numValue = parseInt(value) || 0;
  const numMax = parseInt(max) || 1;
  
  // Use orange in two cases:
  // 1. If the useOrangeColor flag is true (from preset dropdown)
  // 2. OR if this specific value is at its maximum (for random selection cases)
  const isAtMax = numValue === numMax;
  const shouldUseOrange = (useOrangeColor || isAtMax) && type !== 'small';
  const sliderColor = shouldUseOrange ? '#FF9933' : '#9FE240';
  
  // Calculate percentage for gradient
  const percentage = (numValue / numMax) * 100;

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
            background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${percentage}%, #333 ${percentage}%, #333 100%)`
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
      checked={type === 'attack' ? value !== null : value === 1}
      onChange={(e) => {
        if (type === 'attack') {
          onChange({
            target: {
              value: e.target.checked ? 5 : null
            }
          });
        } else {
          // For creatures - simplified to directly update the state
          onChange(element, e.target.checked ? 1 : 0);
        }
      }}
      className="w-4 h-4 accent-[#9FE240]"
    />
    <label htmlFor={`${type}-${element}`} className="flex items-center gap-1">
      <img 
        src={ELEMENT_ICONS[element][type]}
        alt={element}
        className="w-5 h-5 object-contain"
        style={{ imageRendering: 'pixelated' }}
      />
      <span className="capitalize">{element}</span>
    </label>
  </div>
);

// Main Form Component
const CardForm = () => {
  const [tribeLogo, setTribeLogo] = useState(null);
  const [customColor, setCustomColor] = useState({ h: 0, s: 0.5, l: 0.5 });
  const [brainwashed, setBrainwashed] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const [showBatchGenerator, setShowBatchGenerator] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brainwashedText, setBrainwashedText] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [showCopyright, setShowCopyright] = useState(true);
  const [showArtist, setShowArtist] = useState(true);
  const [statsPreset, setStatsPreset] = useState('mid');
  const [isFromDatabase, setIsFromDatabase] = useState(false);
  const [originalMaxStats, setOriginalMaxStats] = useState({
    energy: 0,
    courage: 0,
    power: 0,
    wisdom: 0,
    speed: 0,
    mugic: 0
  });
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
  const [initiative, setInitiative] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [useOrangeSliders, setUseOrangeSliders] = useState(false);
  const [artPosition, setArtPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const isMobileBrowser = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  const getFormattedSubtype = (type, tribe, subtype, isPast) => {
    if (!tribe) return '';

    const formattedTribe = {
      'overworld': 'OverWorld',
      'underworld': 'UnderWorld',
      'mipedian': 'Mipedian',
      'danian': 'Danian',
      "m'arrillian": "M'arrillian",
      'tribeless': 'Past',
      'panivian': 'Panivian',
      'umbrian': 'Umbrian',
      'frozen': 'Frozen',
      'custom': 'Custom'
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
  setInitiative(0);
  setSerialNumber('');
  setShowCopyright(true);
setShowArtist(true);
  setBrainwashedText('');
};

const adjustStatsBasedOnPreset = (maxStats, preset) => {
  if (!maxStats) return maxStats;
  
  const adjustedStats = { ...maxStats };
  
  switch (preset) {
    case 'max':
      // Return the original max stats directly
      return { ...maxStats };
    case 'mid':
      // For mid: -10 to courage/power/wisdom/speed, -5 to energy from max
      adjustedStats.courage = Math.max(0, maxStats.courage - 10);
      adjustedStats.power = Math.max(0, maxStats.power - 10);
      adjustedStats.wisdom = Math.max(0, maxStats.wisdom - 10);
      adjustedStats.speed = Math.max(0, maxStats.speed - 10);
      adjustedStats.energy = Math.max(0, maxStats.energy - 5);
      return adjustedStats;
    case 'min':
      // For min: -20 to courage/power/wisdom/speed, -10 to energy from max
      adjustedStats.courage = Math.max(0, maxStats.courage - 20);
      adjustedStats.power = Math.max(0, maxStats.power - 20);
      adjustedStats.wisdom = Math.max(0, maxStats.wisdom - 20);
      adjustedStats.speed = Math.max(0, maxStats.speed - 20);
      adjustedStats.energy = Math.max(0, maxStats.energy - 10);
      return adjustedStats;
    default:
      return { ...maxStats };
  }
};

// Modified version of generateRandomStats with significantly reduced probabilities
const generateRandomStats = (maxStats) => {
  const result = { ...maxStats };
  
  // Define combat stats (excluding energy, which has special handling)
  const combatStats = ['courage', 'power', 'wisdom', 'speed'];
  
  // Individual probability for each combat stat to be max (5%)
  const combatMaxProbability = 0.05;
  
  // Higher probability for energy to be max (10%)
  const energyMaxProbability = 0.10;
  
  // Special handling for multi-max probability
  // This determines if we'll try to generate a multi-max card
  const multiMaxRoll = Math.random();
  let forcedMaxCount = 0;
  
  // Much more restrained distribution of multi-max cards:
  // ~0.1% chance of 4 max stats (1 in 1000 rolls)
  // ~0.5% chance of 3 max stats (1 in 200 rolls)
  // ~2% chance of 2 max stats (1 in 50 rolls)
  if (multiMaxRoll < 0.001) {
    // Force 4 max stats (extremely rare)
    forcedMaxCount = 4;
  } else if (multiMaxRoll < 0.006) {
    // Force 3 max stats (very rare)
    forcedMaxCount = 3;
  } else if (multiMaxRoll < 0.026) {
    // Force 2 max stats (rare)
    forcedMaxCount = 2;
  }
  
  // If we're forcing multiple max stats, randomly select which ones
  let statsToMax = [];
  if (forcedMaxCount > 0) {
    // Create a copy of combatStats and shuffle it
    const shuffledStats = [...combatStats].sort(() => Math.random() - 0.5);
    // Take the first N stats to max
    statsToMax = shuffledStats.slice(0, forcedMaxCount);
    
    // 30% chance to include energy in the maxed stats if we're doing multi-max
    if (Math.random() < 0.3) {
      statsToMax.push('energy');
      // If we already selected all combat stats, remove one to maintain the count
      if (statsToMax.length > forcedMaxCount) {
        statsToMax.pop();
      }
    }
  }
  
  // Handle combat stats
  combatStats.forEach(stat => {
    // Max this stat if it's in our forced list OR if we roll the individual probability
    if (statsToMax.includes(stat) || Math.random() < combatMaxProbability) {
      // Set to max value
      result[stat] = maxStats[stat];
    } else {
      // For non-maxed stats, use a more balanced distribution
      const minValue = maxStats[stat] - 20;
      
      // Random number between 0 and 1, with moderate skew toward higher values
      const skewedRandom = Math.pow(Math.random(), 0.85); // Less aggressive skew
      
      // Calculate value between min and max, with skew toward max
      let randomValue = Math.round(minValue + (maxStats[stat] - minValue) * skewedRandom);
      
      // Round to nearest 5
      randomValue = Math.round(randomValue / 5) * 5;
      
      result[stat] = randomValue;
    }
  });
  
  // Handle energy separately with higher max probability
  if (statsToMax.includes('energy') || Math.random() < energyMaxProbability) {
    result.energy = maxStats.energy;
  } else {
    const minValue = maxStats.energy - 10;
    const skewedRandom = Math.pow(Math.random(), 0.85);
    let randomValue = Math.round(minValue + (maxStats.energy - minValue) * skewedRandom);
    
    // Round if needed
    if (randomValue >= 25) {
      randomValue = Math.round(randomValue / 5) * 5;
    }
    
    result.energy = randomValue;
  }
  
  // Mugic never changes from its initial value
  result.mugic = maxStats.mugic;
  
  return result;
};

  // Function to determine if card type can have legendary/loyal properties
  const canHaveSpecialProperties = (type) => {
    return type === 'creature' || type === 'battlegear';
  };

  // Add the loadImageFromUrl function right here
  const loadImageFromUrl = async (url) => {
    if (!url) return null;
    return urlToFile(url);
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
    
    if (isMobileBrowser()) {
      // For mobile devices, create an anchor to open image in new tab
      previewCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // Open in new tab
        link.click();
        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, 'image/png');
    } else {
      // Use normal download for desktop
      CardCreator.downloadCard(previewCanvas, filename);
    }
  }
};

// Simple fix for handleBleedDownload function
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
    
    // DOWNLOAD ONLY ONCE - Choose correct method based on device type
    if (isMobileBrowser()) {
      // For mobile devices
      bleedCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // Open in new tab
        link.click();
        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, 'image/png');
    } else {
      // Use normal download for desktop
      CardCreator.downloadCard(bleedCanvas, filename);
    }
    
    // REMOVE THE SECOND DOWNLOAD OPERATION THAT WAS HERE
    
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
  // Added a max-width container that centers the content
  <div className="mx-auto flex flex-col lg:flex-row gap-0 p-2 lg:p-4 max-w-6xl">
    {/* Form Section - fixed width on large screens */}
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
                fire: null,
                air: null,
                earth: null,
                water: null
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
        // Set loading state immediately
        setIsLoading(true);
        
        // Flag this as a database card
        setIsFromDatabase(true);
        
        // Reset any custom art position
        setArtPosition({ x: 0, y: 0, width: 0, height: 0 });
        
        const cardData = getCreatureById(creatureId);
        if (!cardData) {
          setIsLoading(false);
          return;
        }
        
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
        
        // Always preserve the unique property regardless of brainwashed status
        setUnique(cardData.unique || false);

        // Only set legendary and loyal for non-brainwashed creatures
        if (cardData.brainwashed || hasBrainwashedText) {
          // Reset legendary and loyal for brainwashed creatures
          setLegendary(false);
          setLoyal(false);
          // Clear flavor text since it's not shown for brainwashed creatures
          setFlavorText('');
        } else {
          // Set legendary and loyal for non-brainwashed creatures
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
        
        // Reset statsPreset to 'mid' whenever a new creature is selected
        setStatsPreset('mid');

        // Get the original stats and adjust them based on preset
        const originalStats = {
          energy: cardData.stats.energy || 0,
          courage: cardData.stats.courage || 0,
          power: cardData.stats.power || 0,
          wisdom: cardData.stats.wisdom || 0,
          speed: cardData.stats.speed || 0,
          mugic: cardData.stats.mugic || 0
        };
      
        // Save the original max stats
        setOriginalMaxStats(originalStats);
      
       // Apply the default 'mid' preset
        const adjustedStats = adjustStatsBasedOnPreset(originalStats, 'mid');
        setStats(adjustedStats);
        
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
              setIsLoading(false);
            })
            .catch(err => {
              console.error('Failed to load image:', err);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
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

{selectedType === 'attack' && (
  <div className="p-4 border border-gray-700 rounded-lg bg-black">
    <AttackSelector
      onSelectAttack={(attackData) => {
        setIsLoading(true);

        // Flag this as a database card
        setIsFromDatabase(true);
        
        // Reset any custom art position
        setArtPosition({ x: 0, y: 0, width: 0, height: 0 });        

        // Set form data from attackData
        setName(attackData.name || '');
        setSet(attackData.set?.toLowerCase() || '');
        setRarity(attackData.rarity || '');
        setAbility(attackData.ability || '');
        setFlavorText(attackData.flavorText || '');
        setUnique(attackData.unique || false);
        setArtist(attackData.artist || '');
        setSerialNumber(attackData.id || attackData.serialNumber || '');
        setBuildPoints(attackData.bp || 0);
        setBase(attackData.base || 0);
        setElements({
          fire: attackData.fire !== undefined ? attackData.fire : null,
          air: attackData.air !== undefined ? attackData.air : null,
          earth: attackData.earth !== undefined ? attackData.earth : null,
          water: attackData.water !== undefined ? attackData.water : null
        });
        
        // Load image if available
        if (attackData.imageUrl) {
          loadImageFromUrl(attackData.imageUrl)
            .then(imageFile => {
              if (imageFile) setArt(imageFile);
              setIsLoading(false);
            })
            .catch(err => {
              console.error('Failed to load image:', err);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }

        // Create re-render sequence for UI updates
        setTimeout(() => {
          setForceUpdate(prev => !prev);
          setTimeout(() => {
            setForceUpdate(prev => !prev);
          }, 300);
        }, 100);
      }}
    />
  </div>
)}

{selectedType === 'battlegear' && (
  <div className="p-4 border border-gray-700 rounded-lg bg-black">
    <BattlegearSelector
      onSelectBattlegear={(battlegearData) => {
        setIsLoading(true);

        // Flag this as a database card
        setIsFromDatabase(true);
        
        // Reset any custom art position
        setArtPosition({ x: 0, y: 0, width: 0, height: 0 });        
        
        // Set form data from battlegearData
        setName(battlegearData.name || '');
        setSet(battlegearData.set?.toLowerCase() || '');
        setRarity(battlegearData.rarity || '');
        setAbility(battlegearData.ability || '');
        setFlavorText(battlegearData.flavorText || '');
        setUnique(battlegearData.unique || false);
        setLegendary(battlegearData.legendary || false);
        setLoyal(battlegearData.loyal || false);
        setArtist(battlegearData.artist || '');
        setSerialNumber(battlegearData.id || battlegearData.serialNumber || '');
        
        // Load image if available
        if (battlegearData.imageUrl) {
          loadImageFromUrl(battlegearData.imageUrl)
            .then(imageFile => {
              if (imageFile) setArt(imageFile);
              setIsLoading(false);
            })
            .catch(err => {
              console.error('Failed to load image:', err);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }

        // Create re-render sequence for UI updates
        setTimeout(() => {
          setForceUpdate(prev => !prev);
          setTimeout(() => {
            setForceUpdate(prev => !prev);
          }, 300);
        }, 100);
      }}
    />
  </div>
)}

{selectedType === 'mugic' && (
  <div className="p-4 border border-gray-700 rounded-lg bg-black">
    <MugicSelector
      onSelectMugic={(mugicData) => {
        setIsLoading(true);

        // Flag this as a database card
        setIsFromDatabase(true);
        
        // Reset any custom art position
        setArtPosition({ x: 0, y: 0, width: 0, height: 0 });        
        
        // Set form data from mugicData
        setName(mugicData.name || '');
        setSet(mugicData.set?.toLowerCase() || '');
        setRarity(mugicData.rarity || '');
        setTribe(mugicData.tribe?.toLowerCase() || '');
        setAbility(mugicData.ability || '');
        setFlavorText(mugicData.flavorText || '');
        setUnique(mugicData.unique || false);
        setArtist(mugicData.artist || '');
        setMugicCost(mugicData.mugicCost || 0);
        setSerialNumber(mugicData.id || mugicData.serialNumber || '');
        
        // Load image if available
        if (mugicData.imageUrl) {
          loadImageFromUrl(mugicData.imageUrl)
            .then(imageFile => {
              if (imageFile) setArt(imageFile);
              setIsLoading(false);
            })
            .catch(err => {
              console.error('Failed to load image:', err);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }

        // Create re-render sequence for UI updates
        setTimeout(() => {
          setForceUpdate(prev => !prev);
          setTimeout(() => {
            setForceUpdate(prev => !prev);
          }, 300);
        }, 100);
      }}
    />
  </div>
)}

{selectedType === 'location' && (
  <div className="p-4 border border-gray-700 rounded-lg bg-black">
    <LocationSelector
      onSelectLocation={(locationData) => {
        setIsLoading(true);

        // Flag this as a database card
        setIsFromDatabase(true);
        
        // Reset any custom art position
        setArtPosition({ x: 0, y: 0, width: 0, height: 0 });        
        
        // Set form data from locationData
        setName(locationData.name || '');
        setSet(locationData.set?.toLowerCase() || '');
        setRarity(locationData.rarity || '');
        setAbility(locationData.ability || '');
        setFlavorText(locationData.flavorText || '');
        setUnique(locationData.unique || false);
        setArtist(locationData.artist || '');
        setInitiative(locationData.initiative || 0);
        setSerialNumber(locationData.id || locationData.serialNumber || '');
        
        // Load image if available
        if (locationData.imageUrl) {
          loadImageFromUrl(locationData.imageUrl)
            .then(imageFile => {
              if (imageFile) setArt(imageFile);
              setIsLoading(false);
            })
            .catch(err => {
              console.error('Failed to load image:', err);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }

        // Create re-render sequence for UI updates
        setTimeout(() => {
          setForceUpdate(prev => !prev);
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
          { value: 'panivian', label: 'Panivian' },
          { value: 'umbrian', label: 'Umbrian' },
          { value: 'frozen', label: 'Frozen' },
          { value: 'custom', label: 'Custom' }
        ]}
      />
    </div>
    
{tribe === 'custom' && (
  <div className="mt-4">
    <PhotoshopColorPicker 
      color={customColor} 
      onChange={setCustomColor} 
    />
    <CustomTribeLogoUploader
      logo={tribeLogo}
      onChange={setTribeLogo}
    />
  </div>
)}

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
          { value: 'generic', label: 'Generic' },
          { value: 'panivian', label: 'Panivian' },
          { value: 'umbrian', label: 'Umbrian' },
          { value: 'frozen', label: 'Frozen' },
          { value: 'custom', label: 'Custom' }
        ]}
      />
    )}

    <div className="flex items-center gap-4">
      <label className="w-24 text-right font-bold">Art</label>
      <div className="flex-1">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            setArt(e.target.files[0]);
            setIsFromDatabase(false); // User is uploading custom art
            // Reset art position when new art is uploaded
            setArtPosition({ x: 0, y: 0, width: 0, height: 0 });
          }}
          className="w-full mb-2"
        />
{art && !isFromDatabase && (
  <CardArtPositioner
    art={art}
    onPositionChange={setArtPosition}
    containerWidth={
      selectedType === 'attack' || selectedType === 'battlegear' 
        ? 251 
        : selectedType === 'location' 
          ? 306 
          : selectedType === 'mugic' 
            ? 250 
            : 236
    }
    containerHeight={
      selectedType === 'attack' || selectedType === 'battlegear'
        ? 171
        : selectedType === 'location'
          ? 137
          : selectedType === 'mugic'
            ? 350
            : 198
    }
  />
)}
      </div>
    </div>

      <InputField 
    label="Name" 
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Card Name"
  />
  
  <InputField 
    label="Subname" 
    value={subname}
    onChange={(e) => setSubname(e.target.value)}
    placeholder="Subname (optional)"
  />

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
                { value: 'sas', label: 'Storm and Sea' },
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
            onChange={(elementKey, newValue) => {
              setElements(prev => ({
                ...prev,
                [elementKey]: newValue
              }));
            }}
          />
        ))}
      </div>
    </div>
  )}

{/* Card Properties - Unique is always available, Legendary and Loyal only if not brainwashed */}
{['creature', 'battlegear'].includes(selectedType) && (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-0 border-gray-700">
        {/* Unique checkbox always visible */}
        <div className="flex items-center gap-2">
            <label className="font-bold">Unique</label>
            <input 
                type="checkbox" 
                checked={unique}
                onChange={(e) => setUnique(e.target.checked)}
                className="w-4 h-4 accent-[#9FE240]" 
            />
        </div>
        
        {/* Legendary and Loyal only visible when not brainwashed */}
        {!brainwashed && (
            <>
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
            </>
        )}
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
              [element]: e.target.value
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
          <div key={element} style={{ display: value !== null ? 'block' : 'none' }}>
            <NumberSlider
              label={element.charAt(0).toUpperCase() + element.slice(1)}
              value={value !== null ? value : 0}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setElements(prev => ({
                  ...prev,
                  [element]: newValue
                }));
              }}
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
      </div>
    </div>
<div className="w-full lg:w-1/2 flex flex-col h-full lg:ml-5">
  <div className="flex items-start justify-start relative">
    {isLoading && <LoadingIndicator />}
    <CardPreview 
      cardData={{
        selectedType,
        tribe,
        art,
        artPosition,
        isFromDatabase,
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
        useBleedTemplates: true,
        customColor: customColor,
        tribeLogo: tribeLogo
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
<div className="lg:hidden flex flex-col mb-24 mt-4">
  {selectedType === 'creature' && (
    <div className="w-full bg-black border border-gray-700 rounded-lg mb-4">
      {/* Add the preset selector for mobile */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <label className="font-bold text-white text-sm">Stats Preset:</label>
          <div className="flex items-center gap-2">
            <select
              value={statsPreset}
              onChange={(e) => {
                const newPreset = e.target.value;
                setStatsPreset(newPreset);
                setUseOrangeSliders(newPreset === 'max');
                
                if (newPreset === 'random') {
                  const originalMugic = stats.mugic;
                  const randomStats = generateRandomStats(originalMaxStats);
                  randomStats.mugic = originalMugic;
                  setStats(randomStats);
                } else {
                  const adjustedStats = adjustStatsBasedOnPreset(originalMaxStats, newPreset);
                  setStats(adjustedStats);
                }
              }}
              className="w-20 p-1 border border-gray-700 rounded bg-black text-white text-sm focus:border-[#9FE240] focus:outline-none"
            >
              <option value="max">Max</option>
              <option value="mid">Mid</option>
              <option value="min">Min</option>
              <option value="random">Random</option>
            </select>
            
            {statsPreset === 'random' && (
              <button 
                onClick={() => {
                  const originalMugic = stats.mugic;
                  const randomStats = generateRandomStats(originalMaxStats);
                  randomStats.mugic = originalMugic;
                  setStats(randomStats);
                }}
                className="bg-transparent border-none p-0"
                title="Re-roll random stats"
              >
                <img 
                  src={getAssetPath('img/d20.png')}
                  alt="Re-roll dice" 
                  className="w-8 h-8 object-contain"
                />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Existing stats sliders */}
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
            useOrangeColor={useOrangeSliders || (originalMaxStats[stat] !== undefined && value === originalMaxStats[stat])}
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
     <div className="w-full max-w-xs mx-auto bg-black border border-gray-700 rounded-lg mt-3 mb-2 p-2">
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <label className="font-bold text-white">Stats Preset:</label>
          <select
            value={statsPreset}
            onChange={(e) => {
              const newPreset = e.target.value;
              setStatsPreset(newPreset);
              
              // Set the orange slider flag based on preset selection
              setUseOrangeSliders(newPreset === 'max');
              
              if (newPreset === 'random') {
                // Modified to preserve mugic stat
                const originalMugic = stats.mugic;
                const randomStats = generateRandomStats(originalMaxStats);
                // Keep the original mugic value
                randomStats.mugic = originalMugic;
                setStats(randomStats);
              } else {
                // Use the existing adjustment for other presets
                const adjustedStats = adjustStatsBasedOnPreset(originalMaxStats, newPreset);
                setStats(adjustedStats);
              }
            }}
            className="w-24 p-1 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
          >
            <option value="max">Max</option>
            <option value="mid">Mid</option>
            <option value="min">Min</option>
            <option value="random">Random</option>
          </select>
        </div>
        
        {/* Dice Button - Only visible when random is selected */}
        {statsPreset === 'random' && (
          <button 
            onClick={() => {
              // Modified to preserve mugic stat
              const originalMugic = stats.mugic;
              const randomStats = generateRandomStats(originalMaxStats);
              // Keep the original mugic value
              randomStats.mugic = originalMugic;
              setStats(randomStats);
            }}
            className="bg-transparent border-none p-0"
            title="Re-roll random stats"
          >
            <img 
              src={getAssetPath('img/d20.png')}
              alt="Re-roll dice" 
              className="w-10 h-10 object-contain hover:opacity-80 transition-opacity"
            />
          </button>
        )}
      </div>
    </div>
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
            useOrangeColor={useOrangeSliders || (originalMaxStats[stat] !== undefined && value === originalMaxStats[stat])}
          />
        ))}
      </div>
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

{/* Download Buttons - Mobile Only */}
<div className="lg:hidden fixed bottom-0 w-full bg-black p-4 border-t border-gray-700 z-50">
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