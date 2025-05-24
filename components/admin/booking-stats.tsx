"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

// Sample data - in a real app, this would come from an API
const bookingData = [
  { name: 'Jan', Bookings: 120, Cancellations: 18 },
  { name: 'Feb', Bookings: 145, Cancellations: 12 },
  { name: 'Mar', Bookings: 190, Cancellations: 21 },
  { name: 'Apr', Bookings: 210, Cancellations: 15 },
  { name: 'May', Bookings: 250, Cancellations: 20 },
  { name: 'Jun', Bookings: 280, Cancellations: 25 },
  { name: 'Jul', Bookings: 320, Cancellations: 28 },
  { name: 'Aug', Bookings: 310, Cancellations: 32 },
  { name: 'Sep', Bookings: 270, Cancellations: 22 },
  { name: 'Oct', Bookings: 230, Cancellations: 19 },
  { name: 'Nov', Bookings: 180, Cancellations: 15 },
  { name: 'Dec', Bookings: 240, Cancellations: 24 },
]

const weeklyData = [
  { name: 'Mon', Bookings: 35, Cancellations: 5 },
  { name: 'Tue', Bookings: 45, Cancellations: 3 },
  { name: 'Wed', Bookings: 42, Cancellations: 4 },
  { name: 'Thu', Bookings: 50, Cancellations: 6 },
  { name: 'Fri', Bookings: 55, Cancellations: 2 },
  { name: 'Sat', Bookings: 70, Cancellations: 8 },
  { name: 'Sun', Bookings: 60, Cancellations: 7 },
]

const roomTypeData = [
  { name: 'Deluxe King', Bookings: 120 },
  { name: 'Executive Suite', Bookings: 80 },
  { name: 'Family Room', Bookings: 60 },
  { name: 'Standard Double', Bookings: 90 },
  { name: 'Presidential Suite', Bookings: 30 },
]

const BookingStats = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Booking Overview</CardTitle>
        <CardDescription>Analyze your booking trends and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="roomType">By Room Type</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="yearly" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCancellations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="Bookings" 
                  stroke="hsl(var(--chart-1))" 
                  fillOpacity={1} 
                  fill="url(#colorBookings)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="Cancellations" 
                  stroke="hsl(var(--chart-3))" 
                  fillOpacity={1} 
                  fill="url(#colorCancellations)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="weekly" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeeklyBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorWeeklyCancellations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="Bookings" 
                  stroke="hsl(var(--chart-2))" 
                  fillOpacity={1} 
                  fill="url(#colorWeeklyBookings)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="Cancellations" 
                  stroke="hsl(var(--chart-4))" 
                  fillOpacity={1} 
                  fill="url(#colorWeeklyCancellations)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="roomType" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roomTypeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="Bookings" 
                  fill="hsl(var(--chart-5))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default BookingStats