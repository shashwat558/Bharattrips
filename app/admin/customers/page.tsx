import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Phone,
  Mail,
  Star,
  Calendar,
  CreditCard,
  Users,
  UserPlus,
  Crown,
  UserCheck
} from 'lucide-react'

import { format } from 'date-fns'
import AdminLayout from '../admin-layout'

// Sample customers data
const customers = [
  {
    id: "CUST001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "Delhi, India",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    joinedDate: new Date(2023, 5, 15),
    totalBookings: 12,
    totalSpent: 540000,
    averageRating: 4.8,
    status: "active",
    tier: "vip",
    lastBooking: new Date(2025, 6, 10)
  },
  {
    id: "CUST002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    location: "Mumbai, India",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    joinedDate: new Date(2023, 8, 22),
    totalBookings: 8,
    totalSpent: 320000,
    averageRating: 4.6,
    status: "active",
    tier: "regular",
    lastBooking: new Date(2025, 6, 15)
  },
  {
    id: "CUST003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    location: "Ahmedabad, India",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    joinedDate: new Date(2024, 1, 10),
    totalBookings: 15,
    totalSpent: 675000,
    averageRating: 4.9,
    status: "active",
    tier: "vip",
    lastBooking: new Date(2025, 5, 20)
  },
  {
    id: "CUST004",
    name: "Sunita Singh",
    email: "sunita.singh@email.com",
    phone: "+91 65432 10987",
    location: "Patna, India",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    joinedDate: new Date(2024, 3, 5),
    totalBookings: 3,
    totalSpent: 147000,
    averageRating: 4.2,
    status: "active",
    tier: "new",
    lastBooking: new Date(2025, 6, 18)
  },
  {
    id: "CUST005",
    name: "Vikram Reddy",
    email: "vikram.reddy@email.com",
    phone: "+91 54321 09876",
    location: "Hyderabad, India",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    joinedDate: new Date(2023, 11, 12),
    totalBookings: 6,
    totalSpent: 285000,
    averageRating: 4.4,
    status: "inactive",
    tier: "regular",
    lastBooking: new Date(2024, 11, 20)
  }
]

const getStatusColor = (status: string) => {
  switch(status) {
    case 'active':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'inactive':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const getTierColor = (tier: string) => {
  switch(tier) {
    case 'vip':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    case 'regular':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'new':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const getTierIcon = (tier: string) => {
  switch(tier) {
    case 'vip':
      return <Crown className="h-3 w-3" />
    case 'regular':
      return <UserCheck className="h-3 w-3" />
    case 'new':
      return <UserPlus className="h-3 w-3" />
    default:
      return <Users className="h-3 w-3" />
  }
}

export default function CustomersPage() {
  // Calculate stats
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    vip: customers.filter(c => c.tier === 'vip').length,
    new: customers.filter(c => c.tier === 'new').length,
  }

  return (
    <AdminLayout 
      title="Customers" 
      description="Manage customer relationships and data"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Customers</div>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-sm text-muted-foreground">Active Customers</div>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.vip}</div>
                <div className="text-sm text-muted-foreground">VIP Customers</div>
              </div>
              <Crown className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
                <div className="text-sm text-muted-foreground">New Customers</div>
              </div>
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            Complete customer database with booking history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={customer.image} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {customer.id}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {format(customer.joinedDate, 'MMM yyyy')}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm flex items-center mb-1">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="text-sm flex items-center">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.totalBookings} bookings</div>
                      <div className="text-sm text-muted-foreground">
                        Last: {format(customer.lastBooking, 'dd MMM yyyy')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">₹{customer.totalSpent.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                      <span>{customer.averageRating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTierColor(customer.tier)}>
                      <div className="flex items-center gap-1">
                        {getTierIcon(customer.tier)}
                        {customer.tier.toUpperCase()}
                      </div>
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
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Customer
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
    </AdminLayout>
  )
}