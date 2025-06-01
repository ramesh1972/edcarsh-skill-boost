
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

export const useMenuLogic = (allNavItems: NavigationItem[]) => {
  const [selectedMoreItem, setSelectedMoreItem] = useState<NavigationItem | null>(null);
  const location = useLocation();

  // Dynamic menu calculation
  const getMenuItems = () => {
    const baseMainItems = allNavItems.slice(0, 5);
    let mainItems = [...baseMainItems];
    let moreItems = allNavItems.slice(5);

    if (selectedMoreItem) {
      // Add selected item as 6th item
      mainItems.push(selectedMoreItem);
      // Remove it from more items
      moreItems = moreItems.filter(item => item.href !== selectedMoreItem.href);
    }

    return { mainItems, moreItems };
  };

  // Handle more menu item selection
  const handleMoreItemClick = (item: NavigationItem) => {
    setSelectedMoreItem(item);
  };

  // Check if current route is in more menu originally and set it as selected
  useEffect(() => {
    const currentItem = allNavItems.find(item => item.href === location.pathname);
    const isInMoreMenu = allNavItems.slice(5).some(item => item.href === location.pathname);
    
    if (currentItem && isInMoreMenu) {
      setSelectedMoreItem(currentItem);
    }
  }, [location.pathname, allNavItems]);

  return {
    ...getMenuItems(),
    handleMoreItemClick
  };
};
