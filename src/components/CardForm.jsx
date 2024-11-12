import { useState, useEffect } from 'react';
import CardPreview from './CardPreview';
import { CardCreator } from './cardCreator';

// Helper function for tick marks
const generateTicks = (min, max, type) => {
  switch(type) {
    case 'stats':
      return [0, 55, 110, 165, 220];
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
    let newValue = parseInt(e.target.value) || 0;
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    newValue = roundToStep(newValue, step);
    onChange({ target: { value: newValue } });
  };

  const handleInputBlur = () => {
    setInputValue(value.toString());
  };

  return (
    <div className="flex items-center gap-4">
      <label className="w-24 text-right font-bold">{label}</label>
      <div className="flex-1">
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
              <span className="text-sm">{num}</span>
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
        className="w-16 h-14 text-center border-2 border-gray-700 rounded-lg bg-black text-white focus:border-[#9FE240] focus:outline-none text-xl font-bold"
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
    fire: {
        path: '/img/icon/fire.png',
        overlay: '/img/firecreature.png'
    },
    air: {
        path: '/img/icon/air.png',
        overlay: '/img/aircreature.png'
    },
    earth: {
        path: '/img/icon/earth.png',
        overlay: '/img/earthcreature.png'
    },
    water: {
        path: '/img/icon/water.png',
        overlay: '/img/watercreature.png'
    }
};

const ElementItem = ({ element, value, onChange, iconPath }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={element}
      checked={value > 0}
      onChange={onChange}
      className="w-4 h-4 accent-[#9FE240]"
    />
    <label htmlFor={element} className="flex items-center gap-1">
      <div 
        className="w-6 h-6 flex items-center justify-center bg-transparent relative"
        style={{ 
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <img 
          src={iconPath}
          alt={`${element} element`}
          className="w-5 h-5 object-contain"
          onError={(e) => {
            console.error(`Failed to load ${element} icon:`, e);
            e.target.style.display = 'none';
          }}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
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
  <div className="container mx-auto flex justify-center items-start gap-8 p-6">
    <div className="w-[600px] space-y-6 bg-black text-white">
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

            <InputField 
              label="Art" 
              type="file" 
              accept="image/*" 
              onChange={(e) => setArt(e.target.files[0])}
            />
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

{/* Card Text and Properties */}
          <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Ability</label>
              <textarea 
  value={ability}
  onChange={(e) => setAbility(e.target.value)}
  className="w-full p-2 border border-gray-700 rounded bg-black text-white h-32 focus:border-[#9FE240] focus:outline-none" 
/>
            </div>

            {['creature', 'location', 'mugic'].includes(selectedType) && (
              <div className="flex flex-col gap-2">
                <label className="font-bold">Flavor Text</label>
                <textarea 
  value={flavorText}
  onChange={(e) => setFlavorText(e.target.value)}
  className="w-full p-2 border border-gray-700 rounded bg-black text-white h-16 focus:border-[#9FE240] focus:outline-none" 
/>
              </div>
            )}

            {/* Artist and Properties on one line */}
            <div className="flex items-center gap-8 pt-4 border-t border-gray-700">
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
              
              <div className="flex items-center">
                <div className="flex items-center gap-4">
                  <label className="font-bold">Artist</label>
                  <input 
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Artist"
                    className="w-48 p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-4 ml-4">
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
          </div>
  {selectedType === 'creature' && (
    <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          {Object.entries(elements).map(([element, value]) => (
            <ElementItem
              key={element}
              element={element}
              value={value}
              onChange={(e) => setElements(prev => ({
                ...prev,
                [element]: e.target.checked ? 1 : 0
              }))}
              iconPath={ELEMENT_ICONS[element].path}
            />
          ))}
        </div>
      </div>
    </div>
  )}

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

{selectedType === 'creature' && (
  <div className="space-y-4 border border-gray-700 rounded-lg p-4 bg-black">
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
{/* Action Buttons */}
<div className="flex justify-center gap-4">
  <button 
    onClick={handleDownload}
    className="px-6 py-2 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors"
  >
    Download
  </button>
</div>
</div>
)}
</div>
    <div className="w-[500px] sticky top-6">
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
  </div>
);
};

export default CardForm;