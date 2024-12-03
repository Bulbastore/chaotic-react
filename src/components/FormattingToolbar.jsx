// src/components/FormattingToolbar.jsx

import React from 'react';

const FormattingToolbar = ({ onBold, onItalic, isBold, isItalic }) => {
  return (
    <div className="flex gap-2 p-2 border-b border-gray-700">
      <button
        onClick={onBold}
        className={`px-3 py-1 rounded font-bold transition-colors ${
          isBold 
            ? 'bg-[#9FE240] text-black' 
            : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
        title="Bold"
      >
        B
      </button>
      <button
        onClick={onItalic}
        className={`px-3 py-1 rounded italic transition-colors ${
          isItalic 
            ? 'bg-[#9FE240] text-black' 
            : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
        title="Italic"
      >
        I
      </button>
    </div>
  );
};

export default FormattingToolbar;