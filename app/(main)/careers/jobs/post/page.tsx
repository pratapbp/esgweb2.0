import type { Metadata } from "next"
import JobPostingCreationPage from "./job-posting-creation-page"

export const metadata: Metadata = {
  title: "Post New Job - Executive Software Guild | Create Job Posting",
  description:
    "Create a new job posting at Executive Software Guild. Use our AI-powered job posting system to attract top talent with comprehensive job descriptions and requirements.",
  keywords:
    "post job, create job posting, hire talent, job creation, HR tools, recruitment, Executive Software Guild careers",
  openGraph: {
    title: "Post New Job Opening - Executive Software Guild",
    description: "Create compelling job postings with our AI-powered recruitment tools",
    type: "website",
    url: "https://esgit.com/careers/jobs/post",
  },
}

export default function Page() {
  return <JobPostingCreationPage />
}
