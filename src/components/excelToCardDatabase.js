// excelToCardDatabase.js
// Run this script with Node.js to convert your Excel files to JavaScript database files

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Helper function for creating unique card keys
function createUniqueCardKey(card) {
  // Combine name and set for a unique identifier
  if (!card.name || !card.set) {
    // Generate random fallback if missing name or set
    return `card-${Math.random().toString(36).substring(2, 10)}`;
  }
  
  // Create composite key using name and set
  // Replace any underscores in the name to avoid parsing issues
  const safeName = card.name.replace(/__/g, '_');
  return `${safeName}__${card.set.toLowerCase() || 'unknown'}`;
}

// Function to convert Excel to Attack JS database
function convertExcelToAttackDatabase(excelFilePath, outputFilePath) {
  console.log(`Reading Attack Excel file: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Loaded ${jsonData.length} attack card entries.`);
  
  // Process each card
  const attackDatabase = jsonData.map(card => {
    // Process element values - convert empty/undefined to null, preserve actual 0s
    const processElement = (value) => {
      if (value === undefined || value === "" || isNaN(parseInt(value))) {
        return null;
      }
      return parseInt(value) || 0; // This keeps actual 0 values
    };
    
    const attackData = {
      id: card.ID || `${card.Set}-${Math.random().toString(36).substring(2, 10)}`,
      name: card.Name || '',
      set: card.Set ? card.Set.toLowerCase() : '',
      rarity: card.Rarity ? card.Rarity.toLowerCase() : '',
      bp: parseInt(card.BP) || 0,
      base: parseInt(card.Base) || 0,
      fire: processElement(card.Fire),
      air: processElement(card.Air),
      earth: processElement(card.Earth), 
      water: processElement(card.Water),
      ability: card.Ability || '',
      flavorText: card["Flavor Text"] || '',
      unique: card.Unique === 'Y' || card.Unique === 1 || card.Unique === true,
      artist: card.Artist || '',
      imageUrl: card.Art || ''
    };
    
    // Add unique card key
    attackData.uniqueId = createUniqueCardKey(attackData);
    
    return attackData;
  });
  
  // Generate JavaScript code
  const jsCode = `// This file was automatically generated from Excel data
// src/components/AttackDatabase.js

// Helper function for creating unique card keys
function createUniqueCardKey(card) {
  // Combine name and set for a unique identifier
  // For backward compatibility, return the ID if it's already globally unique
  if (card.id && card.id.includes('-')) {
    return card.id;
  }
  
  // If already has a uniqueId, use it
  if (card.uniqueId) {
    return card.uniqueId;
  }
  
  // Otherwise create a composite key using name and set
  return \`\${card.name}__\${card.set || 'unknown'}\`;
}

// Pre-populated attack database
export const attackDatabase = ${JSON.stringify(attackDatabase, null, 2)};

// Helper functions to work with the database
export const getAttackById = (idOrKey) => {
  // First try direct ID lookup for backward compatibility
  const directMatch = attackDatabase.find(attack => attack.id === idOrKey);
  if (directMatch) return directMatch;
  
  // Next try uniqueId match
  const uniqueMatch = attackDatabase.find(attack => attack.uniqueId === idOrKey);
  if (uniqueMatch) return uniqueMatch;
  
  // If not found, check if it's a composite key
  if (idOrKey.includes('__')) {
    const [name, set] = idOrKey.split('__');
    return attackDatabase.find(attack => 
      attack.name === name && attack.set === set
    );
  }
  
  return null;
};

export const getAllAttackNames = () => {
  return attackDatabase.map(attack => ({
    id: attack.uniqueId || createUniqueCardKey(attack), // Use the composite key here
    name: attack.name,
    set: attack.set || '',
    setDisplay: attack.set ? attack.set.toUpperCase() : '',
    fire: attack.fire !== undefined ? attack.fire : null,
    air: attack.air !== undefined ? attack.air : null,
    earth: attack.earth !== undefined ? attack.earth : null,
    water: attack.water !== undefined ? attack.water : null,
    bp: attack.bp || 0,
    // Keep the original ID for reference
    originalId: attack.id
  }));
};
`;

  // Write to file
  fs.writeFileSync(outputFilePath, jsCode);
  console.log(`Successfully converted ${jsonData.length} attacks to JavaScript.`);
  console.log(`Output written to: ${outputFilePath}`);
}

