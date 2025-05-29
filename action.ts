"use server"



import { createClientServer } from "@/lib/utils/supabase/server"

import { revalidatePath } from "next/cache";
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




export async function login(data: SignupInput) {
  const supabase = await createClientServer()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

type SignupInput = {
  email: string
  password: string
}

export async function signup(data: SignupInput) {
  const supabase = await createClientServer()

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export const signOut = async () => {
    const supabase = await createClientServer();
    return await supabase.auth.signOut();
}