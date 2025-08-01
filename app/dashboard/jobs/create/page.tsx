import SimplifiedJobForm from "./simplified-job-form"

export default function CreateJobPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Job Posting</h1>
          <p className="text-gray-400">Add a new job opening to attract top talent to ESGit.</p>
        </div>

        <SimplifiedJobForm />
      </div>
    </div>
  )
}
