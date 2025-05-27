import { User } from "@supabase/supabase-js"
import { create } from "zustand"


type authState = {
    user: User | null,
    setUser: (user: User | null) => void
}

export const useAuth = create<authState>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))