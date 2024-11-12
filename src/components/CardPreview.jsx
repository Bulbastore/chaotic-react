import React, { useEffect, useRef } from 'react';
import { CardCreator } from './cardCreator';

const CardPreview = ({ cardData }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;

    const updatePreview = async () => {
      // Don't clear the container immediately - wait until we have new content
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
          const scaleFactor = cardData.selectedType === 'location' ? 1.8 : 2;
          canvas.style.width = `${250 * scaleFactor}px`;
          canvas.style.height = `${350 * scaleFactor}px`;
          canvas.style.maxWidth = cardData.selectedType === 'location' ? '600px' : '500px';
          canvas.style.display = 'block';
          canvas.style.margin = '0 auto';

          // Only update the container if the content is different
          if (container.innerHTML === '' || !container.firstChild || container.firstChild.id !== 'preview-canvas') {
            container.innerHTML = '';
            container.appendChild(canvas);
          } else {
            container.replaceChild(canvas, container.firstChild);
          }
        }
      } catch (error) {
        console.error('Error creating card:', error);
      }
    };

    updatePreview();

    return () => {
      mounted = false;
    };
  }, [cardData]);

  const getMessage = () => {
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
    <div 
      className="bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-xl flex items-center justify-center"
      style={{ 
        position: 'sticky', 
        top: '24px',
        minHeight: cardData.selectedType ? '700px' : '500px',
        padding: '1rem'
      }}
    >
      {getMessage()}
      <div 
        ref={containerRef}
        className="flex items-center justify-center"
        style={{ 
          width: '100%',
          display: (!cardData.selectedType || ((cardData.selectedType === 'creature' || cardData.selectedType === 'mugic') && !cardData.tribe)) ? 'none' : 'flex'
        }}
      />
    </div>
  );
};

export default CardPreview;