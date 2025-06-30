import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Star,
  Users,
  Bed
} from 'lucide-react'
import AdminLayout from '../admin-layout'


// Sample properties data
const properties = [
  {
    id: "0b2cacc8-6a76-4836-ad0b-5f5bbb2239a8",
    name: "White House Luxury Apartment",
    type: "apartment",
    location: "Patna, Bihar",
    address: "Near Paan Shop, Gandhi Maidan Area",
    price: 49000,
    weekendPrice: 57000,
    bedrooms: 10,
    bathrooms: 16,
    maxGuests: 45,
    rating: 4.6,
    reviews: 128,
    status: "active",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    amenities: ["WiFi", "AC", "TV", "Kitchen", "Parking"],
    businessName: "Trump Properties"
  },
  {
    id: "1c3dadd9-7a87-5947-be1c-6f6ccc3340b9",
    name: "Royal Palace Hotel",
    type: "hotel",
    location: "Mumbai, Maharashtra",
    address: "Marine Drive, South Mumbai",
    price: 75000,
    weekendPrice: 85000,
    bedrooms: 50,
    bathrooms: 52,
    maxGuests: 200,
    rating: 4.8,
    reviews: 342,
    status: "active",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    amenities: ["WiFi", "Spa", "Restaurant", "Pool", "Gym"],
    businessName: "Royal Hospitality"
  },
  {
    id: "2d4ebbe0-8b98-6058-cf2d-7g7ddd4451c0",
    name: "Mountain View Resort",
    type: "resort",
    location: "Shimla, Himachal Pradesh",
    address: "Mall Road, Shimla Hills",
    price: 35000,
    weekendPrice: 42000,
    bedrooms: 25,
    bathrooms: 30,
    maxGuests: 100,
    rating: 4.4,
    reviews: 89,
    status: "pending",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    amenities: ["WiFi", "Restaurant", "Parking", "Heater"],
    businessName: "Hill Station Resorts"
  }
]

const getStatusColor = (status: string) => {
  switch(status) {
    case 'active':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'inactive':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export default function PropertiesPage() {
  return (
    <AdminLayout 
      title="Properties" 
      description="Manage your property listings"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      <Tabs defaultValue="grid" className="space-y-6">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getStatusColor(property.status)}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Property
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                        <span className="font-medium">{property.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">({property.reviews})</span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {property.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Bed className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{property.bedrooms}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Bedrooms</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{property.maxGuests}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Guests</div>
                      </div>
                      <div>
                        <div className="font-medium">₹{property.price.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">per night</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 3).map((amenity, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {property.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{property.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Table View */}
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>All Properties</CardTitle>
              <CardDescription>
                A comprehensive list of all your properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-md overflow-hidden">
                            <Image
                              src={property.image}
                              alt={property.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{property.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {property.bedrooms} bed • {property.maxGuests} guests
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {property.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          {property.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">₹{property.price.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">per night</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>{property.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">({property.reviews})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Property
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}