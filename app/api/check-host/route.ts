import { createClientServer } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("users")
    .select("id, role")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ exists: false }, { status: 200 });
  }

  return NextResponse.json({
    exists: true,
    isHost: data.role === "host"
  }, { status: 200 });
}
