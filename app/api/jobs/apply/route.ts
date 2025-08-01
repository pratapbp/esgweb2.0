import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const applicationData = {
      jobId: formData.get("jobId") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      currentTitle: formData.get("currentTitle") as string,
      yearsExperience: formData.get("yearsExperience") as string,
      currentSalary: formData.get("currentSalary") as string,
      expectedSalary: formData.get("expectedSalary") as string,
      availabilityDate: formData.get("availabilityDate") as string,
      workAuthorization: formData.get("workAuthorization") as string,
      visaStatus: formData.get("visaStatus") as string,
      requiresSponsorship: formData.get("requiresSponsorship") === "true",
      coverLetter: formData.get("coverLetter") as string,
      whyInterested: formData.get("whyInterested") as string,
      relevantExperience: formData.get("relevantExperience") as string,
      additionalInfo: formData.get("additionalInfo") as string,
      reference1Name: formData.get("reference1Name") as string,
      reference1Title: formData.get("reference1Title") as string,
      reference1Company: formData.get("reference1Company") as string,
      reference1Email: formData.get("reference1Email") as string,
      reference1Phone: formData.get("reference1Phone") as string,
      agreeToTerms: formData.get("agreeToTerms") === "true",
      agreeToBackground: formData.get("agreeToBackground") === "true",
      agreeToContact: formData.get("agreeToContact") === "true",
    }

    // Handle file uploads
    const resumeFile = formData.get("resume") as File | null
    const coverLetterFile = formData.get("coverLetter") as File | null

    // Validate required fields
    const requiredFields = ["jobId", "firstName", "lastName", "email", "phone", "whyInterested", "relevantExperience"]
    for (const field of requiredFields) {
      if (
        !applicationData[field as keyof typeof applicationData] ||
        applicationData[field as keyof typeof applicationData].toString().trim() === ""
      ) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(applicationData.email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    // Validate resume file
    if (!resumeFile) {
      return NextResponse.json({ success: false, error: "Resume file is required" }, { status: 400 })
    }

    // Validate file types
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json({ success: false, error: "Resume must be a PDF or Word document" }, { status: 400 })
    }

    if (coverLetterFile && !allowedTypes.includes(coverLetterFile.type)) {
      return NextResponse.json(
        { success: false, error: "Cover letter must be a PDF or Word document" },
        { status: 400 },
      )
    }

    // Validate file sizes (5MB max)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "Resume file size must be less than 5MB" }, { status: 400 })
    }

    if (coverLetterFile && coverLetterFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Cover letter file size must be less than 5MB" },
        { status: 400 },
      )
    }

    // Validate agreements
    if (!applicationData.agreeToTerms || !applicationData.agreeToBackground || !applicationData.agreeToContact) {
      return NextResponse.json({ success: false, error: "All required agreements must be accepted" }, { status: 400 })
    }

    // Generate application ID
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // In a real application, you would:
    // 1. Save files to cloud storage (AWS S3, etc.)
    // 2. Store application data in database
    // 3. Send confirmation email to applicant
    // 4. Notify HR team
    // 5. Create audit trail

    // Mock file storage URLs
    const resumeUrl = `/uploads/resumes/${applicationId}_resume_${resumeFile.name}`
    const coverLetterUrl = coverLetterFile
      ? `/uploads/cover-letters/${applicationId}_cover_${coverLetterFile.name}`
      : null

    // Create application record
    const application = {
      id: applicationId,
      ...applicationData,
      resumeUrl,
      coverLetterUrl,
      submittedAt: new Date().toISOString(),
      status: "submitted",
      source: "website",
    }

    // Log application for demo purposes
    console.log("New job application received:", {
      applicationId,
      jobId: applicationData.jobId,
      applicantName: `${applicationData.firstName} ${applicationData.lastName}`,
      applicantEmail: applicationData.email,
      resumeSize: resumeFile.size,
      coverLetterSize: coverLetterFile?.size || 0,
      submittedAt: application.submittedAt,
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      applicationId,
      message: "Application submitted successfully",
      nextSteps: [
        "You will receive a confirmation email within 24 hours",
        "Our HR team will review your application",
        "If selected, you will be contacted for an interview",
        "The typical response time is 5-7 business days",
      ],
    })
  } catch (error) {
    console.error("Error processing job application:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 },
    )
  }
}
