import React, { useEffect, useState, useContext } from 'react';
import { Smile } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import ColorPicker from 'react-best-gradient-color-picker';
import { UpdateStorageContext } from '@/App';
import IconList from './IconList';

function IconController() {
  const storageValue = (() => {
    try {
      return JSON.parse(localStorage.getItem('value')) || {};
    } catch (error) {
      console.error('Invalid localStorage data:', error);
      return {};
    }
  })();

  const [size, setSize] = useState(storageValue?.iconSize || 280);
  const [rotate, setRotate] = useState(storageValue?.iconRotate || 0);
  const [color, setColor] = useState(storageValue?.iconColor || '#fff');
  const [icon, setIcon] = useState(storageValue?.icon || 'Smile');
  const [openDialog, setOpenDialog] = useState(false); // Dialog state

  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem('value', JSON.stringify(updatedValue));
  }, [size, rotate, color, icon, storageValue, setUpdateStorage]);

  return (
    <div className="max-w-full p-4">
      <div className="flex flex-col items-center">
        <IconList
          setSelectedIcon={(icon) => {
            setIcon(icon);
            setOpenDialog(true); // Open dialog when an icon is selected
          }}
          selectedIcon={icon}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog} // Pass dialog state setter
        />

        <div className="w-full mb-4">
          <label className="block mb-2">
            Size <span className="font-medium">{size}px</span>
          </label>
          <Slider
            defaultValue={[size]}
            max={512}
            step={1}
            onValueChange={(event) => setSize(event[0])}
            className="w-full"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block mb-2">
            Rotate <span className="font-medium">{rotate}°</span>
          </label>
          <Slider
            defaultValue={[rotate]}
            max={360}
            step={1}
            onValueChange={(event) => setRotate(event[0])}
            className="w-full"
          />
        </div>

        <div className="w-full mb-4">
          <label className="block mb-2">Icon Color</label>
          <ColorPicker
            value={color}
            onChange={(newColor) => setColor(newColor)}
            hideControls={true}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default IconController;
