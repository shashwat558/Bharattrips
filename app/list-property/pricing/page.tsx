import { Suspense } from 'react';
import PricingForm from './PricingForm';






export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <PricingForm />
    </Suspense>
  );
}