// Function to convert Excel to Battlegear JS database
function convertExcelToBattlegearDatabase(excelFilePath, outputFilePath) {
  console.log(`Reading Battlegear Excel file: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Loaded ${jsonData.length} battlegear card entries.`);
  
  // Process each card
  const battlegearDatabase = jsonData.map(card => {
    const battlegearData = {
      id: card.ID || `${card.Set}-${Math.random().toString(36).substring(2, 10)}`,
      name: card.Name || '',
      set: card.Set ? card.Set.toLowerCase() : '',
      rarity: card.Rarity ? card.Rarity.toLowerCase() : '',
      ability: card.Ability || '',
      flavorText: card["Flavor Text"] || '',
      unique: card.Unique === 'Y' || card.Unique === 1 || card.Unique === true,
      legendary: card.Legendary === 'Y' || card.Legendary === 1 || card.Legendary === true,
      loyal: card.Loyal === 'Y' || card.Loyal === 1 || card.Loyal === true,
      artist: card.Artist || '',
      imageUrl: card.Art || ''
    };
    
    // Add unique card key
    battlegearData.uniqueId = createUniqueCardKey(battlegearData);
    
    return battlegearData;
  });
  
  // Generate JavaScript code
  const jsCode = `// This file was automatically generated from Excel data
// src/components/BattlegearDatabase.js

// Helper function for creating unique card keys
function createUniqueCardKey(card) {
  // Combine name and set for a unique identifier
  // For backward compatibility, return the ID if it's already globally unique
  if (card.id && card.id.includes('-')) {
    return card.id;
  }
  
  // If already has a uniqueId, use it
  if (card.uniqueId) {
    return card.uniqueId;
  }
  
  // Otherwise create a composite key using name and set
  return \`\${card.name}__\${card.set || 'unknown'}\`;
}

// Pre-populated battlegear database
export const battlegearDatabase = ${JSON.stringify(battlegearDatabase, null, 2)};

// Helper functions to work with the database
export const getBattlegearById = (idOrKey) => {
  // First try direct ID lookup for backward compatibility
  const directMatch = battlegearDatabase.find(battlegear => battlegear.id === idOrKey);
  if (directMatch) return directMatch;
  
  // Next try uniqueId match
  const uniqueMatch = battlegearDatabase.find(battlegear => battlegear.uniqueId === idOrKey);
  if (uniqueMatch) return uniqueMatch;
  
  // If not found, check if it's a composite key
  if (idOrKey.includes('__')) {
    const [name, set] = idOrKey.split('__');
    return battlegearDatabase.find(battlegear => 
      battlegear.name === name && battlegear.set === set
    );
  }
  
  return null;
};

export const getAllBattlegearNames = () => {
  return battlegearDatabase.map(battlegear => ({
    id: battlegear.uniqueId || createUniqueCardKey(battlegear), // Use the composite key here
    name: battlegear.name,
    set: battlegear.set || '',
    setDisplay: battlegear.set ? battlegear.set.toUpperCase() : '',
    unique: battlegear.unique || false,
    legendary: battlegear.legendary || false,
    loyal: battlegear.loyal || false,
    // Keep the original ID for reference
    originalId: battlegear.id
  }));
};
`;

  // Write to file
  fs.writeFileSync(outputFilePath, jsCode);
  console.log(`Successfully converted ${jsonData.length} battlegear to JavaScript.`);
  console.log(`Output written to: ${outputFilePath}`);
}

