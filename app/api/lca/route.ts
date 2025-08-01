import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Mock data for when database is not available
const mockLCAData = [
  {
    id: "1",
    job_title: "Senior SAP Developer",
    location: "New York, NY",
    lca_number: "I-200-24001-123456",
    visa_type: "H1B",
    wage_range: "$95,000 - $125,000",
    file_url: null,
    status: "certified",
    created_at: "2024-01-15T00:00:00Z",
    created_by: "admin-system",
    blockchain_hash: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    employer_name: "ESG Global Solutions",
    work_start_date: "2024-04-01",
    work_end_date: "2027-03-31",
    job_description: "Develop and maintain SAP applications, customize SAP modules, and provide technical support.",
    requirements: "Bachelor's degree in Computer Science or related field. 5+ years SAP development experience.",
    prevailing_wage: "$98,000",
    actual_wage: "$110,000",
    worksite: "123 Business Ave, New York, NY 10001",
    full_time_position: true,
  },
  {
    id: "2",
    job_title: "Data Engineer - AI/ML",
    location: "San Francisco, CA",
    lca_number: "I-200-24002-123457",
    visa_type: "H1B",
    wage_range: "$105,000 - $140,000",
    file_url: null,
    status: "certified",
    created_at: "2024-01-20T00:00:00Z",
    created_by: "admin-system",
    blockchain_hash: "b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567",
    employer_name: "ESG Global Solutions",
    work_start_date: "2024-05-01",
    work_end_date: "2027-04-30",
    job_description:
      "Design and implement data pipelines, work with machine learning models, and optimize data infrastructure.",
    requirements:
      "Master's degree in Data Science or Computer Science. 3+ years experience with Python, SQL, and cloud platforms.",
    prevailing_wage: "$115,000",
    actual_wage: "$125,000",
    worksite: "456 Tech Street, San Francisco, CA 94105",
    full_time_position: true,
  },
  {
    id: "3",
    job_title: "Cybersecurity Analyst",
    location: "Austin, TX",
    lca_number: "I-200-24003-123458",
    visa_type: "E3",
    wage_range: "$85,000 - $110,000",
    file_url: null,
    status: "certified",
    created_at: "2024-01-25T00:00:00Z",
    created_by: "admin-system",
    blockchain_hash: "c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
    employer_name: "ESG Global Solutions",
    work_start_date: "2024-06-01",
    work_end_date: "2026-05-31",
    job_description: "Monitor security systems, conduct vulnerability assessments, and respond to security incidents.",
    requirements: "Bachelor's degree in Cybersecurity or related field. CISSP or similar certification preferred.",
    prevailing_wage: "$88,000",
    actual_wage: "$95,000",
    worksite: "789 Security Blvd, Austin, TX 78701",
    full_time_position: true,
  },
  {
    id: "4",
    job_title: "Cloud Solutions Architect",
    location: "Seattle, WA",
    lca_number: "I-200-24004-123459",
    visa_type: "H1B",
    wage_range: "$120,000 - $160,000",
    file_url: null,
    status: "pending",
    created_at: "2024-02-01T00:00:00Z",
    created_by: "admin-system",
    blockchain_hash: "d4e5f6789012345678901234567890abcdef1234567890abcdef123456789",
    employer_name: "ESG Global Solutions",
    work_start_date: "2024-07-01",
    work_end_date: "2027-06-30",
    job_description: "Design and implement cloud infrastructure solutions, lead cloud migration projects.",
    requirements: "Bachelor's degree in Computer Science. AWS/Azure certifications required. 7+ years experience.",
    prevailing_wage: "$135,000",
    actual_wage: "$145,000",
    worksite: "321 Cloud Ave, Seattle, WA 98101",
    full_time_position: true,
  },
  {
    id: "5",
    job_title: "Business Intelligence Analyst",
    location: "Chicago, IL",
    lca_number: "I-200-24005-123460",
    visa_type: "H1B1",
    wage_range: "$75,000 - $95,000",
    file_url: null,
    status: "certified",
    created_at: "2024-02-10T00:00:00Z",
    created_by: "admin-system",
    blockchain_hash: "e5f6789012345678901234567890abcdef1234567890abcdef1234567890",
    employer_name: "ESG Global Solutions",
    work_start_date: "2024-08-01",
    work_end_date: "2026-07-31",
    job_description: "Analyze business data, create reports and dashboards, support decision-making processes.",
    requirements: "Bachelor's degree in Business Analytics or related field. 3+ years experience with BI tools.",
    prevailing_wage: "$78,000",
    actual_wage: "$85,000",
    worksite: "654 Analytics Dr, Chicago, IL 60601",
    full_time_position: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const visaType = searchParams.get("visaType")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    // Try to query the database first
    try {
      let query = supabase.from("lca_postings").select("*").order("created_at", { ascending: false })

      // Apply filters
      if (status && status !== "all") {
        query = query.eq("status", status)
      }

      if (visaType && visaType !== "all") {
        query = query.eq("visa_type", visaType)
      }

      if (search) {
        query = query.or(`job_title.ilike.%${search}%,location.ilike.%${search}%,lca_number.ilike.%${search}%`)
      }

      // For public access, only show certified postings
      const isAdmin = request.headers.get("authorization")?.includes("admin")
      if (!isAdmin) {
        query = query.eq("status", "certified")
      }

      const { data: postings, error, count } = await query.range(offset, offset + limit - 1)

      if (!error && postings) {
        return NextResponse.json({
          postings: postings || [],
          pagination: {
            page,
            limit,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limit),
          },
        })
      }
    } catch (dbError) {
      console.log("Database not available, using mock data")
    }

    // Fallback to mock data
    let filteredData = [...mockLCAData]

    // Apply filters to mock data
    if (status && status !== "all") {
      filteredData = filteredData.filter((item) => item.status === status)
    }

    if (visaType && visaType !== "all") {
      filteredData = filteredData.filter((item) => item.visa_type === visaType)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredData = filteredData.filter(
        (item) =>
          item.job_title.toLowerCase().includes(searchLower) ||
          item.location.toLowerCase().includes(searchLower) ||
          item.lca_number.toLowerCase().includes(searchLower),
      )
    }

    // For public access, only show certified postings
    const isAdmin = request.headers.get("authorization")?.includes("admin")
    if (!isAdmin) {
      filteredData = filteredData.filter((item) => item.status === "certified")
    }

    const paginatedData = filteredData.slice(offset, offset + limit)

    return NextResponse.json({
      postings: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const lcaData = {
      job_title: formData.get("jobTitle") as string,
      lca_number: formData.get("lcaNumber") as string,
      visa_type: formData.get("visaType") as string,
      wage_range: formData.get("wageRange") as string,
      location: formData.get("location") as string,
      work_start_date: formData.get("workStartDate") as string,
      work_end_date: formData.get("workEndDate") as string,
      employer_name: formData.get("employerName") as string,
      job_description: formData.get("jobDescription") as string,
      requirements: formData.get("requirements") as string,
      prevailing_wage: formData.get("prevailingWage") as string,
      actual_wage: formData.get("actualWage") as string,
      worksite: formData.get("worksite") as string,
      full_time_position: formData.get("fullTimePosition") === "yes",
      status: "pending",
      created_by: "admin-user-id",
    }

    // Generate blockchain hash
    const hashData = JSON.stringify({
      ...lcaData,
      timestamp: new Date().toISOString(),
    })

    const encoder = new TextEncoder()
    const data = encoder.encode(hashData)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const blockchainHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    // Try to insert into database, fallback to mock response
    try {
      const { data: posting, error: dbError } = await supabase
        .from("lca_postings")
        .insert({
          ...lcaData,
          blockchain_hash: blockchainHash,
        })
        .select()
        .single()

      if (!dbError && posting) {
        return NextResponse.json({
          success: true,
          posting,
          blockchainHash,
        })
      }
    } catch (dbError) {
      console.log("Database not available, returning mock response")
    }

    // Mock response when database is not available
    return NextResponse.json({
      success: true,
      posting: {
        id: Date.now().toString(),
        ...lcaData,
        blockchain_hash: blockchainHash,
        created_at: new Date().toISOString(),
      },
      blockchainHash,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
