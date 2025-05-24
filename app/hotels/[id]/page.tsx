import React from 'react'
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
  ChevronRight
} from 'lucide-react'
import HotelGallery from '@/components/hotels/hotel-gallery'
import RoomList from '@/components/hotels/room-list'
import ReviewsList from '@/components/hotels/reviews-list'
import ReservationBox from '@/components/hotels/reservation-box'
import SimilarHotels from '@/components/hotels/similar-hotels'

// This would come from an API in a real app

const hotelData = {
  id: 1,
  name: "Grand Plaza Hotel & Spa",
  location: "Paris, France",
  address: "123 Avenue des Champs-Élysées, 75008 Paris, France",
  price: 399,
  rating: 4.8,
  reviews: 342,
  description: "Experience the epitome of Parisian luxury at Grand Plaza Hotel & Spa, where timeless elegance meets modern comfort. Located in the heart of Paris with stunning views of the Eiffel Tower, our hotel offers an unforgettable stay with world-class amenities and exceptional service.",
  longDescription: `
    <p>Welcome to Grand Plaza Hotel & Spa, a landmark of luxury and sophistication in the heart of Paris. Our historic building combines classic French architecture with contemporary design to create a truly exceptional experience.</p>
    
    <p>Each of our elegantly appointed rooms and suites features premium bedding, marble bathrooms with luxury toiletries, and state-of-the-art technology. Many rooms offer breathtaking views of the Eiffel Tower or the charming Parisian streets.</p>
    
    <p>Indulge your palate at our award-winning restaurant, Le Grand, where our celebrated chef creates exquisite French cuisine with a modern twist. For a more casual dining experience, visit our Café Lumière, offering delicious pastries and light meals throughout the day.</p>
    
    <p>Rejuvenate your body and mind at our luxurious spa, featuring a range of treatments inspired by ancient traditions and modern techniques. Our facilities include a heated indoor pool, sauna, steam room, and fully equipped fitness center.</p>
    
    <p>With our prime location, you're just steps away from designer boutiques, renowned museums, and iconic landmarks. Our concierge team is available 24/7 to help you discover the magic of Paris and create unforgettable memories.</p>
  `,
  images: [
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
    "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
    "https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg",
    "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
    "https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg"
  ],
  tags: ["Luxury", "Spa", "City Center"],
  amenities: [
    { name: "Free WiFi", icon: "wifi" },
    { name: "Restaurant", icon: "restaurant" },
    { name: "Spa & Wellness", icon: "spa" },
    { name: "Fitness Center", icon: "gym" },
    { name: "Room Service", icon: "room-service" },
    { name: "Airport Shuttle", icon: "shuttle" },
    { name: "Bar/Lounge", icon: "bar" },
    { name: "Concierge", icon: "concierge" },
    { name: "Laundry", icon: "laundry" },
    { name: "Parking", icon: "parking" }
  ],
  policies: {
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    cancellation: "Free cancellation up to 24 hours before check-in",
    children: "Children of all ages are welcome",
    pets: "Pets are not allowed",
    smoking: "Non-smoking throughout",
    payment: "We accept all major credit cards"
  },
  rooms: [
    {
      id: 101,
      name: "Deluxe King Room",
      description: "Spacious room with king-size bed and city views",
      price: 399,
      capacity: 2,
      amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "Minibar"],
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
    },
    {
      id: 102,
      name: "Executive Suite",
      description: "Luxurious suite with separate living area and Eiffel Tower views",
      price: 599,
      capacity: 2,
      amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "Minibar", "Espresso Machine"],
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
    },
    {
      id: 103,
      name: "Family Room",
      description: "Comfortable room for families with two queen beds",
      price: 499,
      capacity: 4,
      amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "Minibar"],
      image: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg"
    },
    {
      id: 104,
      name: "Presidential Suite",
      description: "Our most luxurious accommodation with panoramic views",
      price: 999,
      capacity: 2,
      amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "Minibar", "Jacuzzi", "Butler Service"],
      image: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg"
    }
  ]
};

export async function generateStaticParams() {
  return [{ id: hotelData.id.toString() }];
}

