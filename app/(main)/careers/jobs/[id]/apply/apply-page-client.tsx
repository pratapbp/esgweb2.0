"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import JobApplicationForm from "./job-application-form"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary_range: string
  description: string
}

interface ApplyPageClientProps {
  jobId: string
  jobTitle: string
  jobLocation: string
  jobDepartment: string
}

export default function ApplyPageClient({ jobId, jobTitle, jobLocation, jobDepartment }: ApplyPageClientProps) {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const handleApplicationSubmitted = () => {
    setApplicationSubmitted(true)
  }

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Card className="bg-gray-900/50 border-gray-800 max-w-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Application Submitted Successfully!</h2>
            <p className="text-gray-300 mb-6">
              Thank you for applying to the <strong>{jobTitle}</strong> position. We've received your application and
              will review it carefully.
            </p>
            <p className="text-gray-400 mb-8">
              You should receive a confirmation email shortly. We'll be in touch within 5-7 business days.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/careers/jobs">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  View More Jobs
                </Button>
              </Link>
              <Link href="/careers">
                <Button className="bg-blue-600 hover:bg-blue-700">Back to Careers</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <JobApplicationForm
          jobId={jobId}
          jobTitle={jobTitle}
          jobLocation={jobLocation}
          jobDepartment={jobDepartment}
          onApplicationSubmitted={handleApplicationSubmitted}
        />
      </div>
    </div>
  )
}
