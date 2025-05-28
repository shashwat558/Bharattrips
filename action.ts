"use server"



import { createClientServer } from "@/lib/utils/supabase/server"
import { supabase } from "@/supabase";
import { redirect } from "next/navigation";

//@ts-ignore
const signInWIth = provider => async () => {
    const supabase = await createClientServer();
    const callback_url = `${process.env.SITE_URL}/auth/callback`;

    const {data, error} = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: callback_url
        }
    })
    console.log(data);
    if(error){
        console.log(error)
    }

    redirect(data.url ?? "")

}

export const signInWIthGoogle = signInWIth('google');


export const signUpWithPassword = async ({email, password}: {email: string, password: string}) => {
    const supabase = await createClientServer();
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: "http://localhost:3000/check-email"
        }
    })
}

export async function signInWithEmail({email, password}: {email: string, password: string}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  return data;
}

export const signOut = async () => {
    return await supabase.auth.signOut();
}