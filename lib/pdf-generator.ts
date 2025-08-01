import jsPDF from "jspdf"

// Extend jsPDF type to include splitTextToSize method
declare module "jspdf" {
  interface jsPDF {
    splitTextToSize(text: string, maxWidth: number): string[]
    autoTable: any
  }
}

interface LCAPostingData {
  id: string
  job_title: string
  employer_name: string
  case_number: string
  case_status: string
  visa_class: string
  soc_code: string
  soc_title: string
  wage_rate_from: number
  wage_rate_to: number
  wage_unit: string
  prevailing_wage: number
  pw_unit_of_pay: string
  pw_source: string
  employment_start_date: string
  employment_end_date: string
  worksite_address: string
  worksite_city: string
  worksite_state: string
  worksite_postal_code: string
  full_time_position: boolean
  job_description?: string
  requirements?: string
  created_at: string
  total_workers?: number
}

export class LCAPDFGenerator {
  private doc: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number
  private currentY: number
  private lineHeight: number
  private fontSizes = {
    title: 14,
    heading: 12,
    normal: 11,
    small: 10,
  }

  constructor() {
    try {
      this.doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })
      this.pageWidth = this.doc.internal.pageSize.getWidth()
      this.pageHeight = this.doc.internal.pageSize.getHeight()
      this.margin = 20
      this.currentY = this.margin
      this.lineHeight = 6

