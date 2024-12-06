import { Image, PencilRuler, Shield, Menu } from 'lucide-react';
import React, { useState } from 'react';

function SideNav({ selectedIndex }) {
  const [isOpen, setIsOpen] = useState(false); // Controls the sidebar visibility on mobile
  const [activeIndex, setActiveIndex] = useState(0); // Tracks the active menu item

  const menuList = [
    {
      id: 1,
      name: 'Icon',
      icon: PencilRuler,
    },
    {
      id: 2,
      name: 'Background',
      icon: Image,
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: Shield,
    },
  ];

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Logo for Mobile View */}
      {isOpen && (
        <div className="md:hidden fixed top-4 left-0 p-4 bg-white shadow-lg">
          <img
            src="/logo.webp"
            alt="Logo"
            className="h-[8vh] object-cover"
          />
        </div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 bg-white h-screen shadow-lg z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center border-b md:border-none">
          {/* Show logo only in desktop view */}
          <img
            src="/logo.webp"
            alt="Logo"
            className="hidden md:block h-[8vh] object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-700 ml-2">My App</h2>
        </div>

        {/* Sidebar Items */}
        {menuList.map((menu, index) => (
          <div
            key={menu.id}
            className={`p-4 flex items-center gap-4 cursor-pointer transition duration-300 ${
              activeIndex === index
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-700 hover:text-white'
            }`}
            onClick={() => {
              setActiveIndex(index);
              selectedIndex(index);
              if (isOpen) setIsOpen(false); // Close the sidebar when an item is clicked on mobile
            }}
          >
            <menu.icon className="h-5 w-5" />
            <span>{menu.name}</span>
          </div>
        ))}
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SideNav;
