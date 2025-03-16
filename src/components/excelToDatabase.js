// excelToDatabase.js
// Run this script with Node.js to convert your Excel file to a JavaScript database file

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Function to convert Excel to JS database
function convertExcelToDatabase(excelFilePath, outputFilePath) {
  console.log(`Reading Excel file: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Loaded ${jsonData.length} card entries.`);
  
  // Process each card
  const creatureDatabase = jsonData.map(card => {
    // Handle name/subname parsing
    let name = card["Name & Subname"] || '';
    let subname = '';
    let displayName = name;
    
    if (name.includes(',')) {
      const parts = name.split(',', 2);
      name = parts[0].trim();
      subname = parts[1].trim();
    }
    
    // Process elements
    const elementsList = card.Elements ? card.Elements.split(', ') : [];
    const elements = {
      fire: elementsList.includes('Fire') ? 1 : 0,
      air: elementsList.includes('Air') ? 1 : 0,
      earth: elementsList.includes('Earth') ? 1 : 0,
      water: elementsList.includes('Water') ? 1 : 0
    };
    
    // Process special flags
    const unique = card.Unique === 'Y' || card.Unique === 1 || card.Unique === true;
    const legendary = card.Legendary === 'Y' || card.Legendary === 1 || card.Legendary === true;
    const loyal = card.Loyal === 'Y' || card.Loyal === 1 || card.Loyal === true;
    
    // Generate ID
    const id = `${card.Set}-${card["Serial #"] || Math.random().toString(36).substring(2, 10)}`;
    
    return {
      id,
      displayName: card["Name & Subname"] || '',
      name,
      subname,
      set: card.Set ? card.Set.toLowerCase() : '',
      rarity: card.Rarity ? card.Rarity.toLowerCase() : '',
      tribe: card.Tribe ? card.Tribe.toLowerCase() : '',
      subtype: card.Subtype || '',
      ability: card["Ability Text"] || '',
      flavorText: card["Flavor Text"] || '',
      brainwashedText: card["Brainwashed Text"] || '',
      brainwashed: !!card["Brainwashed Text"],
      unique,
      legendary,
      loyal,
      loyalRestriction: card["Loyal Restriction"] || '',
      artist: card.Artist || '',
      serialNumber: card["Serial #"] || '',
      stats: {
        courage: parseInt(card.Courage) || 0,
        power: parseInt(card.Power) || 0,
        wisdom: parseInt(card.Wisdom) || 0,
        speed: parseInt(card.Speed) || 0,
        energy: parseInt(card.Energy) || 0,
        mugic: parseInt(card["Mugic Ability"]) || 0
      },
      elements,
      imageUrl: card.Image || ''
    };
  });
  
  // Generate JavaScript code
  const jsCode = `// This file was automatically generated from Excel data
// src/components/CreatureDatabase.js

// Pre-populated creature database
export const creatureDatabase = ${JSON.stringify(creatureDatabase, null, 2)};

// Helper functions to work with the database
export const getCreatureById = (id) => {
  return creatureDatabase.find(creature => creature.id === id);
};

export const getAllCreatureNames = () => {
  return creatureDatabase.map(creature => ({
    id: creature.id,
    displayName: creature.displayName,
    tribe: creature.tribe
  }));
};
`;

  // Write to file
  fs.writeFileSync(outputFilePath, jsCode);
  console.log(`Successfully converted ${jsonData.length} cards to JavaScript.`);
  console.log(`Output written to: ${outputFilePath}`);
}

// Main execution
const excelFilePath = process.argv[2] || 'Proxy Data Creatures.xlsx';
const outputFilePath = process.argv[3] || 'CreatureDatabase.js';

console.log('Excel to JavaScript Database Converter');
console.log('======================================');

convertExcelToDatabase(excelFilePath, outputFilePath);