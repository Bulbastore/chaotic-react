// src/components/BattlegearSelector.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { getAllBattlegearNames, getBattlegearById } from './BattlegearDatabase';

// Use React.memo to prevent unnecessary re-renders
const BattlegearSelector = memo(({ onSelectBattlegear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredBattlegear, setFilteredBattlegear] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  // Cache all battlegear to avoid recalculation
  const allBattlegear = useRef([]);
  
  // Load battlegear in alphabetical order
  useEffect(() => {
    const loadBattlegear = async () => {
      const battlegearItems = getAllBattlegearNames();
      
      // Filter out battlegear without a name property first
      const validBattlegear = battlegearItems.filter(battlegear => battlegear && battlegear.name);
      
      // Sort battlegear alphabetically
      const sortedBattlegear = validBattlegear.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      allBattlegear.current = sortedBattlegear;
      setFilteredBattlegear(sortedBattlegear);
    };
    
    loadBattlegear();
  }, []);
  
  // Filter battlegear when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBattlegear(allBattlegear.current);
    } else {
      const filtered = allBattlegear.current.filter(battlegear => {
        // Ensure battlegear has name property
        if (!battlegear || !battlegear.name) return false;
        
        return battlegear.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      
      setFilteredBattlegear(filtered);
    }
    // Reset selected index when filtered results change
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Memoize the selection handler to avoid recreating during renders
  const handleBattlegearSelection = React.useCallback((battlegearId) => {
    // Get the full battlegear data from the database
    const battlegearData = getBattlegearById(battlegearId);
    if (!battlegearData) {
      console.error(`Battlegear not found with ID: ${battlegearId}`);
      return;
    }
    
    // Call the parent component's handler with all the battlegear data
    onSelectBattlegear(battlegearData);
    
    // Reset local state
    setIsDropdownOpen(false);
    setSearchTerm('');
    setSelectedIndex(-1);
    
    // Re-focus input after a small delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [onSelectBattlegear]);

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

  // Get a flattened list of selectable battlegear
  const getSelectableBattlegear = () => {
    return filteredBattlegear;
  };

  // Special key handler with focus lock
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (!isDropdownOpen) return;
      
      const selectableBattlegear = getSelectableBattlegear();
      
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        
        switch (e.key) {
          case 'ArrowDown':
            setSelectedIndex(prevIndex => {
              if (prevIndex < selectableBattlegear.length - 1) {
                // Move selection down
                const newIndex = prevIndex + 1;
                scrollToIndex(newIndex, selectableBattlegear);
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
                scrollToIndex(newIndex, selectableBattlegear);
                return newIndex;
              }
              return prevIndex;
            });
            break;
            
          case 'Enter':
            if (selectedIndex >= 0 && selectedIndex < selectableBattlegear.length) {
              // Select the highlighted battlegear
              handleBattlegearSelection(selectableBattlegear[selectedIndex].id);
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
  }, [isDropdownOpen, selectedIndex, filteredBattlegear, handleBattlegearSelection]);

    // Initialize dropdown state with first item selected
  useEffect(() => {
    if (isDropdownOpen && selectedIndex === -1) {
      const selectableBattlegear = getSelectableBattlegear();
      if (selectableBattlegear.length > 0) {
        setSelectedIndex(0);
      }
    }
  }, [isDropdownOpen, selectedIndex, filteredBattlegear]);

  // Function to scroll to a specific index
  const scrollToIndex = (index, selectableBattlegear) => {
    if (index < 0 || !listRef.current) return;
    
    // Use setTimeout to ensure this runs after render
    setTimeout(() => {
      const battlegearId = selectableBattlegear[index]?.id;
      if (!battlegearId) return;
      
      // Safely escape the battlegearId for use in a CSS selector
      const escapedId = battlegearId.replace(/"/g, '\\"').replace(/\\/g, '\\\\').replace(/:/g, '\\:');
      
      const element = listRef.current.querySelector(`[data-id="${escapedId}"]`);
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
      const selectableBattlegear = getSelectableBattlegear();
      if (selectableBattlegear.length > 0 && selectedIndex === -1) {
        setSelectedIndex(0);
      }
    }
  };

  // Helper to find if a battlegear is currently selected
  const isSelected = (battlegear) => {
    if (selectedIndex === -1) return false;
    
    const selectableBattlegear = getSelectableBattlegear();
    return selectableBattlegear[selectedIndex]?.id === battlegear.id;
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
          <label className="text-white font-bold">Select Battlegear</label>
          <span className="text-xs text-gray-400">
            {getSelectableBattlegear().length} battlegear available
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
            placeholder="Search battlegear..."
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
              {filteredBattlegear.length === 0 ? (
                <div className="p-3 text-gray-400 text-center">No battlegear found</div>
              ) : (
                <div className="battlegear-list">
                  {filteredBattlegear.map((battlegear) => (
                    battlegear && battlegear.name && battlegear.id ? (
                      <div
                        key={battlegear.id}
                        data-id={battlegear.id}
                        className={`p-2 cursor-pointer border-t border-gray-700 first:border-0 battlegear-item ${
                          isSelected(battlegear) ? 'bg-gray-700' : 'hover:bg-gray-800'
                        }`}
                        onClick={() => handleBattlegearSelection(battlegear.id)}
                        role="option"
                        aria-selected={isSelected(battlegear)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white">{battlegear.name}</div>
                          </div>
                          <div className="text-xs text-gray-400 ml-2">{battlegear.setDisplay || battlegear.set?.toUpperCase()}</div>
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
BattlegearSelector.displayName = 'BattlegearSelector';

export default BattlegearSelector;