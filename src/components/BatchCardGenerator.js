// src/components/BatchCardGenerator.js
import { CardCreator } from './cardCreator';
import { creatureDatabase } from './CreatureDatabase';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export class BatchCardGenerator {
  constructor(progressCallback = () => {}) {
    this.progressCallback = progressCallback;
  }

  /**
   * Generate a single card image from creature data
   * @param {Object} creatureData - The creature data from the database
   * @returns {Promise<HTMLCanvasElement>} - The rendered canvas
   */
  async generateCardFromData(creatureData) {
    // Convert image URL to File object if it exists
    let artFile = null;
    if (creatureData.imageUrl) {
      try {
        const response = await fetch(creatureData.imageUrl);
        const blob = await response.blob();
        artFile = new File([blob], 'art.png', { type: blob.type });
      } catch (error) {
        console.error(`Failed to load image for ${creatureData.name}:`, error);
      }
    }

    // Prepare card data in the format expected by CardCreator
    const cardData = {
      type: 'creature',
      name: creatureData.name || '',
      subname: creatureData.subname || '',
      tribe: creatureData.tribe || '',
      art: artFile,
      set: creatureData.set || '',
      rarity: creatureData.rarity || '',
      subtype: creatureData.subtype || '',
      ability: creatureData.ability || '',
      brainwashed: creatureData.brainwashed || false,
      brainwashedText: creatureData.brainwashedText || '',
      flavorText: creatureData.flavorText || '',
      unique: creatureData.unique || false,
      legendary: creatureData.legendary || false,
      artist: creatureData.artist || '',
      loyal: creatureData.loyal || false,
      loyalRestriction: creatureData.loyalRestriction || '',
      past: creatureData.isPast || false,
      stats: creatureData.stats || {
        energy: 0,
        courage: 0,
        power: 0,
        wisdom: 0,
        speed: 0,
        mugic: 0
      },
      elements: creatureData.elements || {
        fire: 0,
        air: 0,
        earth: 0,
        water: 0
      },
      serialNumber: creatureData.serialNumber || '',
      showCopyright: true,
      showArtist: true
    };

    // Create the card canvas
    try {
      const canvas = await CardCreator.createCard(cardData);
      return canvas;
    } catch (error) {
      console.error(`Error generating card for ${creatureData.name}:`, error);
      throw error;
    }
  }

  /**
   * Convert canvas to blob
   * @param {HTMLCanvasElement} canvas - The rendered canvas 
   * @returns {Promise<Blob>} - PNG blob
   */
  canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed'));
        }
      }, 'image/png');
    });
  }

  /**
   * Generate all cards and download as a zip file
   * @param {Array} creatureList - List of creature data to process (defaults to all creatures)
   * @param {string} zipFilename - Name of the zip file to download
   */
  async generateAllCards(creatureList = creatureDatabase, zipFilename = 'chaotic-cards.zip') {
    const zip = new JSZip();
    const total = creatureList.length;
    let completed = 0;
    let errors = 0;

    // Create folders in the zip based on tribes
    const folders = {};
    
    this.progressCallback({
      status: 'Starting batch generation',
      progress: 0,
      total
    });

    // Process creatures in batches to avoid memory issues
    const BATCH_SIZE = 10;
    for (let i = 0; i < creatureList.length; i += BATCH_SIZE) {
      const batch = creatureList.slice(i, i + BATCH_SIZE);
      
      // Process each creature in the batch
      await Promise.all(batch.map(async (creature) => {
        try {
          // Update progress
          this.progressCallback({
            status: `Processing: ${creature.name}${creature.subname ? ` ${creature.subname}` : ''}`,
            progress: completed + errors,
            total
          });

          // Generate card
          const canvas = await this.generateCardFromData(creature);
          const blob = await this.canvasToBlob(canvas);
          
          // Get folder for tribe, create if it doesn't exist
          const tribeName = creature.tribe ? this.formatTribe(creature.tribe) : 'Other';
          if (!folders[tribeName]) {
            folders[tribeName] = zip.folder(tribeName);
          }
          
          // Create a safe filename
          const filename = this.createSafeFilename(creature);
          
          // Add to zip in the appropriate folder
          folders[tribeName].file(`${filename}.png`, blob, { binary: true });
          
          completed++;
        } catch (error) {
          console.error(`Failed to process ${creature.name}:`, error);
          errors++;
        }
      }));
      
      // Force garbage collection between batches (kind of)
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.progressCallback({
      status: 'Creating zip file...',
      progress: total,
      total
    });

    // Generate and download the zip
    const content = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
    
    saveAs(content, zipFilename);
    
    this.progressCallback({
      status: `Complete! Generated ${completed} cards with ${errors} errors.`,
      progress: total,
      total,
      completed,
      errors
    });
    
    return { completed, errors };
  }

  /**
   * Format tribe name for folder structure
   */
  formatTribe(tribe) {
    const tribeMap = {
      'overworld': 'OverWorld',
      'underworld': 'UnderWorld',
      'mipedian': 'Mipedian',
      'danian': 'Danian',
      "m'arrillian": "M'arrillian",
      'tribeless': 'Tribeless'
    };
    
    return tribeMap[tribe.toLowerCase()] || tribe;
  }
  
  /**
   * Create a safe filename from creature data
   */
  createSafeFilename(creature) {
    // Start with set and serial number if available
    let prefix = '';
    if (creature.set && creature.serialNumber) {
      prefix = `${creature.set.toUpperCase()}-${creature.serialNumber}_`;
    }
    
    // Add name, and handle subname if it exists
    let name = creature.name;
    if (creature.subname) {
      name += `_${creature.subname}`;
    }
    
    // Clean up invalid filename characters
    const safeName = name.replace(/[/\\?%*:|"<>]/g, '-');
    
    return `${prefix}${safeName}`;
  }
  
  /**
   * Generate cards for a specific tribe
   */
  async generateCardsByTribe(tribe, zipFilename) {
    const tribeCreatures = creatureDatabase.filter(c => 
      c.tribe && c.tribe.toLowerCase() === tribe.toLowerCase()
    );
    
    if (tribeCreatures.length === 0) {
      throw new Error(`No creatures found for tribe: ${tribe}`);
    }
    
    return this.generateAllCards(tribeCreatures, `${this.formatTribe(tribe)}-cards.zip`);
  }
}