import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "job_title",
      "case_number",
      "worksite_address",
      "worksite_city",
      "worksite_state",
      "worksite_postal_code",
      "employment_start_date",
      "employment_end_date",
      "wage_rate_from",
      "prevailing_wage",
      "contact_person",
      "contact_title",
    ]

    const missingFields = []
    for (const field of requiredFields) {
      if (!body[field] || body[field].toString().trim() === "") {
        missingFields.push(field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()))
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Validate case number format (I-123-12345-123456)
    const casePattern = /^I-\d{3}-\d{5}-\d{6}$/
    if (!casePattern.test(body.case_number)) {
      return NextResponse.json(
        { success: false, error: "Invalid case number format. Use: I-200-12345-123456" },
        { status: 400 },
      )
    }

    // Validate employment type
    const validEmploymentTypes = ["H-1B", "H-1B1", "E-3"]
    if (body.visa_class && !validEmploymentTypes.includes(body.visa_class)) {
      return NextResponse.json({ success: false, error: "Invalid visa class" }, { status: 400 })
    }

    // Validate wage unit
    const validWageUnits = ["Hour", "Week", "Bi-Weekly", "Month", "Year"]
    if (body.wage_unit && !validWageUnits.includes(body.wage_unit)) {
      return NextResponse.json({ success: false, error: "Invalid wage unit" }, { status: 400 })
    }

    // Validate status
    const validStatuses = ["PENDING", "CERTIFIED", "DENIED", "WITHDRAWN", "DRAFT"]
    if (body.case_status && !validStatuses.includes(body.case_status)) {
      return NextResponse.json({ success: false, error: "Invalid case status" }, { status: 400 })
    }

    // Validate date range
    const startDate = new Date(body.employment_start_date)
    const endDate = new Date(body.employment_end_date)
    if (endDate <= startDate) {
      return NextResponse.json({ success: false, error: "End date must be after start date" }, { status: 400 })
    }

    // Validate postal code
    if (body.worksite_postal_code && !/^\d{5}(-\d{4})?$/.test(body.worksite_postal_code)) {
      return NextResponse.json({ success: false, error: "Invalid ZIP code format" }, { status: 400 })
    }

    // Check for duplicate case number
    const { data: existingLCA } = await supabase
      .from("lca_postings")
      .select("id")
      .eq("case_number", body.case_number)
      .single()

    if (existingLCA) {
      return NextResponse.json({ success: false, error: "Case number already exists" }, { status: 409 })
    }

    // Mock user ID (in production, get from authentication)
    const userId = "00000000-0000-0000-0000-000000000000"

    // Prepare data for insertion
    const lcaData = {
      // Job Information
      job_title: body.job_title.trim(),
      job_description: body.job_description?.trim() || null,
      soc_code: body.soc_code?.trim() || null,
      soc_title: body.soc_title?.trim() || null,

      // Case Information
      case_number: body.case_number.toUpperCase(),
      case_status: body.case_status || "PENDING",
      visa_class: body.visa_class || "H-1B",

      // Employer Information (using existing structure)
      employer_name: body.employer_name?.trim() || "Executive Software Guild Inc.",

      // Worksite Information
      worksite_address: body.worksite_address.trim(),
      worksite_city: body.worksite_city.trim(),
      worksite_state: body.worksite_state,
      worksite_postal_code: body.worksite_postal_code.trim(),

      // Employment Details
      employment_start_date: body.employment_start_date,
      employment_end_date: body.employment_end_date,
      full_time_position: body.full_time_position !== false,
      total_workers: body.total_workers || 1,

      // Wage Information
      wage_rate_from: body.wage_rate_from,
      wage_rate_to: body.wage_rate_to || body.wage_rate_from,
      wage_unit: body.wage_unit || "Year",
      prevailing_wage: body.prevailing_wage,
      pw_unit_of_pay: body.pw_unit_of_pay || "Year",
      pw_source: body.pw_source || "OES",

      // Contact Information
      contact_person: body.contact_person.trim(),
      contact_title: body.contact_title.trim(),
      contact_email: body.contact_email?.trim() || "hr@exesg.us",

      // Additional Information
      requirements: body.requirements?.trim() || null,
      benefits: body.benefits?.trim() || null,
      notice_locations: body.notice_locations?.trim() || null,
      document_location: body.document_location?.trim() || "8751 Collin McKinney PKWY, Suite 601, McKinney, TX 75070",

      // Compliance
      public_disclosure: body.public_disclosure || false,
      wage_determination: body.wage_determination || false,
      notice_posted: body.notice_posted || false,

      // System fields
      posted_date: body.posted_date || new Date().toISOString().split("T")[0],
      posted_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Insert into database
    const { data, error } = await supabase.from("lca_postings").insert([lcaData]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create LCA posting. Please try again.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      lca_posting: data,
      message: `LCA posting "${body.job_title}" created successfully`,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