const getHotelById = (id: string) => {
  
  if (hotelData.id.toString() === id) return hotelData;
  return null;
};

const getAmenityIcon = (icon: string) => {
  switch(icon) {
    case 'wifi':
      return <Wifi className="h-5 w-5" />;
    case 'restaurant':
      return <UtensilsCrossed className="h-5 w-5" />;
    case 'spa':
      return <Coffee className="h-5 w-5" />;
    case 'gym':
      return <Coffee className="h-5 w-5" />;
    case 'room-service':
      return <Coffee className="h-5 w-5" />;
    case 'shuttle':
      return <Car className="h-5 w-5" />;
    case 'bar':
      return <Coffee className="h-5 w-5" />;
    case 'concierge':
      return <Coffee className="h-5 w-5" />;
    case 'laundry':
      return <Coffee className="h-5 w-5" />;
    case 'parking':
      return <Car className="h-5 w-5" />;
    case 'tv':
      return <Tv className="h-5 w-5" />;
    default:
      return <Coffee className="h-5 w-5" />;
  }
};

export default function HotelDetailPage({ params }: { params: { id: string } }) {
   const hotel = getHotelById(params.id);

  if (!hotel) return <div>Hotel not found</div>; // In a real app, we would fetch the hotel by ID
  
  return (
    <>
      <div className="pt-20">
        <HotelGallery images={hotel.images} />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap items-start justify-between mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {hotel.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                    <span className="font-medium text-foreground">{hotel.rating}</span>
                    <span className="text-sm ml-1">({hotel.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 lg:mt-0">
                <div className="text-right">
                  <span className="text-2xl font-bold">${hotel.price}</span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
                <Link href={`/booking/${hotel.id}`}>
                  <Button size="lg" className="mt-2">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-4">About this hotel</h2>
                    <div className="prose prose-sm max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: hotel.longDescription }} />
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-4">Location</h3>
                    <div className="relative h-[400px] rounded-lg overflow-hidden bg-muted">
                      <p className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        Interactive map would be displayed here
                      </p>
                    </div>
                    <p className="mt-2 text-muted-foreground">{hotel.address}</p>
                  </div>
                </div>
              </TabsContent>
              
              {/* Rooms Tab */}
              <TabsContent value="rooms">
                <RoomList rooms={hotel.rooms} />
              </TabsContent>
              
              {/* Amenities Tab */}
              <TabsContent value="amenities">
                <div className="space-y-6">
                  <h2 className="font-playfair text-2xl font-bold mb-4">Hotel Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotel.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card border">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {getAmenityIcon(amenity.icon)}
                        </div>
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Policies Tab */}
              <TabsContent value="policies">
                <div className="space-y-6">
                  <h2 className="font-playfair text-2xl font-bold mb-4">Hotel Policies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Check-in Time</h3>
                          <p className="text-muted-foreground">{hotel.policies.checkIn}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Check-out Time</h3>
                          <p className="text-muted-foreground">{hotel.policies.checkOut}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Cancellation Policy</h3>
                          <p className="text-muted-foreground">{hotel.policies.cancellation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Children</h3>
                          <p className="text-muted-foreground">{hotel.policies.children}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Coffee className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Pets</h3>
                          <p className="text-muted-foreground">{hotel.policies.pets}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Coffee className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Smoking</h3>
                          <p className="text-muted-foreground">{hotel.policies.smoking}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Coffee className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h3 className="font-medium">Payment Options</h3>
                          <p className="text-muted-foreground">{hotel.policies.payment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <ReviewsList hotelId={hotel.id} rating={hotel.rating} reviewCount={hotel.reviews} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <ReservationBox hotel={hotel} />
            
            <div className="mt-8 space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-playfair text-lg font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <a href="#" className="text-primary hover:underline">www.grandplazahotel.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{hotel.address}</span>
                  </div>
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
        
        {/* Similar Hotels */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-playfair text-2xl font-bold">Similar Hotels</h2>
            <Link href="/hotels" className="flex items-center text-primary hover:underline">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <SimilarHotels currentHotelId={hotel.id} />
        </div>
      </div>
    </>
  )
}