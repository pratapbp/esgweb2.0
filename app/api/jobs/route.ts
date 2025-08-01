import { type NextRequest, NextResponse } from "next/server"

// Mock job data
const mockJobs = [
  {
    id: "sap-data-engineer",
    title: "Senior SAP Data Engineer",
    company: "ESG Global",
    location: "Remote - USA",
    type: "Full-Time",
    department: "Engineering",
    salaryMin: 120000,
    salaryMax: 160000,
    description:
      "Join our team as a Senior SAP Data Engineer to design and implement cutting-edge data solutions using SAP BTP, HANA, and modern cloud technologies.",
    requirements: ["5+ years SAP experience", "Python/SQL expertise", "Cloud platforms (AWS/Azure)", "Data modeling"],
    tags: ["SAP", "Data Engineering", "Cloud", "Python"],
    lcaCompliant: true,
    h1bSponsorship: true,
    remote: true,
    postedDate: "2024-01-15",
    status: "active",
  },
  {
    id: "ai-solutions-architect",
    title: "AI Solutions Architect",
    company: "ESG Global",
    location: "New York, NY",
    type: "Full-Time",
    department: "AI/ML",
    salaryMin: 140000,
    salaryMax: 180000,
    description:
      "Lead the design and implementation of AI-powered solutions for enterprise clients, focusing on GenAI and machine learning applications.",
    requirements: [
      "7+ years AI/ML experience",
      "Python, TensorFlow, PyTorch",
      "Cloud AI services",
      "Solution architecture",
    ],
    tags: ["AI", "Machine Learning", "Architecture", "GenAI"],
    lcaCompliant: true,
    h1bSponsorship: true,
    remote: false,
    postedDate: "2024-01-12",
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const department = searchParams.get("department")
    const lcaOnly = searchParams.get("lcaOnly") === "true"
    const remoteOnly = searchParams.get("remoteOnly") === "true"

    let filteredJobs = mockJobs.filter((job) => job.status === "active")

    // Apply filters
    if (search) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
          job.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (type) {
      filteredJobs = filteredJobs.filter((job) => job.type === type)
    }

    if (department) {
      filteredJobs = filteredJobs.filter((job) => job.department === department)
    }

    if (lcaOnly) {
      filteredJobs = filteredJobs.filter((job) => job.lcaCompliant)
    }

    if (remoteOnly) {
      filteredJobs = filteredJobs.filter((job) => job.remote)
    }

    return NextResponse.json({
      success: true,
      jobs: filteredJobs,
      total: filteredJobs.length,
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "department", "location", "type", "description"]
    for (const field of requiredFields) {
      if (!jobData[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Generate job ID
    const jobId = jobData.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    const newJob = {
      id: jobId,
      ...jobData,
      postedDate: new Date().toISOString().split("T")[0],
      status: "active",
    }

    // In a real app, save to database
    mockJobs.push(newJob)

    return NextResponse.json({
      success: true,
      job: newJob,
      message: "Job posted successfully",
    })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ success: false, error: "Failed to create job" }, { status: 500 })
  }
}
