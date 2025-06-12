"use server"

import bcrypt from "bcrypt";

import { createClientServer } from "../utils/supabase/server"

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
      laundry]
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
        }
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
    discounts: discounts
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
        steps_completed: "legal"

    }).eq("id", propertyId).select('id');

    if(error || !data){
        console.error("Got an updation error");
    }


}