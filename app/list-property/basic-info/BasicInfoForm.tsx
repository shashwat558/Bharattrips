"use client"

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin } from 'lucide-react'
import PropertyLayout from '@/components/property/property-layout'
import { saveBasicInfo } from '@/lib/actions/host'

const basicInfoSchema = z.object({
  propertyName: z.string().min(2, { message: "Property name must be at least 2 characters" }),
  propertyType: z.string().min(1, { message: "Please select a property type" }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
  city: z.string().min(2, { message: "Please enter a valid city" }),
  state: z.string().min(2, { message: "Please enter a valid state" }),
  pincode: z.string().min(6, { message: "Please enter a valid PIN code" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }),
})

export default function BasicInfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  console.log(propertyId)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(basicInfoSchema)
  })
  
  const onSubmit = async (data: any) => {
    console.log(data)
    if(propertyId){
      await saveBasicInfo({propertyId: propertyId, propertyName: data.propertyName, propertyType: data.propertyType, address: data.address, city: data.city, description: data.description, pincode: data.pincode, state: data.state })
      router.push(`/list-property/property-setup?propertyId=${propertyId}`);
    }
    
   

  }

  return (
    <Suspense>
    <PropertyLayout 
      title="Basic Information" 
      description="Tell us about your property"
      step={1}
      totalSteps={7}
      // propertyId={propertyId ?? ""}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="propertyName">Property Name</Label>
            <Input
              {...register('propertyName')}
              id="propertyName"
              placeholder="Enter your property name"
            />
            {errors.propertyName && (
              <p className="text-sm text-destructive">{errors.propertyName.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <select
              {...register('propertyType')}
              id="propertyType"
              className="w-full p-2 rounded-md border"
            >
              <option value="">Select property type</option>
              <option value="hotel">Hotel</option>
              <option value="resort">Resort</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="homestay">Homestay</option>
            </select>
            {errors.propertyType && (
              <p className="text-sm text-destructive">{errors.propertyType.message as string}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Property Location</h3>
          
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                {...register('address')}
                id="address"
                placeholder="Enter street address"
                className="pl-10"
              />
            </div>
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message as string}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                {...register('city')}
                id="city"
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                {...register('state')}
                id="state"
                placeholder="Enter state"
              />
              {errors.state && (
                <p className="text-sm text-destructive">{errors.state.message as string}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pincode">PIN Code</Label>
            <Input
              {...register('pincode')}
              id="pincode"
              placeholder="Enter PIN code"
            />
            {errors.pincode && (
              <p className="text-sm text-destructive">{errors.pincode.message as string}</p>
            )}
          </div>
          
          <div className="relative h-[300px] rounded-lg bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Map will be integrated here
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Property Description</Label>
          <Textarea
            {...register('description')}
            id="description"
            placeholder="Tell travelers about your property..."
            className="min-h-[150px]"
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message as string}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </PropertyLayout>
    </Suspense>
  )
}