import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, serviceName = "ESGit" } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Use dynamic require to avoid bundling crypto on client side
    const crypto = eval("require")("crypto")

    // Generate secret using server-side crypto
    const secret = crypto.randomBytes(20).toString("base32")

    // Generate backup codes
    const backupCodes = []
    for (let i = 0; i < 10; i++) {
      backupCodes.push(crypto.randomBytes(4).toString("hex").toUpperCase())
    }

    // Generate QR code URL (simplified version)
    const qrCodeUrl = `otpauth://totp/${serviceName}?secret=${secret}&issuer=${serviceName}`

    // In a real implementation, you would store the secret in the database
    // For now, we'll just return the setup data

    return NextResponse.json({
      secret,
      qrCodeUrl,
      backupCodes,
    })
  } catch (error) {
    console.error("Error setting up MFA:", error)
    return NextResponse.json({ error: "Failed to setup MFA" }, { status: 500 })
  }
}
