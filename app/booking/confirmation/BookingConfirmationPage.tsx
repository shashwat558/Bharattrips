"use client"
import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { bookingDataById } from "@/lib/actions/host"
import { CheckCircle2, CreditCard, Download, MapPin, Phone, Printer, MailCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type Property = {
  property_name: string
  photos: string[]
  address: string
  city: string
  state: string
  pincode: string
  phone_number: string
}

type Booking = {
  id: string
  check_in: string | Date
  check_out: string | Date
  guests: number
  number_of_rooms: number
  total_price: number
  email_address: string
  first_name: string
  last_name: string
  phone_number: string
  special_requirements?: string
}

type Payment = {
  method: string
  amount: number
  status: string
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")
  const [booking, setBooking] = useState<Booking | null>(null)
  const [payment, setPayment] = useState<Payment | null>(null)
  const [property, setProperty] = useState<Property | null>(null)

  useEffect(() => {
    if (!bookingId) return

    const getBookingData = async () => {
      try {
        const { bookingData, paymentData, propertyData } = await bookingDataById({ bookingId })
        setBooking(bookingData.data)
        setPayment(paymentData.data)
        setProperty(propertyData.data)
      } catch (err) {
        console.error("Error fetching booking info:", err)
      }
    }

    getBookingData()
  }, [bookingId])

  const nightsCount = useMemo(() => {
    if (!booking?.check_in || !booking?.check_out) return 0
    const checkIn = new Date(booking.check_in)
    const checkOut = new Date(booking.check_out)
    return Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }, [booking])

  const formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (!booking || !payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading your booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-2">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for your booking. A confirmation has been sent to your email address.
            </p>
          </div>

          {/* Main Booking Card */}
          <Card className="shadow-lg">
            <CardContent className="p-0">
              {/* Booking Reference Header */}
              <div className="bg-primary/5 p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">Booking Reference</h2>
                    <p className="text-2xl font-bold text-primary">{booking.id}</p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground bg-background px-3 py-2 rounded-md">
                    <MailCheck className="h-4 w-4 mr-2" />
                    Confirmation sent to {booking.email_address}
                  </div>
                </div>
              </div>

              {/* Property Information */}
              <div className="p-6 border-b">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={property?.photos[0] ?? "/placeholder.svg?height=96&width=96"}
                      alt="Property"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-foreground">
                      {property?.property_name}
                    </h3>
                    <div className="flex items-start text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        {property?.address}, {property?.city}, {property?.state} - {property?.pincode}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{property?.phone_number}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Check-in</div>
                    <div className="font-semibold text-lg">{formatDate(booking.check_in)}</div>
                    <div className="text-sm text-muted-foreground">From 3:00 PM</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Check-out</div>
                    <div className="font-semibold text-lg">{formatDate(booking.check_out)}</div>
                    <div className="text-sm text-muted-foreground">Before 12:00 PM</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Stay Duration
                    </div>
                    <div className="font-semibold text-lg">
                      {nightsCount} {nightsCount === 1 ? "night" : "nights"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.number_of_rooms} {booking.number_of_rooms === 1 ? "room" : "rooms"}, {booking.guests}{" "}
                      {booking.guests === 1 ? "guest" : "guests"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Room & Payment Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Room Details */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Room Details</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="font-medium">Standard Room</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.guests} {booking.guests === 1 ? "guest" : "guests"} • Non-refundable
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Includes:</span> Free WiFi, Breakfast, Air conditioning
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Payment Information</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Paid</span>
                        <span className="text-xl font-bold">${payment.amount}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CreditCard className="h-4 w-4 mr-2" />
                        {payment.method}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 h-11">
                    <Download className="mr-2 h-4 w-4" />
                    Download Confirmation
                  </Button>
                  <Button variant="outline" className="flex-1 h-11 bg-transparent">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Confirmation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help & Manage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="font-playfair text-xl font-bold">Need Help?</h3>
                <p className="text-muted-foreground text-sm">
                  If you have any questions about your booking, our customer service team is here to help.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="font-playfair text-xl font-bold">Manage Your Booking</h3>
                <p className="text-muted-foreground text-sm">
                  You can view, modify, or cancel your booking through your account.
                </p>
                <Button className="w-full">Go to My Bookings</Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center pt-4">
            <Link href="/">
              <Button variant="link" className="text-muted-foreground hover:text-foreground">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
