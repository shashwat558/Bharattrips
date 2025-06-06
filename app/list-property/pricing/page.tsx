"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PropertyLayout from '@/components/property/property-layout'

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
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(pricingSchema)
  })
  
  const onSubmit = (data: any) => {
    console.log(data)
    router.push('/list-property/legal')
  }

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
              <div className="flex items-center space-x-2">
                <Checkbox {...register('discounts.weekly')} id="weekly" />
                <Label htmlFor="weekly">Weekly discount (7+ nights)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('discounts.monthly')} id="monthly" />
                <Label htmlFor="monthly">Monthly discount (28+ nights)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('discounts.lastMinute')} id="lastMinute" />
                <Label htmlFor="lastMinute">Last-minute discount</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox {...register('discounts.earlyBird')} id="earlyBird" />
                <Label htmlFor="earlyBird">Early bird discount</Label>
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