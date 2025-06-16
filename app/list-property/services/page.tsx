import { Suspense } from 'react';
import ServicesForm from './ServivesForm';








export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <ServicesForm />
    </Suspense>
  );
}
