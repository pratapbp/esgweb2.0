import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "department", "location", "job_type", "description", "requirements"]
    for (const field of requiredFields) {
      if (!body[field] || body[field].toString().trim() === "") {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate job_type
    const validJobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"]
    if (!validJobTypes.includes(body.job_type)) {
      return NextResponse.json({ success: false, error: "Invalid job type" }, { status: 400 })
    }

    // Validate employment_level
    const validLevels = ["Entry-Level", "Mid-Level", "Senior-Level", "Executive"]
    if (body.employment_level && !validLevels.includes(body.employment_level)) {
      return NextResponse.json({ success: false, error: "Invalid employment level" }, { status: 400 })
    }

    // Validate remote_type
    const validRemoteTypes = ["remote", "hybrid", "onsite"]
    if (body.remote_type && !validRemoteTypes.includes(body.remote_type)) {
      return NextResponse.json({ success: false, error: "Invalid remote type" }, { status: 400 })
    }

    // Validate salary range
    if (body.salary_min && body.salary_max && body.salary_min >= body.salary_max) {
      return NextResponse.json(
        { success: false, error: "Maximum salary must be greater than minimum salary" },
        { status: 400 },
      )
    }

    // Mock user ID (in production, get from authentication)
    const userId = "00000000-0000-0000-0000-000000000000"

    // Prepare data for insertion
    const jobData = {
      title: body.title.trim(),
      department: body.department,
      location: body.location.trim(),
      job_type: body.job_type,
      employment_level: body.employment_level || "Mid-Level",
      description: body.description.trim(),
      requirements: body.requirements.trim(),
      salary_min: body.salary_min || null,
      salary_max: body.salary_max || null,
      salary_range:
        body.salary_min && body.salary_max
          ? `$${body.salary_min.toLocaleString()} - $${body.salary_max.toLocaleString()}`
          : body.salary_min
            ? `From $${body.salary_min.toLocaleString()}`
            : body.salary_max
              ? `Up to $${body.salary_max.toLocaleString()}`
              : null,
      tags: body.tags || [],
      benefits: body.benefits || [],
      remote_type: body.remote_type || "hybrid",
      featured: body.featured || false,
      status: body.status || "active",
      posted_by: userId,
      expires_at: body.expires_at || null,
      applications_count: 0,
      views_count: 0,
    }

    // Insert into database
    const { data, error } = await supabase.from("jobs").insert([jobData]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ success: false, error: "Failed to create job posting" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      job: data,
      message: "Job posting created successfully",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
