import React from 'react';

const CustomTribeLogoUploader = ({ onChange, logo }) => {
  return (
    <div className="mt-4 border border-gray-700 rounded-lg p-3 bg-black">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="font-bold text-white">Custom Tribe Logo</label>
          {logo && (
            <button 
              onClick={() => onChange(null)} 
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Remove
            </button>
          )}
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input 
              type="file" 
              accept="image/png" 
              onChange={(e) => {
                if (e.target.files[0]) {
                  onChange(e.target.files[0]);
                }
              }}
              className="w-full text-white"
            />
            <div className="text-gray-400 text-xs mt-1">
              For best results, upload a transparent PNG with a simple, flat design
            </div>
          </div>
          
          {logo && (
            <div className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded flex items-center justify-center p-1 border border-gray-600">
              <img 
                src={URL.createObjectURL(logo)} 
                alt="Custom tribe logo preview" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTribeLogoUploader;