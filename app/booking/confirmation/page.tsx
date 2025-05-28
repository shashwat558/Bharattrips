import React, { Suspense } from 'react'
import BookingConfirmationPage from './BookingConfirmationPage'

const ConfirmationPage = () => {
  return (
    <Suspense fallback={<div className="text-center pt-20">Loading confirmation...</div>}>
      <BookingConfirmationPage />
    </Suspense>
  )
}

export default ConfirmationPage
