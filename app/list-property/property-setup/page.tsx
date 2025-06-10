"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PropertyLayout from '@/components/property/property-layout'
import { savePropertySetup } from '@/lib/actions/host'

const propertySetupSchema = z.object({
  bedrooms: z.coerce.number({ message: "Please enter number of bedrooms" }),
  beds: z.coerce.number({ message: "Please enter number of beds" }),
  bathrooms: z.coerce.number({ message: "Please enter number of bathrooms" }),
  maxGuests: z.coerce.number({ message: "Please enter maximum guests" }),
  propertySize: z.string().min(1, { message: "Please enter property size" }),
  allowChildren: z.boolean().optional(),
  allowPets: z.boolean().optional(),
  allowSmoking: z.boolean().optional(),
  allowParties: z.boolean().optional(),
})

export default function PropertySetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  const { register, handleSubmit, formState: { errors } , control} = useForm({
  resolver: zodResolver(propertySetupSchema),
  defaultValues: {
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 1,
    propertySize: "",
    allowChildren: false,
    allowPets: false,
    allowSmoking: false,
    allowParties: false
  }
});
  
  const onSubmit = async(data: any) => {
    if(propertyId){
      await savePropertySetup({propertyId: propertyId, bedrooms:data.bedrooms, beds: data.beds, bathrooms: data.bathrooms, maxGuests: data.maxGuests, propertySize: data.propertySize, allowChildren: data.allowChildren, allowPets: data.allowPets, allowParties:data.allowParties, allowSmoking: data.allowSmoking});

      router.push(`/list-property/amenities?propertyId=${propertyId}`);
    }
    console.log(data)
    console.log("hi")
    
  }

  return (
    <PropertyLayout 
      title="Property Setup" 
      description="Tell us about your property's capacity and rules"
      step={2}
      totalSteps={7}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sleeping Arrangements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Number of Bedrooms</Label>
              <Input
                {...register('bedrooms')}
                id="bedrooms"
                type="number"
                min="1"
              />
              {errors.bedrooms && (
                <p className="text-sm text-destructive">{errors.bedrooms.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="beds">Number of Beds</Label>
              <Input
                {...register('beds')}
                id="beds"
                type="number"
                min="1"
              />
              {errors.beds && (
                <p className="text-sm text-destructive">{errors.beds.message as string}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Number of Bathrooms</Label>
              <Input
                {...register('bathrooms')}
                id="bathrooms"
                type="number"
                min="1"
              />
              {errors.bathrooms && (
                <p className="text-sm text-destructive">{errors.bathrooms.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxGuests">Maximum Guests</Label>
              <Input
                {...register('maxGuests')}
                id="maxGuests"
                type="number"
                min="1"
              />
              {errors.maxGuests && (
                <p className="text-sm text-destructive">{errors.maxGuests.message as string}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="propertySize">Property Size (sq ft)</Label>
            <Input
              {...register('propertySize')}
              id="propertySize"
              type="number"
              min="1"
            />
            {errors.propertySize && (
              <p className="text-sm text-destructive">{errors.propertySize.message as string}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Property Rules</h3>
          
          <div className="space-y-4">
            <Controller
                name="allowChildren"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allowChildren" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="allowChildren">Children allowed</Label>
                  </div>
                )}
              />
            
              <Controller
                name="allowPets"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allowPets" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="allowPets">Pets allowed</Label>
                  </div>
                )}
              />

              <Controller
                name="allowSmoking"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allowSmoking" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="allowSmoking">Smoking Allowed</Label>
                  </div>
                )}
              />
              <Controller
                name="allowParties"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allowParties" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="allowParties">Event/parties allowed</Label>
                  </div>
                )}
              />
            
            
            
            
            
           
          </div>
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
  )
}