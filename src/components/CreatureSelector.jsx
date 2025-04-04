// src/components/CreatureSelector.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { getAllCreatureNames } from './CreatureDatabase';

// Use React.memo to prevent unnecessary re-renders
const CreatureSelector = memo(({ onSelectCreature }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCreatures, setFilteredCreatures] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [flattenedCreatures, setFlattenedCreatures] = useState([]);
  const [expandedTribes, setExpandedTribes] = useState({});
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  // Cache all creatures to avoid recalculation
  const allCreatures = useRef(getAllCreatureNames());
  
  // Define the tribe display order - doesn't change so defined outside
  const tribeDisplayOrder = [
    'overworld', 
    'underworld', 
    'mipedian', 
    'danian', 
    'm\'arrillian', 
    'tribeless',
    'unknown' // Keep unknown at the end
  ];

  // Initialize expanded tribes state when dropdown opens
  useEffect(() => {
    if (isDropdownOpen) {
      // Start with all tribes collapsed by default
      const initialExpandState = {};
      tribeDisplayOrder.forEach(tribe => {
        initialExpandState[tribe] = false;
      });
      setExpandedTribes(initialExpandState);
    }
  }, [isDropdownOpen]);
  
  // Filter creatures when search term changes
useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCreatures(allCreatures.current);
    } else {
      const filtered = allCreatures.current.filter(creature => 
        creature.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCreatures(filtered);
      
      // Auto-expand tribes that contain matches
      if (searchTerm.trim() !== '') {
        // Group the filtered creatures by tribe
        const matchingTribes = filtered.reduce((tribes, creature) => {
          const tribe = creature.tribe || 'unknown';
          tribes[tribe] = true;
          return tribes;
        }, {});
        
        // Only expand tribes that have matches
        setExpandedTribes(prev => {
          const newState = {...prev};
          // First set all to collapsed
          tribeDisplayOrder.forEach(tribe => {
            newState[tribe] = false;
          });
          // Then expand only those with matches
          Object.keys(matchingTribes).forEach(tribe => {
            newState[tribe] = true;
          });
          return newState;
        });
      }
    }
    // Reset selected index when filtered results change
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Memoize the grouped creatures to avoid recalculation during renders
  const groupedCreatures = React.useMemo(() => {
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

    return creaturesByTribe;
  }, [filteredCreatures]);

  // Create a flattened list for keyboard navigation
  useEffect(() => {
    const flattened = [];
    tribeDisplayOrder
      .filter(tribe => groupedCreatures[tribe] && expandedTribes[tribe])
      .forEach(tribe => {
        groupedCreatures[tribe].forEach(creature => {
          flattened.push(creature);
        });
      });
    setFlattenedCreatures(flattened);
  }, [groupedCreatures, expandedTribes]);

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

  // Toggle a tribe's expanded state
  const toggleTribe = (tribe) => {
    setExpandedTribes(prev => ({
      ...prev,
      [tribe]: !prev[tribe]
    }));
    // Reset selection index when toggling tribes
    setSelectedIndex(-1);
  };

  // Memoize the selection handler to avoid recreating during renders
  const handleCreatureSelection = React.useCallback((creature) => {
    // Process loyalty restrictions based on tribe
    let loyalRestriction = '';

    // Only set a loyalty restriction for M'arrillians
    if (creature.tribe && creature.tribe.toLowerCase() === 'm\'arrillian') {
      loyalRestriction = 'M\'arrillians or Minions';
    }

    // Pass the id and the suggested loyalty restriction to parent
    onSelectCreature(creature.id, loyalRestriction);
    
    // Reset local state
    setIsDropdownOpen(false);
    setSearchTerm('');
    setSelectedIndex(-1);
    
    // Re-focus input after a small delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [onSelectCreature]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };

    // Use capture phase to ensure we handle this before other events
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  // Special key handler with focus lock
  useEffect(() => {
    // This effect manages keyboard events at the document level
    const handleGlobalKeyDown = (e) => {
      if (!isDropdownOpen) return;
      
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        
        switch (e.key) {
          case 'ArrowDown':
            setSelectedIndex(prevIndex => {
              if (prevIndex < flattenedCreatures.length - 1) {
                // Move selection down
                const newIndex = prevIndex + 1;
                scrollToIndex(newIndex);
                return newIndex;
              }
              return prevIndex;
            });
            break;
            
          case 'ArrowUp':
            setSelectedIndex(prevIndex => {
              if (prevIndex > 0) {
                // Move selection up
                const newIndex = prevIndex - 1;
                scrollToIndex(newIndex);
                return newIndex;
              }
              return prevIndex;
            });
            break;
            
          case 'Enter':
            if (selectedIndex >= 0 && selectedIndex < flattenedCreatures.length) {
              // Select the highlighted creature
              handleCreatureSelection(flattenedCreatures[selectedIndex]);
            }
            break;
            
          case 'Escape':
            // Close the dropdown
            setIsDropdownOpen(false);
            setSelectedIndex(-1);
            break;
        }
      }
    };
    
    if (isDropdownOpen) {
      // Only add listener when dropdown is open
      document.addEventListener('keydown', handleGlobalKeyDown, true);
    }
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown, true);
    };
  }, [isDropdownOpen, selectedIndex, flattenedCreatures, handleCreatureSelection]);

  // Initialize dropdown state with first item selected
  useEffect(() => {
    if (isDropdownOpen && selectedIndex === -1 && flattenedCreatures.length > 0) {
      setSelectedIndex(0);
    }
  }, [isDropdownOpen, selectedIndex, flattenedCreatures.length]);

  // Function to scroll to a specific index
  const scrollToIndex = (index) => {
    if (index < 0 || !listRef.current) return;
    
    // Use setTimeout to ensure this runs after render
    setTimeout(() => {
      const items = listRef.current.querySelectorAll('.creature-item');
      if (items.length > index) {
        items[index]?.scrollIntoView({
          block: 'nearest',
          behavior: 'auto'
        });
      }
    }, 0);
  };

  // Add focus handler for accessibility
  const handleInputFocus = () => {
    // Don't auto-open, but prepare for keyboard navigation
    if (isDropdownOpen && flattenedCreatures.length > 0 && selectedIndex === -1) {
      setSelectedIndex(0);
    }
  };

  // Helper to find if a creature is currently selected
  const isSelected = (creature) => {
    if (selectedIndex === -1) return false;
    return flattenedCreatures[selectedIndex]?.id === creature.id;
  };

  // Combined input click and focus handler
  const handleInputClick = () => {
    setIsDropdownOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-white font-bold">Select Creature</label>
          <span className="text-xs text-gray-400">{allCreatures.current.length} creatures available</span>
        </div>
        
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleInputClick}
            onFocus={handleInputFocus}
            onKeyDown={(e) => {
              // Only handle special keys to open dropdown
              if (e.key === 'ArrowDown' || e.key === 'Enter') {
                if (!isDropdownOpen) {
                  e.preventDefault();
                  setIsDropdownOpen(true);
                }
              }
            }}
            placeholder="Search creatures..."
            className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none pl-8"
            autoComplete="off"
            aria-expanded={isDropdownOpen}
          />
          
          {/* Search icon */}
          <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {isDropdownOpen && (
            <div 
              ref={listRef}
              className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-80 overflow-y-auto"
              role="listbox"
              tabIndex="-1"
            >
              {Object.keys(groupedCreatures).length === 0 ? (
                <div className="p-3 text-gray-400 text-center">No creatures found</div>
              ) : (
                // Sort tribes according to the defined order
                tribeDisplayOrder
                  .filter(tribe => groupedCreatures[tribe]) // Only include tribes that have creatures
                  .map(tribe => (
                    <div key={tribe} className="border-b border-gray-700 last:border-0">
                      <div 
                        className="p-2 bg-gray-800 text-gray-300 text-xs font-bold uppercase tracking-wider flex justify-between items-center cursor-pointer hover:bg-gray-700"
                        onClick={() => toggleTribe(tribe)}
                      >
                        <span>{formatTribe(tribe)} ({groupedCreatures[tribe].length})</span>
                        <span className="text-gray-400">
                          {expandedTribes[tribe] ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </span>
                      </div>
                      
                      {/* Creature list - only show if tribe is expanded */}
                      {expandedTribes[tribe] && (
                        <div className="creature-list">
                          {groupedCreatures[tribe].map(creature => (
                            <div
                              key={creature.id}
                              className={`p-2 cursor-pointer border-t border-gray-700 first:border-0 creature-item ${
                                isSelected(creature) ? 'bg-gray-700' : 'hover:bg-gray-800'
                              }`}
                              onClick={() => handleCreatureSelection(creature)}
                              role="option"
                              aria-selected={isSelected(creature)}
                            >
                              <div className="text-white">{creature.displayName}</div>
                              {creature.isPast && (
                                <div className="text-xs text-gray-400">Past</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Export with display name for better debugging
CreatureSelector.displayName = 'CreatureSelector';

export default CreatureSelector;