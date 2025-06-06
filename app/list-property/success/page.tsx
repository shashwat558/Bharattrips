"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import PropertyLayout from '@/components/property/property-layout'

export default function SuccessPage() {
  return (
    <PropertyLayout 
      title="Listing Submitted!" 
      description="Your property listing has been successfully submitted"
      step={7}
      totalSteps={7}
    >
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Thank You for Listing with BharatTrips</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Our team will review your listing within 24-48 hours. Once approved, your property will be live on our platform.
        </p>
        
        <div className="space-y-4">
          <Link href="/admin">
            <Button className="w-full md:w-auto">
              Go to Property Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full md:w-auto">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </PropertyLayout>
  )
}