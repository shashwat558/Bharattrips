"use client"
import { createClient } from '@/lib/utils/supabase/client'
import { useAuth } from '@/stores/useAuth'
import { useEffect } from 'react'

const AuthProvider = () => {
  const { setUser } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('User fetch error:', error)
      } else {
        console.log(user)
        setUser(user)
      }
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [setUser, supabase])

  return null
}

export default AuthProvider
