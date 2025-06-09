"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PropertyLayout from '@/components/property/property-layout'
import { saveAmenities } from '@/lib/actions/host'

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
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(amenitiesSchema),
    defaultValues: {
      wifi: false,
      ac: false,
      tv: false,
      kitchen: false,
      workspace: false,
      parking: false,
      pool: false,
      gym: false,
      breakfast: false,
      roomService: false,
      restaurant: false,
      bar: false,
      spa: false,
      laundry: false,

    }
  })
  
  const onSubmit = async(data: any) => {
    console.log(data)
    if(propertyId){
    await saveAmenities({
      propertyId: propertyId,
      wifi: data.wifi,
      ac: data.ac,
      tv: data.tv,
      kitchen: data.kitchen,
      workspace: data.workspace,
      parking: data.parking,
      pool: data.pool,
      gym: data.gym,
      breakfast: data.breakfast,
      roomService: data.roomService,
      restaurant: data.restaurant,
      bar: data.bar,
      spa: data.spa,
      laundry: data.laundry
    })
    router.push(`/list-property/services?propertyId=${propertyId}`);
    }
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