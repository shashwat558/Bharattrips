"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Coffee, Wifi, UtensilsCrossed, Tv } from 'lucide-react'
import { cn } from '@/lib/utils'

// This would typically come from an API
const featuredProperties = [
  {
    id: 1,
    name: "Grand Plaza Hotel & Spa",
    location: "Paris, France",
    price: 399,
    rating: 4.8,
    reviews: 342,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    tags: ["Luxury", "Spa"],
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
    amenities: ["wifi", "restaurant", "spa", "tv"]
  }
];

const FeaturedProperties = () => {
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
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProperties.map((property) => (
        <Card key={property.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {property.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="absolute bottom-4 right-4">
              <Badge variant="default" className="bg-primary text-white">
                ${property.price}/night
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-playfair text-xl font-bold">{property.name}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">({property.reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
            
            <div className="flex space-x-2 mb-6">
              {property.amenities.map((amenity, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center" 
                  title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                >
                  {getAmenityIcon(amenity)}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Link href={`/hotels/${property.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Link href={`/booking/${property.id}`}>
                <Button>Book Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FeaturedProperties