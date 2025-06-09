import React, { useState, useRef } from 'react';
import { getAssetPath } from './assetPaths';

const INITIATIVE_SYMBOLS = [
  // Ability elements
  { code: ':fire:', label: 'Fire', icon: getAssetPath('img/icons/abilityfire.png'), autoText: 'Fire' },
  { code: ':air:', label: 'Air', icon: getAssetPath('img/icons/abilityair.png'), autoText: 'Air' },
  { code: ':earth:', label: 'Earth', icon: getAssetPath('img/icons/abilityearth.png'), autoText: 'Earth' },
  { code: ':water:', label: 'Water', icon: getAssetPath('img/icons/abilitywater.png'), autoText: 'Water' },

  // Discipline elements
  { code: ':courage:', label: 'Courage', icon: getAssetPath('img/icons/courage.png'), autoText: 'Courage' },
  { code: ':power:', label: 'Power', icon: getAssetPath('img/icons/power.png'), autoText: 'Power' },
  { code: ':wisdom:', label: 'Wisdom', icon: getAssetPath('img/icons/wisdom.png'), autoText: 'Wisdom' },
  { code: ':speed:', label: 'Speed', icon: getAssetPath('img/icons/speed.png'), autoText: 'Speed' },

  // Tribe elements
  { code: ':overworld:', label: 'OverWorld', icon: getAssetPath('img/icons/overworld.png'), autoText: 'OverWorld' },
  { code: ':underworld:', label: 'UnderWorld', icon: getAssetPath('img/icons/underworld.png'), autoText: 'UnderWorld' },
  { code: ':mipedian:', label: 'Mipedian', icon: getAssetPath('img/icons/mipedian.png'), autoText: 'Mipedian' },
  { code: ':danian:', label: 'Danian', icon: getAssetPath('img/icons/danian.png'), autoText: 'Danian' },
  { code: ':marrillian:', label: 'M\'arrillian', icon: getAssetPath('img/icons/marrillian.png'), autoText: 'M\'arrillian' },
  { code: ':tribeless:', label: 'Tribeless', icon: getAssetPath('img/icons/tribeless.png'), autoText: 'Tribeless' },
  { code: ':panivian:', label: 'Panivian', icon: getAssetPath('img/icons/panivian.png'), autoText: 'Panivian' },
  { code: ':umbrian:', label: 'Umbrian', icon: getAssetPath('img/icons/umbrian.png'), autoText: 'Umbrian' },
  { code: ':frozen:', label: 'Frozen', icon: getAssetPath('img/icons/frozen.png'), autoText: 'Frozen' }
];

const InitiativeSymbolBar = ({ onSymbolSelect }) => {
  const isMobile = window.innerWidth < 1024;

  if (isMobile) {
    return (
      <div className="bg-black rounded-b border-t border-gray-700">
        <div className="flex flex-wrap justify-start gap-1 p-1">
          {INITIATIVE_SYMBOLS.map(({ code, label, icon }) => (
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

  // Desktop version
  return (
    <div className="bg-black rounded-b border-t border-gray-700">
      <div className="flex flex-wrap justify-center gap-[2px] p-1">
        {INITIATIVE_SYMBOLS.map(({ code, label, icon }) => (
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

const InitiativeInput = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleSymbolSelect = (symbolCode) => {
    const input = inputRef.current;
    if (!input) return;
    
    // Replace the entire content with the selected symbol
    const newValue = symbolCode;
    const newCursorPos = symbolCode.length;
    
    onChange(newValue);
    
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // Enforce 50 character limit silently
    if (newValue.length <= 50) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ':') {
      const start = e.target.selectionStart;
      const beforeText = value.substring(0, start - 1);
      const lastColon = beforeText.lastIndexOf(':');
      
      if (lastColon !== -1) {
        const potentialCode = `:${beforeText.substring(lastColon + 1)}:`;
        const matchingSymbol = INITIATIVE_SYMBOLS.find(symbol => symbol.code === potentialCode);
        
        if (matchingSymbol) {
          e.preventDefault();
          // Replace entire content with the symbol
          onChange(potentialCode);
        }
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-bold">Initiative</label>
      </div>
      <div className="flex flex-col rounded border border-gray-700 bg-black hover:border-[#9FE240] focus-within:border-[#9FE240] transition-colors">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type : to use symbols (e.g., :fire:) or click icons below to insert"
          className="w-full p-2 bg-black text-white focus:outline-none rounded-t leading-relaxed"
          style={{ letterSpacing: 'normal', whiteSpace: 'pre-wrap' }}
        />
        <InitiativeSymbolBar onSymbolSelect={handleSymbolSelect} />
      </div>
    </div>
  );
};

export default InitiativeInput;