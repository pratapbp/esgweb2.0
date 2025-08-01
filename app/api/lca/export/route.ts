import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format") || "csv"

    // Mock LCA data for export
    const mockData = [
      {
        id: "1",
        job_title: "Senior SAP Developer",
        location: "New York, NY",
        lca_number: "I-200-24001-123456",
        visa_type: "H1B",
        wage_range: "$95,000 - $125,000",
        status: "certified",
        created_at: "2024-01-15T00:00:00Z",
        employer_name: "ESG Global Solutions",
        work_start_date: "2024-04-01",
        work_end_date: "2027-03-31",
        prevailing_wage: "$98,000",
        actual_wage: "$110,000",
        worksite: "123 Business Ave, New York, NY 10001",
        full_time_position: true,
      },
      {
        id: "2",
        job_title: "Data Engineer - AI/ML",
        location: "San Francisco, CA",
        lca_number: "I-200-24002-123457",
        visa_type: "H1B",
        wage_range: "$105,000 - $140,000",
        status: "certified",
        created_at: "2024-01-20T00:00:00Z",
        employer_name: "ESG Global Solutions",
        work_start_date: "2024-05-01",
        work_end_date: "2027-04-30",
        prevailing_wage: "$115,000",
        actual_wage: "$125,000",
        worksite: "456 Tech Street, San Francisco, CA 94105",
        full_time_position: true,
      },
      {
        id: "3",
        job_title: "Cybersecurity Analyst",
        location: "Austin, TX",
        lca_number: "I-200-24003-123458",
        visa_type: "E3",
        wage_range: "$85,000 - $110,000",
        status: "certified",
        created_at: "2024-01-25T00:00:00Z",
        employer_name: "ESG Global Solutions",
        work_start_date: "2024-06-01",
        work_end_date: "2026-05-31",
        prevailing_wage: "$88,000",
        actual_wage: "$95,000",
        worksite: "789 Security Blvd, Austin, TX 78701",
        full_time_position: true,
      },
    ]

    if (format === "csv") {
      const headers = [
        "LCA Number",
        "Job Title",
        "Employer",
        "Location",
        "Worksite",
        "Visa Type",
        "Work Start Date",
        "Work End Date",
        "Prevailing Wage",
        "Actual Wage",
        "Full Time",
        "Status",
        "Posted Date",
      ]

      const csvContent = [
        headers.join(","),
        ...mockData.map((row) =>
          [
            row.lca_number,
            `"${row.job_title}"`,
            `"${row.employer_name}"`,
            `"${row.location}"`,
            `"${row.worksite}"`,
            row.visa_type,
            row.work_start_date,
            row.work_end_date,
            row.prevailing_wage,
            row.actual_wage,
            row.full_time_position ? "Yes" : "No",
            row.status,
            new Date(row.created_at).toLocaleDateString(),
          ].join(","),
        ),
      ].join("\n")

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="lca-postings-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      })
    }

    if (format === "pdf") {
      // For PDF, we'll return HTML that can be converted to PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>LCA Postings Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
            th { background-color: #f3f4f6; font-weight: bold; }
            .status-certified { color: #059669; font-weight: bold; }
            .footer { margin-top: 30px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <h1>LCA Public Postings Report</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total Records:</strong> ${mockData.length}</p>
          
          <table>
            <thead>
              <tr>
                <th>LCA Number</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Visa Type</th>
                <th>Wage Range</th>
                <th>Status</th>
                <th>Posted Date</th>
              </tr>
            </thead>
            <tbody>
              ${mockData
                .map(
                  (row) => `
                <tr>
                  <td>${row.lca_number}</td>
                  <td>${row.job_title}</td>
                  <td>${row.location}</td>
                  <td>${row.visa_type}</td>
                  <td>${row.wage_range}</td>
                  <td class="status-${row.status}">${row.status.toUpperCase()}</td>
                  <td>${new Date(row.created_at).toLocaleDateString()}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="footer">
            <p><strong>Legal Notice:</strong> This information is provided in compliance with 20 CFR 655.760. All certified Labor Condition Applications are made available for public examination as required by the U.S. Department of Labor.</p>
            <p><strong>Employer:</strong> ESG Global Solutions</p>
            <p><strong>Report Generated:</strong> ${new Date().toISOString()}</p>
          </div>
        </body>
        </html>
      `

      return new NextResponse(htmlContent, {
        headers: {
          "Content-Type": "text/html",
          "Content-Disposition": `attachment; filename="lca-postings-${new Date().toISOString().split("T")[0]}.html"`,
        },
      })
    }

    return NextResponse.json({ error: "Unsupported format" }, { status: 400 })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}
