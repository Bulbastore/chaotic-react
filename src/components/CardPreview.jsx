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
          art: cardData.art,
          set: cardData.set || '',
          rarity: cardData.rarity || '',
          subtype: cardData.subtype || '',
          ability: cardData.ability || '',
          flavorText: cardData.flavorText || '',
          unique: cardData.unique || false,
          legendary: cardData.legendary || false,
          artist: cardData.artist || '',
          loyal: cardData.loyal || false,
          loyalRestriction: cardData.loyalRestriction || '',
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
          initiative: cardData.initiative || 0,
          serialNumber: cardData.serialNumber || ''
        });

        if (mounted) {
          canvas.id = 'preview-canvas';
          
          // Canvas styling
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.maxWidth = '100%';
    canvas.style.maxHeight = '100%';
    canvas.style.objectFit = 'contain';
    canvas.style.imageRendering = 'auto';
    canvas.style.display = 'block';

          // Clear and append the new canvas
          container.innerHTML = '';
          container.appendChild(canvas);
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
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-full h-full flex items-center justify-center rounded-lg shadow-xl">
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