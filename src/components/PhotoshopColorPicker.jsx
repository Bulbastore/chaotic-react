import { useEffect, useRef } from 'react';

const GradientSlider = ({ value, min, max, onChange, type, hue, saturation }) => {
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  
  // Draw the appropriate gradient based on slider type
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear the canvas
    context.clearRect(0, 0, width, height);
    
    // Create gradient
    const gradient = context.createLinearGradient(0, 0, width, 0);
    
    if (type === 'hue') {
      // Hue slider - full color spectrum
      for (let i = 0; i <= 360; i += 60) {
        gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
      }
      // Complete the circle
      gradient.addColorStop(1, `hsl(360, 100%, 50%)`);
    } 
    else if (type === 'saturation') {
      // Saturation slider - gray to full color
      gradient.addColorStop(0, `hsl(${hue}, 0%, 50%)`);
      gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    }
    
    // Fill with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    
    // Draw a cleaner indicator for the current value
    const position = ((value - min) / (max - min)) * width;
    
    // Draw vertical line
    context.beginPath();
    context.moveTo(position, -3);
    context.lineTo(position, height + 3);
    context.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    context.lineWidth = 2;
    context.stroke();
    
    // Add small triangle pointers at top and bottom of line
    const triangleSize = 6;
    
    // Top triangle
    context.beginPath();
    context.moveTo(position - triangleSize, -3);
    context.lineTo(position + triangleSize, -3);
    context.lineTo(position, triangleSize);
    context.closePath();
    context.fillStyle = 'white';
    context.fill();
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    context.lineWidth = 1;
    context.stroke();
    
    // Bottom triangle
    context.beginPath();
    context.moveTo(position - triangleSize, height + 3);
    context.lineTo(position + triangleSize, height + 3);
    context.lineTo(position, height - triangleSize);
    context.closePath();
    context.fillStyle = 'white';
    context.fill();
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    context.lineWidth = 1;
    context.stroke();
    
  }, [value, min, max, type, hue, saturation]);
  
  // Handle mouse/touch interactions
  const handlePointerDown = (e) => {
    isDragging.current = true;
    updateValueFromPosition(e);
    
    // Capture events outside the canvas
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updateValueFromPosition(e);
  };
  
  const handlePointerUp = () => {
    isDragging.current = false;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };
  
  const updateValueFromPosition = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const width = rect.width;
    
    // Calculate value based on position
    let newValue = min + (max - min) * (x / width);
    
    // Clamp value to range
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Round to 2 decimal places for saturation
    if (type === 'saturation') {
      newValue = Math.round(newValue * 100) / 100;
    } else {
      newValue = Math.round(newValue);
    }
    
    onChange(newValue);
  };
  
  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={24}
      onPointerDown={handlePointerDown}
      className="w-full h-6 rounded-md cursor-pointer"
      style={{ touchAction: 'none' }}
    />
  );
};

const PhotoshopColorPicker = ({ color, onChange }) => {
  // Function to reset saturation to 50%
  const resetToDefault = () => {
    onChange({...color, s: 0.5});
  };
  
  return (
    <div className="w-full border border-gray-700 rounded-lg p-4 bg-black">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-bold">Custom Tribe Color</h3>
        <button 
          onClick={resetToDefault}
          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm transition-colors"
        >
          Reset to Default
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-white text-sm">Hue: {Math.round(color.h)}°</label>
            <input 
              type="number"
              min="0"
              max="360"
              value={Math.round(color.h)}
              onChange={(e) => onChange({...color, h: Number(e.target.value)})}
              className="w-16 bg-gray-800 text-white text-right px-2 rounded"
            />
          </div>
          <GradientSlider 
            type="hue"
            value={color.h}
            min={0}
            max={360}
            onChange={(value) => onChange({...color, h: value})}
            hue={color.h}
            saturation={color.s}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <div>
              <label className="text-white text-sm">Saturation: {Math.round(color.s * 100)}%</label>
              <span className="text-gray-400 text-xs ml-2">(50% recommended)</span>
            </div>
            <input 
              type="number"
              min="0"
              max="100"
              value={Math.round(color.s * 100)}
              onChange={(e) => onChange({...color, s: Number(e.target.value) / 100})}
              className="w-16 bg-gray-800 text-white text-right px-2 rounded"
            />
          </div>
          <GradientSlider 
            type="saturation"
            value={color.s}
            min={0}
            max={1}
            onChange={(value) => onChange({...color, s: value})}
            hue={color.h}
            saturation={color.s}
          />
        </div>
      </div>
      
      {/* Debug display - hidden in production */}
      <div className="mt-3 text-xs text-gray-400 hidden">
        HSL: {Math.round(color.h)}°, {Math.round(color.s * 100)}%, 50%
      </div>
    </div>
  );
};

export default PhotoshopColorPicker;