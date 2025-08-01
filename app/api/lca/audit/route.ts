import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resourceType = searchParams.get("resourceType")
    const resourceId = searchParams.get("resourceId")

    // Mock blockchain audit records
    const mockAuditRecords = [
      {
        id: "1",
        resourceType: "LCA",
        resourceId: "1",
        action: "create",
        hash: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
        timestamp: "2024-01-15T10:30:00Z",
        userId: "admin-system",
        userEmail: "admin@esgglobal.com",
        metadata: {
          jobTitle: "Senior SAP Developer",
          lcaNumber: "I-200-24001-123456",
          ipAddress: "192.168.1.100",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        verified: true,
        blockNumber: 1001,
        transactionId: "tx_abc123def456",
      },
      {
        id: "2",
        resourceType: "LCA",
        resourceId: "2",
        action: "create",
        hash: "b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567",
        previousHash: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
        timestamp: "2024-01-20T14:20:00Z",
        userId: "admin-system",
        userEmail: "admin@esgglobal.com",
        metadata: {
          jobTitle: "Data Engineer - AI/ML",
          lcaNumber: "I-200-24002-123457",
          ipAddress: "192.168.1.101",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        verified: true,
        blockNumber: 1002,
        transactionId: "tx_def456ghi789",
      },
      {
        id: "3",
        resourceType: "LCA",
        resourceId: "1",
        action: "update",
        hash: "c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
        previousHash: "b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567",
        timestamp: "2024-01-22T09:15:00Z",
        userId: "hr-manager",
        userEmail: "hr@esgglobal.com",
        metadata: {
          jobTitle: "Senior SAP Developer",
          lcaNumber: "I-200-24001-123456",
          changes: ["wage_range", "job_description"],
          ipAddress: "192.168.1.102",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        verified: true,
        blockNumber: 1003,
        transactionId: "tx_ghi789jkl012",
      },
      {
        id: "4",
        resourceType: "LCA",
        resourceId: "3",
        action: "view",
        hash: "d4e5f6789012345678901234567890abcdef1234567890abcdef123456789",
        previousHash: "c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
        timestamp: "2024-01-25T16:45:00Z",
        userId: "public-user",
        metadata: {
          jobTitle: "Cybersecurity Analyst",
          lcaNumber: "I-200-24003-123458",
          ipAddress: "203.0.113.45",
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
          publicAccess: true,
        },
        verified: true,
        blockNumber: 1004,
        transactionId: "tx_jkl012mno345",
      },
      {
        id: "5",
        resourceType: "LCA",
        resourceId: "4",
        action: "create",
        hash: "e5f6789012345678901234567890abcdef1234567890abcdef1234567890",
        previousHash: "d4e5f6789012345678901234567890abcdef1234567890abcdef123456789",
        timestamp: "2024-02-01T11:30:00Z",
        userId: "admin-system",
        userEmail: "admin@esgglobal.com",
        metadata: {
          jobTitle: "Cloud Solutions Architect",
          lcaNumber: "I-200-24004-123459",
          ipAddress: "192.168.1.100",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        verified: false,
        blockNumber: 1005,
        transactionId: "tx_mno345pqr678",
      },
    ]

    let filteredRecords = mockAuditRecords

    // Apply filters
    if (resourceType) {
      filteredRecords = filteredRecords.filter((record) => record.resourceType === resourceType)
    }

    if (resourceId) {
      filteredRecords = filteredRecords.filter((record) => record.resourceId === resourceId)
    }

    return NextResponse.json({
      records: filteredRecords,
      totalRecords: filteredRecords.length,
      verifiedRecords: filteredRecords.filter((r) => r.verified).length,
      integrityScore:
        filteredRecords.length > 0
          ? Math.round((filteredRecords.filter((r) => r.verified).length / filteredRecords.length) * 100)
          : 100,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Audit API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, resourceType, resourceId, metadata } = body

    // Generate blockchain hash for new audit record
    const hashData = JSON.stringify({
      resourceType,
      resourceId,
      action,
      timestamp: new Date().toISOString(),
      metadata,
    })

    const encoder = new TextEncoder()
    const data = encoder.encode(hashData)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    // Mock audit record creation
    const auditRecord = {
      id: Date.now().toString(),
      resourceType,
      resourceId,
      action,
      hash,
      timestamp: new Date().toISOString(),
      userId: "system",
      metadata,
      verified: false,
      blockNumber: Math.floor(Math.random() * 1000) + 1000,
      transactionId: `tx_${Math.random().toString(36).substr(2, 9)}`,
    }

    return NextResponse.json({
      success: true,
      record: auditRecord,
      hash,
    })
  } catch (error) {
    console.error("Audit creation error:", error)
    return NextResponse.json({ error: "Failed to create audit record" }, { status: 500 })
  }
}
