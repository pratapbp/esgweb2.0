import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Mock tasks data - replace with actual database queries
    const tasks = [
      {
        id: "1",
        title: "Deploy AI Model v2.1",
        description: "Deploy the new predictive analytics model to production",
        status: "in_progress",
        priority: "high",
        assignee: "John Doe",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        progress: 75,
        category: "deployment",
      },
      {
        id: "2",
        title: "Update Data Pipeline",
        description: "Optimize the ETL pipeline for better performance",
        status: "pending",
        priority: "medium",
        assignee: "Jane Smith",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days from now
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
        progress: 0,
        category: "maintenance",
      },
      {
        id: "3",
        title: "Security Audit",
        description: "Conduct quarterly security audit of all systems",
        status: "completed",
        priority: "high",
        assignee: "Mike Johnson",
        dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
        progress: 100,
        category: "security",
      },
    ]

    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

    // Mock creating a new task
    const newTask = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      status: "pending",
      priority: body.priority || "medium",
      assignee: body.assignee,
      dueDate: body.dueDate,
      createdAt: new Date().toISOString(),
      progress: 0,
      category: body.category || "general",
    }

    return NextResponse.json({ success: true, data: newTask })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 })
  }
}
