"use server"

import bcrypt from "bcrypt";

import { createClientServer } from "../utils/supabase/server"
import { sendBookingEmail, transformFeaturedProperty } from "../utils";
import { supabase } from "@/supabase";

export async function initHostOnborading(email: string){
    const supabase = await createClientServer();
    
    const {data: user, error:fetchError} = await supabase.from("users").select('id, role').eq('email', email).maybeSingle();

    if(fetchError || !user){
        throw new Error("User not found")
    }

    if(user.role === "guest") {
        const {error: updateError} = await supabase.from("users").update({
            role: "host"
        }).eq("id", user.id)

        if(updateError){
            throw new Error("failed to update role")
        }
    }
    const {data, error} = await supabase.from('properties').insert({
    user_id: user.id,
    status: 'draft',
    step_completed: 'basic-info',
  }).select("id").single();
  const propertyId = data?.id;

  return {propertyId:propertyId}

}

export async function hostAccountPasswordAndPhone(email: string,password: string, phone: string){
    const supabase = await createClientServer();

    const {data: user, error:FetchError} = await supabase.from("users").select('id').eq("email", email).maybeSingle();

    if(FetchError || !user) {
        throw new Error("User not found")

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const {error: UpdateError} = await supabase.from("users").update({password: hashedPassword, phone_number: phone}).eq('id', user.id);

    if(UpdateError){
        throw new Error("failed to save password")
    }



}

export async function loginUser(email:string, password: string){
    const supabase = await createClientServer();
    const {data: user, error} = await supabase.from("users").select("id, password").eq("email", email).maybeSingle();
    if(error || !user){
        return {success: false, error:"User not found"}

    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return {success: false, error: "Incorrect password"}
    }

    return {success: true, userId: user.id}

}

export async function checkHostByEmail(email: string) {
  if (!email) return { exists: false, isHost: false };

  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("users")
    .select("id, role")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) {
    return { exists: false, isHost: false };
  }

  return {
    exists: true,
    isHost: data.role === "host"
  };
}

export async function saveBasicInfo({
    propertyId,
    propertyName,
    propertyType,
    address,
    city,
    state,
    pincode,
    description,

}: {
    propertyId: string,
    propertyName: string,
    propertyType: string,
    address: string,
    city: string,
    state: string,
    pincode: string,
    description: string
}) {

    const supabase = await createClientServer();
    const {data, error} = await supabase.from("properties").update({
        property_name: propertyName,
        property_type: propertyType,
        address: address,
        city: city,
        state: state,
        pincode: pincode,
        description: description
    }).eq('id', propertyId).select('id')

    if(error || !data){
        throw new Error("Failed to save property info");
    }

    return data[0];

}


export async function savePropertySetup({propertyId,bedrooms, beds, bathrooms, maxGuests, propertySize, allowChildren, allowPets, allowSmoking, allowParties}: {propertyId:string,bedrooms: number, beds: number, bathrooms: number, maxGuests: number, propertySize: string, allowChildren: boolean, allowPets:boolean, allowSmoking:boolean, allowParties:boolean}){

    const supabase = await createClientServer();
    const {data, error} = await supabase.from("properties").update({
        bedrooms: bedrooms,
        beds: beds,
        bathrooms: bathrooms,
        max_guests: maxGuests,
        property_size: propertySize,
        allow_children: allowChildren,
        allow_parties: allowParties,
        allow_pets: allowPets,
        allow_smoking: allowSmoking,
        step_completed: "property-setup"

    }).eq('id', propertyId).select('id');

    if(error || !data){
        console.log("-------------------------------------------------------", error?.code, error?.cause, error?.details, error?.hint)
        throw new Error("failed to save property info");
    }

    


}

export async function saveAmenities({
      propertyId,
      wifi,
      ac,
      tv,
      kitchen,
      workspace,
      parking,
      pool,
      gym,
      breakfast,
      roomService,
      restaurant,
      bar,
      spa,
      laundry,
}: {
    propertyId: string,
    wifi: string,
      ac: string,
      tv:string,
      kitchen:string,
      workspace:string,
      parking:string,
      pool:string,
      gym:string,
      breakfast:string,
      roomService:string,
      restaurant:string,
      bar:string,
      spa:string,
      laundry:string
}) {
    const supabase = await createClientServer();
    const {data, error} = await supabase.from("properties").update({
        amenities: [wifi,
      ac,
      tv,
      kitchen,
      workspace,
      parking,
      pool,
      gym,
      breakfast,
      roomService,
      restaurant,
      bar,
      spa,
      laundry],
      step_completed: "amenities"
    }).eq("id", propertyId).select('id');
    if(error || !data){
        throw new Error("error saving info")
    }
}


