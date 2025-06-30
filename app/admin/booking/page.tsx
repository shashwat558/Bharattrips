import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Calendar,
  Users,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react'

import { format } from 'date-fns'
import AdminLayout from '../admin-layout'

// Sample bookings data
const bookings = [
  {
    id: "BK12345",
    guest: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    property: {
      name: "White House Luxury Apartment",
      location: "Patna, Bihar",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
    },
    checkIn: new Date(2025, 7, 15),
    checkOut: new Date(2025, 7, 18),
    guests: 4,
    rooms: 2,
    amount: 147000,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: new Date(2025, 6, 10)
  },
  {
    id: "BK12346",
    guest: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    property: {
      name: "Royal Palace Hotel",
      location: "Mumbai, Maharashtra",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
    },
    checkIn: new Date(2025, 7, 20),
    checkOut: new Date(2025, 7, 25),
    guests: 2,
    rooms: 1,
    amount: 375000,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date(2025, 6, 15)
  },
  {
    id: "BK12347",
    guest: {
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 76543 21098",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    },
    property: {
      name: "Mountain View Resort",
      location: "Shimla, Himachal Pradesh",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
    },
    checkIn: new Date(2025, 6, 5),
    checkOut: new Date(2025, 6, 10),
    guests: 6,
    rooms: 3,
    amount: 175000,
    status: "completed",
    paymentStatus: "paid",
    createdAt: new Date(2025, 5, 20)
  },
  {
    id: "BK12348",
    guest: {
      name: "Sunita Singh",
      email: "sunita.singh@email.com",
      phone: "+91 65432 10987",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    property: {
      name: "White House Luxury Apartment",
      location: "Patna, Bihar",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
    },
    checkIn: new Date(2025, 7, 25),
    checkOut: new Date(2025, 7, 28),
    guests: 3,
    rooms: 1,
    amount: 147000,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: new Date(2025, 6, 18)
  }
]

const getStatusColor = (status: string) => {
  switch(status) {
    case 'confirmed':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'completed':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'cancelled':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const getPaymentStatusColor = (status: string) => {
  switch(status) {
    case 'paid':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'refunded':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'failed':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'confirmed':
      return <CheckCircle className="h-4 w-4" />
    case 'pending':
      return <Clock className="h-4 w-4" />
    case 'completed':
      return <CheckCircle className="h-4 w-4" />
    case 'cancelled':
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

export default function BookingsPage() {
  // Calculate stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <AdminLayout 
      title="Bookings" 
      description="Manage all property bookings"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Complete list of all property bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(booking.createdAt, 'dd MMM yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.guest.image} alt={booking.guest.name} />
                        <AvatarFallback>{booking.guest.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{booking.guest.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {booking.guest.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {booking.guest.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden">
                        <Image
                          src={booking.property.image}
                          alt={booking.property.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{booking.property.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.property.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {format(booking.checkIn, 'dd MMM')} - {format(booking.checkOut, 'dd MMM yyyy')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{booking.guests} guests</div>
                        <div className="text-sm text-muted-foreground">{booking.rooms} room(s)</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">₹{booking.amount.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Booking
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}