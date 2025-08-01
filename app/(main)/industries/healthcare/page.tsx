import type { Metadata } from "next"
import HealthcarePage from "./healthcare-page"

export const metadata: Metadata = {
  title: "AI-Native Healthcare Innovation | ESGit",
  description:
    "Transform healthcare with AI diagnostics, SAP Healthcare modules, RPA automation, and blockchain compliance. Enhance patient outcomes while reducing operational costs.",
  keywords: "healthcare AI, SAP healthcare, medical AI, HIPAA compliance, healthcare automation, patient outcomes",
}

export default function Page() {
  return <HealthcarePage />
}
