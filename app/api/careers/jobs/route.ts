import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const department = searchParams.get("department")
    const location = searchParams.get("location")
    const remote_type = searchParams.get("remote_type")
    const experience_level = searchParams.get("experience_level")
    const search = searchParams.get("search")

    let query = supabase
      .from("job_postings")
      .select(`
        *,
        job_applications(count)
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false })

    // Apply filters
    if (department && department !== "all") {
      query = query.eq("department", department)
    }

    if (location && location !== "all") {
      query = query.ilike("location", `%${location}%`)
    }

    if (remote_type && remote_type !== "all") {
      query = query.eq("remote_type", remote_type)
    }

    if (experience_level && experience_level !== "all") {
      query = query.eq("experience_level", experience_level)
    }

    // Text search
    if (search) {
      query = query.or(`
        title.ilike.%${search}%,
        description.ilike.%${search}%,
        ai_skill_tags.cs.{${search}}
      `)
    }

    // Pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: jobs, error, count } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
    }

    // Transform data to match frontend interface
    const transformedJobs =
      jobs?.map((job) => ({
        ...job,
        applications_count: job.job_applications?.[0]?.count || 0,
        views_count: Math.floor(Math.random() * 200) + 50, // Mock views for now
        hiring_manager: {
          name: "Sarah Chen",
          title: "VP of Engineering",
          avatar: "/placeholder.svg?height=64&width=64&text=SC",
        },
        company_info: {
          size: "500-1000 employees",
          industry: "Technology Consulting",
          founded: "2015",
          headquarters: "McKinney, TX",
        },
      })) || []

    return NextResponse.json({
      jobs: transformedJobs,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    // Generate AI insights
    const aiInsights = {
      complexity_score: Math.floor(Math.random() * 40) + 60,
      market_demand: Math.floor(Math.random() * 30) + 70,
      skill_analysis:
        jobData.technologies?.map((tech: string) => ({
          skill: tech,
          demand: Math.floor(Math.random() * 40) + 60,
          availability: Math.floor(Math.random() * 30) + 20,
        })) || [],
    }

    const { data, error } = await supabase
      .from("job_postings")
      .insert([
        {
          ...jobData,
          ai_analysis: aiInsights,
          status: "active",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create job posting" }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
