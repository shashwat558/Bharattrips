"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PropertyLayout from '@/components/property/property-layout'

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
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(servicesSchema)
  })
  
  const onSubmit = (data: any) => {
    console.log(data)
    router.push('/list-property/photos')
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
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    {...register('languages')}
                    id={`lang-${language}`}
                    value={language}
                  />
                  <Label htmlFor={`lang-${language}`}>{language}</Label>
                </div>
              ))}
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
              <div className="flex items-center space-x-2">
                <Checkbox {...register('houseRules.quietHours')} id="quietHours" />
                <Label htmlFor="quietHours">Quiet hours (10 PM - 7 AM)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('houseRules.noShoes')} id="noShoes" />
                <Label htmlFor="noShoes">No shoes in the house</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('houseRules.noSmoking')} id="noSmoking" />
                <Label htmlFor="noSmoking">No smoking indoors</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('houseRules.noPets')} id="noPets" />
                <Label htmlFor="noPets">No pets allowed</Label>
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