export async function saveServices({propertyId,languages, checkInTime, checkOutTime, houseRules: {
    quiteHours,
    noShoes,
    noSmoking,
    noPets

}}: {
 propertyId: string,   
 languages: string[],
 checkInTime: string,
 checkOutTime: string,
 houseRules: {
    quiteHours: string,
    noShoes: string,
    noSmoking: string,
    noPets: string
 }
}){

    const supabase = await createClientServer();
    const {data, error} = await supabase.from("properties").update({
        languages: languages,
        check_in_time: checkInTime,
        check_out_time: checkOutTime,
        house_rules: {
            quiteHours,
            noShoes,
            noSmoking,
            noPets
        },
        step_completed: "services"
    }).eq('id', propertyId).select('id');

    if(error || !data){
        throw new Error("Error while saving infor")
    }

}



export async function savePricing({
  propertyId,
  basePrice,
  weekendPrice,
  cleaningFee,
  securityDeposit,
  minimumStay,
  maximumStay,
  discounts
}: {
  propertyId: string;
  basePrice: number;
  weekendPrice: number;
  cleaningFee: number;
  securityDeposit: number;
  minimumStay: number;
  maximumStay: number;
  discounts: {
    monthly: boolean;
    weekly: boolean;
    earlyBird: boolean;
    lastMinute: boolean;
  };
}) {
  const supabase = await createClientServer();
  
  const { data, error } = await supabase.from("properties").update({
    base_price: basePrice,
    weekend_price: weekendPrice,
    cleaning_fee: cleaningFee,
    security_deposit: securityDeposit,
    min_stay: minimumStay,
    max_stay: maximumStay,
    discounts: discounts,
    step_completed: "pricing"
  }).eq('id', propertyId).select('id');

  if (error || !data) {
    throw new Error("Error saving pricing info");
  }
}


export async function saveLegalInfo({gstRegistered, gstNumber, panNumber, businessName, businessAddress, propertyId}: {
    gstRegistered: boolean,
    gstNumber: string,
    panNumber: string,
    businessName: string,
    
    businessAddress: string,
    propertyId: string

}){

    const supabase = await createClientServer();
    const {data, error} = await supabase.from("properties").update({
        gst_registered: gstRegistered,
        gst_number: gstNumber,
        pan_number: panNumber,
        business_name: businessName,
        business_address: businessAddress,
        status: "completed",
        step_completed: "legal"

    }).eq("id", propertyId).select('id');

    if(error || !data){
        console.error("Got an updation error", error.message);
    }


}

export async function cancelPropertyUpload(propertyId: string) {

    const supabase = await createClientServer();
    console.log("______________________________________________#########################")
    const {error: deleteError} = await supabase.from('properties').delete().eq('id', propertyId).select('id');

    if(deleteError){
        console.log(deleteError.message)
        console.error("Error cancelling");
    }

}

export async function fetchHotel({propertyId}: {propertyId:string}) {
    const supabase = await createClientServer();
    const {data, error} = await supabase.from("properties").select("*").eq('id', propertyId).maybeSingle();

    if(error || !data) {
      throw new Error("Error fetching hotel")
    }

    return data;

}


export async function addReview({propertyId, rating, comment, reviewTitle}: {propertyId: string, rating: number, comment: string, reviewTitle: string}) {
    const supabase = await createClientServer();
    const user = await supabase.auth.getUser();
        const {data: newReview,error} = await supabase.from("property_reviews").insert({
            user_id: user.data.user?.id,
            property_id: propertyId,
            rating: rating,
            comment: comment,
            review_title: reviewTitle
        }).select(`*, users (email, name), `).maybeSingle();

    if(error || !newReview){
        throw new Error(error?.message)
    }

    return newReview;
}

export async function getPropertyReviews(propertyId: string) {
    const supabase = await createClientServer();
    const {data, error} = await supabase.from("property_reviews_with_votes").select(`*`).eq("property_id", propertyId).order("created_at", {ascending: false});
    if(error || !data){
        throw new Error(error.message);

    }

    return data;
}


