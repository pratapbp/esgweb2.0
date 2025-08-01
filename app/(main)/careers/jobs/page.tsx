import { Suspense } from "react"
import EnhancedJobsListing from "./enhanced-jobs-listing"
import PentagonLoader from "@/components/loaders/pentagon-loader"

export const metadata = {
  title: "Open Positions - AI-Powered Job Board | ESG Global",
  description:
    "Discover your next career opportunity with our AI-powered job matching system. Find roles in SAP, AI, Cloud, Cybersecurity, and more.",
  keywords: "jobs, careers, SAP jobs, AI jobs, cloud jobs, cybersecurity, H1B sponsorship, LCA compliant",
}

export default function Page() {
  return (
    <Suspense fallback={<PentagonLoader />}>
      <EnhancedJobsListing />
    </Suspense>
  )
}
