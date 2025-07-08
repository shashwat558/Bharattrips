"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { format, addDays } from 'date-fns'
import { Calendar as CalendarIcon, Users, ChevronRight } from 'lucide-react'

interface ReservationBoxProps {
  hotel: {
    id: string
    price: number
  }
}

const ReservationBox = ({ hotel }: ReservationBoxProps) => {
  const router = useRouter()
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 3),
  })
  const [guests, setGuests] = useState("2")
  const [rooms, setRooms] = useState("1")
  
  const handleBookNow = () => {
    const params = new URLSearchParams()
    if (dateRange.from) params.append('checkIn', format(dateRange.from, 'yyyy-MM-dd'))
    if (dateRange.to) params.append('checkOut', format(dateRange.to, 'yyyy-MM-dd'))
    params.append('guests', guests)
    params.append('rooms', rooms)
    
    router.push(`/booking/${hotel.id}?${params.toString()}`)
  }
  
  const nightsCount = dateRange.from && dateRange.to 
    ? Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0
  
  const subtotal = hotel.price * nightsCount
  const taxes = Math.round(subtotal * 0.1)
  const total = subtotal + taxes
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Stay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Dates</label>
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
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to });
                    }
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <div className="text-sm text-muted-foreground">
            {nightsCount} {nightsCount === 1 ? 'night' : 'nights'}
          </div>
        </div>
        
        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
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
        
        {/* Rooms */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rooms</label>
          <Select value={rooms} onValueChange={setRooms}>
            <SelectTrigger>
              <SelectValue placeholder="Number of rooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Room</SelectItem>
              <SelectItem value="2">2 Rooms</SelectItem>
              <SelectItem value="3">3 Rooms</SelectItem>
              <SelectItem value="4">4 Rooms</SelectItem>
              <SelectItem value="5">5+ Rooms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator className="my-4" />
        
        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>${hotel.price} x {nightsCount} nights</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes and fees</span>
            <span>${taxes}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleBookNow} className="w-full">
          Book Now <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ReservationBox