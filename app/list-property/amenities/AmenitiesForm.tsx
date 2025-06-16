"use client"

import React, { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { saveAmenities } from '@/lib/actions/host'
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

export default function AmenitiesForm() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const { register, handleSubmit, control } = useForm({
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
      wifi: data.wifi ? "wifi": "no wifi",
      ac: data.ac ? "Air conditioning": "No Air Conditioning",
      tv: data.tv ? "TV": "No TV",
      kitchen: data.kitchen ? "Kitchen": "No Kitchen",
      workspace: data.workspace ? "Dedicated Workspace": "No Dedicated Workspace",
      parking: data.parking ? "Free parking": "No Free parking",
      pool: data.pool ? "Swimming Pool": "No swimming pool",
      gym: data.gym ? "Fitness center": "No fitness center",
      breakfast: data.breakfast ? "Breakfast Service": "No Breakfast service",
      roomService: data.roomService ? "Room service available": "Room service not available",
      restaurant: data.restaurant ? "Restaurant": "No Restaurant",
      bar: data.bar ? "Bar/Lounge": "No Bar/Lounge",
      spa: data.spa ? "Spa Service": "No spa service",
      laundry: data.laundry ? "Laundry": "No laundry"
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
      // propertyId={propertyId??""}
    >
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Room Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="wifi"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="wifi" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="wifi">Free WiFi</Label>
                  </div>
                )}
              />

              <Controller
                name="ac"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ac" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="ac">Air Conditioning</Label>
                  </div>
                )}
              />

              
              <Controller
                name="tv"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tv" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="tv">TV</Label>
                  </div>
                )}
              />
              
              <Controller
                name="kitchen"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="kitchen" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="kitchen">Kitchen</Label>
                  </div>
                )}
              />
              
             <Controller
                name="workspace"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="workspace" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="workspace">Dedicated Workspace</Label>
                  </div>
                )}
              />

            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Property Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="parking"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="parking" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="parking">Free parking</Label>
                  </div>
                )}
              />
              <Controller
                name="pool"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pool" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="pool">Swimming pool</Label>
                  </div>
                )}
              />
             
              
              <Controller
                name="gym"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gym" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="gym">Fitness Center</Label>
                  </div>
                )}
              />
              
              
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="breakfast"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="breakfast" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="breakfast">Breakfast Available</Label>
                  </div>
                )}
              />
              <Controller
                name="roomService"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="roomService" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="roomService">Room Service</Label>
                  </div>
                )}
              />
              
              <Controller
                name="restaurant"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="restaurant" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="restaurant">Restaurant</Label>
                  </div>
                )}
              />
              
             <Controller
                name="bar"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bar" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="bar">Bar/Lounge</Label>
                  </div>
                )}
              />
              <Controller
                name="spa"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="spa" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="spa">Spa Services</Label>
                  </div>
                )}
              />
              
              <Controller
                name="laundry"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="laundry" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="laundry">Laundry Service</Label>
                  </div>
                )}
              />
              
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