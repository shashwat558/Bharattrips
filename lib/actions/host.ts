"use server"

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
            throw new Error(
                
            )
        }
    }

}