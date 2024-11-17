import { useState, useEffect, useRef } from 'react';
import CardPreview from './CardPreview';
import { CardCreator } from './cardCreator';
import { getAssetPath } from './assetPaths';

const CARD_SYMBOLS = [
  // Ability elements
  { code: ':fire:', label: 'Fire', icon: getAssetPath('img/icons/abilityfire.png') },
  { code: ':air:', label: 'Air', icon: getAssetPath('img/icons/abilityair.png') },
  { code: ':earth:', label: 'Earth', icon: getAssetPath('img/icons/abilityearth.png') },
  { code: ':water:', label: 'Water', icon: getAssetPath('img/icons/abilitywater.png') },
  
  // Mugic icons - Danian
  { code: ':danianmugic:', label: 'Danian Mugic', icon: getAssetPath('img/icons/mugic/danian.png') },
  { code: ':danianmugic0:', label: 'Danian Mugic 0', icon: getAssetPath('img/icons/mugic/danian_0.png') },
  { code: ':danianmugicX:', label: 'Danian Mugic X', icon: getAssetPath('img/icons/mugic/danian_x.png') },
  
  // Mugic icons - Generic
  { code: ':genericmugic:', label: 'Generic Mugic', icon: getAssetPath('img/icons/mugic/generic.png') },
  { code: ':genericmugic0:', label: 'Generic Mugic 0', icon: getAssetPath('img/icons/mugic/generic_0.png') },
  { code: ':genericmugicX:', label: 'Generic Mugic X', icon: getAssetPath('img/icons/mugic/generic_x.png') },
  
  // Mugic icons - M'arrillian
  { code: ':marrillianmugic:', label: "M'arrillian Mugic", icon: getAssetPath('img/icons/mugic/m\'arrillian.png') },
  { code: ':marrillianmugic0:', label: "M'arrillian Mugic 0", icon: getAssetPath('img/icons/mugic/marrillian.png') },
  { code: ':marrillianmugicX:', label: "M'arrillian Mugic X", icon: getAssetPath('img/icons/mugic/marrillian_x.png') },
  
  // Mugic icons - Mipedian
  { code: ':mipedianmugic:', label: 'Mipedian Mugic', icon: getAssetPath('img/icons/mugic/mipedian.png') },
  { code: ':mipedianmugic0:', label: 'Mipedian Mugic 0', icon: getAssetPath('img/icons/mugic/mipedian_0.png') },
  { code: ':mipedianmugicX:', label: 'Mipedian Mugic X', icon: getAssetPath('img/icons/mugic/mipedian_x.png') },
  
  // Mugic icons - OverWorld
  { code: ':overworldmugic:', label: 'OverWorld Mugic', icon: getAssetPath('img/icons/mugic/overworld.png') },
  { code: ':overworldmugic0:', label: 'OverWorld Mugic 0', icon: getAssetPath('img/icons/mugic/overworld_0.png') },
  { code: ':overworldmugicX:', label: 'OverWorld Mugic X', icon: getAssetPath('img/icons/mugic/overworld_x.png') },
  
  // Mugic icons - UnderWorld
  { code: ':underworldmugic:', label: 'UnderWorld Mugic', icon: getAssetPath('img/icons/mugic/underworld.png') },
  { code: ':underworldmugic0:', label: 'UnderWorld Mugic 0', icon: getAssetPath('img/icons/mugic/underworld_0.png') },
  { code: ':underworldmugicX:', label: 'UnderWorld Mugic X', icon: getAssetPath('img/icons/mugic/underworld_x.png') }
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
        <div className="flex flex-wrap justify-start gap-1 p-1 bg-white rounded">
          {CARD_SYMBOLS.map(({ code, label, icon }) => (
            <button
              key={code}
              onClick={() => onSymbolSelect(code)}
              className="p-0.5"
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
      <div className="max-h-[120px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-4 gap-1 p-1">
          {categories.map((category) => (
            <div key={category.name} className="mb-1">
              <div className="text-center px-1 py-0.5 text-xs text-gray-400 font-medium">
                {category.name}
              </div>
              <div className="flex flex-wrap justify-center">
                {category.symbols.map(({ code, label, icon }) => (
                  <button
                    key={code}
                    onClick={() => onSymbolSelect(code)}
                    className="p-0.5 rounded hover:bg-gray-100 transition-colors group relative"
                  >
                    <div className="bg-gray-100 rounded p-0.5">
                      <img 
                        src={icon} 
                        alt={label}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <span className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-black text-white rounded whitespace-nowrap z-10">
                      {code}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TextAreaWithSymbols = ({ value, onChange }) => {
  const textareaRef = useRef(null);

const insertSymbol = (symbolCode) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const spaceAfterSymbol = afterText.startsWith(' ') ? '' : ' '; // Check if there's already a space
    const newValue = `${beforeText}${symbolCode}${spaceAfterSymbol}${afterText}`;
    const newCursorPos = start + symbolCode.length + spaceAfterSymbol.length;

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
                const spaceAfterSymbol = afterText.startsWith(' ') ? '' : ' '; // Check if there's already a space
                const newValue = value.substring(0, lastColon) + potentialCode + spaceAfterSymbol + afterText;
                onChange(newValue);
            }
        }
    }
};

  return (
    <div className="flex flex-col rounded border border-gray-700 bg-black hover:border-[#9FE240] focus-within:border-[#9FE240] transition-colors">
<textarea 
  ref={textareaRef}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  onKeyDown={handleKeyDown}
  className="w-full p-2 bg-black text-white h-32 focus:outline-none rounded-t leading-relaxed border-b border-gray-700 focus-within:border-[#9FE240]" 
  style={{ letterSpacing: 'normal' }}
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
  <div className="flex items-center gap-4">
    <label className="w-24 text-right font-bold">{label}</label>
    <input 
      type={type} 
      className="flex-1 p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
      {...props}
    />
  </div>
);

// Select Field Component
const SelectField = ({ label, options, ...props }) => (
  <div className="flex items-center gap-4">
    <label className="w-24 text-right font-bold">{label}</label>
    <select 
      className="flex-1 p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
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
    fire: getAssetPath('img/icons/fire.png'),
    air: getAssetPath('img/icons/air.png'),
    earth: getAssetPath('img/icons/earth.png'),
    water: getAssetPath('img/icons/water.png')
};

const ElementItem = ({ element, value, onChange }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={element}
      checked={value > 0}
      onChange={onChange}
      className="w-4 h-4 accent-[#9FE240]"
    />
    <label htmlFor={element} className="flex items-center gap-1">
      <img 
        src={ELEMENT_ICONS[element]}
        alt={`${element} element`}
        className="w-5 h-5 object-contain"
        style={{ imageRendering: 'pixelated' }}
      />
      <span className="capitalize">{element}</span>
    </label>
  </div>
);

// Main Form Component
const CardForm = () => {
  const [serialNumber, setSerialNumber] = useState('');
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
  const [stats, setStats] = useState({
    energy: 0,
    courage: 0,
    power: 0,
    wisdom: 0,
    speed: 0,
    mugic: 0
  });
  const [elements, setElements] = useState({
    fire: 0,
    air: 0,
    earth: 0,
    water: 0
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
    fire: 0,
    air: 0,
    earth: 0,
    water: 0
  });
  setBuildPoints(0);
  setMugicCost(0);
  setBase(0);
  setInitiative(0);
  setSerialNumber('');
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
  const [initiative, setInitiative] = useState(0);

const handleDownload = () => {
  const previewCanvas = document.querySelector('#preview-canvas'); // Add id="preview-canvas" to the canvas in CardPreview
  if (previewCanvas) {
    console.log('Canvas for download:', previewCanvas);
    const filename = name ? 
      `${name}${subname ? `, ${subname}` : ''}.png` : 
      'card.png';
    CardCreator.downloadCard(previewCanvas, filename);
  }
};
return (
<div className="container mx-auto flex flex-col lg:flex-row gap-0 p-2 lg:p-4 min-h-screen">
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
    setInitiative(0);
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

      {selectedType && (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
            {/* Tribe Selection (Moved above name for creatures) */}
            {selectedType === 'creature' && (
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
                  { value: 'tribeless', label: 'Tribeless' }
                ]}
              />
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
            
            {['creature', 'mugic', 'location'].includes(selectedType) && (
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
                { value: 'btd', label: "M'arrillian Invasion" },
                { value: 'roto', label: 'Rise of the Oligarch' },
                { value: 'tott', label: 'Turn of the Tide' },
                { value: 'fun', label: 'Forged Unity' },
                { value: 'au', label: 'Alliances Unraveled' },
                { value: 'fas', label: 'Fire and Stone' }
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
                { value: 'uncommon', label: 'Uncommon' },
                { value: 'common', label: 'Common' }
              ]}
            />

<InputField 
  label="Subtype" 
  value={subtype}
  onChange={(e) => setSubtype(e.target.value)}
  placeholder={selectedType === 'creature' && tribe ? 
    `Will appear as: ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} - ${
      {
        'overworld': 'OverWorld',
        'underworld': 'UnderWorld',
        'mipedian': 'Mipedian',
        'danian': 'Danian',
        "m'arrillian": "M'arrillian",
        'tribeless': 'Tribeless'
      }[tribe.toLowerCase()]
    } [your input]` : 
    'Enter subtype'}
  readOnly={selectedType !== 'creature'}
/>
          </div>

          <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
            <div className="space-y-2">
              <label className="font-bold">Ability</label>
              <TextAreaWithSymbols 
                value={ability}
                onChange={setAbility}
              />
            </div>

            {['creature', 'location', 'mugic'].includes(selectedType) && (
              <div className="space-y-2">
                <label className="font-bold">Flavor Text</label>
                <textarea 
                  value={flavorText}
                  onChange={(e) => setFlavorText(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded bg-black text-white h-16 focus:border-[#9FE240] focus:outline-none" 
                />
              </div>
            )}

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

            {/* Card Properties (Unique, Legendary, Loyal) */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-0 border-gray-700">
              {selectedType !== 'location' && (
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
              
              {['creature', 'battlegear'].includes(selectedType) && (
                <div className="flex items-center gap-2">
                  <label className="font-bold">Legendary</label>
                  <input 
                    type="checkbox" 
                    checked={legendary}
                    onChange={(e) => setLegendary(e.target.checked)}
                    className="w-4 h-4 accent-[#9FE240]" 
                  />
                </div>
              )}
              
              {selectedType === 'creature' && (
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
              )}
            </div>

            {/* Artist and Properties */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-0 border-gray-700">
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

          {/* Stats Sections */}
          {selectedType === 'attack' && (
            <div className="space-y-6">
              <div className="border border-gray-700 rounded-lg p-4 bg-black">
                <NumberSlider
                  label="Build Points"
                  value={buildPoints}
                  onChange={(e) => setBuildPoints(parseInt(e.target.value))}
                  max={5}
                  type="small"
                />
              </div>

              <div className="border border-gray-700 rounded-lg p-4 bg-black space-y-4">
                <NumberSlider
                  label="Base"
                  value={base}
                  onChange={(e) => setBase(parseInt(e.target.value))}
                  max={50}
                  step={5}
                  type="base"
                />
                {Object.entries(elements).map(([element, value]) => (
                  <NumberSlider
                    key={element}
                    label={element.charAt(0).toUpperCase() + element.slice(1)}
                    value={value}
                    onChange={(e) => setElements(prev => ({
                      ...prev,
                      [element]: parseInt(e.target.value)
                    }))}
                    max={50}
                    step={5}
                    type="elements"
                  />
                ))}
              </div>
            </div>
          )}

{selectedType === 'mugic' && (
  <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
    <NumberSlider
      label="Cost"
      value={mugicCost}
      onChange={(e) => setMugicCost(parseInt(e.target.value))}
      max={5}
      type="small"
    />
  </div>
)}
          </div>
        )}
{/* Action Buttons */}
      </div>
      <div className="p-0">
        <div className="flex justify-center gap-4">
          <button 
            onClick={handleDownload}
            className="px-6 py-2 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
<div className="w-full lg:w-1/2 flex flex-col h-full lg:ml-5">
  <div className="flex items-start justify-start mb-4">
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
        serialNumber
      }} 
    />
  </div>

  {/* Stats Section - Mobile Only */}
  <div className="lg:hidden">
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

  {/* Download Button - Mobile Only */}
  <div className="lg:hidden sticky bottom-0 w-full bg-black p-4 border-t border-gray-700">
    <button 
      onClick={handleDownload}
      className="w-full px-6 py-2 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors"
    >
      Download
    </button>
  </div>

  {/* Download Button - Desktop Only */}
  <div className="hidden lg:flex justify-center gap-4 mt-4">
    <button 
      onClick={handleDownload}
      className="px-6 py-2 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors"
    >
      Download
    </button>
  </div>
</div>
</div>
);
};

export default CardForm;