import { type NextRequest, NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerComponentClient({ cookies })

    const { data: posting, error } = await supabase.from("lca_postings").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching LCA posting:", error)
      return NextResponse.json({ error: "LCA posting not found" }, { status: 404 })
    }

    return NextResponse.json(posting)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerComponentClient({ cookies })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const document = formData.get("document") as File | null

    // Get existing posting
    const { data: existingPosting, error: fetchError } = await supabase
      .from("lca_postings")
      .select("*")
      .eq("id", params.id)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: "LCA posting not found" }, { status: 404 })
    }

    // Handle file upload if present
    let documentUrl = existingPosting.document_url
    let documentFilename = existingPosting.document_filename

    if (document) {
      // Delete old document if exists
      if (existingPosting.document_url) {
        const oldPath = existingPosting.document_url.split("/").pop()
        if (oldPath) {
          await supabase.storage.from("documents").remove([`lca-documents/${oldPath}`])
        }
      }

      const fileExt = document.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `lca-documents/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, document)

      if (uploadError) {
        console.error("File upload error:", uploadError)
        return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(filePath)

      documentUrl = publicUrl
      documentFilename = document.name
    }

    // Prepare update data
    const updateData = {
      job_title: formData.get("job_title") as string,
      employer_name: formData.get("employer_name") as string,
      worksite_address: formData.get("worksite_address") as string,
      worksite_city: formData.get("worksite_city") as string,
      worksite_state: formData.get("worksite_state") as string,
      worksite_postal_code: formData.get("worksite_postal_code") as string,
      wage_rate_from: Number.parseFloat(formData.get("wage_rate_from") as string),
      wage_rate_to: Number.parseFloat(formData.get("wage_rate_to") as string),
      wage_unit: formData.get("wage_unit") as string,
      employment_start_date: formData.get("employment_start_date") as string,
      employment_end_date: formData.get("employment_end_date") as string,
      case_number: formData.get("case_number") as string,
      case_status: formData.get("case_status") as string,
      visa_class: formData.get("visa_class") as string,
      soc_code: formData.get("soc_code") as string,
      soc_title: formData.get("soc_title") as string,
      full_time_position: formData.get("full_time_position") === "true",
      prevailing_wage: Number.parseFloat(formData.get("prevailing_wage") as string),
      pw_unit_of_pay: formData.get("pw_unit_of_pay") as string,
      pw_source: formData.get("pw_source") as string,
      job_description: (formData.get("job_description") as string) || null,
      requirements: (formData.get("requirements") as string) || null,
      is_active: formData.get("is_active") === "true",
      total_workers: Number.parseInt(formData.get("total_workers") as string) || 1,
      document_url: documentUrl,
      document_filename: documentFilename,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    }

    const { data: updatedPosting, error } = await supabase
      .from("lca_postings")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating LCA posting:", error)
      return NextResponse.json({ error: "Failed to update LCA posting" }, { status: 500 })
    }

    return NextResponse.json(updatedPosting)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerComponentClient({ cookies })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { data: updatedPosting, error } = await supabase
      .from("lca_postings")
      .update({
        ...body,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating LCA posting:", error)
      return NextResponse.json({ error: "Failed to update LCA posting" }, { status: 500 })
    }

    return NextResponse.json(updatedPosting)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerComponentClient({ cookies })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get posting to delete associated document
    const { data: posting, error: fetchError } = await supabase
      .from("lca_postings")
      .select("document_url")
      .eq("id", params.id)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: "LCA posting not found" }, { status: 404 })
    }

    // Delete document from storage if exists
    if (posting.document_url) {
      const fileName = posting.document_url.split("/").pop()
      if (fileName) {
        await supabase.storage.from("documents").remove([`lca-documents/${fileName}`])
      }
    }

    // Delete posting
    const { error } = await supabase.from("lca_postings").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting LCA posting:", error)
      return NextResponse.json({ error: "Failed to delete LCA posting" }, { status: 500 })
    }

    return NextResponse.json({ message: "LCA posting deleted successfully" })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
