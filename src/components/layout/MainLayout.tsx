
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <main 
        className={`transition-all duration-300 pt-16 min-h-screen ${
          sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="container px-4 py-6 mx-auto max-w-7xl animate-fadeIn">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
