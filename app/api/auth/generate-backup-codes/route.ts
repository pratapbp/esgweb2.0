import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Use dynamic require to avoid bundling crypto on client side
    const crypto = eval("require")("crypto")

    // Generate new backup codes using server-side crypto
    const backupCodes = []
    for (let i = 0; i < 10; i++) {
      backupCodes.push(crypto.randomBytes(4).toString("hex").toUpperCase())
    }

    // In a real implementation, you would update the user's backup codes in the database

    return NextResponse.json({ backupCodes })
  } catch (error) {
    console.error("Error generating backup codes:", error)
    return NextResponse.json({ error: "Failed to generate backup codes" }, { status: 500 })
  }
}
