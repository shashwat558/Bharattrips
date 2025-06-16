import { Suspense } from 'react';
import PropertySetupForm from './PropertySetupFrom';







export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <PropertySetupForm />
    </Suspense>
  );
}
