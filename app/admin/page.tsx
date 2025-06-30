import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  Building2,
  CalendarDays,
  CreditCard,
  DollarSign,
  Hotel,
  Layers,
  LayoutDashboard,
  Percent,
  TrendingUp,
  Users,
} from 'lucide-react'

import BookingStats from '@/components/admin/booking-stats'
import RecentBookings from '@/components/admin/recent-bookings'
import RevenueSummary from '@/components/admin/revenue-summary'
import PropertiesStats from '@/components/admin/properties-stats'
import AdminLayout from './admin-layout'

export default function AdminDashboard() {
  return (
    <AdminLayout 
      title="Dashboard" 
      description="Overview of your hotel business"
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Total Revenue</span>
                <span className="text-2xl font-bold">₹12,45,630</span>
                <div className="flex items-center text-sm text-green-500 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Total Bookings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Total Bookings</span>
                <span className="text-2xl font-bold">2,453</span>
                <div className="flex items-center text-sm text-green-500 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8.2% from last month</span>
                </div>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full text-blue-500">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Occupancy Rate */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Occupancy Rate</span>
                <span className="text-2xl font-bold">78.3%</span>
                <div className="flex items-center text-sm text-green-500 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+5.1% from last month</span>
                </div>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full text-green-500">
                <Percent className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Total Properties */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Total Properties</span>
                <span className="text-2xl font-bold">24</span>
                <div className="flex items-center text-sm text-green-500 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+2 new this month</span>
                </div>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-full text-purple-500">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BookingStats />
            </div>
            <div>
              <RecentBookings />
            </div>
          </div>
        </TabsContent>
        
        {/* Properties Tab */}
        <TabsContent value="properties">
          <PropertiesStats />
        </TabsContent>
        
        {/* Revenue Tab */}
        <TabsContent value="revenue">
          <RevenueSummary />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}