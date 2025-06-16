import { Suspense } from 'react';
import BasicInfoForm from './BasicInfoForm';



export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasicInfoForm />
    </Suspense>
  );
}
