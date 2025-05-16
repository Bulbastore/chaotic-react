import React from 'react';
import { getAssetPath } from './assetPaths';

const NOTE_TYPES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const NOTE_LENGTHS = [1, 2, 3, 4];

const MugicNotesEditor = ({ notes, onChange }) => {
  // Initialize notes if they don't exist
  const initializedNotes = notes || Array(7).fill().map(() => ({ 
    letter: 'C', 
    length: 1, 
    sharp: false, 
    flat: false 
  }));

  // Handle changes to a specific note
  const handleNoteChange = (index, field, value) => {
    const updatedNotes = [...initializedNotes];
    
    // If changing to sharp and flat is already selected, unselect flat
    if (field === 'sharp' && value === true && updatedNotes[index].flat) {
      updatedNotes[index].flat = false;
    }
    
    // If changing to flat and sharp is already selected, unselect sharp
    if (field === 'flat' && value === true && updatedNotes[index].sharp) {
      updatedNotes[index].sharp = false;
    }
    
    // Update the specified field
    updatedNotes[index][field] = value;
    
    onChange(updatedNotes);
  };

  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-black">
      <h3 className="text-center font-bold text-lg text-white mb-3">Mugic Notes</h3>
      
      <div className="flex flex-wrap justify-center gap-3">
        {initializedNotes.map((note, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-900 rounded-lg p-2 w-28">
            {/* Note Preview */}
            <div className="h-16 w-16 bg-black rounded-md mb-2 relative flex items-center justify-center">
              {/* Sharp indicator */}
              {note.sharp && (
                <img 
                  src={getAssetPath('img/Mugic Notes/Sharp.png')} 
                  alt="Sharp" 
                  className="absolute h-5 top-0 opacity-80"
                  style={{ transform: 'translateY(-30%)' }} 
                />
              )}
              
              {/* Length indicator */}
              <img 
                src={getAssetPath(`img/Mugic Notes/${note.length}.png`)} 
                alt={`Length ${note.length}`} 
                className="absolute h-6 opacity-80"
                style={{ left: '10%' }} 
              />
              
              {/* Main note */}
              <img 
                src={getAssetPath(`img/Mugic Notes/${note.letter}.png`)} 
                alt={note.letter} 
                className="h-9 opacity-90" 
              />
              
              {/* Flat indicator */}
              {note.flat && (
                <img 
                  src={getAssetPath('img/Mugic Notes/Flat.png')} 
                  alt="Flat" 
                  className="absolute h-4 bottom-0 opacity-80"
                  style={{ transform: 'translateY(30%)' }}
                />
              )}
            </div>
            
            {/* Note Type Selector */}
            <select
              value={note.letter}
              onChange={(e) => handleNoteChange(index, 'letter', e.target.value)}
              className="w-full p-1 mb-1 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none text-sm"
            >
              {NOTE_TYPES.map(type => (
                <option key={type} value={type}>Note {type}</option>
              ))}
            </select>
            
            {/* Note Length Selector */}
            <select
              value={note.length}
              onChange={(e) => handleNoteChange(index, 'length', parseInt(e.target.value))}
              className="w-full p-1 mb-1 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none text-sm"
            >
              {NOTE_LENGTHS.map(length => (
                <option key={length} value={length}>Length {length}</option>
              ))}
            </select>
            
            {/* Modifiers */}
            <div className="flex flex-col w-full text-sm">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={note.sharp}
                  onChange={(e) => handleNoteChange(index, 'sharp', e.target.checked)}
                  className="mr-1 accent-[#9FE240]"
                />
                Sharp
              </label>
              
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={note.flat}
                  onChange={(e) => handleNoteChange(index, 'flat', e.target.checked)}
                  className="mr-1 accent-[#9FE240]"
                />
                Flat
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MugicNotesEditor;