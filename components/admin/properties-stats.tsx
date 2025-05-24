"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Star, MapPin, ArrowUpRight } from 'lucide-react'

// Sample data - in a real app, this would come from an API
const occupancyData = [
  { name: 'Grand Plaza', occupancy: 85 },
  { name: 'Ocean View', occupancy: 78 },
  { name: 'Mountain Retreat', occupancy: 92 },
  { name: 'Urban Boutique', occupancy: 73 },
  { name: 'Sunset Bay', occupancy: 83 },
]

const topProperties = [
  {
    id: 1,
    name: "Grand Plaza Hotel & Spa",
    location: "Paris, France",
    rating: 4.8,
    bookings: 342,
    revenue: 136800,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    location: "Aspen, Colorado",
    rating: 4.9,
    bookings: 289,
    revenue: 129650,
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Bali, Indonesia",
    rating: 4.7,
    bookings: 256,
    revenue: 76544,
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  },
]

const PropertiesStats = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Occupancy Rates */}
      <div className="lg:col-span-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Property Occupancy Rates</CardTitle>
            <CardDescription>Current occupancy percentage by property</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupancyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" domain={[0, 100]} className="text-xs" />
                <YAxis dataKey="name" type="category" className="text-xs" width={100} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Occupancy']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar 
                  dataKey="occupancy" 
                  fill="hsl(var(--chart-2))" 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Performing Properties */}
      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Top Properties</CardTitle>
            <CardDescription>Highest revenue generators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {topProperties.map((property, index) => (
              <div key={property.id} className="flex gap-4">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{property.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center text-xs mt-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                    <span>{property.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{property.bookings} bookings</span>
                  </div>
                  <div className="text-sm font-semibold mt-1">${property.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/properties">
                <span>View All Properties</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PropertiesStats