import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

// Sample data - in a real app, this would come from an API
const recentBookings = [
  {
    id: 'BK12345',
    guest: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    hotel: 'Grand Plaza Hotel & Spa',
    checkIn: new Date(2025, 7, 15),
    checkOut: new Date(2025, 7, 18),
    amount: 1197,
    status: 'confirmed'
  },
  {
    id: 'BK12346',
    guest: {
      name: 'Emma Williams',
      email: 'emma.w@example.com',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    hotel: 'Ocean View Resort',
    checkIn: new Date(2025, 7, 20),
    checkOut: new Date(2025, 7, 25),
    amount: 1495,
    status: 'confirmed'
  },
  {
    id: 'BK12347',
    guest: {
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    hotel: 'Mountain Retreat Lodge',
    checkIn: new Date(2025, 8, 5),
    checkOut: new Date(2025, 8, 10),
    amount: 2245,
    status: 'pending'
  },
  {
    id: 'BK12348',
    guest: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    hotel: 'Urban Boutique Hotel',
    checkIn: new Date(2025, 7, 25),
    checkOut: new Date(2025, 7, 28),
    amount: 1047,
    status: 'cancelled'
  }
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'confirmed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'cancelled':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const RecentBookings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Latest booking activity across all properties</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {recentBookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={booking.guest.image} alt={booking.guest.name} />
                <AvatarFallback>{booking.guest.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-medium">{booking.guest.name}</h4>
                <p className="text-xs text-muted-foreground">{booking.hotel}</p>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{format(booking.checkIn, 'MMM d')} - {format(booking.checkOut, 'MMM d')}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">${booking.amount}</p>
              <Badge 
                variant="outline" 
                className={cn("text-xs mt-1", getStatusColor(booking.status))}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/admin/bookings">View All Bookings</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RecentBookings