import React from 'react';
import { Button } from './button';
import { Download } from 'lucide-react';

function Header({ DownloadIcon }) {
  return (
    <div className="p-4 md:p-6 shadow-md border-b flex flex-col md:flex-row justify-between items-center bg-white space-y-4 md:space-y-0">
      {/* Logo */}
      <img
        src="/logo.webp"
        alt="Logo"
        className="h-[10vh] object-contain"
      />

      {/* Download Button */}
      <Button
        className="flex gap-2 items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-indigo-600 hover:to-purple-700 transition duration-300"
        onClick={() => DownloadIcon(true)} // Trigger download on button click
      >
        <Download className="h-5 w-5" />
        Download
      </Button>
    </div>
  );
}

export default Header;
