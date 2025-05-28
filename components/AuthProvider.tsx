"use client"
import { createClient } from '@/lib/utils/supabase/client';
import { useAuth } from '@/stores/useAuth'
import { useEffect } from 'react'

const AuthProvider = () => {
    const { setUser } = useAuth()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) console.error('User fetch error:', error)
            else setUser(user)
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [setUser, supabase.auth])

    return null
}

export default AuthProvider
