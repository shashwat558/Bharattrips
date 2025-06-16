"use client"

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PropertyLayout from '@/components/property/property-layout'
import { saveLegalInfo } from '@/lib/actions/host'

const legalSchema = z.object({
  gstRegistered: z.enum(['yes', 'no']),
  gstNumber: z.string().optional().refine((val) => {
    if (!val) return true
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val)
  }, { message: "Please enter a valid GST number" }),
  panNumber: z.string().min(10, { message: "Please enter a valid PAN number" }),
  businessName: z.string().min(2, { message: "Please enter your business name" }),
  businessAddress: z.string().min(5, { message: "Please enter your business address" }),
})

export default function LegalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(legalSchema)
  })
  
  const isGstRegistered = watch('gstRegistered') === 'yes'
  
  const onSubmit =async (data: any) => {
    console.log(data)
    if(propertyId){
    await saveLegalInfo({
      businessAddress: data.businessAddress,
      businessName: data.businessName,
      panNumber: data.panNumber,
      gstNumber: data.gstNumber,
      gstRegistered: data.gstRegistered,
      propertyId: propertyId,
      
    })
    router.push('/list-property/success')
  }
}

  return (
    <PropertyLayout 
      title="Legal Information" 
      description="Provide your business and tax details"
      step={7}
      totalSteps={7}
      // propertyId={propertyId??""}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">GST Registration</h3>
            <div className="space-y-4">
              <Label>Are you registered for GST?</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    {...register('gstRegistered')}
                    value="yes"
                    id="gst-yes"
                  />
                  <Label htmlFor="gst-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    {...register('gstRegistered')}
                    value="no"
                    id="gst-no"
                  />
                  <Label htmlFor="gst-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {isGstRegistered && (
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  {...register('gstNumber')}
                  id="gstNumber"
                  placeholder="Enter your GST number"
                />
                {errors.gstNumber && (
                  <p className="text-sm text-destructive">{errors.gstNumber.message as string}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Business Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  {...register('panNumber')}
                  id="panNumber"
                  placeholder="Enter your PAN number"
                />
                {errors.panNumber && (
                  <p className="text-sm text-destructive">{errors.panNumber.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  {...register('businessName')}
                  id="businessName"
                  placeholder="Enter your business name"
                />
                {errors.businessName && (
                  <p className="text-sm text-destructive">{errors.businessName.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  {...register('businessAddress')}
                  id="businessAddress"
                  placeholder="Enter your business address"
                />
                {errors.businessAddress && (
                  <p className="text-sm text-destructive">{errors.businessAddress.message as string}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              By submitting this form, you confirm that all the information provided is accurate and complete. 
              You agree to our terms of service and understand that false information may result in the termination of your listing.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit">
            Submit Listing
          </Button>
        </div>
      </form>
    </PropertyLayout>
  )
}