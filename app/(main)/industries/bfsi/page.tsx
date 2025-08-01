import type { Metadata } from "next"
import { BFSIPage } from "./bfsi-page"

export const metadata: Metadata = {
  title: "BFSI Transformation | Banking, Financial Services & Insurance | ESGit",
  description:
    "Transform Banking, Financial Services & Insurance with SAP + GenAI + ESGit AI Stack. AI-driven risk engines, real-time fraud detection, and regulatory intelligence.",
  keywords:
    "BFSI, Banking AI, Financial Services, Insurance Technology, SAP Fioneer, Fraud Detection, RegTech, FinTech",
}

export default function BFSIIndustryPage() {
  return <BFSIPage />
}
