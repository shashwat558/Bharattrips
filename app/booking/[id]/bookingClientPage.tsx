"use client"

import React  from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { format, parse, isValid } from 'date-fns'
import { MapPin, Calendar, Users, ArrowLeft} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Form validation schema
const bookingFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(["credit-card", "paypal"]),
  cardName: z.string().min(2).optional(),
  cardNumber: z.string().min(16).max(19).optional(),
  expiryDate: z.string().min(5).max(5).optional(),
  cvv: z.string().min(3).max(4).optional(),
  savePaymentInfo: z.boolean().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

// This would come from an API in a real app
const hotelData = {
  id: 1,
  name: "Grand Plaza Hotel & Spa",
  location: "Paris, France",
  price: 399,
  image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
};

const BookingClientPage = ({id}: {id: number}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Parse dates from URL
  const parseDate = (dateStr: string | null) => {
    if (!dateStr) return undefined
    
    const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date())
    return isValid(parsedDate) ? parsedDate : undefined
  }
  
  const checkIn = parseDate(searchParams.get('checkIn')) || new Date()
  const checkOut = parseDate(searchParams.get('checkOut')) || 
    new Date(new Date().setDate(new Date().getDate() + 3))
  
  const guests = searchParams.get('guests') || '2'
  const roomCount = searchParams.get('rooms') || '1'
  
  const nightsCount = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  )
  
  const subtotal = hotelData.price * nightsCount * parseInt(roomCount)
  const taxes = Math.round(subtotal * 0.1)
  const serviceFee = 45
  const total = subtotal + taxes + serviceFee
  
  // Form setup
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
      paymentMethod: "credit-card",
      savePaymentInfo: false,
      agreeTerms: false,
    },
  })
  
  const paymentMethod = form.watch("paymentMethod")
  
  const onSubmit = (values: z.infer<typeof bookingFormSchema>) => {
    // In a real app, this would submit the booking to an API
    console.log(values)
    
    // Redirect to confirmation page
    router.push(`/booking/confirmation?id=${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <Link 
        href={`/hotels/${id}`} 
        className="flex items-center text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to hotel details
      </Link>
      
      <h1 className="font-playfair text-3xl font-bold mb-2">Complete Your Booking</h1>
      <p className="text-muted-foreground mb-8">You&apos;re almost there! Please fill in the details below to secure your reservation.</p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Booking Form */}
        <div className="w-full lg:w-2/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Guest Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormDescription>
                            Booking confirmation will be sent to this email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Any specific preferences or requirements for your stay
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="credit-card" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Credit Card
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="paypal" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                PayPal
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {paymentMethod === "credit-card" && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="XXXX XXXX XXXX XXXX" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="MM/YY" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="savePaymentInfo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Save payment information for future bookings
                              </FormLabel>
                              <FormDescription>
                                Your payment information will be securely stored
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {paymentMethod === "paypal" && (
                    <div className="rounded-md border p-4 bg-muted/50">
                      <p className="text-center">
                        You will be redirected to PayPal to complete your payment after submitting this form.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg" className="w-full">
                    Complete Booking - ${total}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
        
        {/* Booking Summary */}
        <div className="w-full lg:w-1/3">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hotel Info */}
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={hotelData.image}
                    alt={hotelData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{hotelData.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {hotelData.location}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Booking Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Dates</div>
                    <p className="text-sm text-muted-foreground">
                      {format(checkIn, "MMM d, yyyy")} - {format(checkOut, "MMM d, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {nightsCount} {nightsCount === 1 ? 'night' : 'nights'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Guests</div>
                    <p className="text-sm text-muted-foreground">
                      {guests} {parseInt(guests) === 1 ? 'guest' : 'guests'}, {roomCount} {parseInt(roomCount) === 1 ? 'room' : 'rooms'}
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>${hotelData.price} x {nightsCount} nights x {roomCount} {parseInt(roomCount) === 1 ? 'room' : 'rooms'}</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (10%)</span>
                  <span>${taxes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BookingClientPage;