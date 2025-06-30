import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createClient } from './utils/supabase/client';


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