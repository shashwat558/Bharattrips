"use client"

import React, { Suspense } from 'react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Hotel, X } from 'lucide-react'
import { cancelPropertyUpload } from '@/lib/actions/host'

interface PropertyLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  step: number
  totalSteps: number,
  // propertyId: string
}

const PropertyLayout = ({ children, title, description, step, totalSteps}: PropertyLayoutProps) => {
  const progress = (step / totalSteps) * 100

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Hotel className="w-6 h-6 text-primary mr-2" />
              <span className="font-playfair text-xl font-bold">BharatTrips</span>
            </Link>
            
            <Link href="/">
              <Button variant="ghost" size="icon" >
                <X className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Suspense>
          
          {children}
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default PropertyLayout