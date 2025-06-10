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
import { savePricing } from '@/lib/actions/host'

const pricingSchema = z.object({
  basePrice: z.string().min(1, { message: "Please enter base price per night" }),
  weekendPrice: z.string().min(1, { message: "Please enter weekend price" }),
  cleaningFee: z.string().min(1, { message: "Please enter cleaning fee" }),
  securityDeposit: z.string().min(1, { message: "Please enter security deposit" }),
  minStay: z.string().min(1, { message: "Please enter minimum stay" }),
  maxStay: z.string().min(1, { message: "Please enter maximum stay" }),
  discounts: z.object({
    weekly: z.boolean().optional(),
    monthly: z.boolean().optional(),
    lastMinute: z.boolean().optional(),
    earlyBird: z.boolean().optional(),
  }),
})

export default function PricingPage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(pricingSchema)
  })
  
  const onSubmit = async (data: any) => {
  if (!propertyId) return;

  await savePricing({
    propertyId,
    basePrice: Number(data.basePrice),
    weekendPrice: Number(data.weekendPrice),
    cleaningFee: Number(data.cleaningFee),
    securityDeposit: Number(data.securityDeposit),
    minimumStay: Number(data.minStay),
    maximumStay: Number(data.maxStay),
    discounts: {
      weekly: data.discounts?.weekly || false,
      monthly: data.discounts?.monthly || false,
      lastMinute: data.discounts?.lastMinute || false,
      earlyBird: data.discounts?.earlyBird || false
    }
  });

  router.push(`/list-property/legal?propertyId=${propertyId}`);
};



  return (
    <PropertyLayout 
      title="Pricing & Availability" 
      description="Set your rates and booking preferences"
      step={6}
      totalSteps={7}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Base Rates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price per Night (₹)</Label>
                <Input
                  {...register('basePrice')}
                  id="basePrice"
                  type="number"
                  min="0"
                />
                {errors.basePrice && (
                  <p className="text-sm text-destructive">{errors.basePrice.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weekendPrice">Weekend Price per Night (₹)</Label>
                <Input
                  {...register('weekendPrice')}
                  id="weekendPrice"
                  type="number"
                  min="0"
                />
                {errors.weekendPrice && (
                  <p className="text-sm text-destructive">{errors.weekendPrice.message as string}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cleaningFee">Cleaning Fee (₹)</Label>
                <Input
                  {...register('cleaningFee')}
                  id="cleaningFee"
                  type="number"
                  min="0"
                />
                {errors.cleaningFee && (
                  <p className="text-sm text-destructive">{errors.cleaningFee.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                <Input
                  {...register('securityDeposit')}
                  id="securityDeposit"
                  type="number"
                  min="0"
                />
                {errors.securityDeposit && (
                  <p className="text-sm text-destructive">{errors.securityDeposit.message as string}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stay Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minStay">Minimum Stay (nights)</Label>
                <Input
                  {...register('minStay')}
                  id="minStay"
                  type="number"
                  min="1"
                />
                {errors.minStay && (
                  <p className="text-sm text-destructive">{errors.minStay.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxStay">Maximum Stay (nights)</Label>
                <Input
                  {...register('maxStay')}
                  id="maxStay"
                  type="number"
                  min="1"
                />
                {errors.maxStay && (
                  <p className="text-sm text-destructive">{errors.maxStay.message as string}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Discounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Controller
                name="discounts.weekly"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weekly" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="weekly">Weekly discount (7+ nights)</Label>
                  </div>
                )}
              />
              <Controller
                name="discounts.monthly"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="monthly" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="monthly">Monthly discount (28+ nights)</Label>
                  </div>
                )}
              />
               <Controller
                name="discounts.lastMinute"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="lastMinute" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="lastMinute">Last-minute discount</Label>
                  </div>
                )}
              />
              
              
              
               <Controller
                name="discounts.earlyBird"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="earlyBirds" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="earlyBirds">Early bird discount</Label>
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