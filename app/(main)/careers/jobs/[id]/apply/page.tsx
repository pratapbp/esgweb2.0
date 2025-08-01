import { Suspense } from "react"
import JobApplicationForm from "./job-application-form"
import PentagonLoader from "@/components/loaders/pentagon-loader"

export const metadata = {
  title: "Apply for Position | Executive Software Guild",
  description: "Submit your application for this exciting career opportunity at Executive Software Guild.",
}

interface PageProps {
  params: {
    id: string
  }
}

export default function JobApplicationPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Suspense fallback={<PentagonLoader />}>
        <JobApplicationForm jobId={params.id} />
      </Suspense>
    </div>
  )
}
