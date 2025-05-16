import React, { useState, useRef, useEffect } from 'react';

// Simplified version focused on performance
const CardArtPositioner = ({ art, onPositionChange, containerWidth, containerHeight }) => {
  // Use refs for values that shouldn't trigger re-renders during dragging
  const dragRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const objectUrlRef = useRef(null);
  
  // Keep state for values that should trigger UI updates
  const [imageDimensions, setImageDimensions] = useState({ 
    width: 0, height: 0, constraintAxis: null 
  });
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Load and calculate initial image dimensions
  useEffect(() => {
    if (!art) return;
    
    // Clean up previous objectURL if it exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    
    // Create new objectURL and store the reference
    const objectUrl = URL.createObjectURL(art);
    objectUrlRef.current = objectUrl;
    
    const img = new Image();
    img.onload = () => {
      // Reset position and constraint axis on new image
      positionRef.current = { x: 0, y: 0 };
      
      // Calculate fitting dimensions
      const imgWidth = img.width;
      const imgHeight = img.height;
      
      // Determine the appropriate scaling to cover the container 
      const containerAspect = containerWidth / containerHeight;
      const imageAspect = imgWidth / imgHeight;
      
      // Scale to fill the container, ensuring entire container is covered
      let scaledWidth, scaledHeight, constraintAxis;
      
      if (imageAspect > containerAspect) {
        // Image is wider than container (relative to height)
        // Scale to match container height, width will overflow
        scaledHeight = containerHeight;
        scaledWidth = imgWidth * (containerHeight / imgHeight);
        constraintAxis = 'x';
      } else {
        // Image is taller than container (relative to width)
        // Scale to match container width, height will overflow
        scaledWidth = containerWidth;
        scaledHeight = imgHeight * (containerWidth / imgWidth);
        constraintAxis = 'y';
      }
      
      // Update state with new dimensions
      setImageDimensions({
        width: scaledWidth,
        height: scaledHeight,
        constraintAxis,
        originalWidth: imgWidth,
        originalHeight: imgHeight
      });
      
      // Center the image initially
      const initialX = (containerWidth - scaledWidth) / 2;
      const initialY = (containerHeight - scaledHeight) / 2;
      
      // Update both refs and state
      positionRef.current = { x: initialX, y: initialY };
      setPreviewPosition({ x: initialX, y: initialY });
      
      // Notify parent component
      if (onPositionChange) {
        onPositionChange({ 
          x: initialX, 
          y: initialY, 
          width: scaledWidth, 
          height: scaledHeight 
        });
      }
    };
    
    img.src = objectUrl;
    
    // Cleanup function
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [art, containerWidth, containerHeight, onPositionChange]);

  // Handler functions - no useCallback to avoid closure issues
  const handleDragStart = (e) => {
    if (!imageDimensions.constraintAxis) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: positionRef.current.x,
      initialY: positionRef.current.y
    };
    
    setIsDragging(true);
    
    // Prevent default only for touch events to avoid scrolling
    if (e.type.includes('touch')) {
      e.preventDefault();
    }
  };

  const handleDrag = (e) => {
    if (!dragRef.current || !imageDimensions.constraintAxis) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragRef.current.startX;
    const deltaY = clientY - dragRef.current.startY;
    
    // Calculate new position based on constraint axis
    let newX = positionRef.current.x;
    let newY = positionRef.current.y;
    
    if (imageDimensions.constraintAxis === 'x' || imageDimensions.constraintAxis === null) {
      newX = dragRef.current.initialX + deltaX;
      // Horizontal bounds
      const minX = containerWidth - imageDimensions.width;
      const maxX = 0;
      newX = Math.min(Math.max(newX, minX), maxX);
    }
    
    if (imageDimensions.constraintAxis === 'y' || imageDimensions.constraintAxis === null) {
      newY = dragRef.current.initialY + deltaY;
      // Vertical bounds
      const minY = containerHeight - imageDimensions.height;
      const maxY = 0;
      newY = Math.min(Math.max(newY, minY), maxY);
    }
    
    // Update position ref and state
    positionRef.current = { x: newX, y: newY };
    setPreviewPosition({ x: newX, y: newY });
    
    // Immediate update to parent
    if (onPositionChange) {
      onPositionChange({
        x: newX,
        y: newY,
        width: imageDimensions.width,
        height: imageDimensions.height
      });
    }
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
  };

  const handleDragEnd = () => {
    dragRef.current = null;
    setIsDragging(false);
    
    // Final update with accurate position
    if (onPositionChange) {
      onPositionChange({
        x: positionRef.current.x,
        y: positionRef.current.y,
        width: imageDimensions.width,
        height: imageDimensions.height
      });
    }
  };

  // Apply event listeners using effect
  useEffect(() => {
    // Handle global mouse/touch events
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, containerWidth, containerHeight, imageDimensions]);

  // Determine cursor style based on constraint axis
  const getCursorStyle = () => {
    if (!art) return 'default';
    
    switch (imageDimensions.constraintAxis) {
      case 'x': return 'ew-resize'; // Left-right arrows
      case 'y': return 'ns-resize'; // Up-down arrows
      default: return 'move';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded border-2 border-gray-700" 
      style={{ 
        width: containerWidth, 
        height: containerHeight, 
        background: '#1a1a1a',
        cursor: getCursorStyle(),
        userSelect: 'none'
      }}
    >
      {art && (
        <>
          <div
            ref={imageRef}
            className="absolute"
            style={{
              width: imageDimensions.width, 
              height: imageDimensions.height,
              transform: `translate(${previewPosition.x}px, ${previewPosition.y}px)`,
              backgroundImage: objectUrlRef.current ? `url(${objectUrlRef.current})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          />
          
          {/* Drag overlay */}
          {isDragging && (
            <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none z-10 border border-[#9FE240]"></div>
          )}
          
          {/* Directional indicators */}
          {imageDimensions.constraintAxis === 'x' && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
              <div className="text-white text-2xl bg-black bg-opacity-50 p-1 rounded-full">←</div>
              <div className="text-white text-2xl bg-black bg-opacity-50 p-1 rounded-full">→</div>
            </div>
          )}
          
          {imageDimensions.constraintAxis === 'y' && (
            <div className="absolute inset-x-0 inset-y-2 flex flex-col items-center justify-between pointer-events-none">
              <div className="text-white text-2xl bg-black bg-opacity-50 p-1 rounded-full">↑</div>
              <div className="text-white text-2xl bg-black bg-opacity-50 p-1 rounded-full">↓</div>
            </div>
          )}
          
          {/* Instruction tooltip */}
          <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-70 px-2 py-1 rounded pointer-events-none">
            {imageDimensions.constraintAxis === 'x' ? 'Drag left/right' : 
             imageDimensions.constraintAxis === 'y' ? 'Drag up/down' : 'Drag to position'}
          </div>
        </>
      )}

      {!art && (
        <div className="flex items-center justify-center h-full text-gray-400">
          <span>Upload an image to position</span>
        </div>
      )}
    </div>
  );
};

export default CardArtPositioner;