// Function to convert Excel to Mugic JS database
function convertExcelToMugicDatabase(excelFilePath, outputFilePath) {
  console.log(`Reading Mugic Excel file: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Loaded ${jsonData.length} mugic card entries.`);
  
  // Process each card
  const mugicDatabase = jsonData.map(card => {
    // Infer mugic cost if not explicitly provided
    let mugicCost = card.MugicCost;
    if (mugicCost === undefined) {
      // We can try to detect it from the ID or set some default value
      mugicCost = 1; // Default value
    }

    const mugicData = {
      id: card.ID || `${card.Set}-${Math.random().toString(36).substring(2, 10)}`,
      name: card.Name || '',
      set: card.Set ? card.Set.toLowerCase() : '',
      rarity: card.Rarity ? card.Rarity.toLowerCase() : '',
      tribe: card.Tribe ? card.Tribe.toLowerCase() : 'generic',
      ability: card.Ability || '',
      flavorText: card["Flavor Text"] || '',
      unique: card.Unique === 'Y' || card.Unique === 1 || card.Unique === true,
      mugicCost: parseInt(mugicCost) || 0,
      artist: card.Artist || '',
      imageUrl: card.Art || ''
    };
    
    // Add unique card key
    mugicData.uniqueId = createUniqueCardKey(mugicData);
    
    return mugicData;
  });
  
  // Generate JavaScript code
  const jsCode = `// This file was automatically generated from Excel data
// src/components/MugicDatabase.js

// Helper function for creating unique card keys
function createUniqueCardKey(card) {
  // Combine name and set for a unique identifier
  // For backward compatibility, return the ID if it's already globally unique
  if (card.id && card.id.includes('-')) {
    return card.id;
  }
  
  // If already has a uniqueId, use it
  if (card.uniqueId) {
    return card.uniqueId;
  }
  
  // Otherwise create a composite key using name and set
  return \`\${card.name}__\${card.set || 'unknown'}\`;
}

// Pre-populated mugic database
export const mugicDatabase = ${JSON.stringify(mugicDatabase, null, 2)};

// Helper functions to work with the database
export const getMugicById = (idOrKey) => {
  // First try direct ID lookup for backward compatibility
  const directMatch = mugicDatabase.find(mugic => mugic.id === idOrKey);
  if (directMatch) return directMatch;
  
  // Next try uniqueId match
  const uniqueMatch = mugicDatabase.find(mugic => mugic.uniqueId === idOrKey);
  if (uniqueMatch) return uniqueMatch;
  
  // If not found, check if it's a composite key
  if (idOrKey.includes('__')) {
    const [name, set] = idOrKey.split('__');
    return mugicDatabase.find(mugic => 
      mugic.name === name && mugic.set === set
    );
  }
  
  return null;
};

export const getAllMugicNames = () => {
  return mugicDatabase.map(mugic => ({
    id: mugic.uniqueId || createUniqueCardKey(mugic), // Use the composite key here
    name: mugic.name,
    set: mugic.set || '',
    setDisplay: mugic.set ? mugic.set.toUpperCase() : '',
    tribe: mugic.tribe || 'generic',
    unique: mugic.unique || false,
    mugicCost: mugic.mugicCost || 0,
    // Keep the original ID for reference
    originalId: mugic.id
  }));
};
`;

  // Write to file
  fs.writeFileSync(outputFilePath, jsCode);
  console.log(`Successfully converted ${jsonData.length} mugic to JavaScript.`);
  console.log(`Output written to: ${outputFilePath}`);
}

