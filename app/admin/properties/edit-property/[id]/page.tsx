"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { fetchHotel } from '@/lib/actions/host'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AdminLayout from '@/app/admin/admin-layout';
import { toast } from '@/hooks/use-toast';

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const [propertyData, setPropertyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchPropertyToEdit = async () => {
      setLoading(true);
      setError(null);
      try {
        const property = await fetchHotel({propertyId: propertyId}); 
        
        if (property) {
          setPropertyData(property);
        } else {
          setError("Property not found for editing.");
        }
      } catch (err) {
        console.error("Failed to fetch property for editing:", err);
        setError("Failed to load property data for editing.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyToEdit();
    }
  }, [propertyId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setPropertyData((prev: any) => ({
            ...prev,
            [parent]: {
            ...(prev[parent] || {}),
            [child]: type === 'checkbox' ? checked : value,
            },
        }));
        } else {
        setPropertyData((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        }
    };

  const handleAmenityChange = (amenity: string, isChecked: boolean) => {
    setPropertyData((prev: any) => {
      const currentAmenities = prev.amenities || [];
      if (isChecked) {
        return { ...prev, amenities: [...currentAmenities, amenity] };
      } else {
        return { ...prev, amenities: currentAmenities.filter((a: string) => a !== amenity) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      

      toast({
        title: "Property Updated!",
        description: `${propertyData.property_name} has been successfully updated.`,
      });
      router.push(`/admin/properties/view-property/${propertyId}`); 
    } catch (err) {
      console.error("Failed to update property:", err);
      toast({
        title: "Update Failed",
        description: "There was an error updating the property. Please try again.",
        variant: "destructive",
      });
      setError("Failed to update property.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AdminLayout title="Loading Property" description="Fetching property details for editing..."><div className="p-6 text-center">Loading property data...</div></AdminLayout>;
  }

  if (error) {
    return <AdminLayout title="Error" description="Could not load property for editing."><div className="p-6 text-center text-red-500">{error}</div></AdminLayout>;
  }

  if (!propertyData) {
    return <AdminLayout title="Property Not Found" description="The requested property does not exist for editing."><div className="p-6 text-center">Property data is not available.</div></AdminLayout>;
  }

  return (
    <AdminLayout
      title={`Edit Property: ${propertyData.property_name}`}
      description="Modify the details of your property listing."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="property_name">Property Name</Label>
              <Input
                id="property_name"
                name="property_name"
                value={propertyData.property_name || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={propertyData.description || ''}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="property_type">Property Type</Label>
                <Input
                  id="property_type"
                  name="property_type"
                  value={propertyData.property_type || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={propertyData.bedrooms || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={propertyData.bathrooms || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="beds">Beds</Label>
                <Input
                  id="beds"
                  name="beds"
                  type="number"
                  value={propertyData.beds || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="max_guests">Max Guests</Label>
                <Input
                  id="max_guests"
                  name="max_guests"
                  type="number"
                  value={propertyData.max_guests || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="property_size">Property Size (sq ft)</Label>
                <Input
                  id="property_size"
                  name="property_size"
                  type="number"
                  value={propertyData.property_size || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={propertyData.address || ''}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={propertyData.city || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={propertyData.state || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={propertyData.pincode || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing & Fees</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="base_price">Base Price (per night)</Label>
              <Input
                id="base_price"
                name="base_price"
                type="number"
                value={propertyData.base_price || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="weekend_price">Weekend Price (per night)</Label>
              <Input
                id="weekend_price"
                name="weekend_price"
                type="number"
                value={propertyData.weekend_price || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="cleaning_fee">Cleaning Fee</Label>
              <Input
                id="cleaning_fee"
                name="cleaning_fee"
                type="number"
                value={propertyData.cleaning_fee || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="security_deposit">Security Deposit</Label>
              <Input
                id="security_deposit"
                name="security_deposit"
                type="number"
                value={propertyData.security_deposit || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="min_stay">Min Stay (nights)</Label>
              <Input
                id="min_stay"
                name="min_stay"
                type="number"
                value={propertyData.min_stay || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="max_stay">Max Stay (nights)</Label>
              <Input
                id="max_stay"
                name="max_stay"
                type="number"
                value={propertyData.max_stay || ''}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Example amenities, extend as needed */}
            {['wifi', 'TV', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 'Gym', 'Spa'].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={propertyData.amenities?.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={`amenity-${amenity}`} className="capitalize">
                  {amenity.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>House Rules & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow_children"
                  name="allow_children"
                  checked={propertyData.allow_children}
                  onCheckedChange={(checked) => handleChange({ target: { name: 'allow_children', type: 'checkbox', checked } } as any)}
                />
                <Label htmlFor="allow_children">Allow Children</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow_parties"
                  name="allow_parties"
                  checked={propertyData.allow_parties}
                  onCheckedChange={(checked) => handleChange({ target: { name: 'allow_parties', type: 'checkbox', checked } } as any)}
                />
                <Label htmlFor="allow_parties">Allow Parties</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow_pets"
                  name="allow_pets"
                  checked={propertyData.allow_pets}
                  onCheckedChange={(checked) => handleChange({ target: { name: 'allow_pets', type: 'checkbox', checked } } as any)}
                />
                <Label htmlFor="allow_pets">Allow Pets</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow_smoking"
                  name="allow_smoking"
                  checked={propertyData.allow_smoking}
                  onCheckedChange={(checked) => handleChange({ target: { name: 'allow_smoking', type: 'checkbox', checked } } as any)}
                />
                <Label htmlFor="allow_smoking">Allow Smoking</Label>
              </div>
            </div>

         
            <p className="text-sm font-medium">Custom House Rules:</p>
            {Object.keys(propertyData.house_rules || {}).map((key) => (
              <div key={key}>
                <Label htmlFor={`house_rules.${key}`}>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                <Input
                  id={`house_rules.${key}`}
                  name={`house_rules.${key}`}
                  value={propertyData.house_rules[key] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
            
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business & Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                name="business_name"
                value={propertyData.business_name || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="business_address">Business Address</Label>
              <Input
                id="business_address"
                name="business_address"
                value={propertyData.business_address || ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="gst_registered"
                name="gst_registered"
                checked={propertyData.gst_registered}
                onCheckedChange={(checked) => handleChange({ target: { name: 'gst_registered', type: 'checkbox', checked } } as any)}
              />
              <Label htmlFor="gst_registered">GST Registered</Label>
            </div>
            {propertyData.gst_registered && (
              <div>
                <Label htmlFor="gst_number">GST Number</Label>
                <Input
                  id="gst_number"
                  name="gst_number"
                  value={propertyData.gst_number || ''}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <Label htmlFor="pan_number">PAN Number</Label>
              <Input
                id="pan_number"
                name="pan_number"
                value={propertyData.pan_number || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={propertyData.phone_number || ''}
                onChange={handleChange}
              />
            </div>
             <div>
              <Label htmlFor="languages">Languages (comma-separated)</Label>
              <Input
                id="languages"
                name="languages"
                value={propertyData.languages?.join(', ') || ''}
                onChange={(e) => setPropertyData({ ...propertyData, languages: e.target.value.split(',').map(lang => lang.trim()) })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}