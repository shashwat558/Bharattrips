"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// This would typically come from an API
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    comment: "Our stay at Grand Plaza was absolutely perfect. The staff went above and beyond to make our anniversary special. The room had a stunning view and the amenities were top-notch.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    property: "Grand Plaza Hotel & Spa"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    rating: 5,
    comment: "The Ocean View Resort exceeded all my expectations. Waking up to the sound of waves and having breakfast with that incredible view was worth every penny. Will definitely return!",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    property: "Ocean View Resort"
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "London, UK",
    rating: 4,
    comment: "The Mountain Retreat Lodge was the perfect place for our family vacation. The kids loved the activities and we enjoyed the peace and quiet of the mountains. Highly recommended!",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    property: "Mountain Retreat Lodge"
  },
  {
    id: 4,
    name: "David Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    comment: "A truly luxurious experience from start to finish. The concierge service was exceptional and helped us discover hidden gems in the city. The spa treatments were divine!",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    property: "Grand Plaza Hotel & Spa"
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };
  
  const visibleTestimonials = testimonials.slice(
    activeIndex * itemsPerPage,
    (activeIndex * itemsPerPage) + itemsPerPage
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-4 w-4 mr-1",
                      i < testimonial.rating 
                        ? "text-accent fill-accent" 
                        : "text-muted-foreground"
                    )} 
                  />
                ))}
              </div>
              
              <blockquote className="text-muted-foreground italic mb-4">
                "{testimonial.comment}"
              </blockquote>
              
              <p className="text-sm font-medium">
                Stayed at: <span className="text-primary">{testimonial.property}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Navigation Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePrev}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          {[...Array(totalPages)].map((_, i) => (
            <Button 
              key={i}
              variant={i === activeIndex ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "rounded-full min-w-8 w-8 h-8 p-0",
                i === activeIndex && "bg-primary"
              )}
            >
              {i + 1}
            </Button>
          ))}
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNext}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Testimonials