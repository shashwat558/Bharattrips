import { Suspense } from 'react';
import LegalForm from './LegalForm';




export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <LegalForm />
    </Suspense>
  );
}
