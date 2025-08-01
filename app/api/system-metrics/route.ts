import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate real-time metrics
    const metrics = {
      activeProjects: Math.floor(Math.random() * 50 + 120),
      aiModels: Math.floor(Math.random() * 10 + 10),
      dataProcessed: `${(Math.random() * 2 + 3).toFixed(1)}TB`,
      liveSessions: Math.floor(Math.random() * 40 + 60),
      uptime: "99.9%",
      responseTime: `${Math.floor(Math.random() * 30 + 30)}ms`,
      dataCenters: 12,
      countries: 25,
      systemStatus: "operational",
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Error fetching system metrics:", error)
    return NextResponse.json({ error: "Failed to fetch system metrics" }, { status: 500 })
  }
}
