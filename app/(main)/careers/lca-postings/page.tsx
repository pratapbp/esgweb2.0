import { Suspense } from "react"
import LCAPostingsPage from "./lca-postings-page"
import PentagonLoader from "@/components/loaders/pentagon-loader"

export const metadata = {
  title: "LCA Postings - Labor Condition Applications | Executive Software Guild",
  description:
    "View current Labor Condition Applications (LCA) for H-1B and other visa positions at Executive Software Guild.",
  keywords: "LCA postings, labor condition applications, H-1B jobs, visa sponsorship, DOL compliance",
}

export default function LCAPage() {
  return (
    <Suspense fallback={<PentagonLoader />}>
      <LCAPostingsPage />
    </Suspense>
  )
}
