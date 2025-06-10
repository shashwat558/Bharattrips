"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PropertyLayout from '@/components/property/property-layout'
import { saveServices } from '@/lib/actions/host'

const servicesSchema = z.object({
  languages: z.array(z.string()).min(1, { message: "Select at least one language" }),
  checkInTime: z.string().min(1, { message: "Please enter check-in time" }),
  checkOutTime: z.string().min(1, { message: "Please enter check-out time" }),
  houseRules: z.object({
    quietHours: z.boolean().optional(),
    noShoes: z.boolean().optional(),
    noSmoking: z.boolean().optional(),
    noPets: z.boolean().optional(),
  }),
})

const languages = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Malayalam"
]

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(servicesSchema)
  })
  
  const onSubmit = async (data: any) => {
    console.log(data)
    if(propertyId){
    await saveServices({
      languages: data.languages,
      checkInTime: data.checkInTime,
      checkOutTime: data.checkOutTime,
      houseRules: {
        noPets: data.houseRules.noPets ? "No pets allowed": "Pets allowed",
        noShoes: data.houseRules.noShoes ? "No shoes allowed inside the house": "Shoes allowed inside the house",
        noSmoking: data.houseRules.noSmoking ? "No smoking inside the house": "Smoking allowed inside the house",
        quiteHours: data.houseRules.quiteHours ? "Quite hours from (10 PM - 7 AM)": "No quite hours"

      },
      propertyId: propertyId
    })
    router.push(`/list-property/photos?propertyId=${propertyId}`)
    }

  }

  return (
    <PropertyLayout 
      title="Services & Rules" 
      description="Set your house rules and service details"
      step={4}
      totalSteps={7}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Languages Spoken</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Controller
                name="languages"
                control={control}
                render={({ field }) => (
                  <>
                    {languages.map((language) => (
                      <div className="flex items-center space-x-2" key={language}>
                        <Checkbox
                          id={`lang-${language}`}
                          checked={field.value?.includes(language) || false}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), language]);
                            } else {
                              field.onChange((field.value || []).filter((l: string) => l !== language));
                            }
                          }}
                        />
                        <Label htmlFor={`lang-${language}`}>{language}</Label>
                      </div>
                    ))}
                  </>
                )}
              />
            </div>
            {errors.languages && (
              <p className="text-sm text-destructive">{errors.languages.message as string}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Check-in/Check-out</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-2">
                <Label htmlFor="checkInTime">Check-in Time</Label>
                <Input
                  {...register('checkInTime')}
                  id="checkInTime"
                  type="time"
                />
                {errors.checkInTime && (
                  <p className="text-sm text-destructive">{errors.checkInTime.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="checkOutTime">Check-out Time</Label>
                <Input
                  {...register('checkOutTime')}
                  id="checkOutTime"
                  type="time"
                />
                {errors.checkOutTime && (
                  <p className="text-sm text-destructive">{errors.checkOutTime.message as string}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">House Rules</h3>
            <div className="space-y-4">
             
              <Controller
                name="houseRules.quietHours"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="quiteHours" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="quiteHours">Quiet hours (10 PM - 7 AM)</Label>
                  </div>
                )}
              />
              <Controller
                name="houseRules.noShoes"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="noShoes" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="noShoes">No shoes in the house</Label>
                  </div>
                )}
              />
              <Controller
                name="houseRules.noSmoking"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="noSmoking" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="noSmoking">No smoking indoors</Label>
                  </div>
                )}
              />

              <Controller
                name="houseRules.noPets"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="noPets" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="noPets">No pets allowed</Label>
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