"use client"

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'

import { Upload, X } from 'lucide-react'
import PropertyLayout from '@/components/property/property-layout'

import { createClient } from '@/lib/utils/supabase/client'
import { savePhotos } from '@/lib/utils'



export default function PhotosForm() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const router = useRouter()
  const [photos, setPhotos] = useState<File[]>([])
  const { handleSubmit, formState: { errors } } = useForm({
   
  })
  
const onSubmit = async () => {
  if (photos.length < 5 || !propertyId) return;

  const publicUrls = await savePhotos(propertyId, photos);

  const supabase = createClient();
  await supabase.from('properties').update({
    photos: publicUrls,
  }).eq('id', propertyId);

  router.push(`/list-property/pricing?propertyId=${propertyId}`);
};
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files)
      setPhotos([...photos, ...newPhotos])
    }
  }
  
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  return (
    <Suspense>
    <PropertyLayout 
      title="Property Photos" 
      description="Upload high-quality photos of your property"
      step={5}
      totalSteps={7}
      // propertyId={propertyId?? ""}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="photos"
                onChange={handlePhotoUpload}
              />
              <Label
                htmlFor="photos"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <span className="text-lg font-medium mb-2">Upload Photos</span>
                <span className="text-sm text-muted-foreground">
                  Drag and drop your photos here, or click to select files
                </span>
                <span className="text-sm text-muted-foreground mt-2">
                  Upload at least 5 high-quality photos
                </span>
              </Label>
            </div>
            
            {photos.length < 5 && (
              <p className="text-sm text-destructive">Please upload at least 5 photos</p>
            )}

          </div>
          
          {photos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Uploaded Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => {
                  const preview = URL.createObjectURL(photo);
                  return (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <Image
                      src={preview}
                      alt={`Property photo ${index + 1}`}
                      fill
                      className="object-cover"
                      
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
)})}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button 
            type="submit"
            disabled={photos.length < 5}
          >
            Continue
          </Button>
        </div>
      </form>
    </PropertyLayout>
    </Suspense>
  )
}