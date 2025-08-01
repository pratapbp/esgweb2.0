import type { Metadata } from "next"
import StaffingSolutionsClientPage from "./StaffingSolutionsClientPage"

export const metadata: Metadata = {
  title: "Staffing Solutions | ESG Inc.",
  description: "AI-powered staffing solutions for IT, SAP, Cloud, and enterprise talent acquisition.",
}

export default function StaffingSolutionsPage() {
  return <StaffingSolutionsClientPage />
}
