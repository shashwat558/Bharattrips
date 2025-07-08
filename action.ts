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
  password: string,
  name: string
}

export async function signup(signUpData: SignupInput) {
  const supabase = await createClientServer()

  
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', signUpData.email)
    .maybeSingle()

  if (existingUser) {
    redirect('/already-registered')
  }

 
  const { data, error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
    
  })

  if (error) {
    console.error('Signup error:', error.message)
    redirect('/error') 
  }

  
  if (data.user) {
    await supabase.from('users').insert({
      id: data.user.id,
      email: data.user.email,
      name: signUpData.name
    })
  }

  
  revalidatePath('/', 'layout')
  redirect('/')
}

export const signOut = async () => {
    const supabase = await createClientServer();
    return await supabase.auth.signOut();
}