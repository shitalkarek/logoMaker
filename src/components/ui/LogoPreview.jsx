import React, { useContext, useEffect, useState } from 'react';
import { UpdateStorageContext } from '@/App';
import * as icons from 'lucide-react';
import html2canvas from 'html2canvas';

function LogoPreview({ downloadIcon }) {
  const [storageValue, setStorageValue] = useState({
    bgRounded: 0,
    bgColor: 'transparent',
    icon: null,
    iconColor: '#000',
    iconSize: 48,
    bgPadding: '0px',
    rotate: 0,
  });

  const { updateStorage } = useContext(UpdateStorageContext);

  // Load data from local storage on component mount
  useEffect(() => {
    try {
      const storageData = JSON.parse(localStorage.getItem('value')) || {};
      setStorageValue((prevState) => ({
        ...prevState,
        ...storageData,
      }));
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
  }, [updateStorage]);

  // Function to download the logo as a PNG
  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById('downloadLogoDiv');

    if (downloadLogoDiv) {
      html2canvas(downloadLogoDiv, {
        backgroundColor: null,
      }).then((canvas) => {
        const pngImage = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngImage;
        downloadLink.download = 'Logo.png';
        document.body.appendChild(downloadLink); // Append to body for security
        downloadLink.click();
        document.body.removeChild(downloadLink); // Remove after download
      });
    }
  };

  // Trigger download if downloadIcon prop is true
  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  // Icon component
  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return null; // Handle invalid or missing icons
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{
          transform: `rotate(${rotate}deg)`,
          transition: 'transform 0.3s',
        }}
      />
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300">
        <div
          id="downloadLogoDiv"
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: `${storageValue.bgRounded}px`,
            background: storageValue.bgColor || 'transparent',
            padding: storageValue.bgPadding || '0px',
          }}
        >
          {storageValue.icon && (
            <Icon
              name={storageValue.icon}
              color={storageValue.iconColor || '#000'}
              size={storageValue.iconSize || 48}
              rotate={Number(storageValue.rotate) || 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoPreview;
