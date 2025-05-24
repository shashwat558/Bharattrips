"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Users, Check } from 'lucide-react'

interface Room {
  id: number
  name: string
  description: string
  price: number
  capacity: number
  amenities: string[]
  image: string
}

interface RoomListProps {
  rooms: Room[]
}

const RoomList = ({ rooms }: RoomListProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-playfair text-2xl font-bold mb-4">Available Rooms</h2>
      
      <div className="space-y-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardContent className="flex-1 p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-2">{room.name}</h3>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      {room.capacity} {room.capacity === 1 ? 'Person' : 'People'}
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{room.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {room.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:text-right">
                    <div>
                      <span className="text-2xl font-bold">${room.price}</span>
                      <span className="text-muted-foreground"> / night</span>
                      <p className="text-xs text-muted-foreground">Excluding taxes and fees</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <Link href={`/booking/${room.id}?roomId=${room.id}`}>
                        <Button className="w-full md:w-auto">Book Now</Button>
                      </Link>
                      <Button variant="outline" className="w-full md:w-auto">View Details</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RoomList