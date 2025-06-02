import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string; 
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar />
      
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Header />
        
        <main className={cn(
          "flex-1 p-6 mt-[60px] overflow-y-auto min-w-0"
        )}>
          <div className={cn("flex flex-col gap-6", className)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
