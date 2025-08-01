import type { Metadata } from "next"
import SAPEnterpriseSolutionsPage from "./sap-enterprise-solutions-page"

export const metadata: Metadata = {
  title: "SAP Enterprise Solutions | ESG",
  description:
    "Transform your business with our comprehensive SAP Enterprise Solutions. Leverage AI-powered implementation, optimization, and support services.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function Page() {
  return <SAPEnterpriseSolutionsPage />
}
