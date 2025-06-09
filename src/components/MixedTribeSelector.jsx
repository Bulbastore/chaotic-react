import React, { useState } from 'react';
import { getAssetPath } from './assetPaths';

// Import this component in your CardForm.jsx file

const MixedTribeSelector = ({ onTribeChange, disabled = false }) => {
  const [useMixedTribe, setUseMixedTribe] = useState(false);
  const [leftTribe, setLeftTribe] = useState('');
  const [rightTribe, setRightTribe] = useState('');

  const tribes = [
    { value: 'overworld', label: 'OverWorld', icon: getAssetPath('img/icons/overworld.png') },
    { value: 'underworld', label: 'UnderWorld', icon: getAssetPath('img/icons/underworld.png') },
    { value: 'mipedian', label: 'Mipedian', icon: getAssetPath('img/icons/mipedian.png') },
    { value: 'danian', label: 'Danian', icon: getAssetPath('img/icons/danian.png') },
    { value: "m'arrillian", label: "M'arrillian", icon: getAssetPath('img/icons/marrillian.png') },
    { value: 'tribeless', label: 'Tribeless', icon: getAssetPath('img/icons/tribeless.png') },
    { value: 'panivian', label: 'Panivian', icon: getAssetPath('img/icons/panivian.png') },
    { value: 'umbrian', label: 'Umbrian', icon: getAssetPath('img/icons/umbrian.png') },
    { value: 'frozen', label: 'Frozen', icon: getAssetPath('img/icons/frozen.png') }
  ];

  const handleMixedTribeToggle = (checked) => {
    setUseMixedTribe(checked);
    if (!checked) {
      // Reset selections when turning off mixed tribe
      setLeftTribe('');
      setRightTribe('');
      onTribeChange(''); // Reset to normal tribe selection
    } else {
      // Clear any existing tribe selection when enabling mixed tribe
      onTribeChange('');
    }
  };

  const handleLeftTribeChange = (selectedTribe) => {
    setLeftTribe(selectedTribe);
    // If right tribe is the same, clear it
    if (selectedTribe === rightTribe) {
      setRightTribe('');
    }
    // Update the combined tribe
    updateCombinedTribe(selectedTribe, rightTribe === selectedTribe ? '' : rightTribe);
  };

  const handleRightTribeChange = (selectedTribe) => {
    setRightTribe(selectedTribe);
    // If left tribe is the same, clear it
    if (selectedTribe === leftTribe) {
      setLeftTribe('');
    }
    // Update the combined tribe
    updateCombinedTribe(leftTribe === selectedTribe ? '' : leftTribe, selectedTribe);
  };

  const updateCombinedTribe = (left, right) => {
    if (left && right) {
      // Create the combined tribe name like "underworldmipedian" or "mipedianunderworld"
      const combinedTribe = `${left}${right}`;
      onTribeChange(combinedTribe, left); // Pass the main tribe (left) as second parameter
    } else {
      // If either tribe is missing, clear the selection
      onTribeChange('', '');
    }
  };

  const TribeOption = ({ tribe, isSelected, isDisabled, onClick }) => (
    <div 
      className={`
        flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
        ${isSelected 
          ? 'border-[#9FE240] bg-[#9FE240] bg-opacity-20' 
          : isDisabled 
            ? 'border-gray-600 bg-gray-800 cursor-not-allowed opacity-50'
            : 'border-gray-700 bg-gray-900 hover:border-[#9FE240] hover:bg-gray-800'
        }
      `}
      onClick={() => !isDisabled && onClick(tribe.value)}
    >
      <div className="flex items-center gap-2">
        <input
          type="radio"
          checked={isSelected}
          onChange={() => {}}
          disabled={isDisabled}
          className="w-4 h-4 accent-[#9FE240]"
        />
        <img 
          src={tribe.icon} 
          alt={tribe.label}
          className="w-6 h-6 object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
        <span className="text-white font-medium">{tribe.label}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Mixed Tribe Toggle - Centered */}
      <div className="flex items-center justify-center gap-2">
        <input
          type="checkbox"
          id="mixedTribe"
          checked={useMixedTribe}
          onChange={(e) => handleMixedTribeToggle(e.target.checked)}
          disabled={disabled}
          className="w-4 h-4 accent-[#9FE240]"
        />
        <label htmlFor="mixedTribe" className="text-white font-bold">
          Mixed Tribe
        </label>
      </div>

      {/* Mixed Tribe Selection Interface */}
      {useMixedTribe && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 border border-gray-700 rounded-lg bg-black">
          {/* Left Tribe Selection */}
          <div className="space-y-2">
            {tribes.map((tribe) => (
              <TribeOption
                key={`left-${tribe.value}`}
                tribe={tribe}
                isSelected={leftTribe === tribe.value}
                isDisabled={rightTribe === tribe.value}
                onClick={handleLeftTribeChange}
              />
            ))}
          </div>

          {/* Right Tribe Selection */}
          <div className="space-y-2">
            {tribes.map((tribe) => (
              <TribeOption
                key={`right-${tribe.value}`}
                tribe={tribe}
                isSelected={rightTribe === tribe.value}
                isDisabled={leftTribe === tribe.value}
                onClick={handleRightTribeChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MixedTribeSelector;