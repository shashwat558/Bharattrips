import { Suspense } from 'react';
import PhotosForm from './PhotosForm';





export default function AmenitiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <PhotosForm />
    </Suspense>
  );
}
