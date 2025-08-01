interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary_range: string
  description: string
}

// Mock job data - in real app would fetch from API
export const getJobData = async (id: string) => {
  // Mock data
  return {
    id,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Austin, TX",
    description: "Join our engineering team to build cutting-edge SAP solutions...",
  }
}
