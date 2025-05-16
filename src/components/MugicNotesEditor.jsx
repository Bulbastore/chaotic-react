// src/components/MugicNotesEditor.jsx
import React, { useState } from 'react';
import { getAssetPath } from './assetPaths';

// Musical note options
const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const LENGTHS = [1, 2, 3, 4]; // Note lengths (quarter, half, dotted half, whole)

const MugicNotesEditor = ({ notes, onChange }) => {
  // Function to update a specific note property
  const updateNote = (index, property, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { 
      ...updatedNotes[index], 
      [property]: value 
    };
    onChange(updatedNotes);
  };

  // Clear all notes
  const clearNotes = () => {
    const emptyNotes = Array(7).fill().map(() => ({ 
      letter: 'C', 
      length: 1, // Quarter note (1 beat)
      sharp: false, 
      flat: false 
    }));
    onChange(emptyNotes);
  };

  // Generate a random sequence of notes
  const generateRandomNotes = () => {
    const randomNotes = Array(7).fill().map(() => {
      const letter = NOTES[Math.floor(Math.random() * NOTES.length)];
      const length = LENGTHS[Math.floor(Math.random() * LENGTHS.length)];
      // Randomly decide if note should be sharp or flat (never both)
      const hasAccidental = Math.random() < 0.3; // 30% chance of having an accidental
      const isSharp = Math.random() > 0.5;
      
      return {
        letter,
        length,
        sharp: hasAccidental && isSharp,
        flat: hasAccidental && !isSharp,
      };
    });
    onChange(randomNotes);
  };
  
  // Render a note length image based on value
  const renderNoteLength = (length) => {
    // Map the length value to a note name for alt text
    const noteNames = {
      1: '1',
      2: '2',
      3: '3',
      4: '4'
    };
    
    return (
      <img 
        src={getAssetPath(`img/Mugic Notes/${length}.png`)} 
        alt={noteNames[length]}
        className="h-10 w-auto object-contain"
      />
    );
  };

  return (
    <div className="bg-black rounded-lg border border-gray-700 p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-bold">Mugic Notes</h3>
        <div className="flex gap-2">
          <button 
            onClick={generateRandomNotes}
            className="px-3 py-1 bg-[#9FE240] text-black font-bold rounded hover:bg-[#8FD230] transition-colors text-sm"
          >
            Randomize
          </button>
          <button 
            onClick={clearNotes}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
          >
            Clear
          </button>
        </div>
      </div>
      
      {/* Main editor area - black background */}
      <div className="bg-black rounded-lg p-4 mb-4 border-gray-700">
        <div className="flex justify-center items-center gap-9">
          {notes.map((note, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Note index */}
              <span className="text-xs text-gray-400 mb-1">{index + 1}</span>
              
              {/* Accidental buttons (sharp/flat) */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col items-center">
                <button 
                  onClick={() => updateNote(index, 'sharp', !note.sharp)}
                  className={`w-5 h-5 flex items-center justify-center rounded ${note.sharp ? 'bg-[#9FE240] text-black' : 'bg-gray-200 text-black'} text-xs mb-1`}
                  disabled={note.flat}
                  title="Sharp"
                >
                  ♯
                </button>
              </div>
              
              {/* Note letter */}
              <div className="relative">
                <select 
                  value={note.letter}
                  onChange={(e) => updateNote(index, 'letter', e.target.value)}
                  className="w-10 h-10 text-xl text-center bg-white border border-gray-300 rounded-full hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9FE240]"
                >
                  {NOTES.map(letter => (
                    <option key={letter} value={letter}>{letter}</option>
                  ))}
                </select>
              </div>
              
              {/* Flat button below note */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex flex-col items-center">
                <button 
                  onClick={() => updateNote(index, 'flat', !note.flat)}
                  className={`w-5 h-5 flex items-center justify-center rounded ${note.flat ? 'bg-[#9FE240] text-black' : 'bg-gray-200 text-black'} text-xs mt-1`}
                  disabled={note.sharp}
                  title="Flat"
                >
                  ♭
                </button>
              </div>
              
              {/* Note length selector - kept at bottom for editing */}
              <div className="mt-2">
                <select
                  value={note.length}
                  onChange={(e) => updateNote(index, 'length', parseInt(e.target.value))}
                  className="w-10 h-8 text-center bg-white border border-gray-300 rounded hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9FE240]"
                >
                  {LENGTHS.map(len => (
                    <option key={len} value={len}>{len === 1 ? '1' : len === 2 ? '2' : len === 3 ? '3' : '4'}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Preview of notes - keeping background white here */}
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-2 border border-gray-300 shadow-md" style={{ width: '450px', height: '90px' }}>
          <div className="flex items-center justify-center gap-2 h-full">
            {notes.map((note, index) => (
              <div key={index} className="flex flex-row items-center h-20">
                {/* Note length on the left, aligned to center axis */}
                <div className="flex items-center justify-center h-full">
                  {renderNoteLength(note.length)}
                </div>
                
                <div className="relative bg-white p-1 rounded flex items-center justify-center h-full">
                  {note.sharp && (
                    <img 
                      src={getAssetPath('img/Mugic Notes/Sharp.png')} 
                      alt="Sharp" 
                      className="absolute left-1/2 transform -translate-x-1/2 -top-[-4px] h-2.5 w-auto"
                    />
                  )}
                  
                  <img 
                    src={getAssetPath(`img/Mugic Notes/${note.letter}.png`)} 
                    alt={note.letter} 
                    className="h-12 w-auto"
                  />
                  
                  {note.flat && (
                    <img 
                      src={getAssetPath('img/Mugic Notes/Flat.png')} 
                      alt="Flat" 
                      className="absolute left-1/2 transform -translate-x-1/2 -bottom-[-4px] h-2.5 w-auto"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MugicNotesEditor;