import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Wifi, 
  Coffee, 
  Car, 
  UtensilsCrossed, 
  Tv,
  Phone,
  Clock,
  Globe,
  ChevronRight,
  Bed,
  Bath,
  Home,
  CheckCircle,
  XCircle
} from 'lucide-react'
import HotelGallery from '@/components/hotels/hotel-gallery'
import RoomList from '@/components/hotels/room-list'
import ReviewsList from '@/components/hotels/reviews-list'
import ReservationBox from '@/components/hotels/reservation-box'
import SimilarHotels from '@/components/hotels/similar-hotels'
import { fetchHotel, getPropertyReviews } from '@/lib/actions/host'

// This would come from an API in a real app based on the data structure you provided
// const getPropertyData = (id: string) => {
//   // Sample data matching your structure
//   return {
//     id: id,
//     property_name: "White House Luxury Apartment",
//     property_type: "apartment",
//     address: "Near Paan Shop, Gandhi Maidan Area",
//     city: "Patna",
//     state: "Bihar",
//     pincode: "800001",
//     description: "A very good and white property offering luxury accommodation in the heart of Patna. This spacious apartment features modern amenities and comfortable living spaces perfect for families and groups. Experience the best of Bihar's capital city with easy access to local attractions and business districts.",
//     bedrooms: 10,
//     bathrooms: 16,
//     beds: 31,
//     max_guests: 45,
//     property_size: "73000",
//     base_price: 49000,
//     weekend_price: 57000,
//     cleaning_fee: 18000,
//     security_deposit: 1000000,
//     min_stay: 1,
//     max_stay: 15,
//     check_in_time: "09:07",
//     check_out_time: "16:32",
//     allow_children: true,
//     allow_pets: true,
//     allow_smoking: true,
//     allow_parties: true,
//     amenities: [
//       "wifi", "Air conditioning", "TV", "Kitchen", "Workspace", 
//       "Parking", "Pool", "Gym", "Breakfast", "Room Service", 
//       "Restaurant", "Bar", "Spa", "Laundry"
//     ],
//     languages: ["English", "Hindi", "Gujarati"],
//     house_rules: {
//       noPets: "Pets allowed",
//       noShoes: "Shoes allowed inside the house", 
//       noSmoking: "Smoking allowed inside the house",
//       quiteHours: "No quiet hours"
//     },
//     photos: [
//       "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
//       "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
//       "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
//       "https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg",
//       "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
//       "https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg"
//     ],
//     business_name: "Trump Properties",
//     business_address: "Patna Bihar",
//     pan_number: "AAACH2702H",
//     gst_registered: true,
//     gst_number: null,
//     rating: 4.6,
//     reviews: 128,
//     status: "completed"
//   }
// }

// Map amenity names to icons
const getAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase()
  switch(amenityLower) {
    case 'wifi':
    case 'free wifi':
      return <Wifi className="h-5 w-5" />
    case 'restaurant':
      return <UtensilsCrossed className="h-5 w-5" />
    case 'spa':
    case 'spa services':
      return <Coffee className="h-5 w-5" />
    case 'gym':
    case 'fitness center':
      return <Coffee className="h-5 w-5" />
    case 'room service':
      return <Coffee className="h-5 w-5" />
    case 'parking':
    case 'free parking':
      return <Car className="h-5 w-5" />
    case 'bar':
    case 'bar/lounge':
      return <Coffee className="h-5 w-5" />
    case 'laundry':
    case 'laundry service':
      return <Coffee className="h-5 w-5" />
    case 'tv':
    case 'air conditioning':
    case 'kitchen':
    case 'workspace':
    case 'pool':
    case 'breakfast':
      return <Tv className="h-5 w-5" />
    default:
      return <Coffee className="h-5 w-5" />
  }
}

const formatPropertyType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const formatAddress = (property: any) => {
  return `${property.address}, ${property.city}, ${property.state} ${property.pincode}`
}

