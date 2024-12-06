import React, { useContext, useEffect, useState } from 'react';
import { Slider } from './slider'; // Ensure this import points to the correct file
import ColorPicker from 'react-best-gradient-color-picker';
import { UpdateStorageContext } from '@/App'; // Adjust the path as needed

function BackgroundController() {
  const storageValue = (() => {
    try {
      return JSON.parse(localStorage.getItem('value')) || {};
    } catch (error) {
      console.error('Invalid localStorage data:', error);
      return {};
    }
  })();

  const [rounded, setRounded] = useState(storageValue?.bgRounded || 0);
  const [padding, setPadding] = useState(storageValue?.bgPadding || 0);
  const [color, setColor] = useState(storageValue?.bgColor || '#000');

  // Fetch context
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  // Update localStorage when state changes
  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem('value', JSON.stringify(updatedValue));
  }, [rounded, padding, color, storageValue, setUpdateStorage]);

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <div className="py-2">
        <label className="p-2 flex justify-between items-center">
          Rounded <span>{rounded} px</span>
        </label>
        <Slider
          defaultValue={[rounded]}
          max={512}
          step={1}
          onValueChange={(event) => setRounded(event[0])}
        />
      </div>

      <div className="py-2">
        <label className="p-2 flex justify-between items-center">
          Padding <span>{padding} px</span>
        </label>
        <Slider
          defaultValue={[padding]}
          max={100}
          step={1}
          onValueChange={(event) => setPadding(event[0])}
        />
      </div>

      <div className="p-2">
        <label className="p-2">
          Background Color
          <ColorPicker
            value={color}
            onChange={(newColor) => setColor(newColor)}
            hideControls={false}
          />
        </label>
      </div>
    </div>
  );
}

export default BackgroundController;
