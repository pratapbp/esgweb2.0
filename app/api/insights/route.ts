import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const type = searchParams.get("type") || "all"
    const industry = searchParams.get("industry") || "all"
    const topic = searchParams.get("topic") || "all"

    // Mock insights data - in production, this would come from your database
    const mockInsights = [
      {
        id: "1",
        type: "blog",
        title: "GenAI in SAP: Beyond Chatbots",
        description:
          "Exploring advanced AI integration patterns in SAP S/4HANA that go beyond simple conversational interfaces to transform business processes.",
        author: "Sreekar Reddy",
        authorAvatar: "/images/team/ceo.jpg",
        publishedAt: "2024-01-15",
        readTime: "8 min",
        views: 1247,
        tags: ["GenAI", "SAP", "S/4HANA"],
        industry: "Technology",
        featured: true,
      },
      {
        id: "2",
        type: "ai-forecast",
        title: "What's Coming for BFSI in Q4 2025",
        description:
          "AI-generated predictions for banking and financial services based on current market trends, regulatory changes, and technology adoption patterns.",
        author: "ESGit AI Writer",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        publishedAt: "2024-01-12",
        readTime: "12 min",
        views: 892,
        tags: ["Finance", "AI", "Predictions"],
        industry: "BFSI",
        featured: false,
      },
      {
        id: "3",
        type: "whitepaper",
        title: "Blockchain in LCA Audits: A Technical Overview",
        description:
          "Comprehensive technical guide on implementing blockchain technology for Labor Condition Application audit trails and compliance verification.",
        author: "Anika Sharma",
        authorAvatar: "/images/team/suggested-1.jpg",
        publishedAt: "2024-01-10",
        readTime: "25 min",
        views: 634,
        tags: ["Blockchain", "Compliance", "LCA"],
        industry: "Legal",
        featured: true,
        downloadUrl: "/downloads/blockchain-lca-audits.pdf",
      },
    ]

    // Apply filters
    let filteredInsights = mockInsights

    if (search) {
      filteredInsights = filteredInsights.filter(
        (insight) =>
          insight.title.toLowerCase().includes(search.toLowerCase()) ||
          insight.description.toLowerCase().includes(search.toLowerCase()) ||
          insight.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (type !== "all") {
      filteredInsights = filteredInsights.filter((insight) => insight.type === type)
    }

    if (industry !== "all") {
      filteredInsights = filteredInsights.filter((insight) => insight.industry === industry)
    }

    if (topic !== "all") {
      filteredInsights = filteredInsights.filter((insight) => insight.tags.includes(topic))
    }

    return NextResponse.json({
      success: true,
      insights: filteredInsights,
      total: filteredInsights.length,
    })
  } catch (error) {
    console.error("Error fetching insights:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch insights" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, type, tags, industry, author } = body

    // In production, save to database
    const newInsight = {
      id: Date.now().toString(),
      type,
      title,
      description,
      author,
      authorAvatar: "/images/team/ceo.jpg",
      publishedAt: new Date().toISOString(),
      readTime: "5 min",
      views: 0,
      tags,
      industry,
      featured: false,
    }

    return NextResponse.json({
      success: true,
      insight: newInsight,
      message: "Insight created successfully",
    })
  } catch (error) {
    console.error("Error creating insight:", error)
    return NextResponse.json({ success: false, error: "Failed to create insight" }, { status: 500 })
  }
}
