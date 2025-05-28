import BookingClientPage from "./bookingClientPage"




export default async function BookingPage({params}: {params: Promise<{id: number}>}) {
  const { id } = await params
  return <BookingClientPage id={id} />
}
