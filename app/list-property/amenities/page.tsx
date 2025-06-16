import { Suspense } from 'react';
import AmenitiesForm from './AmenitiesForm';


export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AmenitiesForm />
    </Suspense>
  );
}