      // Set default font
      this.doc.setFont("helvetica", "normal")
    } catch (error) {
      console.error("Error initializing PDF:", error)
      throw new Error("Failed to initialize PDF generator")
    }
  }

  private checkPageBreak(requiredSpace = 20): void {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      this.doc.addPage()
      this.currentY = this.margin
    }
  }

  private addTitle(): void {
    try {
      this.doc.setFontSize(this.fontSizes.title)
      this.doc.setFont("helvetica", "bold")

      const title1 = "Notice of the Filing of a"
      const title2 = "Labor Condition Application with the"
      const title3 = "Employment and Training Administration"

      // Center align the title
      this.doc.text(title1, this.pageWidth / 2, this.currentY, { align: "center" })
      this.currentY += this.lineHeight + 2
      this.doc.text(title2, this.pageWidth / 2, this.currentY, { align: "center" })
      this.currentY += this.lineHeight + 2
      this.doc.text(title3, this.pageWidth / 2, this.currentY, { align: "center" })
      this.currentY += this.lineHeight + 8

      // Add DOL logo or header
      this.addDOLHeader()
    } catch (error) {
      console.error("Error adding title:", error)
      throw new Error("Failed to add title to PDF")
    }
  }

  private addDOLHeader(): void {
    try {
      // Add a horizontal line
      this.doc.setDrawColor(0, 51, 102) // DOL blue color
      this.doc.setLineWidth(0.5)
      this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY)
      this.currentY += 5

      // Add DOL text
      this.doc.setFontSize(this.fontSizes.small)
      this.doc.setTextColor(0, 51, 102) // DOL blue color
      this.doc.text("U.S. Department of Labor", this.margin, this.currentY)
      this.doc.text("Employment and Training Administration", this.pageWidth - this.margin, this.currentY, {
        align: "right",
      })
      this.currentY += 8

      // Reset text color
      this.doc.setTextColor(0, 0, 0)
    } catch (error) {
      console.error("Error adding DOL header:", error)
      // Continue without the header if it fails
    }
  }

  private addNumberedSection(number: number, content: string): void {
    try {
      this.checkPageBreak(15)

      this.doc.setFontSize(this.fontSizes.normal)
      this.doc.setFont("helvetica", "normal")

      const text = `${number}. ${content}`
      const maxWidth = this.pageWidth - 2 * this.margin

      // Split text to fit within page width
      const lines = this.doc.splitTextToSize(text, maxWidth)

      // Add text lines
      for (let i = 0; i < lines.length; i++) {
        this.checkPageBreak(this.lineHeight)
        this.doc.text(lines[i], this.margin, this.currentY)
        this.currentY += this.lineHeight
      }

      this.currentY += 3 // Add space after each section
    } catch (error) {
      console.error("Error adding numbered section:", error)
      throw new Error(`Failed to add section ${number} to PDF`)
    }
  }

  private addComplaintNotice(): void {
    try {
      this.currentY += 8
      this.checkPageBreak(25)

      this.doc.setFontSize(this.fontSizes.small)
      this.doc.setFont("helvetica", "normal")

      const complaintText =
        "Complaints alleging misrepresentation of material facts in the labor condition application and/or failure " +
        "to comply with the terms of the labor condition application may be filed with any office of the Wage and " +
        "Hour Division of the United States Department of Labor."

      const maxWidth = this.pageWidth - 2 * this.margin
      const lines = this.doc.splitTextToSize(complaintText, maxWidth)

      for (let i = 0; i < lines.length; i++) {
        this.checkPageBreak(this.lineHeight)
        this.doc.text(lines[i], this.margin, this.currentY)
        this.currentY += this.lineHeight
      }

      // Add footer with date
      this.addFooter()
    } catch (error) {
      console.error("Error adding complaint notice:", error)
      throw new Error("Failed to add complaint notice to PDF")
    }
  }

  private addFooter(): void {
    try {
      const footerY = this.pageHeight - 10
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      this.doc.setFontSize(8)
      this.doc.setTextColor(100, 100, 100)
      this.doc.text(`Generated on ${today}`, this.margin, footerY)
      this.doc.text("Page 1 of 1", this.pageWidth - this.margin, footerY, { align: "right" })

      // Reset text color
      this.doc.setTextColor(0, 0, 0)
    } catch (error) {
      console.error("Error adding footer:", error)
      // Continue without footer if it fails
    }
  }

  private formatCurrency(amount: number): string {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    } catch (error) {
      console.error("Error formatting currency:", error)
      return `$${amount.toLocaleString()}`
    }
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date")
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString // Return original string if formatting fails
    }
  }

  private validatePostingData(posting: LCAPostingData): void {
    const requiredFields = [
      "job_title",
      "employer_name",
      "case_number",
      "soc_code",
      "soc_title",
      "wage_rate_from",
      "wage_unit",
      "employment_start_date",
      "employment_end_date",
      "worksite_address",
      "worksite_city",
      "worksite_state",
      "worksite_postal_code",
    ]

    for (const field of requiredFields) {
      if (!posting[field as keyof LCAPostingData]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }
  }

  public generateLCAPDF(posting: LCAPostingData): void {
    try {
      // Validate input data
      this.validatePostingData(posting)

      // Add title
      this.addTitle()

      // Add numbered sections following the exact format
      this.addNumberedSection(
        1,
        `An H-1B nonimmigrant worker is being sought by ${posting.employer_name} through the ` +
          `filing of a Labor Condition Application with the Employment and Training Administration of the ` +
          `U.S. Department of Labor.`,
      )

      const workerCount = posting.total_workers || 1
      const workerText = workerCount === 1 ? "One (1) such worker is" : `${workerCount} such workers are`
      this.addNumberedSection(2, `${workerText} being sought.`)

      this.addNumberedSection(
        3,
        `This worker is being sought in the occupational classification of ${posting.soc_title} (${posting.soc_code}).`,
      )

      // Handle wage display - if same wage, show single wage, otherwise show range
      const wageText =
        posting.wage_rate_from === posting.wage_rate_to
          ? `A wage of ${this.formatCurrency(posting.wage_rate_from)}/${posting.wage_unit.toLowerCase()} is being offered to this worker.`
          : `A wage range of ${this.formatCurrency(posting.wage_rate_from)} to ${this.formatCurrency(posting.wage_rate_to)}/${posting.wage_unit.toLowerCase()} is being offered to this worker.`

      this.addNumberedSection(4, wageText)

      this.addNumberedSection(5, `LCA (ETA Case Number): ${posting.case_number}`)

      this.addNumberedSection(
        6,
        `The period of employment for which this worker is sought is ${this.formatDate(posting.employment_start_date)} to ${this.formatDate(posting.employment_end_date)}.`,
      )

      this.addNumberedSection(
        7,
        `The employment will occur in ${posting.worksite_address}, ${posting.worksite_city}, ${posting.worksite_state}, ${posting.worksite_postal_code}.`,
      )

      this.addNumberedSection(
        8,
        `The Labor Condition Application is available for public inspection at the offices of ` +
          `${posting.employer_name}, 8751 Collin McKinney PKWY, Suite #601, McKinney, TX-75070.`,
      )

      // Add complaint notice
      this.addComplaintNotice()

      // Generate filename
      const sanitizedCaseNumber = posting.case_number.replace(/[^a-zA-Z0-9]/g, "_")
      const sanitizedJobTitle = posting.job_title.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")
      const fileName = `LCA_${sanitizedCaseNumber}_${sanitizedJobTitle}.pdf`

      // Save the PDF
      this.doc.save(fileName)

      console.log(`PDF generated successfully: ${fileName}`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}

// Main export function with the correct name that matches the import
export const generateLCAPDF = (posting: LCAPostingData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Validate that we're in a browser environment
      if (typeof window === "undefined") {
        throw new Error("PDF generation is only available in browser environment")
      }

      // Check if jsPDF is available
      if (typeof jsPDF === "undefined") {
        throw new Error("jsPDF library is not available")
      }

      const generator = new LCAPDFGenerator()
      generator.generateLCAPDF(posting)
      resolve()
    } catch (error) {
      console.error("PDF generation failed:", error)
      reject(error)
    }
  })
}

// Alternative function for testing PDF generation without download
export const previewLCAPDF = (posting: LCAPostingData): string => {
  try {
    const generator = new LCAPDFGenerator()
    // Return the PDF as a data URL for preview
    generator.generateLCAPDF(posting)
    return generator.doc.output("dataurlstring")
  } catch (error) {
    console.error("PDF preview failed:", error)
    throw error
  }
}

// Function to test PDF generation without actually downloading
export const testPDFGeneration = (posting: LCAPostingData): boolean => {
  try {
    const generator = new LCAPDFGenerator()
    // Just create the PDF object but don't save it
    generator.generateLCAPDF(posting)
    return true
  } catch (error) {
    console.error("PDF test failed:", error)
    return false
  }
}
