"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Calendar,
  Star,
  ChevronRight
} from 'lucide-react'
import { getUserAllData } from '@/lib/actions/host' 


const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  
  address: z.string().optional()
})


interface UserProfileData {
  name: string;
  email: string;
  phone?: string;
  address?: string; 
  memberSince?: string;
  tier?: string;
  points?: number;
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  created_at: Date
}

interface Booking {
  id: string | number;
  hotel: string; 
  location: string;
  dates: string; 
  image: string; 
  status: string;
  rating?: number; 
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedBookings = await getUserAllData();
        console.log("Fetched Booking Data:", fetchedBookings);

        if (fetchedBookings && fetchedBookings.length > 0) {
          const firstBooking = fetchedBookings[0]; 

          
          const upcoming = fetchedBookings.filter((booking: any) => new Date(booking.check_in) >= new Date())
            .map((booking: any) => ({
              id: booking.booking_id,
              hotel: booking.property_name,
              location: `${booking.city}, ${booking.state}`, 
              dates: `${new Date(booking.check_in).toLocaleDateString()} - ${new Date(booking.check_out).toLocaleDateString()}`,
              image: booking.photos && booking.photos.length > 0 ? booking.photos[0] : '/placeholder-hotel.jpg',
              status: booking.status
            }));

          const past = fetchedBookings.filter((booking: any) => new Date(booking.check_in) < new Date())
            .map((booking: any) => ({
              id: booking.booking_id,
              hotel: booking.property_name,
              location: `${booking.city}, ${booking.state}`, 
              dates: `${new Date(booking.check_in).toLocaleDateString()} - ${new Date(booking.check_out).toLocaleDateString()}`,
              image: booking.photos && booking.photos.length > 0 ? booking.photos[0] : '/placeholder-hotel.jpg',
              rating: 5 
            }));

          const transformedData: UserProfileData = {
            name: firstBooking.name || "Guest User",
            email: firstBooking.email || "guest@example.com",
            phone: "+1 (555) 123-4567", 
            address: "", 
            avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg", 
            memberSince: firstBooking.created_at ? new Date(firstBooking.created_at).getFullYear().toString() : "2024", 
            tier: "Gold Member", 
            points: 2500, 
            upcomingBookings: upcoming,
            pastBookings: past
          };
          setUserProfile(transformedData);
          reset({
            name: transformedData.name,
            email: transformedData.email,
            phone: transformedData.phone,
            address: transformedData.address
          });
        } else {
            
            setUserProfile({
                name: "New User",
                email: "user@example.com",
                upcomingBookings: [],
                pastBookings: [],
                address: "",
                phone: "",
                created_at: new Date()
            });
            reset({
                name: "New User",
                email: "user@example.com",
                address: "",
                phone: ""
            });
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
        
        setUserProfile({
            name: "Error User",
            email: "error@example.com",
            upcomingBookings: [],
            pastBookings: [],
            address: "Error loading address",
            phone: "Error loading phone",
            created_at: new Date()
            
        });
        reset({
            name: "Error User",
            email: "error@example.com",
            address: "Error loading address",
            phone: "Error loading phone"
        });
      }
    };
    fetchUserData();
  }, [reset]);

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log("Updated Profile Data:", data);
   
    setIsEditing(false);
  };

  
  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Overview */}
          <div className="w-full lg:w-1/3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={userProfile.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-playfair text-2xl font-bold">{userProfile.name}</h2>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                  <Badge className="mt-2" variant="secondary">{userProfile.tier}</Badge>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reward Points</p>
                      <p className="font-medium">{userProfile.points} points</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium">{userProfile.memberSince}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6">View Rewards</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" /> Privacy & Security
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="bookings">
              <TabsList>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="settings">Profile Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-6">
                {/* Upcoming Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Stays</CardTitle>
                    <CardDescription>Your confirmed and pending reservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userProfile.upcomingBookings.length > 0 ? (
                        userProfile.upcomingBookings.map((booking) => (
                          <div key={booking.id} className="flex gap-4">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={booking.image}
                                alt={booking.hotel}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{booking.hotel}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {booking.location}
                              </div>
                              <div className="flex items-center text-sm mt-1">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {booking.dates}
                              </div>
                              <Badge
                                variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                                className="mt-2"
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No upcoming bookings.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Past Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Past Stays</CardTitle>
                    <CardDescription>Your travel history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userProfile.pastBookings.length > 0 ? (
                        userProfile.pastBookings.map((booking) => (
                          <div key={booking.id} className="flex gap-4">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={booking.image}
                                alt={booking.hotel}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{booking.hotel}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {booking.location}
                              </div>
                              <div className="flex items-center text-sm mt-1">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {booking.dates}
                              </div>
                              <div className="flex items-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < (booking.rating || 0)
                                        ? "text-accent fill-accent"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No past bookings.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </div>
                      <Button
                        variant={isEditing ? "ghost" : "outline"}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...register('name')}
                            id="name"
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...register('email')}
                            id="email"
                            type="email"
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...register('phone')}
                            id="phone"
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...register('address')}
                            id="address"
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <Button type="submit" className="w-full">
                          Save Changes
                        </Button>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}