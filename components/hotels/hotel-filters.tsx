"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Filter } from 'lucide-react'

const HotelFilters = () => {
  const [priceRange, setPriceRange] = React.useState([100, 500])
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-medium">
          <Filter className="mr-2 h-5 w-5" /> Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="font-medium">Price Range</h3>
          <Slider
            defaultValue={priceRange}
            min={50}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
          />
          <div className="flex items-center justify-between">
            <p className="text-sm">${priceRange[0]}</p>
            <p className="text-sm">${priceRange[1]}+</p>
          </div>
        </div>
        
        {/* Property Type */}
        <Accordion type="multiple" defaultValue={["property-type"]}>
          <AccordionItem value="property-type">
            <AccordionTrigger className="text-base font-medium">Property Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hotel" />
                  <Label htmlFor="hotel">Hotels</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="resort" />
                  <Label htmlFor="resort">Resorts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="villa" />
                  <Label htmlFor="villa">Villas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="apartment" />
                  <Label htmlFor="apartment">Apartments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="boutique" />
                  <Label htmlFor="boutique">Boutique Hotels</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Amenities */}
        <Accordion type="multiple" defaultValue={["amenities"]}>
          <AccordionItem value="amenities">
            <AccordionTrigger className="text-base font-medium">Amenities</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" />
                  <Label htmlFor="wifi">Free WiFi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="breakfast" />
                  <Label htmlFor="breakfast">Breakfast Included</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pool" />
                  <Label htmlFor="pool">Swimming Pool</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="spa" />
                  <Label htmlFor="spa">Spa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="parking" />
                  <Label htmlFor="parking">Free Parking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gym" />
                  <Label htmlFor="gym">Fitness Center</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="restaurant" />
                  <Label htmlFor="restaurant">Restaurant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bar" />
                  <Label htmlFor="bar">Bar/Lounge</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="room-service" />
                  <Label htmlFor="room-service">Room Service</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Rating */}
        <Accordion type="multiple" defaultValue={["rating"]}>
          <AccordionItem value="rating">
            <AccordionTrigger className="text-base font-medium">Guest Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-any" />
                  <Label htmlFor="rating-any">Any</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-9plus" />
                  <Label htmlFor="rating-9plus">9+ Exceptional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-8plus" />
                  <Label htmlFor="rating-8plus">8+ Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-7plus" />
                  <Label htmlFor="rating-7plus">7+ Very Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-6plus" />
                  <Label htmlFor="rating-6plus">6+ Good</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Location */}
        <Accordion type="multiple">
          <AccordionItem value="location">
            <AccordionTrigger className="text-base font-medium">Location</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="city-center" />
                  <Label htmlFor="city-center">City Center</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="beach" />
                  <Label htmlFor="beach">Beachfront</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="airport" />
                  <Label htmlFor="airport">Near Airport</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="landmarks" />
                  <Label htmlFor="landmarks">Near Landmarks</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="pt-4 space-x-2">
          <Button className="w-full">Apply Filters</Button>
          <Button variant="outline" className="w-full mt-2">Reset</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default HotelFilters