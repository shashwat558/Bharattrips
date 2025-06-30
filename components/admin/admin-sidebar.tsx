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
  X
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

const AdminSidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex ${isOpen ? 'md:w-64': "md:w-10"} md:flex-col md:fixed md:inset-y-0 bg-card border-r z-30`}>
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center px-6 h-16">
            <Link href="/admin" className="flex items-center">
              <Hotel className="h-6 w-6 text-primary mr-2" />
              <span className="font-playfair text-xl font-bold">BharatTrips</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-2">Admin</span>
            </Link>
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
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </nav>
            
            <div className="p-3 mt-auto">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Return to Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="flex flex-col h-full">
              <div className="flex items-center px-6 h-16 border-b">
                <Link href="/admin" className="flex items-center">
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
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="p-3 border-t">
                <Link href="/">
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