export default async function HotelDetailPage({ params }: { params: Promise<{   id: string }> }) {
  const { id } = await params;
  
  const property = await fetchHotel({propertyId: id})

   
  
  return (
    <>
      <div className="pt-20">
        <HotelGallery images={property.photos} />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap items-start justify-between mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary">
                    {formatPropertyType(property.property_type)}
                  </Badge>
                  {property.allow_pets && <Badge variant="outline">Pet Friendly</Badge>}
                  {property.allow_children && <Badge variant="outline">Family Friendly</Badge>}
                </div>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">{property.property_name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.city}, {property.state}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                    <span className="font-medium text-foreground">{property.rating}</span>
                    <span className="text-sm ml-1">({property.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 lg:mt-0">
                <div className="text-right">
                  <span className="text-2xl font-bold">₹{property.base_price.toLocaleString()}</span>
                  <span className="text-muted-foreground"> / night</span>
                  <div className="text-sm text-muted-foreground">
                    Weekend: ₹{property.weekend_price.toLocaleString()}
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Property Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bed className="h-5 w-5 text-primary mr-1" />
                  <span className="font-bold text-lg">{property.bedrooms}</span>
                </div>
                <div className="text-sm text-muted-foreground">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bath className="h-5 w-5 text-primary mr-1" />
                  <span className="font-bold text-lg">{property.bathrooms}</span>
                </div>
                <div className="text-sm text-muted-foreground">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary mr-1" />
                  <span className="font-bold text-lg">{property.max_guests}</span>
                </div>
                <div className="text-sm text-muted-foreground">Max Guests</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Home className="h-5 w-5 text-primary mr-1" />
                  <span className="font-bold text-lg">{parseInt(property.property_size).toLocaleString()}</span>
                </div>
                <div className="text-sm text-muted-foreground">Sq Ft</div>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-4">About this property</h2>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-4">Languages Spoken</h3>
                    <div className="flex flex-wrap gap-2">
                      
                      {property.languages.map((language: string, i: number) => (
                        <Badge key={i} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-4">Location</h3>
                    <div className="relative h-[400px] rounded-lg overflow-hidden bg-muted">
                      <p className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        Interactive map would be displayed here
                      </p>
                    </div>
                    <p className="mt-2 text-muted-foreground">{formatAddress(property)}</p>
                  </div>
                </div>
              </TabsContent>
              
              {/* Amenities Tab */}
              <TabsContent value="amenities">
                <div className="space-y-6">
                  <h2 className="font-playfair text-2xl font-bold mb-4">Property Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {property.amenities.map((amenity: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card border">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Policies Tab */}
              <TabsContent value="policies">
                <div className="space-y-6">
                  <h2 className="font-playfair text-2xl font-bold mb-4">Property Policies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Check-in Time</h3>
                          <p className="text-muted-foreground">{property.check_in_time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Check-out Time</h3>
                          <p className="text-muted-foreground">{property.check_out_time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Stay Duration</h3>
                          <p className="text-muted-foreground">
                            Min: {property.min_stay} night(s), Max: {property.max_stay} night(s)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        {property.allow_children ? <CheckCircle className="h-5 w-5 mt-0.5 text-green-500" /> : <XCircle className="h-5 w-5 mt-0.5 text-red-500" />}
                        <div>
                          <h3 className="font-medium">Children</h3>
                          <p className="text-muted-foreground">
                            {property.allow_children ? "Children are welcome" : "No children allowed"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        {property.allow_pets ? <CheckCircle className="h-5 w-5 mt-0.5 text-green-500" /> : <XCircle className="h-5 w-5 mt-0.5 text-red-500" />}
                        <div>
                          <h3 className="font-medium">Pets</h3>
                          <p className="text-muted-foreground">{property.house_rules.noPets}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        {property.allow_smoking ? <CheckCircle className="h-5 w-5 mt-0.5 text-green-500" /> : <XCircle className="h-5 w-5 mt-0.5 text-red-500" />}
                        <div>
                          <h3 className="font-medium">Smoking</h3>
                          <p className="text-muted-foreground">{property.house_rules.noSmoking}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        {property.allow_parties ? <CheckCircle className="h-5 w-5 mt-0.5 text-green-500" /> : <XCircle className="h-5 w-5 mt-0.5 text-red-500" />}
                        <div>
                          <h3 className="font-medium">Events/Parties</h3>
                          <p className="text-muted-foreground">
                            {property.allow_parties ? "Events and parties allowed" : "No events or parties"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Coffee className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">House Rules</h3>
                          <p className="text-muted-foreground">{property.house_rules.quiteHours}</p>
                          <p className="text-muted-foreground">{property.house_rules.noShoes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Additional Fees</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Cleaning Fee:</span>
                        <span>₹{property.cleaning_fee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security Deposit:</span>
                        <span>₹{property.security_deposit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <ReviewsList hotelId={id} rating={property.rating} reviewCount={property.reviews} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <ReservationBox hotel={{
              id: id, 
              price: property.base_price  
            }} />
            
            <div className="mt-8 space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-playfair text-lg font-bold mb-4">Property Owner</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <span>{property.business_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{property.business_address}</span>
                  </div>
                  {property.gst_registered && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">GST Registered Business</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-playfair text-lg font-bold mb-4">Need Help?</h3>
                <p className="text-muted-foreground mb-4">Our customer service team is here to help you 24/7</p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Properties */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-playfair text-2xl font-bold">Similar Properties</h2>
            <Link href="/hotels" className="flex items-center text-primary hover:underline">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <SimilarHotels currentHotelId={parseInt(property.id.split('-')[0], 16)} />
        </div>
      </div>
    </>
  )
}