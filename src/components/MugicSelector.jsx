// src/components/MugicSelector.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { getAllMugicNames, getMugicById } from './MugicDatabase';

// Use React.memo to prevent unnecessary re-renders
const MugicSelector = memo(({ onSelectMugic }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredMugic, setFilteredMugic] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  // Cache all mugic to avoid recalculation
  const allMugic = useRef([]);
  
  // Load mugic in alphabetical order
  useEffect(() => {
    const loadMugic = async () => {
      const mugicItems = getAllMugicNames();
      
      // Filter out mugic without a name property first
      const validMugic = mugicItems.filter(mugic => mugic && mugic.name);
      
      // Sort mugic alphabetically
      const sortedMugic = validMugic.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      allMugic.current = sortedMugic;
      setFilteredMugic(sortedMugic);
    };
    
    loadMugic();
  }, []);
  
  // Filter mugic when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMugic(allMugic.current);
    } else {
      const filtered = allMugic.current.filter(mugic => {
        // Ensure mugic has name property
        if (!mugic || !mugic.name) return false;
        
        return mugic.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      
      setFilteredMugic(filtered);
    }
    // Reset selected index when filtered results change
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Memoize the selection handler to avoid recreating during renders
  const handleMugicSelection = React.useCallback((mugicId) => {
    // Get the full mugic data from the database
    const mugicData = getMugicById(mugicId);
    if (!mugicData) {
      console.error(`Mugic not found with ID: ${mugicId}`);
      return;
    }
    
    // Call the parent component's handler with all the mugic data
    onSelectMugic(mugicData);
    
    // Reset local state
    setIsDropdownOpen(false);
    setSearchTerm('');
    setSelectedIndex(-1);
    
    // Re-focus input after a small delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [onSelectMugic]);

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

  // Get a flattened list of selectable mugic
  const getSelectableMugic = () => {
    return filteredMugic;
  };

  // Special key handler with focus lock
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (!isDropdownOpen) return;
      
      const selectableMugic = getSelectableMugic();
      
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        
        switch (e.key) {
          case 'ArrowDown':
            setSelectedIndex(prevIndex => {
              if (prevIndex < selectableMugic.length - 1) {
                // Move selection down
                const newIndex = prevIndex + 1;
                scrollToIndex(newIndex, selectableMugic);
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
                scrollToIndex(newIndex, selectableMugic);
                return newIndex;
              }
              return prevIndex;
            });
            break;
            
          case 'Enter':
            if (selectedIndex >= 0 && selectedIndex < selectableMugic.length) {
              // Select the highlighted mugic
              handleMugicSelection(selectableMugic[selectedIndex].id);
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
  }, [isDropdownOpen, selectedIndex, filteredMugic, handleMugicSelection]);

  // Initialize dropdown state with first item selected
  useEffect(() => {
    if (isDropdownOpen && selectedIndex === -1) {
      const selectableMugic = getSelectableMugic();
      if (selectableMugic.length > 0) {
        setSelectedIndex(0);
      }
    }
  }, [isDropdownOpen, selectedIndex, filteredMugic]);

  // Function to scroll to a specific index
  const scrollToIndex = (index, selectableMugic) => {
    if (index < 0 || !listRef.current) return;
    
    // Use setTimeout to ensure this runs after render
    setTimeout(() => {
      const mugicId = selectableMugic[index]?.id;
      if (!mugicId) return;
      
      // Safely escape the mugicId for use in a CSS selector
      const escapedId = mugicId.replace(/"/g, '\\"').replace(/\\/g, '\\\\').replace(/:/g, '\\:');
      
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
      const selectableMugic = getSelectableMugic();
      if (selectableMugic.length > 0 && selectedIndex === -1) {
        setSelectedIndex(0);
      }
    }
  };

  // Helper to find if a mugic is currently selected
  const isSelected = (mugic) => {
    if (selectedIndex === -1) return false;
    
    const selectableMugic = getSelectableMugic();
    return selectableMugic[selectedIndex]?.id === mugic.id;
  };

  // Combined input click and focus handler
  const handleInputClick = () => {
    setIsDropdownOpen(true);
    inputRef.current?.focus();
  };

  // Helper function to get the tribe color
  const getTribeColor = (tribe) => {
    if (!tribe) return 'bg-gray-600';
    
    switch(tribe.toLowerCase()) {
      case 'overworld': return 'bg-blue-700';
      case 'underworld': return 'bg-red-800';
      case 'mipedian': return 'bg-yellow-700';
      case 'danian': return 'bg-amber-900';
      case "m'arrillian": return 'bg-cyan-800';
      case 'tribeless': 
      case 'generic': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-white font-bold">Select Mugic</label>
          <span className="text-xs text-gray-400">
            {getSelectableMugic().length} mugic available
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
            placeholder="Search mugic..."
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
              {filteredMugic.length === 0 ? (
                <div className="p-3 text-gray-400 text-center">No mugic found</div>
              ) : (
                <div className="mugic-list">
                  {filteredMugic.map((mugic) => (
                    mugic && mugic.name && mugic.id ? (
                      <div
                        key={mugic.id}
                        data-id={mugic.id}
                        className={`p-2 cursor-pointer border-t border-gray-700 first:border-0 mugic-item ${
                          isSelected(mugic) ? 'bg-gray-700' : 'hover:bg-gray-800'
                        }`}
                        onClick={() => handleMugicSelection(mugic.id)}
                        role="option"
                        aria-selected={isSelected(mugic)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white">{mugic.name}</div>
                            <div className="flex gap-2 mt-1">
                              {mugic.tribe && (
                                <span className={`text-xs ${getTribeColor(mugic.tribe)} text-white px-1 rounded`}>
                                  {mugic.tribe.charAt(0).toUpperCase() + mugic.tribe.slice(1)}
                                </span>
                              )}
                              {mugic.mugicCost !== undefined && (
                                <span className="text-xs bg-purple-900 text-white px-1 rounded">Cost: {mugic.mugicCost}</span>
                              )}
                              {mugic.unique && (
                                <span className="text-xs bg-pink-900 text-white px-1 rounded">Unique</span>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 ml-2">{mugic.setDisplay || mugic.set?.toUpperCase()}</div>
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
MugicSelector.displayName = 'MugicSelector';

export default MugicSelector;