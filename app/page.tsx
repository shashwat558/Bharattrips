import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Star,
  Wifi,
  Coffee,
  Car,
  UtensilsCrossed
} from 'lucide-react'
import HeroSearch from '@/components/home/hero-search'
import FeaturedProperties from '@/components/home/featured-properties'
import Testimonials from '@/components/home/testimonials'
import Newsletter from '@/components/home/newsletter'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] hero-overlay">
        <Image
          src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
          alt="Luxury Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Discover Extraordinary Stays
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Experience luxury and comfort at exceptional properties worldwide
          </p>
          <div className="w-full max-w-5xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <HeroSearch />
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
              <p className="text-muted-foreground max-w-2xl">
                Handpicked luxury accommodations selected for their exceptional quality, amenities, and guest experiences
              </p>
            </div>
            <Link href="/hotels" className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium">
              View All Properties <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <FeaturedProperties />
        </div>
      </section>
      
      {/* Special Offers */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16">Special Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Offer 1 */}
            <div className="bg-background rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <div className="relative h-64">
                <Image
                  src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
                  alt="Weekend Getaway"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Limited Time
                </div>
                <h3 className="font-playfair text-2xl font-bold mb-2">Weekend Getaway</h3>
                <p className="text-muted-foreground mb-4">
                  Save up to 25% on weekend stays. Enjoy a quick escape with premium amenities and exceptional service.
                </p>
                <Button>
                  Book Now
                </Button>
              </div>
            </div>
            
            {/* Offer 2 */}
            <div className="bg-background rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <div className="relative h-64">
                <Image
                  src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
                  alt="Extended Stay Package"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium mb-4">
                  Popular
                </div>
                <h3 className="font-playfair text-2xl font-bold mb-2">Extended Stay Package</h3>
                <p className="text-muted-foreground mb-4">
                  Stay longer and save more. Get up to 30% off when you book 7+ nights at any of our luxury properties.
                </p>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Why Choose LuxStay</h2>
            <p className="text-muted-foreground">
              We provide an exceptional booking experience with carefully curated properties and premium service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3">Handpicked Properties</h3>
              <p className="text-muted-foreground">
                Every property in our collection is personally vetted for quality and excellence
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3">Premium Amenities</h3>
              <p className="text-muted-foreground">
                Enjoy luxury amenities including high-speed WiFi, spa services, and fine dining
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3">Exclusive Experiences</h3>
              <p className="text-muted-foreground">
                Access unique local experiences and personalized concierge services
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-3">Seamless Experience</h3>
              <p className="text-muted-foreground">
                From booking to checkout, enjoy a smooth and hassle-free travel experience
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Destination Spotlight */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16">Top Destinations</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Destination 1 */}
            <Link href="/hotels?location=paris" className="group">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg"
                  alt="Paris"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6">
                  <h3 className="font-playfair text-2xl text-white font-bold mb-2">Paris</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="h-4 w-4 mr-1" /> France
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Destination 2 */}
            <Link href="/hotels?location=bali" className="group">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg"
                  alt="Bali"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6">
                  <h3 className="font-playfair text-2xl text-white font-bold mb-2">Bali</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="h-4 w-4 mr-1" /> Indonesia
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Destination 3 */}
            <Link href="/hotels?location=new-york" className="group">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg"
                  alt="New York"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6">
                  <h3 className="font-playfair text-2xl text-white font-bold mb-2">New York</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin className="h-4 w-4 mr-1" /> United States
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
            <p className="text-muted-foreground">
              Hear from travelers who have experienced our exceptional service and accommodations
            </p>
          </div>
          
          <Testimonials />
        </div>
      </section>
      
      {/* Newsletter */}
      <Newsletter />
    </>
  )
}