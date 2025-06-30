import BookingClientPage from "./bookingClientPage"




export default async function BookingPage({params}: {params: Promise<{id: number}>}) {
  const { id } = await params;
  console.log(id)
  return <BookingClientPage id={id} />
}
