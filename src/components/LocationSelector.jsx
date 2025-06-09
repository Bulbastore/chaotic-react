// src/components/LocationSelector.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { getAllLocationNames, getLocationById } from './LocationDatabase';

// Use React.memo to prevent unnecessary re-renders
const LocationSelector = memo(({ onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  // Cache all locations to avoid recalculation
  const allLocations = useRef([]);
  
  // Load locations in alphabetical order
  useEffect(() => {
    const loadLocations = async () => {
      const locationItems = getAllLocationNames();
      
      // Filter out locations without a name property first
      const validLocations = locationItems.filter(location => location && location.name);
      
      // Create displayName for each location (like CreatureSelector does)
      const locationsWithDisplayName = validLocations.map(location => ({
        ...location,
        displayName: location.subname && location.subname.trim() !== '' 
          ? `${location.name}, ${location.subname}` 
          : location.name
      }));
      
      // Sort locations alphabetically by displayName
      const sortedLocations = locationsWithDisplayName.sort((a, b) => 
        a.displayName.localeCompare(b.displayName)
      );
      
      allLocations.current = sortedLocations;
      setFilteredLocations(sortedLocations);
    };
    
    loadLocations();
  }, []);
  
  // Filter locations when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLocations(allLocations.current);
    } else {
      const filtered = allLocations.current.filter(location => {
        // Ensure location has displayName property
        if (!location || !location.displayName) return false;
        
        return location.displayName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      
      setFilteredLocations(filtered);
    }
    // Reset selected index when filtered results change
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Memoize the selection handler to avoid recreating during renders
  const handleLocationSelection = React.useCallback((locationId) => {
    // Get the full location data from the database
    const locationData = getLocationById(locationId);
    if (!locationData) {
      console.error(`Location not found with ID: ${locationId}`);
      return;
    }
    
    // Call the parent component's handler with all the location data
    onSelectLocation(locationData);
    
    // Reset local state
    setIsDropdownOpen(false);
    setSearchTerm('');
    setSelectedIndex(-1);
    
    // Re-focus input after a small delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [onSelectLocation]);

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

  // Get a flattened list of selectable locations
  const getSelectableLocations = () => {
    return filteredLocations;
  };

  // Special key handler with focus lock
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (!isDropdownOpen) return;
      
      const selectableLocations = getSelectableLocations();
      
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        
        switch (e.key) {
          case 'ArrowDown':
            setSelectedIndex(prevIndex => {
              if (prevIndex < selectableLocations.length - 1) {
                // Move selection down
                const newIndex = prevIndex + 1;
                scrollToIndex(newIndex, selectableLocations);
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
                scrollToIndex(newIndex, selectableLocations);
                return newIndex;
              }
              return prevIndex;
            });
            break;
            
          case 'Enter':
            if (selectedIndex >= 0 && selectedIndex < selectableLocations.length) {
              // Select the highlighted location
              handleLocationSelection(selectableLocations[selectedIndex].id);
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
  }, [isDropdownOpen, selectedIndex, filteredLocations, handleLocationSelection]);

  // Initialize dropdown state with first item selected
  useEffect(() => {
    if (isDropdownOpen && selectedIndex === -1) {
      const selectableLocations = getSelectableLocations();
      if (selectableLocations.length > 0) {
        setSelectedIndex(0);
      }
    }
  }, [isDropdownOpen, selectedIndex, filteredLocations]);

  // Function to scroll to a specific index
  const scrollToIndex = (index, selectableLocations) => {
    if (index < 0 || !listRef.current) return;
    
    // Use setTimeout to ensure this runs after render
    setTimeout(() => {
      const locationId = selectableLocations[index]?.id;
      if (!locationId) return;
      
      // Safely escape the locationId for use in a CSS selector
      const escapedId = locationId.replace(/"/g, '\\"').replace(/\\/g, '\\\\').replace(/:/g, '\\:');
      
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
      const selectableLocations = getSelectableLocations();
      if (selectableLocations.length > 0 && selectedIndex === -1) {
        setSelectedIndex(0);
      }
    }
  };

  // Helper to find if a location is currently selected
  const isSelected = (location) => {
    if (selectedIndex === -1) return false;
    
    const selectableLocations = getSelectableLocations();
    return selectableLocations[selectedIndex]?.id === location.id;
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
          <label className="text-white font-bold">Select Location</label>
          <span className="text-xs text-gray-400">
            {getSelectableLocations().length} locations available
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
            placeholder="Search locations..."
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
              {filteredLocations.length === 0 ? (
                <div className="p-3 text-gray-400 text-center">No locations found</div>
              ) : (
                <div className="location-list">
                  {filteredLocations.map((location) => (
                    location && location.name && location.id ? (
                      <div
                        key={location.id}
                        data-id={location.id}
                        className={`p-2 cursor-pointer border-t border-gray-700 first:border-0 location-item ${
                          isSelected(location) ? 'bg-gray-700' : 'hover:bg-gray-800'
                        }`}
                        onClick={() => handleLocationSelection(location.id)}
                        role="option"
                        aria-selected={isSelected(location)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white">{location.displayName}</div>
                          </div>
                          <div className="text-xs text-gray-400 ml-2">{location.setDisplay || location.set?.toUpperCase()}</div>
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
LocationSelector.displayName = 'LocationSelector';

export default LocationSelector;