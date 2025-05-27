import { createClientServer } from '@/lib/utils/supabase/server'
import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions


export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClientServer()
    const { error: ExchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (!ExchangeError) {
      const {
        data : { user },
        error: userError
      } = await supabase.auth.getUser();

      if(user && !userError){

        const {data: existingUser} = await supabase.from("users").select("id").eq('id', user.id).single()

        if(!existingUser) {
          await supabase.from("users").insert({
            id: user.id,
            email: user.email,
            username: user.user_metadata.full_name || user.email?.split('@')[0] || 'unknown'
          })
        }
      }


      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}