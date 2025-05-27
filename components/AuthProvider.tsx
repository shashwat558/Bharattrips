"use client"
import { createClient } from '@/lib/utils/supabase/client';
import { useAuth } from '@/stores/useAuth'
import { useEffect } from 'react'

const AuthProvider = () => {
    const {setUser}  = useAuth();

    useEffect(() => {
        const supabase = createClient();

        const getSession = async () => {
            const {data: {user}, error} = await supabase.auth.getUser();
            setUser(user);
            if(error){
                console.error(error);
            }
        }
        getSession()

        const {data} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);

        }) 

        return () => {
            data.subscription?.unsubscribe()
        }
    },[setUser])


  return null 
  
}

export default AuthProvider