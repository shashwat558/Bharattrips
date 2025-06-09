"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Hotel, Mail, Phone, Lock } from 'lucide-react'
import { hostAccountPasswordAndPhone, initHostOnborading, loginUser } from '@/lib/actions/host'

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

const phoneSchema = z.object({
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

const passwordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function ListPropertyPage() {
  const router = useRouter()
  const [step, setStep] = useState('email') // email, phone, password
  const [isExistingHost, setIsExistingHost] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  
  const emailForm = useForm({
    resolver: zodResolver(emailSchema)
  })
  
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema)
  })
  
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema)
  })
  
  const onEmailSubmit = async(data: any) => {

    const res = await fetch('/api/check-host', {
      method: "POST",
      body: JSON.stringify({email: data.email}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await res.json();
    if(result.exists && result.isHost){
      setIsExistingHost(true);
      setStep('password')
    } else {
    const {propertyId} = await initHostOnborading(data.email);
    setPropertyId(propertyId);

    setIsExistingHost(false)
    setStep('phone')
  }
  }
  
  const onPhoneSubmit = async (data: any) => {
    
    console.log(data)
    setStep('password')
  }
  
  const onPasswordSubmit = async (data: any) => {
    console.log(data)
     if (isExistingHost) {
    
    const res = await loginUser(emailForm.getValues('email'), data.password)
    if (!res.success) {
      
      return
    }
    router.push('/dashboard')
  } else {
    await hostAccountPasswordAndPhone(emailForm.getValues("email"), data.password, phoneForm.getValues("phone"));
    router.push(`/list-property/basic-info?propertyId=${propertyId}`)
  }
  }

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
          alt="Property Listing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <Hotel className="w-16 h-16 mx-auto mb-4" />
            <h2 className="font-playfair text-4xl font-bold mb-4">List Your Property</h2>
            <p className="text-lg text-white/90 max-w-md">
              Join BharatTrips and reach millions of travelers looking for unique places to stay across India.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {step === 'email' && (
            <div className="text-center">
              <h1 className="font-playfair text-3xl font-bold mb-2">Get Started</h1>
              <p className="text-muted-foreground mb-8">
                Enter your email to begin listing your property
              </p>
              
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...emailForm.register('email')}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {typeof emailForm.formState.errors.email?.message === 'string' && emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <Button type="submit" className="w-full">Continue</Button>
              </form>
            </div>
          )}
          
          {step === 'phone' && (
            <div className="text-center">
              <h1 className="font-playfair text-3xl font-bold mb-2">Add Your Phone</h1>
              <p className="text-muted-foreground mb-8">
                We&apos;ll use this to send you important updates
              </p>
              
              <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...phoneForm.register('phone')}
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10"
                    />
                  </div>
                  {phoneForm.formState.errors.phone && (
                    //@ts-ignore
                    <p className="text-sm text-destructive">{phoneForm.formState.errors.phone.message}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full">Continue</Button>
                <Button type="button" variant="ghost" onClick={() => setStep('email')} className="w-full">
                  Back
                </Button>
              </form>
            </div>
          )}
          
          {step === 'password' && (
            <div className="text-center">
              <h1 className="font-playfair text-3xl font-bold mb-2">Create Password</h1>
              <p className="text-muted-foreground mb-8">
                Choose a secure password for your account
              </p>
              
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...passwordForm.register('password')}
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                    />
                  </div>
                  {passwordForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {typeof passwordForm.formState.errors.password?.message === 'string' && passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...passwordForm.register('confirmPassword')}
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                    />
                  </div>
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {typeof passwordForm.formState.errors.confirmPassword?.message === 'string' && passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                
                <Button type="submit" className="w-full">Create Account</Button>
                <Button type="button" variant="ghost" onClick={() => setStep('phone')} className="w-full">
                  Back
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}