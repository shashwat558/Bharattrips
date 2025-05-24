"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { format, parse, isValid } from 'date-fns'
import { Calendar as CalendarIcon, MapPin, Users, Search } from 'lucide-react'

interface HotelSearchProps {
  initialParams: { [key: string]: string | string[] | undefined }
}

const HotelSearch = ({ initialParams }: HotelSearchProps) => {
  const router = useRouter()
  
  // Parse initial params
  const initLocation = typeof initialParams.location === 'string' ? initialParams.location : ''
  const initGuests = typeof initialParams.guests === 'string' ? initialParams.guests : '2'
  
  // Parse dates from URL
  const parseDate = (dateStr: string | string[] | undefined) => {
    if (typeof dateStr !== 'string') return undefined
    
    const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date())
    return isValid(parsedDate) ? parsedDate : undefined
  }
  
  const initCheckIn = parseDate(initialParams.checkIn) || new Date()
  const initCheckOut = parseDate(initialParams.checkOut) || 
    new Date(new Date().setDate(new Date().getDate() + 3))
  
  // State
  const [location, setLocation] = useState(initLocation)
  const [dateRange, setDateRange] = useState({
    from: initCheckIn,
    to: initCheckOut,
  })
  const [guests, setGuests] = useState(initGuests)
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (location) params.append('location', location)
    if (dateRange.from) params.append('checkIn', format(dateRange.from, 'yyyy-MM-dd'))
    if (dateRange.to) params.append('checkOut', format(dateRange.to, 'yyyy-MM-dd'))
    params.append('guests', guests)
    
    router.push(`/hotels?${params.toString()}`)
  }
  
  return (
    <div className="bg-background rounded-xl p-6 shadow-lg">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Where are you going?"
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Dates</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM d")} &ndash; {format(dateRange.to, "MMM d, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM d, yyyy")
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange(range);
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5 Guests</SelectItem>
                <SelectItem value="6">6+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Search Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium opacity-0">Search</label>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4" /> Search Hotels
          </Button>
        </div>
      </form>
    </div>
  )
}

export default HotelSearch