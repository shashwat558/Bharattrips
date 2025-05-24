"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HotelGalleryProps {
  images: string[]
}

const HotelGallery = ({ images }: HotelGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }
  
  // Prevent event propagation from gallery controls
  const handleControlClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation()
    callback()
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[500px]">
        {/* Main Image */}
        <div 
          className="md:col-span-2 relative rounded-tl-lg rounded-bl-lg overflow-hidden cursor-pointer"
          onClick={() => openGallery(0)}
        >
          <Image
            src={images[0]}
            alt="Hotel Main Image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize className="h-10 w-10 text-white" />
          </div>
        </div>
        
        {/* Secondary Images */}
        <div className="hidden md:grid grid-rows-2 gap-2">
          <div 
            className="relative rounded-tr-lg overflow-hidden cursor-pointer"
            onClick={() => openGallery(1)}
          >
            <Image
              src={images[1]}
              alt="Hotel Image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div 
            className="relative rounded-br-lg overflow-hidden cursor-pointer group"
            onClick={() => openGallery(2)}
          >
            <Image
              src={images[2]}
              alt="Hotel Image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-white text-lg font-medium">+{images.length - 3} more</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Gallery */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-transparent border-none shadow-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Current Image */}
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Controls */}
            <button 
              className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={(e) => handleControlClick(e, prevImage)}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={(e) => handleControlClick(e, nextImage)}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HotelGallery