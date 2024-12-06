import React, { useState } from 'react';
import { ColorPicker as BestGradientColorPicker } from 'react-best-gradient-color-picker'; // Adjust import as needed

// Component definition
function ColorPickerComponent({ hideController = false }) {
  const [color, setColor] = useState('rgba(255, 255, 255, 1)');

  return (
    <div>
      <BestGradientColorPicker
        value={color}
        onChange={(e)=>{setColor(e); selectedColor(e)}}
        hideControls={hideController}
        hideEyeDrop
        hideAdvancedSliders
        hideColorGuide
        hideInputType
      />
    </div>
  );
}

export default ColorPickerComponent;
