import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as lucideIcons from 'lucide-react'; // Import all icons from Lucide
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BASE_URL = 'https://logoexpress.tubeguruji.com/getIcons.php';

function IconList({ setSelectedIcon, selectedIcon, openDialog, setOpenDialog }) {
  const [pngIcons, setPngIcons] = useState([]);
  const iconList = [
    'Activity', 'Airplay', 'AlignCenter', 'AlignJustify', 'AlignLeft', 'AlignRight', 'Anchor',
    'Aperture', 'Archive', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'AtSign', 'Award',
    'Smile', 'Heart', 'Star', 'Sun', 'Moon'
  ];

  useEffect(() => {
    getPngIcons();
  }, []);

  const getPngIcons = () => {
    axios.get(BASE_URL).then((resp) => {
      console.log('PNG Icons:', resp.data);
      setPngIcons(resp.data); // Assuming the response has the icons in the format you need
    }).catch((error) => {
      console.error('Error fetching icons:', error);
    });
  };

  const Icon = ({ name, color, size }) => {
    const LucidIcon = lucideIcons[name];
    if (!LucidIcon) return null;
    return <LucidIcon color={color} size={size} />;
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <label className="text-lg font-semibold mb-2">Icon Preview</label>
        <div
          onClick={() => setOpenDialog(true)} // Open dialog when preview is clicked
          className="p-3 cursor-pointer bg-gray-200 rounded-md w-20 h-20 flex justify-center items-center"
        >
          {selectedIcon ? (
            <Icon name={selectedIcon} color="#000" size={40} />
          ) : (
            <Icon name="Smile" color="#000" size={40} />
          )}
        </div>
        <p className="mt-2 text-center text-sm text-gray-500">Click for more icons</p>
      </div>

      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pick Your Favorite Icon from List</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="icon" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="icons">ICONS</TabsTrigger>
                  <TabsTrigger value="color-icons">COLOR ICONS</TabsTrigger>
                </TabsList>
                <TabsContent value="icons">
                  <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-4'>
                    {iconList.map((icon, index) => (
                      <div
                        key={index}
                        className="p-2 border flex rounded-sm items-center justify-center cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedIcon(icon);
                          setOpenDialog(false); // Close dialog after selecting an icon
                        }}
                      >
                        <Icon name={icon} color="#111" size={24} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="color-icons">
                  <div className='p-4'>
                    <p>Color icons list feature coming soon!</p>
                    {/* Implement your color icons section here */}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default IconList;
