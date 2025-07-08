import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createClient } from './utils/supabase/client';
import { resend } from './resned';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function savePhotos(propertyId: string, photos: File[]){
    const supabase =  createClient();
    const uploadUrls: string[] = [];

    for(const photo of photos){
        const filepath = `${propertyId}/${Date.now()}-${photo.name}`;

        const {error:uploadError} = await supabase.storage.from("bharattrips-properties-photo-bucket").upload(filepath, photo);

        if(uploadError){
            console.error("Error while uploading photo", uploadError.message);
            continue;
        }

        const {data: urlData} = await supabase.storage.from("bharattrips-properties-photo-bucket").getPublicUrl(filepath);

        if(urlData.publicUrl){
            uploadUrls.push(urlData.publicUrl);
        }

        

    }


    return uploadUrls;

}

export function transformFeaturedProperty(raw: any) {
  return {
    id: raw.id,
    name: raw.property_name,
    location: `${raw.city}, ${raw.state}`,
    price: raw.base_price,
    image: raw.photos?.[0] ?? "/fallback.jpg",
    tags: ["Popular", raw.property_type],
    amenities: raw.amenities.slice(0, 5) ?? [],
  };
}




export async function sendBookingEmail({
  to,
  name,
  bookingId,
  checkInDate,
  checkOutDate,
  rooms,
  guests,
}: {
  to: string;
  name: string;
  bookingId: string;
  checkInDate: Date;
  checkOutDate: Date;
  rooms: number;
  guests: number;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Hotel Bookings <bookings@yourdomain.com>',
      to,
      subject: `Booking Confirmation - #${bookingId}`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for booking with us! Here are your reservation details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
          <li><strong>Check-in:</strong> ${checkInDate}</li>
          <li><strong>Check-out:</strong> ${checkOutDate}</li>
          <li><strong>Number of rooms:</strong> ${rooms}</li>
          <li><strong>Guests:</strong> ${guests}</li>
        </ul>
        <p>We look forward to hosting you!</p>
      `,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to send email:', err);
    throw err;
  }
}