export async function likeReview({reviewId,propertyId,  voteType}: {reviewId: string,propertyId: string, voteType: "like" | "dislike"}) {
        const supabase = await createClientServer();
        const {data} = await supabase.auth.getUser();
        
        const {data: isExisting, error} = await supabase.from("review_votes").select("*").eq("user_id", data.user?.id).eq("review_id", reviewId).single();
        
        if(isExisting){
            if(isExisting.voted_type === voteType){
                await supabase.from("review_votes").delete().eq("id", isExisting.id)

            }else {
                await supabase.from("review_votes").update({voted_type: voteType}).eq('id', isExisting.id);
            }

        } else {
            await supabase.from("review_votes").insert({
                review_id: reviewId,
                user_id: data.user?.id,
                voted_type: voteType
            })
        }
    }


    export async function getFeaturesProperties() {
        const supabase = await createClientServer();

        const {data: Properties, error} = await supabase.from("properties").select("*").eq("is_featured", true).limit(6);

        if(error || !Properties) {
            throw new Error(error.message)
        }

        
        const featuredProperties = Properties.map(transformFeaturedProperty);

        return featuredProperties

    }



export async function getBookingDetails({propertyId}: {propertyId: string}){
    const supabase= await createClientServer();
    
    const {data, error} = await supabase.from("properties").select("property_name, city, state, photos, base_price, cleaning_fee").eq('id', propertyId).single();

    if(!data || error) {
        throw new Error(error.message);

    }

    return data;

}


export async function confirmHotelBooking({
  propertyId,
  checkInDate,
  checkOutDate,
  guests,
  totalPrice,
  cleaningFee,
  firstName,
  lastName,
  emailAddress,
  phoneNumber,
  specialRequirements,
  rooms,
  paymentMethod
}: {
  propertyId: string,
  checkInDate: Date,
  checkOutDate: Date,
  guests: number,
  totalPrice: number,
  cleaningFee: number,
  firstName: string,
  lastName: string,
  emailAddress: string,
  phoneNumber: string,
  specialRequirements: string,
  rooms: number,
  paymentMethod: "credit-card" | "paypal"
}) {
  const supabase = await createClientServer();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id ?? null;

  const { data: bookingData, error } = await supabase
    .from("bookings")
    .insert({
      user_id: userId,
      property_id: propertyId,
      check_in: checkInDate,
      check_out: checkOutDate,
      guests: guests,
      total_price: totalPrice,
      cleaning_fee: cleaningFee,
      status: "confirmed",
      first_name: firstName,
      last_name: lastName,
      email_address: emailAddress,
      phone_number: phoneNumber,
      special_requirements: specialRequirements,
      number_of_rooms: rooms
    })
    .select("id")
    .single();

  if (!bookingData || error) {
    throw new Error(error.message);
  }

  
  const { error: paymentError } = await supabase
    .from("payments")
    .insert({
      booking_id: bookingData.id,
      user_id: userId,
      amount: totalPrice,
      method: paymentMethod,
      status: "succeeded",
    });

  if (paymentError) {
    throw new Error(paymentError.message);
  }

  
  await sendBookingEmail({
    to: emailAddress,
    bookingId: bookingData.id,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    guests: guests,
    name: `${firstName} ${lastName}`,
    rooms: rooms
  });

  return bookingData.id;
}


export async function bookingDataById({bookingId}: {bookingId: string}) {
    const supabase = await createClientServer();
    const {data:propertyId} = await supabase.from("bookings").select("property_id").eq('id',bookingId ).single();
    const [bookingData, paymentData, propertyData] = await Promise.all([
        supabase.from("bookings").select("*").eq("id", bookingId).single(),
        supabase.from("payments").select("*").eq("booking_id", bookingId).single(),
        supabase.from("properties").select("property_name, photos, address, city, state, pincode, phone_number").eq("id", propertyId?.property_id).single()

    ]);

    if(bookingData.error || paymentData.error){
        const error = bookingData.error ? bookingData.error : paymentData.error;
      
        throw new Error(error?.message);
    }

    return {
        bookingData,
        paymentData,
        propertyData
    }
}



export async function getUserAllData() {
    const supabase = await createClientServer();
    const {data: userData} = await supabase.auth.getUser();
    const userId = userData.user?.id;

    const {data:fullUserData, error} = await supabase.from("full_user_profile").select('*').eq("user_id", userId);

    if(error || !fullUserData){
        throw new Error(error.message)
    }

    return fullUserData;




    
}