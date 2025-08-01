import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const department = searchParams.get("department")
    const type = searchParams.get("type")
    const location = searchParams.get("location")
    const search = searchParams.get("search")

    let query = supabase
      .from("career_postings")
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (department) {
      query = query.eq("department", department)
    }
    if (type) {
      query = query.eq("type", type)
    }
    if (location) {
      query = query.ilike("location", `%${location}%`)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,department.ilike.%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, department, location, type, description, requirements, benefits, salary_range } = body

    // Validate required fields
    if (!title || !department || !location || !type || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user from session
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has permission
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || !["admin", "hr_manager"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { data, error } = await supabase
      .from("career_postings")
      .insert({
        title,
        department,
        location,
        type,
        description,
        requirements: requirements || [],
        benefits: benefits || [],
        salary_range,
        created_by: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("Insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
