// src/components/CreatureSelector.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getAllCreatureNames } from './CreatureDatabase';

const CreatureSelector = ({ onSelectCreature }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCreatures, setFilteredCreatures] = useState([]);
  const dropdownRef = useRef(null);
  const allCreatures = getAllCreatureNames();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter creatures when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCreatures(allCreatures);
    } else {
      const filtered = allCreatures.filter(creature => 
        creature.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCreatures(filtered);
    }
  }, [searchTerm, allCreatures]);

  // Group creatures by tribe for the dropdown
  const creaturesByTribe = filteredCreatures.reduce((acc, creature) => {
    const tribe = creature.tribe || 'unknown';
    if (!acc[tribe]) {
      acc[tribe] = [];
    }
    acc[tribe].push(creature);
    return acc;
  }, {});

  // Alphabetize creatures within each tribe
  Object.keys(creaturesByTribe).forEach(tribe => {
    creaturesByTribe[tribe].sort((a, b) => 
      a.displayName.localeCompare(b.displayName)
    );
  });

  // Define the tribe display order
  const tribeDisplayOrder = [
    'overworld', 
    'underworld', 
    'mipedian', 
    'danian', 
    'm\'arrillian', 
    'tribeless',
    'unknown' // Keep unknown at the end
  ];

  // Format tribe name for display
  const formatTribe = (tribe) => {
    switch (tribe.toLowerCase()) {
      case 'overworld': return 'OverWorld';
      case 'underworld': return 'UnderWorld';
      case 'danian': return 'Danian';
      case 'mipedian': return 'Mipedian';
      case 'm\'arrillian': return 'M\'arrillian';
      case 'tribeless': return 'Tribeless';
      default: return tribe;
    }
  };

  // Handle creature selection with loyalty checking
  const handleCreatureSelection = (creature) => {
  // Process loyalty restrictions based on tribe
  let loyalRestriction = '';

  // Only set a loyalty restriction for M'arrillians
  if (creature.tribe && creature.tribe.toLowerCase() === 'm\'arrillian') {
    loyalRestriction = 'M\'arrillians or Minions';
  }

    // Pass the id and the suggested loyalty restriction
    onSelectCreature(creature.id, loyalRestriction);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-white font-bold">Select Creature</label>
          <span className="text-xs text-gray-400">{allCreatures.length} creatures available</span>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setIsDropdownOpen(true)}
            placeholder="Search creatures..."
            className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none pl-8"
          />
          
          {/* Search icon */}
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-80 overflow-y-auto">
              {Object.keys(creaturesByTribe).length === 0 ? (
                <div className="p-3 text-gray-400 text-center">No creatures found</div>
              ) : (
                // Sort tribes according to the defined order
                tribeDisplayOrder
                  .filter(tribe => creaturesByTribe[tribe]) // Only include tribes that have creatures
                  .map(tribe => (
                    <div key={tribe} className="border-b border-gray-700 last:border-0">
                      <div className="p-2 bg-gray-800 text-gray-300 text-xs font-bold uppercase tracking-wider">
                        {formatTribe(tribe)}
                      </div>
                      {creaturesByTribe[tribe].map(creature => (
                        <div
                          key={creature.id}
                          className="p-2 hover:bg-gray-800 cursor-pointer border-t border-gray-700 first:border-0"
                          onClick={() => handleCreatureSelection(creature)}
                        >
                          <div className="text-white">{creature.displayName}</div>
                        </div>
                      ))}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatureSelector;