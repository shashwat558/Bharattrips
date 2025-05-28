"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  MailCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  Download, 
  Printer,
  Phone
} from 'lucide-react'

const BookingConfirmationPage = () => {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id') || '1'
  
  // In a real app, this would come from an API
  const bookingData = {
    id: "BK" + (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1),
    hotel: {
      id: bookingId,
      name: "Grand Plaza Hotel & Spa",
      address: "123 Avenue des Champs-Élysées, 75008 Paris, France",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    },
    guest: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    dates: {
      checkIn: new Date(2025, 6, 15),
      checkOut: new Date(2025, 6, 18),
    },
    room: {
      name: "Deluxe King Room",
      guests: 2,
      rooms: 1,
    },
    payment: {
      total: 1399,
      method: "Credit Card",
      last4: "4242",
    },
    createdAt: new Date(),
  };
  
  const nightsCount = Math.round(
    (bookingData.dates.checkOut.getTime() - bookingData.dates.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your booking. A confirmation has been sent to your email.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Booking Reference */}
              <div className="w-full md:w-1/3 p-4 bg-muted rounded-lg text-center">
                <h2 className="text-lg font-medium mb-2">Booking Reference</h2>
                <p className="text-2xl font-bold mb-4">{bookingData.id}</p>
                <div className="inline-flex items-center text-sm text-muted-foreground">
                  <MailCheck className="h-4 w-4 mr-1" />
                  Confirmation sent to {bookingData.guest.email}
                </div>
              </div>
              
              {/* Hotel Info */}
              <div className="w-full md:w-2/3">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={bookingData.hotel.image}
                      alt={bookingData.hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold">{bookingData.hotel.name}</h3>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {bookingData.hotel.address}
                    </div>
                    <div className="flex items-center mt-3">
                      <Phone className="h-4 w-4 mr-1 text-primary" />
                      <span className="text-sm">+33 1 23 45 67 89</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Check-in</div>
                <div className="font-medium">{formatDate(bookingData.dates.checkIn)}</div>
                <div className="text-sm">From 3:00 PM</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Check-out</div>
                <div className="font-medium">{formatDate(bookingData.dates.checkOut)}</div>
                <div className="text-sm">Before 12:00 PM</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Stay Duration</div>
                <div className="font-medium">{nightsCount} {nightsCount === 1 ? 'night' : 'nights'}</div>
                <div className="text-sm">{bookingData.room.rooms} {bookingData.room.rooms === 1 ? 'room' : 'rooms'}, {bookingData.room.guests} {bookingData.room.guests === 1 ? 'guest' : 'guests'}</div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Room & Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Room Details</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="font-medium mb-1">{bookingData.room.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {bookingData.room.guests} {bookingData.room.guests === 1 ? 'guest' : 'guests'} • Non-refundable
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Includes:</span> Free WiFi, Breakfast, Air conditioning
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Payment Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span>Total Paid</span>
                    <span className="font-bold">${bookingData.payment.total}</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <CreditCard className="h-3 w-3 mr-1" />
                    {bookingData.payment.method} ending in {bookingData.payment.last4}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="flex-1">
                <Download className="mr-2 h-4 w-4" /> Download Confirmation
              </Button>
              <Button variant="outline" className="flex-1">
                <Printer className="mr-2 h-4 w-4" /> Print Confirmation
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Need Help? */}
          <Card className="flex-1">
            <CardContent className="p-6">
              <h3 className="font-playfair text-lg font-bold mb-3">Need Help?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                If you have any questions about your booking, our customer service team is here to help.
              </p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
          
          {/* Manage Booking */}
          <Card className="flex-1">
            <CardContent className="p-6">
              <h3 className="font-playfair text-lg font-bold mb-3">Manage Your Booking</h3>
              <p className="text-muted-foreground text-sm mb-4">
                You can view, modify, or cancel your booking through your account.
              </p>
              <Button className="w-full">Go to My Bookings</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Link href="/">
            <Button variant="link">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmationPage