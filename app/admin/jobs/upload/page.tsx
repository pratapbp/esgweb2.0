import type { Metadata } from "next"
import UploadJobForm from "./upload-job-form"

export const metadata: Metadata = {
  title: "Upload Job Posting | Admin Dashboard",
  description: "Create and publish new job postings",
}

export default function UploadJobPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Upload Job Posting</h1>
            <p className="text-gray-400">Create and publish new job opportunities for candidates</p>
          </div>
          <UploadJobForm />
        </div>
      </div>
    </div>
  )
}
