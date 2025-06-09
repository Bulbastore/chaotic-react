import React, { useEffect, useRef, useState } from 'react';
import { CardCreator } from './cardCreator';
import { getAssetPath } from './assetPaths';

const CardPreview = ({ cardData }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;

    const updatePreview = async () => {
      console.log("Rendering card with properties:", {
        unique: cardData.unique,
        brainwashed: cardData.brainwashed,
        brainwashedText: cardData.brainwashedText
      });      
      setError(null);

      if (!cardData.selectedType) {
        container.innerHTML = '';
        return;
      }

      if ((cardData.selectedType === 'creature' || cardData.selectedType === 'mugic') && !cardData.tribe) {
        container.innerHTML = '';
        return;
      }

      try {
        const canvas = await CardCreator.createCard({
          type: cardData.selectedType,
          name: cardData.name || '',
          subname: cardData.subname || '',
          tribe: cardData.tribe || '',
          mainTribe: cardData.mainTribe || '',
          art: cardData.art,
          artPosition: cardData.artPosition,
          set: cardData.set || '',
          rarity: cardData.rarity || '',
          subtype: cardData.subtype || '',
          ability: cardData.ability || '',
          brainwashed: cardData.brainwashed || false,
          brainwashedText: cardData.brainwashedText || '',
          flavorText: cardData.flavorText || '',
          unique: cardData.unique || false,
          legendary: cardData.legendary || false,
          artist: cardData.artist || '',
          loyal: cardData.loyal || false,
          loyalRestriction: cardData.loyalRestriction || '',
          past: cardData.past || false,
          stats: cardData.stats || {
            energy: 0,
            courage: 0,
            power: 0,
            wisdom: 0,
            speed: 0,
            mugic: 0
          },
          elements: cardData.elements || {
            fire: 0,
            air: 0,
            earth: 0,
            water: 0
          },
          buildPoints: cardData.buildPoints || 0,
          base: cardData.base || 0,
          mugicCost: cardData.mugicCost || 0,
          mugicNotes: cardData.mugicNotes || [],
          initiative: cardData.initiative || '',
          serialNumber: cardData.serialNumber || '',
          showCopyright: cardData.showCopyright !== undefined ? cardData.showCopyright : true,
          showArtist: cardData.showArtist !== undefined ? cardData.showArtist : true,     
          customColor: cardData.tribe === 'custom' ? cardData.customColor : null,
          tribeLogo: cardData.tribeLogo,
        });

        if (mounted) {
          // Get the original canvas context for dimensions
          const originalCtx = canvas.getContext('2d');
          
          // Special handling for mugic cards to add rounded corners
          if (cardData.selectedType === 'mugic') {
            // Create a new canvas with the same dimensions
            const roundedCanvas = document.createElement('canvas');
            roundedCanvas.width = canvas.width;
            roundedCanvas.height = canvas.height;
            roundedCanvas.id = 'preview-canvas';
            
            // Get context for the new canvas
            const ctx = roundedCanvas.getContext('2d');
            
            // Define corner radius (adjust as needed)
            const cornerRadius = Math.min(canvas.width, canvas.height) * 0.035; // 3.5% of the smallest dimension
            
            // Draw rounded rectangle path
            ctx.beginPath();
            ctx.moveTo(cornerRadius, 0);
            ctx.lineTo(canvas.width - cornerRadius, 0);
            ctx.quadraticCurveTo(canvas.width, 0, canvas.width, cornerRadius);
            ctx.lineTo(canvas.width, canvas.height - cornerRadius);
            ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height);
            ctx.lineTo(cornerRadius, canvas.height);
            ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - cornerRadius);
            ctx.lineTo(0, cornerRadius);
            ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
            ctx.closePath();
            
            // Create clipping mask with rounded corners
            ctx.clip();
            
            // Draw original canvas content onto new canvas (now with rounded corners due to clip)
            ctx.drawImage(canvas, 0, 0);
            
            // Set styling
            roundedCanvas.style.width = '100%';
            roundedCanvas.style.height = 'auto';
            roundedCanvas.style.maxWidth = '450px';
            roundedCanvas.style.objectFit = 'contain';
            roundedCanvas.style.imageRendering = 'auto';
            roundedCanvas.style.display = 'block';
            roundedCanvas.style.margin = '0 auto';
            
            // Clear container and append the rounded canvas
            container.innerHTML = '';
            container.appendChild(roundedCanvas);
          } else {
            // For other card types, use the original canvas
            canvas.id = 'preview-canvas';
            
            // Fixed size canvas styling
            canvas.style.width = '100%';
            canvas.style.height = 'auto';
            canvas.style.maxWidth = '450px';
            canvas.style.objectFit = 'contain';
            canvas.style.imageRendering = 'auto';
            canvas.style.display = 'block';
            canvas.style.margin = '0 auto';
            
            // Clear and append the canvas
            container.innerHTML = '';
            container.appendChild(canvas);
          }
        }
      } catch (error) {
        console.error('Error creating card:', error);
        setError(`Error loading preview: ${error.message}`);
      }
    };

    updatePreview();

    return () => {
      mounted = false;
    };
  }, [cardData]);

  const getMessage = () => {
    if (error) {
      return (
        <div className="text-red-400 text-center p-8 border-2 border-dashed border-red-700 rounded-lg">
          <div className="text-xl mb-2">Error Loading Preview</div>
          <div className="text-sm">{error}</div>
          <div className="text-xs mt-2">Check console for more details</div>
        </div>
      );
    }

    if (!cardData.selectedType) {
      return (
        <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-700 rounded-lg">
          <div className="text-xl mb-2">Card Preview</div>
          <div className="text-sm">Select a card type to begin</div>
        </div>
      );
    }

    if ((cardData.selectedType === 'creature' || cardData.selectedType === 'mugic') && !cardData.tribe) {
      return (
        <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-700 rounded-lg">
          <div className="text-xl mb-2">
            {cardData.selectedType.charAt(0).toUpperCase() + cardData.selectedType.slice(1)} Preview
          </div>
          <div className="text-sm">Select a tribe to begin</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full flex items-center justify-center px-2 lg:px-0 overflow-visible">
      <div className="w-full max-w-md aspect-[5/7] flex items-center justify-center rounded-lg shadow-xl">
        {getMessage()}
        <div 
          ref={containerRef}
          className="flex items-center justify-center w-full h-full"
          style={{ 
            display: (!cardData.selectedType || ((cardData.selectedType === 'creature' || cardData.selectedType === 'mugic') && !cardData.tribe)) ? 'none' : 'flex'
          }}
        />
      </div>
    </div>
  );
};

export default CardPreview;