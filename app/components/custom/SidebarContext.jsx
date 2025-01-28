import React, { createContext, useContext, useState } from 'react';

// Create Sidebar Context
const SidebarContext = createContext();

// Custom hook to use Sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
};

// Sidebar Provider component
export const SidebarProvider = ({ children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen); // defaultOpen to control initial state

  const toggleSideBar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
};
