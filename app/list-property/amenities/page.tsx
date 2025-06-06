"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PropertyLayout from '@/components/property/property-layout'

const amenitiesSchema = z.object({
  wifi: z.boolean().optional(),
  ac: z.boolean().optional(),
  tv: z.boolean().optional(),
  kitchen: z.boolean().optional(),
  workspace: z.boolean().optional(),
  parking: z.boolean().optional(),
  pool: z.boolean().optional(),
  gym: z.boolean().optional(),
  breakfast: z.boolean().optional(),
  roomService: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  bar: z.boolean().optional(),
  spa: z.boolean().optional(),
  laundry: z.boolean().optional(),
})

export default function AmenitiesPage() {
  const router = useRouter()
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(amenitiesSchema)
  })
  
  const onSubmit = (data: any) => {
    console.log(data)
    router.push('/list-property/services')
  }

  return (
    <PropertyLayout 
      title="Amenities & Features" 
      description="Select the amenities available at your property"
      step={3}
      totalSteps={7}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Room Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox {...register('wifi')} id="wifi" />
                <Label htmlFor="wifi">Free WiFi</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('ac')} id="ac" />
                <Label htmlFor="ac">Air Conditioning</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('tv')} id="tv" />
                <Label htmlFor="tv">TV</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('kitchen')} id="kitchen" />
                <Label htmlFor="kitchen">Kitchen</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('workspace')} id="workspace" />
                <Label htmlFor="workspace">Dedicated Workspace</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Property Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox {...register('parking')} id="parking" />
                <Label htmlFor="parking">Free Parking</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('pool')} id="pool" />
                <Label htmlFor="pool">Swimming Pool</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('gym')} id="gym" />
                <Label htmlFor="gym">Fitness Center</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox {...register('breakfast')} id="breakfast" />
                <Label htmlFor="breakfast">Breakfast Available</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('roomService')} id="roomService" />
                <Label htmlFor="roomService">Room Service</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('restaurant')} id="restaurant" />
                <Label htmlFor="restaurant">Restaurant</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('bar')} id="bar" />
                <Label htmlFor="bar">Bar/Lounge</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('spa')} id="spa" />
                <Label htmlFor="spa">Spa Services</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('laundry')} id="laundry" />
                <Label htmlFor="laundry">Laundry Service</Label>
              </div>
            </div>
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