// Function to convert Excel to Location JS database
function convertExcelToLocationDatabase(excelFilePath, outputFilePath) {
  console.log(`Reading Location Excel file: ${excelFilePath}`);
  
  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Loaded ${jsonData.length} location card entries.`);
  
  // Process each card
  const locationDatabase = jsonData.map(card => {
    const locationData = {
      id: card.ID || `${card.Set}-${Math.random().toString(36).substring(2, 10)}`,
      name: card.Name || '',
      set: card.Set ? card.Set.toLowerCase() : '',
      rarity: card.Rarity ? card.Rarity.toLowerCase() : '',
      ability: card.Ability || '',
      flavorText: card["Flavor Text"] || '',
      unique: card.Unique === 'Y' || card.Unique === 1 || card.Unique === true,
      initiative: parseInt(card.Initiative) || 0,
      type: card.Type || '',
      artist: card.Artist || '',
      imageUrl: card.Art || ''
    };
    
    // Add unique card key
    locationData.uniqueId = createUniqueCardKey(locationData);
    
    return locationData;
  });
  
  // Generate JavaScript code
  const jsCode = `// This file was automatically generated from Excel data
// src/components/LocationDatabase.js

// Helper function for creating unique card keys
function createUniqueCardKey(card) {
  // Combine name and set for a unique identifier
  // For backward compatibility, return the ID if it's already globally unique
  if (card.id && card.id.includes('-')) {
    return card.id;
  }
  
  // If already has a uniqueId, use it
  if (card.uniqueId) {
    return card.uniqueId;
  }
  
  // Otherwise create a composite key using name and set
  return \`\${card.name}__\${card.set || 'unknown'}\`;
}

// Pre-populated location database
export const locationDatabase = ${JSON.stringify(locationDatabase, null, 2)};

// Helper functions to work with the database
export const getLocationById = (idOrKey) => {
  // First try direct ID lookup for backward compatibility
  const directMatch = locationDatabase.find(location => location.id === idOrKey);
  if (directMatch) return directMatch;
  
  // Next try uniqueId match
  const uniqueMatch = locationDatabase.find(location => location.uniqueId === idOrKey);
  if (uniqueMatch) return uniqueMatch;
  
  // If not found, check if it's a composite key
  if (idOrKey.includes('__')) {
    const [name, set] = idOrKey.split('__');
    return locationDatabase.find(location => 
      location.name === name && location.set === set
    );
  }
  
  return null;
};

export const getAllLocationNames = () => {
  return locationDatabase.map(location => ({
    id: location.uniqueId || createUniqueCardKey(location), // Use the composite key here
    name: location.name,
    set: location.set || '',
    setDisplay: location.set ? location.set.toUpperCase() : '',
    type: location.type || '',
    unique: location.unique || false,
    initiative: location.initiative || 0,
    // Keep the original ID for reference
    originalId: location.id
  }));
};
`;

  // Write to file
  fs.writeFileSync(outputFilePath, jsCode);
  console.log(`Successfully converted ${jsonData.length} location card entries.`);
  console.log(`Output written to: ${outputFilePath}`);
}

// Main execution function to convert all card types
function convertAllCardTypes() {
  // Define file paths for each card type based on actual file locations
  const componentsDir = path.resolve('C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components');
  
  const attackExcelPath = path.join(componentsDir, 'Proxy Data Attacks.xlsx');
  const attackOutputPath = path.join(componentsDir, 'AttackDatabase.js');
  
  const battlegearExcelPath = path.join(componentsDir, 'Proxy Data Battlegear.xlsx');
  const battlegearOutputPath = path.join(componentsDir, 'BattlegearDatabase.js');
  
  const mugicExcelPath = path.join(componentsDir, 'Proxy Data Mugic.xlsx');
  const mugicOutputPath = path.join(componentsDir, 'MugicDatabase.js');
  
  const locationExcelPath = path.join(componentsDir, 'Proxy Data Locations.xlsx');
  const locationOutputPath = path.join(componentsDir, 'LocationDatabase.js');
  
  console.log('Excel to JavaScript Database Converter');
  console.log('======================================');
  
  try {
    // Convert attacks
    if (fs.existsSync(attackExcelPath)) {
      convertExcelToAttackDatabase(attackExcelPath, attackOutputPath);
    } else {
      console.log(`Warning: Attack Excel file not found at ${attackExcelPath}`);
    }
    
    // Convert battlegear
    if (fs.existsSync(battlegearExcelPath)) {
      convertExcelToBattlegearDatabase(battlegearExcelPath, battlegearOutputPath);
    } else {
      console.log(`Warning: Battlegear Excel file not found at ${battlegearExcelPath}`);
    }
    
    // Convert mugic
    if (fs.existsSync(mugicExcelPath)) {
      convertExcelToMugicDatabase(mugicExcelPath, mugicOutputPath);
    } else {
      console.log(`Warning: Mugic Excel file not found at ${mugicExcelPath}`);
    }
    
    // Convert locations
    if (fs.existsSync(locationExcelPath)) {
      convertExcelToLocationDatabase(locationExcelPath, locationOutputPath);
    } else {
      console.log(`Warning: Location Excel file not found at ${locationExcelPath}`);
    }
    
    console.log('Conversion process completed!');
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

// Run the conversion process
convertAllCardTypes();

// Alternatively, you can call individual conversion functions:
// Example usage:
// convertExcelToAttackDatabase('C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/Proxy Data Attacks.xlsx', 'C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/AttackDatabase.js');
// convertExcelToBattlegearDatabase('C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/Proxy Data Battlegear.xlsx', 'C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/BattlegearDatabase.js');
// convertExcelToMugicDatabase('C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/Proxy Data Mugic.xlsx', 'C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/MugicDatabase.js');
// convertExcelToLocationDatabase('C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/Proxy Data Locations.xlsx', 'C:/Users/Bulba/Documents/GitHub/chaotic-react/src/components/LocationDatabase.js');