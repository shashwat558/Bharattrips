import React from 'react'
import Link from 'next/link'
import { Hotel, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Hotel className="w-6 h-6 mr-2" />
              <span className="font-playfair text-xl font-bold">LuxStay</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Discover extraordinary stays at exceptional properties worldwide. Experience luxury, comfort, and unforgettable moments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Our Hotels
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  123 Luxury Avenue, Suite 456, New York, NY 10001
                </span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  info@luxstay.com
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for exclusive offers and travel inspiration.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-md text-foreground bg-background border border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                required
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LuxStay. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer