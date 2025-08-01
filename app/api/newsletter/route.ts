import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, interests } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email already exists
    const { data: existing } = await supabase.from("newsletter_subscriptions").select("id").eq("email", email).single()

    if (existing) {
      // Update existing subscription
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .update({
          interests: interests || [],
          updated_at: new Date().toISOString(),
          is_active: true,
        })
        .eq("email", email)
        .select()

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
      }

      return NextResponse.json(
        {
          message: "Subscription updated successfully",
          id: data[0]?.id,
        },
        { status: 200 },
      )
    } else {
      // Create new subscription
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .insert([
          {
            email,
            interests: interests || [],
            subscribed_at: new Date().toISOString(),
            is_active: true,
          },
        ])
        .select()

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
      }

      return NextResponse.json(
        {
          message: "Newsletter subscription created successfully",
          id: data[0]?.id,
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
