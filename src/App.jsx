import './App.css';
import Header from './components/ui/Header';
import SideNav from './components/ui/SideNav';
import IconController from './components/ui/IconController';
import BackgroundController from './components/ui/BackgroundController';
import { useState, createContext } from 'react';
import LogoPreview from './components/ui/LogoPreview';

// Create the context
export const UpdateStorageContext = createContext();

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0); // Initial value set to 0
  const [updateStorage, setUpdateStorage] = useState({}); // State to store data globally
  const [downloadIcon, setDownloadIcon] = useState(false); // State for download trigger

  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <>
        <Header DownloadIcon={setDownloadIcon} />

        <div className="flex">
          {/* Sidebar */}
          <SideNav selectedIndex={(value) => setSelectedIndex(value)} />

          {/* Main Content */}
          <div className="flex-1 md:ml-64 grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
            <div className="md:col-span-2 p-4 border h-screen overflow-auto">
              {/* Conditional rendering based on selectedIndex */}
              {selectedIndex === 0 ? <IconController /> : <BackgroundController />}
            </div>

            <div className="md:col-span-3 p-4">
              <LogoPreview downloadIcon={downloadIcon} />
            </div>

            <div className="md:col-span-1 bg-blue-500 p-4">
              Ads
            </div>
          </div>
        </div>
      </>
    </UpdateStorageContext.Provider>
  );
}

export default App;
