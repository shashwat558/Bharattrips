"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { fetchHotel} from '@/lib/actions/host'; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Bed, Bath, Wifi, PartyPopper, Utensils, PawPrint, Clock, CalendarDays, DollarSign, Cigarette } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/app/admin/admin-layout';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
    case 'completed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'inactive':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function ViewPropertyPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const propertyData = await fetchHotel({propertyId: propertyId});
        
        if (propertyData) {
          setProperty(propertyData);
        } else {
          setError("Property not found.");
        }
      } catch (err) {
        console.error("Failed to fetch property details:", err);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  if (loading) {
    return <AdminLayout title="Loading Property" description="Fetching property details..."><div className="p-6 text-center">Loading property details...</div></AdminLayout>;
  }

  if (error) {
    return <AdminLayout title="Error" description="Could not load property."><div className="p-6 text-center text-red-500">{error}</div></AdminLayout>;
  }

  if (!property) {
    return <AdminLayout title="Property Not Found" description="The requested property does not exist."><div className="p-6 text-center">Property data is not available.</div></AdminLayout>;
  }

  return (
    <AdminLayout
      title={`Property Details: ${property.property_name}`}
      description="View comprehensive information about your property."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {property.property_name}
                <Badge className={getStatusColor(property.status)}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {property.address}, {property.city}, {property.state}, {property.pincode}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-96 w-full rounded-md overflow-hidden">
                {property.photos && property.photos.length > 0 ? (
                  <Image
                    src={property.photos[0]}
                    alt={property.property_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">{property.description}</p>

              <Separator />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-primary" />
                  <span>**{property.bedrooms}** Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-primary" />
                  <span>**{property.bathrooms}** Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span>**{property.max_guests}** Max Guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-primary" />
                  <span>**{property.beds}** Beds</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  <span>**{property.property_size}** sq ft</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>Check-in: **{property.check_in_time}**</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>Check-out: **{property.check_out_time}**</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Details */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Base Price:</span> ₹{property.base_price.toLocaleString()}/night
              </div>
              <div>
                <span className="font-semibold">Weekend Price:</span> ₹{property.weekend_price.toLocaleString()}/night
              </div>
              <div>
                <span className="font-semibold">Cleaning Fee:</span> ₹{property.cleaning_fee.toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Security Deposit:</span> ₹{property.security_deposit.toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Min Stay:</span> {property.min_stay} night(s)
              </div>
              <div>
                <span className="font-semibold">Max Stay:</span> {property.max_stay} night(s)
              </div>
              <div>
                <span className="font-semibold">Weekly Discount:</span> {property.discounts?.weekly ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-semibold">Monthly Discount:</span> {property.discounts?.monthly ? 'Yes' : 'No'}
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {property.amenities && property.amenities.map((amenity: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {amenity}
                </Badge>
              ))}
              {!property.amenities || property.amenities.length === 0 && <p className="text-muted-foreground">No amenities listed.</p>}
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>House Rules & Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {property.allow_children && <div className="flex items-center"><PartyPopper className="h-4 w-4 mr-2 text-muted-foreground" /> <span>Children allowed</span></div>}
              {property.allow_parties && <div className="flex items-center"><PartyPopper className="h-4 w-4 mr-2 text-muted-foreground" /> <span>Parties allowed</span></div>}
              {property.allow_pets && <div className="flex items-center"><PawPrint className="h-4 w-4 mr-2 text-muted-foreground" /> <span>Pets allowed</span></div>}
              {property.allow_smoking && <div className="flex items-center"><Cigarette className="h-4 w-4 mr-2 text-muted-foreground" /> <span>Smoking allowed</span></div>}

              {property.house_rules && Object.entries(property.house_rules).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center">
                  <span className="font-semibold mr-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span>{value}</span>
                </div>
              ))}
              {(!property.house_rules || Object.keys(property.house_rules).length === 0) &&
                !property.allow_children && !property.allow_parties && !property.allow_pets && !property.allow_smoking && (
                  <p className="text-muted-foreground">No specific house rules listed.</p>
              )}
            </CardContent>
          </Card>
        </div>

        
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><span className="font-semibold">Business Name:</span> {property.business_name}</div>
              <div><span className="font-semibold">Business Address:</span> {property.business_address}</div>
              {property.gst_registered && (
                <>
                  <div><span className="font-semibold">GST Registered:</span> Yes</div>
                  {property.gst_number && <div><span className="font-semibold">GST Number:</span> {property.gst_number}</div>}
                </>
              )}
              {property.pan_number && <div><span className="font-semibold">PAN Number:</span> {property.pan_number}</div>}
              {property.phone_number && <div><span className="font-semibold">Phone Number:</span> {property.phone_number}</div>}
              <div><span className="font-semibold">Languages Spoken:</span> {property.languages?.join(', ') || 'N/A'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><span className="font-semibold">Property Type:</span> {property.property_type}</div>
              <div><span className="font-semibold">Created At:</span> {new Date(property.created_at).toLocaleDateString()}</div>
              <div><span className="font-semibold">Status:</span> <Badge className={getStatusColor(property.status)}>{property.status.charAt(0).toUpperCase() + property.status.slice(1)}</Badge></div>
              <div><span className="font-semibold">Step Completed:</span> {property.step_completed}</div>
              {property.is_featured !== null && <div><span className="font-semibold">Featured:</span> {property.is_featured ? 'Yes' : 'No'}</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

