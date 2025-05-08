// src/components/AttackSelector.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { getAllAttackNames, getAttackById } from './AttackDatabase';

// Use React.memo to prevent unnecessary re-renders
const AttackSelector = memo(({ onSelectAttack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredAttacks, setFilteredAttacks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  // Cache all attacks to avoid recalculation
  const allAttacks = useRef([]);
  
  // Load attacks in alphabetical order
  useEffect(() => {
    const loadAttacks = async () => {
      const attacks = getAllAttackNames();
      
      // Filter out attacks without a name property first
      const validAttacks = attacks.filter(attack => attack && attack.name);
      
      // Sort attacks alphabetically
      const sortedAttacks = validAttacks.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      allAttacks.current = sortedAttacks;
      setFilteredAttacks(sortedAttacks);
    };
    
    loadAttacks();
  }, []);
  
  // Filter attacks when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAttacks(allAttacks.current);
    } else {
      const filtered = allAttacks.current.filter(attack => {
        // Ensure attack has name property
        if (!attack || !attack.name) return false;
        
        return attack.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      
      setFilteredAttacks(filtered);
    }
    // Reset selected index when filtered results change
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Memoize the selection handler to avoid recreating during renders
  const handleAttackSelection = React.useCallback((attackId) => {
    // Get the full attack data from the database
    const attackData = getAttackById(attackId);
    if (!attackData) {
      console.error(`Attack not found with ID: ${attackId}`);
      return;
    }
    
    // Call the parent component's handler with all the attack data
    onSelectAttack(attackData);
    
    // Reset local state
    setIsDropdownOpen(false);
    setSearchTerm('');
    setSelectedIndex(-1);
    
    // Re-focus input after a small delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [onSelectAttack]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  // Get a flattened list of selectable attacks
  const getSelectableAttacks = () => {
    return filteredAttacks;
  };

  // Special key handler with focus lock
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (!isDropdownOpen) return;
      
      const selectableAttacks = getSelectableAttacks();
      
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        
        switch (e.key) {
          case 'ArrowDown':
            setSelectedIndex(prevIndex => {
              if (prevIndex < selectableAttacks.length - 1) {
                // Move selection down
                const newIndex = prevIndex + 1;
                scrollToIndex(newIndex, selectableAttacks);
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
                scrollToIndex(newIndex, selectableAttacks);
                return newIndex;
              }
              return prevIndex;
            });
            break;
            
          case 'Enter':
            if (selectedIndex >= 0 && selectedIndex < selectableAttacks.length) {
              // Select the highlighted attack
              handleAttackSelection(selectableAttacks[selectedIndex].id);
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
  }, [isDropdownOpen, selectedIndex, filteredAttacks, handleAttackSelection]);

  // Initialize dropdown state with first item selected
  useEffect(() => {
    if (isDropdownOpen && selectedIndex === -1) {
      const selectableAttacks = getSelectableAttacks();
      if (selectableAttacks.length > 0) {
        setSelectedIndex(0);
      }
    }
  }, [isDropdownOpen, selectedIndex, filteredAttacks]);

  // Function to scroll to a specific index
  const scrollToIndex = (index, selectableAttacks) => {
    if (index < 0 || !listRef.current) return;
    
    // Use setTimeout to ensure this runs after render
    setTimeout(() => {
      const attackId = selectableAttacks[index]?.id;
      if (!attackId) return;
      
      const element = listRef.current.querySelector(`[data-id="${attackId.replace(/"/g, '\\"')}"]`);
      if (element) {
        element.scrollIntoView({
          block: 'nearest',
          behavior: 'auto'
        });
      }
    }, 0);
  };

  // Add focus handler for accessibility
  const handleInputFocus = () => {
    // Don't auto-open, but prepare for keyboard navigation
    if (isDropdownOpen) {
      const selectableAttacks = getSelectableAttacks();
      if (selectableAttacks.length > 0 && selectedIndex === -1) {
        setSelectedIndex(0);
      }
    }
  };

  // Helper to find if an attack is currently selected
  const isSelected = (attack) => {
    if (selectedIndex === -1) return false;
    
    const selectableAttacks = getSelectableAttacks();
    return selectableAttacks[selectedIndex]?.id === attack.id;
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
          <label className="text-white font-bold">Select Attack</label>
          <span className="text-xs text-gray-400">
            {getSelectableAttacks().length} attacks available
          </span>
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
            placeholder="Search attacks..."
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
              {filteredAttacks.length === 0 ? (
                <div className="p-3 text-gray-400 text-center">No attacks found</div>
              ) : (
                <div className="attack-list">
                  {filteredAttacks.map((attack) => (
                    attack && attack.name && attack.id ? (
                      <div
                        key={attack.id}
                        data-id={attack.id}
                        className={`p-2 cursor-pointer border-t border-gray-700 first:border-0 attack-item ${
                          isSelected(attack) ? 'bg-gray-700' : 'hover:bg-gray-800'
                        }`}
                        onClick={() => handleAttackSelection(attack.id)}
                        role="option"
                        aria-selected={isSelected(attack)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white">{attack.name}</div>
                            {/* Removed fire, earth, air, water element tags */}
                          </div>
                          <div className="text-xs text-gray-400 ml-2">{attack.setDisplay || attack.set?.toUpperCase()}</div>
                        </div>
                      </div>
                    ) : null
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Export with display name for better debugging
AttackSelector.displayName = 'AttackSelector';

export default AttackSelector;