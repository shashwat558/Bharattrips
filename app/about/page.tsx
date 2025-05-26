import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Users, 
  Globe, 
  Award, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Hotel
} from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] hero-overlay">
        <Image
          src="https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg"
          alt="About BharatTrips"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About BharatTrips
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Discover India&apos;s finest accommodations and create unforgettable memories
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-8">
              Founded in 2024, BharatTrips has revolutionized the way people discover and book accommodations across India. 
              Our mission is to connect travelers with the country&apos;s most exceptional properties while celebrating 
              India&apos;s rich cultural heritage and hospitality traditions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-bold text-3xl mb-2">1000+</div>
                <div className="text-muted-foreground">Properties</div>
              </div>
              <div>
                <div className="font-bold text-3xl mb-2">50K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="font-bold text-3xl mb-2">100+</div>
                <div className="text-muted-foreground">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose BharatTrips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Pan India Presence</h3>
                <p className="text-muted-foreground">
                  Access to premium properties across all major cities and tourist destinations in India
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Curated Selection</h3>
                <p className="text-muted-foreground">
                  Handpicked properties that meet our strict quality and service standards
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Round-the-clock customer service to ensure a seamless booking experience
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Best Prices</h3>
                <p className="text-muted-foreground">
                  Competitive rates and exclusive deals for our members
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold">Rajesh Kumar</h3>
              <p className="text-muted-foreground">CEO & Founder</p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
                  alt="COO"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold">Priya Sharma</h3>
              <p className="text-muted-foreground">Chief Operating Officer</p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg"
                  alt="CTO"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-bold">Amit Patel</h3>
              <p className="text-muted-foreground">Chief Technology Officer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-medium mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">
                    123 Business Hub, Sector 1<br />
                    Gurugram, Haryana 122001
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-medium mb-2">Call Us</h3>
                  <p className="text-muted-foreground">
                    +91 98765 43210<br />
                    +91 98765 43211
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-medium mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    info@bharattrips.com<br />
                    support@bharattrips.com
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}