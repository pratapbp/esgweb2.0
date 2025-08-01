import type { Metadata } from "next"
import CloudSolutionsClientPage from "./CloudSolutionsClientPage"

export const metadata: Metadata = {
  title: "Cloud Solutions - AI-Native Infrastructure at Scale | ESGit",
  description:
    "Accelerate with AI-Native Cloud. Scale with Confidence. From cloud migration to intelligent workload orchestration—modernize on AWS, Azure, GCP, or SAP Cloud with GenAI + Blockchain security.",
  keywords:
    "cloud solutions, cloud migration, SAP cloud, AWS, Azure, GCP, DevOps, FinOps, MLOps, cloud security, multi-cloud strategy",
  openGraph: {
    title: "Cloud Solutions - AI-Native Infrastructure at Scale | ESGit",
    description:
      "Accelerate with AI-Native Cloud. Scale with Confidence. From cloud migration to intelligent workload orchestration.",
    images: ["/images/services/cloud.jpg"],
  },
}

export default function CloudSolutionsPage() {
  return <CloudSolutionsClientPage />
}
