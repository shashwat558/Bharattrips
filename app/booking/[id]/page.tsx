import { getBookingDetails } from "@/lib/actions/host";
import BookingClientPage from "./bookingClientPage"




export default async function BookingPage({params}: {params: Promise<{id: string}>}) {
  const { id } = await params;
  const hotelsDetails = await getBookingDetails({propertyId: id})

  console.log(id)
  return <BookingClientPage id={id} hotelDetails={hotelsDetails}/>
}
