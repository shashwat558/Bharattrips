"use client"
import React, { useEffect, useState } from 'react'
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
import { getCustomersDetails } from '@/lib/actions/host'


const getStatusColor = (status: string) => {
 
  return 'bg-green-500/10 text-green-500 border-green-500/20' }

const getTierColor = (tier: string) => {
  
  return 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
}

const getTierIcon = (tier: string) => {
  
  return <Users className="h-3 w-3" /> 
}

export default function CustomersPage() {
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCustomersDetails();
        if (data && Array.isArray(data)) {
          setCustomersData(data);
        } else {
          setCustomersData([]);
          console.warn("API response for customers was not an array or empty:", data);
        }
      } catch (err) {
        console.error("Failed to fetch customer data:", err);
        setError("Failed to load customer data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCustomerData();
  }, []) 
  const stats = {
    total: customersData.length,
    active: customersData.filter(c => (c as any).status === 'active').length, 
    vip: customersData.filter(c => (c as any).tier === 'vip').length,
    new: customersData.filter(c => (c as any).tier === 'new').length,
  }

  if (loading) {
    return (
      <AdminLayout title="Customers" description="Manage customer relationships and data">
        <div className="flex justify-center items-center h-48">
          <p>Loading customer data...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Customers" description="Manage customer relationships and data">
        <div className="flex justify-center items-center h-48 text-red-500">
          <p>{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Customers"
      description="Manage customer relationships and data"
    >
     
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
                
                <TableHead>Bookings</TableHead>
                <TableHead>Total Spent</TableHead>
               
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customersData.length > 0 ? (
                customersData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                         
                          <AvatarImage src="" alt={customer.name} />
                          <AvatarFallback>{customer.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {customer.id}
                          </div>
                          
                          {/* <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Joined {format(customer.joinedDate, 'MMM yyyy')}
                          </div> */}
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
                      <div>
                        <div className="font-medium">{customer.totalBookings || 0} bookings</div>
                       
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">₹{customer.totalSpent?.toLocaleString() || '0'}</span>
                      </div>
                    </TableCell>
                    {/* <TableCell>
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
                    </TableCell> */}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No customer data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}