// src/components/BatchGeneratorUI.jsx
import React, { useState } from 'react';
import { BatchCardGenerator } from './BatchCardGenerator';
import { creatureDatabase } from './CreatureDatabase';

const BatchGeneratorUI = () => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [selectedTribe, setSelectedTribe] = useState('all');
  const [results, setResults] = useState(null);

  // Get all unique tribes from the database
  const tribes = ['all', ...new Set(creatureDatabase.map(c => c.tribe).filter(Boolean))].map(tribe => {
    if (tribe === 'all') return { value: 'all', label: 'All Tribes' };
    
    // Format tribe names for display
    const tribeMap = {
      'overworld': 'OverWorld',
      'underworld': 'UnderWorld',
      'mipedian': 'Mipedian',
      'danian': 'Danian',
      "m'arrillian": "M'arrillian",
      'tribeless': 'Tribeless'
    };
    
    return { 
      value: tribe, 
      label: tribeMap[tribe.toLowerCase()] || tribe,
      count: creatureDatabase.filter(c => c.tribe === tribe).length
    };
  });

  const handleGenerate = async () => {
    setGenerating(true);
    setProgress(0);
    setStatus('Initializing...');
    setResults(null);
    
    try {
      const generator = new BatchCardGenerator((progressData) => {
        setProgress(Math.floor((progressData.progress / progressData.total) * 100));
        setStatus(progressData.status);
        
        if (progressData.completed !== undefined) {
          setResults({
            completed: progressData.completed,
            errors: progressData.errors
          });
        }
      });
      
      if (selectedTribe === 'all') {
        await generator.generateAllCards();
      } else {
        await generator.generateCardsByTribe(selectedTribe);
      }
    } catch (error) {
      console.error('Error in batch generation:', error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-black text-white">
      <h2 className="text-xl font-bold mb-4">Batch Card Generator</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Select Tribe:</label>
        <select
          value={selectedTribe}
          onChange={(e) => setSelectedTribe(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded bg-black text-white focus:border-[#9FE240] focus:outline-none"
          disabled={generating}
        >
          {tribes.map(tribe => (
            <option key={tribe.value} value={tribe.value}>
              {tribe.label} {tribe.count ? `(${tribe.count})` : ''}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-2">
          This will generate PNG files for {selectedTribe === 'all' 
            ? `all ${creatureDatabase.length} creatures` 
            : `${tribes.find(t => t.value === selectedTribe)?.count || 0} ${tribes.find(t => t.value === selectedTribe)?.label} creatures`} 
          and download them as a zip file.
        </p>
        
        <button
          onClick={handleGenerate}
          disabled={generating}
          className={`w-full px-6 py-2 font-bold rounded transition-colors ${
            generating 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-[#9FE240] text-black hover:bg-[#8FD230]'
          }`}
        >
          {generating ? 'Generating...' : 'Generate Card Images'}
        </button>
      </div>
      
      {(generating || status) && (
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span>{status}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-[#9FE240] h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {results && (
        <div className="mt-4 p-3 border border-gray-700 rounded bg-gray-900">
          <h3 className="font-bold mb-2">Generation Complete</h3>
          <p>Successfully generated: {results.completed} cards</p>
          {results.errors > 0 && (
            <p className="text-red-400">Failed to generate: {results.errors} cards</p>
          )}
          <p className="text-sm text-gray-400 mt-2">
            Check your downloads folder for the zip file.
          </p>
        </div>
      )}
    </div>
  );
};

export default BatchGeneratorUI;