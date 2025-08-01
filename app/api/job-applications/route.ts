import { type NextRequest, NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies })

    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const formData = await request.formData()

    // Handle file uploads
    let resumeUrl = null
    let resumeFilename = null
    let coverLetterUrl = null
    let coverLetterFilename = null

    const resume = formData.get("resume") as File | null
    const coverLetter = formData.get("coverLetter") as File | null

    if (resume) {
      const fileExt = resume.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `job-applications/resumes/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage.from("documents").upload(filePath, resume)

      if (uploadError) {
        console.error("Resume upload error:", uploadError)
        return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 })
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(filePath)

      resumeUrl = publicUrl
      resumeFilename = resume.name
    }

    if (coverLetter) {
      const fileExt = coverLetter.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `job-applications/cover-letters/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, coverLetter)

      if (uploadError) {
        console.error("Cover letter upload error:", uploadError)
        return NextResponse.json({ error: "Failed to upload cover letter" }, { status: 500 })
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(filePath)

      coverLetterUrl = publicUrl
      coverLetterFilename = coverLetter.name
    }

    // Prepare application data
    const applicationData = {
      job_id: formData.get("jobId") as string,
      job_title: formData.get("jobTitle") as string,
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      linkedin_url: (formData.get("linkedinUrl") as string) || null,
      portfolio_url: (formData.get("portfolioUrl") as string) || null,
      cover_letter_text: (formData.get("coverLetterText") as string) || null,
      additional_info: (formData.get("additionalInfo") as string) || null,
      resume_url: resumeUrl,
      resume_filename: resumeFilename,
      cover_letter_url: coverLetterUrl,
      cover_letter_filename: coverLetterFilename,
      status: "submitted",
      applied_at: new Date().toISOString(),
    }

    const { data: newApplication, error } = await supabase
      .from("job_applications")
      .insert([applicationData])
      .select()
      .single()

    if (error) {
      console.error("Error creating job application:", error)
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }

    return NextResponse.json(newApplication, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies })

    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const jobId = searchParams.get("jobId")
    const status = searchParams.get("status")

    let query = supabase
      .from("job_applications")
      .select("*", { count: "exact" })
      .order("applied_at", { ascending: false })

    if (jobId) {
      query = query.eq("job_id", jobId)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: applications, error, count } = await query.range(from, to)

    if (error) {
      console.error("Error fetching job applications:", error)
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
    }

    return NextResponse.json({
      data: applications || [],
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
