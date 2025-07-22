"use client"

import React, { useEffect, useState } from 'react'
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
  AlertCircle,
  CircleCheck,
  CircleX
} from 'lucide-react'

import { format, parseISO } from 'date-fns'
import AdminLayout from '../admin-layout'
import { getHostPropertyBooking } from '@/lib/actions/host'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'


const getStatusColor = (status: string) => {
  switch(status) {
    case 'confirmed':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'completed':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'cancelled':
    case 'declined':
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
    case 'completed':
      return <CheckCircle className="h-4 w-4" />
    case 'pending':
      return <Clock className="h-4 w-4" />
    case 'cancelled':
    case 'declined':
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

export default function BookingsPage() {
  const [propertyBookingsData, setPropertyBookingsData] = useState<any[]>([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for modals
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [editBookingForm, setEditBookingForm] = useState<any>(null);


  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getHostPropertyBooking();
        if (response && Array.isArray(response)) {
          setPropertyBookingsData(response);

          const flattened = response.flatMap(property =>
            property.bookings.map((booking: any) => ({
              ...booking,
              property_name: property.property_name,
              property_address: property.address,
              property_image: property.photos
              // For now, using a placeholder/no image for property in booking table
            }))
          );
          setAllBookings(flattened);
        } else {
          setAllBookings([]);
          console.warn("API response for bookings was not an array or empty:", response);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [])

  const stats = {
    total: allBookings.length,
    confirmed: allBookings.filter(b => b.status === 'confirmed').length,
    pending: allBookings.filter(b => b.status === 'pending').length,
    completed: allBookings.filter(b => b.status === 'completed').length,
    cancelled: allBookings.filter(b => b.status === 'cancelled').length,
  }

 

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewDetailsOpen(true);
  };

  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking);
    // Initialize form with current booking data for editing
    setEditBookingForm({
      id: booking.id,
      status: booking.status,
      first_name: booking.first_name,
      last_name: booking.last_name,
      email_address: booking.email_address,
      phone_number: booking.phone_number,
      special_requirements: booking.special_requirements,
      // Add other editable fields as needed
    });
    setIsEditBookingOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditBookingForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditStatusChange = (value: string) => {
    setEditBookingForm((prev: any) => ({ ...prev, status: value }));
  };

  const handleSaveEdit = async () => {
    if (!editBookingForm) return;

    
    setLoading(true); 
    try {
      
      console.log("Saving changes for booking:", editBookingForm.id, editBookingForm);
      await new Promise(resolve => setTimeout(resolve, 800)); 

      
      setAllBookings(prevBookings =>
        prevBookings.map(b => (b.id === editBookingForm.id ? { ...b, ...editBookingForm } : b))
      );

      toast({
        title: "Booking Updated!",
        description: `Booking ${editBookingForm.id} has been updated.`,
      });
      setIsEditBookingOpen(false);
    } catch (error) {
      console.error("Error saving booking edit:", error);
      toast({
        title: "Error",
        description: "Failed to save booking changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    setLoading(true);
    try {
      console.log(`Confirming booking ${bookingId}`);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAllBookings(prevBookings =>
        prevBookings.map(b => (b.id === bookingId ? { ...b, status: 'confirmed' } : b))
      );
      toast({
        title: "Booking Confirmed!",
        description: `Booking ${bookingId} has been successfully confirmed.`,
      });
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast({
        title: "Error",
        description: "Failed to confirm booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineBooking = async (bookingId: string) => {
    setLoading(true);
    try {
      console.log(`Declining booking ${bookingId}`);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAllBookings(prevBookings =>
        prevBookings.map(b => (b.id === bookingId ? { ...b, status: 'declined' } : b))
      );
      toast({
        title: "Booking Declined!",
        description: `Booking ${bookingId} has been successfully declined.`,
      });
    } catch (error) {
      console.error("Error declining booking:", error);
      toast({
        title: "Error",
        description: "Failed to decline booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleCancelBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsCancelConfirmOpen(true);
  };

  const confirmCancel = async () => {
    if (!selectedBooking) return;

    setLoading(true);
    try {
      
      console.log(`Cancelling booking ${selectedBooking.id}`);
      await new Promise(resolve => setTimeout(resolve, 800)); 

      setAllBookings(prevBookings =>
        prevBookings.map(b => (b.id === selectedBooking.id ? { ...b, status: 'cancelled' } : b))
      );

      toast({
        title: "Booking Cancelled!",
        description: `Booking ${selectedBooking.id} has been successfully cancelled.`,
      });
      setIsCancelConfirmOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactGuest = (booking: any) => {
    
    toast({
      title: "Contact Guest",
      description: `Simulating contacting ${booking.first_name} ${booking.last_name} via ${booking.email_address} or ${booking.phone_number}`,
    });
    console.log("Contacting guest:", booking.user?.email || booking.email_address, booking.user?.phone_number || booking.phone_number);
  };


  if (loading) {
    return (
      <AdminLayout title="Bookings" description="Manage all property bookings">
        <div className="flex justify-center items-center h-48">
          <p>Loading bookings...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Bookings" description="Manage all property bookings">
        <div className="flex justify-center items-center h-48 text-red-500">
          <p>{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Bookings"
      description="Manage all property bookings"
    >
     
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
                
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allBookings.map((booking) => {
                const checkInDate = parseISO(booking.check_in);
                const checkOutDate = parseISO(booking.check_out);
                const createdAtDate = parseISO(booking.created_at);
                const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

                const guestName = `${booking.first_name || ''} ${booking.last_name || ''}`.trim();
                const guestEmail = booking.email_address || booking.user?.email || 'N/A';
                const guestPhone = booking.phone_number || booking.user?.phone_number || 'N/A';
                const propertyImage = "/placeholder-property.jpg"; // Placeholder


                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-medium">{booking.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(createdAtDate, 'dd MMM yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={guestName} /> {/* No guest image in data */}
                          <AvatarFallback>{guestName.charAt(0) || 'G'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{guestName || 'Unknown Guest'}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {guestEmail}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {guestPhone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                          <Image
                            src={propertyImage}
                            alt={booking.property_name || "Property"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{booking.property_name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {booking.property_address}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {format(checkInDate, 'dd MMM')} - {format(checkOutDate, 'dd MMM yyyy')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {nights} nights
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{booking.guests} guests</div>
                          <div className="text-sm text-muted-foreground">{booking.number_of_rooms} room(s)</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">₹{booking.total_price.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    {/* Hiding payment status column as it's not in the provided data */}
                    {/* <TableCell>
                      <Badge className={getPaymentStatusColor(booking.paymentStatus || 'unknown')}>
                        {(booking.paymentStatus || 'Unknown').charAt(0).toUpperCase() + (booking.paymentStatus || 'Unknown').slice(1)}
                      </Badge>
                    </TableCell> */}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {booking.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleConfirmBooking(booking.id)}>
                                <CircleCheck className="mr-2 h-4 w-4 text-green-600" />
                                Confirm Booking
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeclineBooking(booking.id)}>
                                <CircleX className="mr-2 h-4 w-4 text-red-600" />
                                Decline Booking
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem onClick={() => handleEditBooking(booking)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleContactGuest(booking)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Guest
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleCancelBooking(booking)}
                            disabled={booking.status === 'cancelled' || booking.status === 'completed'}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
              {allBookings.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Booking Details: {selectedBooking?.id}</DialogTitle>
            <DialogDescription>
              Comprehensive information about this reservation.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Guest Information</h4>
                  <p><strong>Name:</strong> {selectedBooking.first_name} {selectedBooking.last_name}</p>
                  <p><strong>Email:</strong> {selectedBooking.email_address}</p>
                  <p><strong>Phone:</strong> {selectedBooking.phone_number}</p>
                  <p><strong>Booked By:</strong> {selectedBooking.user?.name || 'N/A'}</p>
                  <p><strong>User Phone:</strong> {selectedBooking.user?.phone_number || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Property Information</h4>
                  <p><strong>Property:</strong> {selectedBooking.property_name}</p>
                  <p><strong>Address:</strong> {selectedBooking.property_address}</p>
                  <p><strong>Property ID:</strong> {selectedBooking.property_id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Booking Dates & Guests</h4>
                  <p><strong>Check-in:</strong> {format(parseISO(selectedBooking.check_in), 'dd MMM yyyy')}</p>
                  <p><strong>Check-out:</strong> {format(parseISO(selectedBooking.check_out), 'dd MMM yyyy')}</p>
                  <p><strong>Nights:</strong> {Math.round((parseISO(selectedBooking.check_out).getTime() - parseISO(selectedBooking.check_in).getTime()) / (1000 * 60 * 60 * 24))}</p>
                  <p><strong>Guests:</strong> {selectedBooking.guests}</p>
                  <p><strong>Rooms:</strong> {selectedBooking.number_of_rooms}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Pricing & Status</h4>
                  <p><strong>Total Price:</strong> ₹{selectedBooking.total_price.toLocaleString()}</p>
                  <p><strong>Cleaning Fee:</strong> ₹{selectedBooking.cleaning_fee.toLocaleString()}</p>
                  <p><strong>Status:</strong> <Badge className={getStatusColor(selectedBooking.status)}>{selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</Badge></p>
                  <p><strong>Booked On:</strong> {format(parseISO(selectedBooking.created_at), 'dd MMM yyyy HH:mm')}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Special Requirements</h4>
                <p className="text-muted-foreground italic">
                  {selectedBooking.special_requirements || 'None provided.'}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

     
      <Dialog open={isEditBookingOpen} onOpenChange={setIsEditBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Booking: {selectedBooking?.id}</DialogTitle>
            <DialogDescription>
              Make changes to this booking's details.
            </DialogDescription>
          </DialogHeader>
          {editBookingForm && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  name="status"
                  value={editBookingForm.status}
                  onValueChange={handleEditStatusChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="first_name" className="text-right">
                  Guest Name
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={editBookingForm.first_name || ''}
                  onChange={handleEditFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="last_name" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={editBookingForm.last_name || ''}
                  onChange={handleEditFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email_address" className="text-right">
                  Email
                </Label>
                <Input
                  id="email_address"
                  name="email_address"
                  type="email"
                  value={editBookingForm.email_address || ''}
                  onChange={handleEditFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone_number" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={editBookingForm.phone_number || ''}
                  onChange={handleEditFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="special_requirements" className="text-right pt-2">
                  Requirements
                </Label>
                <Textarea
                  id="special_requirements"
                  name="special_requirements"
                  value={editBookingForm.special_requirements || ''}
                  onChange={handleEditFormChange}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBookingOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelConfirmOpen} onOpenChange={setIsCancelConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel booking **{selectedBooking?.id}** for **{selectedBooking?.property_name}**? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelConfirmOpen(false)}>No, Keep Booking</Button>
            <Button variant="destructive" onClick={confirmCancel} disabled={loading}>
              {loading ? 'Cancelling...' : 'Yes, Cancel Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}