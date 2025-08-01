import type { Metadata } from "next"
import UploadLCAForm from "./upload-lca-form"

export const metadata: Metadata = {
  title: "Upload LCA Posting | Admin Dashboard",
  description: "Create and publish new LCA postings for DOL compliance",
}

export default function UploadLCAPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Upload LCA Posting</h1>
            <p className="text-gray-400">Create DOL-compliant Labor Condition Application postings</p>
          </div>
          <UploadLCAForm />
        </div>
      </div>
    </div>
  )
}
