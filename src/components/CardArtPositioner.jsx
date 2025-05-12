import React, { useState, useRef, useEffect, useCallback } from 'react';

const CardArtPositioner = ({ art, onPositionChange, containerWidth, containerHeight }) => {
  // Use refs for values that shouldn't trigger re-renders during dragging
  const dragRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const throttleTimerRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  
  // Keep state for values that should trigger UI updates
  const [imageDimensions, setImageDimensions] = useState({ 
    width: 0, height: 0, constraintAxis: null 
  });
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Load and calculate initial image dimensions
  useEffect(() => {
    if (!art) return;
    
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
    
    img.src = URL.createObjectURL(art);
    return () => URL.revokeObjectURL(img.src);
  }, [art, containerWidth, containerHeight, onPositionChange]);

  // Schedule an update to the parent component with throttling
  const schedulePositionUpdate = useCallback(() => {
    // Only update the parent component at most every 150ms during drag
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 150 && isDragging) {
      // If we're throttling and a timer isn't already set, schedule one
      if (!throttleTimerRef.current) {
        throttleTimerRef.current = setTimeout(() => {
          throttleTimerRef.current = null;
          lastUpdateTimeRef.current = Date.now();
          
          // Notify parent component with the latest position
          if (onPositionChange) {
            onPositionChange({
              x: positionRef.current.x,
              y: positionRef.current.y,
              width: imageDimensions.width,
              height: imageDimensions.height,
              isDragging: true // Flag to indicate we're in drag mode
            });
          }
        }, 150 - (now - lastUpdateTimeRef.current));
      }
    } else {
      // Clear any pending timer
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
        throttleTimerRef.current = null;
      }
      
      // Update immediately
      lastUpdateTimeRef.current = now;
      
      // Notify parent component
      if (onPositionChange) {
        onPositionChange({
          x: positionRef.current.x,
          y: positionRef.current.y,
          width: imageDimensions.width,
          height: imageDimensions.height,
          isDragging: isDragging // Flag to indicate drag state
        });
      }
    }
  }, [imageDimensions, isDragging, onPositionChange]);

  // Memoized drag handlers to prevent recreating functions on each render
  const handleDragStart = useCallback((e) => {
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
    
    // Notify parent that dragging has started
    lastUpdateTimeRef.current = 0; // Reset the timer to ensure immediate first update
    schedulePositionUpdate();
    
    // Prevent default only for touch events to avoid scrolling
    if (e.type.includes('touch')) {
      e.preventDefault();
    }
  }, [imageDimensions.constraintAxis, schedulePositionUpdate]);

  // Throttled drag handler uses requestAnimationFrame for UI updates with reduced parent callbacks
  const handleDrag = useCallback((e) => {
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
    
    // Update position ref (doesn't trigger re-render)
    positionRef.current = { x: newX, y: newY };
    
    // Use requestAnimationFrame to batch UI updates
    requestAnimationFrame(() => {
      // Always update local preview position for smooth visual feedback
      setPreviewPosition({ x: newX, y: newY });
      
      // But throttle updates to the parent component
      schedulePositionUpdate();
    });
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
  }, [containerWidth, containerHeight, imageDimensions, schedulePositionUpdate]);

  const handleDragEnd = useCallback(() => {
    dragRef.current = null;
    
    // Final update with accurate position
    if (onPositionChange) {
      onPositionChange({
        x: positionRef.current.x,
        y: positionRef.current.y,
        width: imageDimensions.width,
        height: imageDimensions.height,
        isDragging: false // Explicitly mark dragging as done
      });
    }
    
    // Clear any pending throttled updates
    if (throttleTimerRef.current) {
      clearTimeout(throttleTimerRef.current);
      throttleTimerRef.current = null;
    }
    
    setIsDragging(false);
  }, [imageDimensions, onPositionChange]);

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
  }, [isDragging, handleDrag, handleDragEnd]);

  // Clean up any pending timers on unmount
  useEffect(() => {
    return () => {
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
      }
    };
  }, []);

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
              backgroundImage: `url(${URL.createObjectURL(art)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          />
          
          {/* Drag overlay - appears during dragging to indicate active state */}
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
          
          {/* Always-visible instruction tooltip */}
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