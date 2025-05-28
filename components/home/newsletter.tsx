"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = React.useState('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would typically send the email to an API
    setIsSubmitted(true)
    setEmail('')
  }
  
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Special Offers
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive exclusive promotions, travel inspiration, and personalized recommendations for your next luxury getaway.
          </p>
          
          {isSubmitted ? (
            <div className="bg-background text-foreground rounded-lg p-6 animate-fade-in">
              <h3 className="font-bold text-xl mb-2">Thank You for Subscribing!</h3>
              <p>You&apos;ll be the first to know about our special offers and promotions.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          )}
          
          <p className="mt-4 text-sm text-primary-foreground/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter