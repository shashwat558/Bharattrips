import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MapPin, Star, Coffee, Wifi, UtensilsCrossed, Tv, Filter } from 'lucide-react'
import HotelSearch from '@/components/hotels/hotel-search'
import HotelFilters from '@/components/hotels/hotel-filters'
import Pagination from '@/components/hotels/pagination'

// This would typically come from an API
const hotels = [
  {
    id: 1,
    name: "Grand Plaza Hotel & Spa",
    location: "Paris, France",
    price: 399,
    rating: 4.8,
    reviews: 342,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    tags: ["Luxury", "Spa"],
    description: "Experience ultimate luxury in the heart of Paris with stunning views of the Eiffel Tower. Our spacious rooms feature premium amenities and exceptional service.",
    amenities: ["wifi", "restaurant", "pool", "tv"]
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Bali, Indonesia",
    price: 299,
    rating: 4.7,
    reviews: 256,
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    tags: ["Beachfront", "Family"],
    description: "Escape to paradise at our beachfront resort. Enjoy private beach access, infinity pools, and luxurious spa treatments with breathtaking ocean views.",
    amenities: ["wifi", "restaurant", "pool", "tv"]
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    location: "Aspen, Colorado",
    price: 449,
    rating: 4.9,
    reviews: 189,
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    tags: ["Mountain View", "Spa"],
    description: "Nestled in the mountains, our lodge offers a peaceful retreat with stunning alpine views. Perfect for ski enthusiasts and nature lovers alike.",
    amenities: ["wifi", "restaurant", "spa", "tv"]
  },
  {
    id: 4,
    name: "Urban Boutique Hotel",
    location: "New York City, USA",
    price: 349,
    rating: 4.6,
    reviews: 278,
    image: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
    tags: ["Boutique", "City Center"],
    description: "A stylish boutique hotel in the heart of Manhattan. Experience New York like a local with personalized service and modern design.",
    amenities: ["wifi", "restaurant", "bar", "tv"]
  },
  {
    id: 5,
    name: "Sunset Bay Resort",
    location: "Phuket, Thailand",
    price: 259,
    rating: 4.5,
    reviews: 312,
    image: "https://images.pexels.com/photos/261388/pexels-photo-261388.jpeg",
    tags: ["Beachfront", "All-Inclusive"],
    description: "Experience paradise at our all-inclusive beachfront resort. Enjoy spectacular sunsets, crystal clear waters, and world-class Thai hospitality.",
    amenities: ["wifi", "restaurant", "pool", "spa"]
  },
  {
    id: 6,
    name: "Historic City Palace",
    location: "Rome, Italy",
    price: 499,
    rating: 4.9,
    reviews: 145,
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    tags: ["Historic", "Luxury"],
    description: "Stay in a converted 16th-century palace in the heart of Rome. Experience Italian luxury with modern amenities in a historic setting.",
    amenities: ["wifi", "restaurant", "bar", "spa"]
  }
];

const getAmenityIcon = (amenity: string) => {
  switch(amenity) {
    case 'wifi':
      return <Wifi className="h-4 w-4" />;
    case 'restaurant':
      return <UtensilsCrossed className="h-4 w-4" />;
    case 'pool':
      return <Coffee className="h-4 w-4" />;
    case 'spa':
      return <Coffee className="h-4 w-4" />;
    case 'tv':
      return <Tv className="h-4 w-4" />;
    case 'bar':
      return <Coffee className="h-4 w-4" />;
    default:
      return null;
  }
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function HotelsPage({
  searchParams,
}: Props) {
  // In a real app, we would use searchParams to filter the hotels
  const resolvedSearchParams = await searchParams
  
  return (
    <>
      <div className="bg-muted pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-muted-foreground mb-6">
              Discover handpicked luxury hotels and resorts worldwide
            </p>
            
            <HotelSearch initialParams={resolvedSearchParams} />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <HotelFilters />
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">Showing {hotels.length} properties</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="p-2 rounded-md border text-sm">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {hotel.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-playfair text-xl font-bold">{hotel.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-muted-foreground text-sm ml-1">({hotel.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hotel.location}
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {hotel.description}
                      </p>
                      
                      <div className="flex space-x-2 mb-6">
                        {hotel.amenities.map((amenity, i) => (
                          <div 
                            key={i} 
                            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center" 
                            title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                          >
                            {getAmenityIcon(amenity)}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap justify-between items-end">
                        <div>
                          <span className="text-2xl font-bold">${hotel.price}</span>
                          <span className="text-muted-foreground"> / night</span>
                          <p className="text-xs text-muted-foreground">Excluding taxes and fees</p>
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                          <Link href={`/hotels/${hotel.id}`}>
                            <Button variant="outline">View Details</Button>
                          </Link>
                          <Link href={`/booking/${hotel.id}`}>
                            <Button>Book Now</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
            
            <Pagination currentPage={1} totalPages={3} />
          </div>
        </div>
      </div>
    </>
  )
}