
"use client" 

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger } from '@/components/ui/sheet' 
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
 
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  };

  return (
    <>
    <AdminHeader title={title} />
    <div className="flex min-h-screen bg-muted/40">
      


     
      <AdminSidebar
        isDesktopSidebarOpen={isDesktopSidebarOpen}
        toggleDesktopSidebar={toggleDesktopSidebar}
        isMobileSheetOpen={isMobileSheetOpen}
        setIsMobileSheetOpen={setIsMobileSheetOpen}
      />

      {/* Main content area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        
        "md:ml-20",
        
        isDesktopSidebarOpen ? "md:ml-64" : "md:ml-20"
        
      )}>
        
        <header className="sticky top-0 z-20 bg-background border-b h-16 flex items-center px-4 md:hidden">
          
          <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-4">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            
          </Sheet>
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>

        
        <main className="flex-1 p-6 lg:p-10">
         
          <div className="flex items-center justify-between mb-6">
            <div>
              
              <h1 className="text-3xl font-bold hidden md:block">{title}</h1>
              <p className="text-muted-foreground hidden md:block">{description}</p>
            </div>
            
          </div>
          {children}
        </main>
      </div>
    </div>
    </>
  )
}