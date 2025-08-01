import type { Metadata } from "next"
import { Suspense } from "react"
import LCAUploadForm from "./lca-upload-form"
import PentagonLoader from "@/components/loaders/pentagon-loader"

export const metadata: Metadata = {
  title: "Upload LCA Posting | Admin Dashboard",
  description: "Create and publish new LCA postings for DOL compliance",
}

export default function UploadLCAPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<PentagonLoader />}>
          <LCAUploadForm />
        </Suspense>
      </div>
    </div>
  )
}
