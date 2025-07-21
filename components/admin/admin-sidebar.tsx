
"use client"

import React, { useState } from 'react' 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Hotel,
  CalendarDays,
  Users,
  CreditCard,
  Settings,
  BarChart,
  MessageSquare,
  LogOut,
  Menu, 
  X,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Properties', href: '/admin/properties', icon: <Hotel className="h-5 w-5" /> },
  { title: 'Bookings', href: '/admin/bookings', icon: <CalendarDays className="h-5 w-5" /> },
  { title: 'Customers', href: '/admin/customers', icon: <Users className="h-5 w-5" /> },
  { title: 'Transactions', href: '/admin/transactions', icon: <CreditCard className="h-5 w-5" /> },
  { title: 'Analytics', href: '/admin/analytics', icon: <BarChart className="h-5 w-5" /> },
  { title: 'Messages', href: '/admin/messages', icon: <MessageSquare className="h-5 w-5" /> },
  { title: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
]

interface AdminSidebarProps {
  isDesktopSidebarOpen: boolean;
  toggleDesktopSidebar: () => void;
  isMobileSheetOpen: boolean;
  setIsMobileSheetOpen: (open: boolean) => void;
}

const AdminSidebar = ({ isDesktopSidebarOpen, toggleDesktopSidebar, isMobileSheetOpen, setIsMobileSheetOpen }: AdminSidebarProps) => {
  const pathname = usePathname()
  
  return (
    <>
      
      <div className={cn(
        "hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-card border-r z-30 transition-all duration-300 ease-in-out",
        isDesktopSidebarOpen ? 'md:w-64' : 'md:w-20' 
      )}>
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center px-6 h-16 relative">
            <Link href="/admin" className="flex items-center overflow-hidden">
              <Hotel className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
              {isDesktopSidebarOpen && (
                <>
                  <span className="font-playfair text-xl font-bold whitespace-nowrap">BharatTrips</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-2 whitespace-nowrap">Admin</span>
                </>
              )}
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 -right-4 -translate-y-1/2 bg-card border border-r-0 rounded-l-none z-40 hidden md:flex"
              onClick={toggleDesktopSidebar} 
              aria-label={isDesktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isDesktopSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="mt-6 flex flex-col flex-1">
            <nav className="flex-1 px-3 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    !isDesktopSidebarOpen && "justify-center"
                  )}
                >
                  <span className={cn("flex-shrink-0", isDesktopSidebarOpen ? "mr-3" : "mr-0")}>{item.icon}</span>
                  {isDesktopSidebarOpen && (
                    <span className="whitespace-nowrap">{item.title}</span>
                  )}
                </Link>
              ))}
            </nav>
            
            <div className="p-3 mt-auto">
              <Link href="/">
                <Button variant="outline" className={cn("w-full justify-start", !isDesktopSidebarOpen && "justify-center")} size="sm">
                  <LogOut className={cn("flex-shrink-0", isDesktopSidebarOpen ? "mr-2" : "mr-0")} />
                  {isDesktopSidebarOpen && (
                    <span>Return to Site</span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar - Overlay (Sheet) */}
      <div className="md:hidden">
        {/* The SheetTrigger for mobile is now in AdminLayout's header */}
        <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
          {/* SheetTrigger is not here directly as it's handled by AdminLayout */}
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <div className="flex items-center px-6 h-16 border-b">
                <Link href="/admin" className="flex items-center" onClick={() => setIsMobileSheetOpen(false)}>
                  <Hotel className="h-6 w-6 text-primary mr-2" />
                  <span className="font-playfair text-xl font-bold">BharatTrips</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-2">Admin</span>
                </Link>
              </div>
              
              <div className="flex-1 overflow-y-auto py-2">
                <nav className="px-3 space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        pathname === item.href 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      onClick={() => setIsMobileSheetOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="p-3 border-t">
                <Link href="/" onClick={() => setIsMobileSheetOpen(false)}>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Return to Site
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default AdminSidebar