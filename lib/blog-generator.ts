// Sample data for blog generation
const services = [
  "SAP S/4HANA",
  "SAP SuccessFactors",
  "SAP Analytics Cloud",
  "SAP Intelligent Supply Chain",
  "SAP Customer Experience",
]

const industries = ["Manufacturing", "Healthcare", "Financial Services", "Retail", "Energy", "Telecommunications"]

const technologies = [
  "Artificial Intelligence",
  "Machine Learning",
  "Cloud Computing",
  "IoT",
  "Blockchain",
  "Data Analytics",
  "Cybersecurity",
]

// Title templates
const titleTemplates = [
  "Transforming {industry} with {service} and {technology}",
  "How {technology} is Revolutionizing {service} in {industry}",
  "The Future of {industry}: Integrating {service} with {technology}",
  "{service} Best Practices for {industry} in the Age of {technology}",
  "Leveraging {technology} to Enhance {service} Performance in {industry}",
  "{industry} Leaders Adopt {service} Powered by {technology}",
  "Optimizing {industry} Operations with {service} and {technology}",
  "{technology}: The Missing Piece in Your {industry} {service} Strategy",
]

// Excerpt templates
const excerptTemplates = [
  "Discover how {industry} companies are achieving unprecedented efficiency by combining {service} with cutting-edge {technology} solutions.",
  "Learn the strategic advantages of implementing {technology}-enhanced {service} systems in the competitive {industry} sector.",
  "Explore the transformative impact of {technology} on traditional {service} implementations across the {industry} landscape.",
  "See how industry leaders are leveraging {service} with integrated {technology} capabilities to solve complex {industry} challenges.",
  "Uncover the hidden potential of combining {service} with {technology} to drive innovation in {industry} businesses.",
]

// Image paths based on combinations
const getImagePath = (service: string, industry: string, technology: string) => {
  // This is a simplified version - in a real implementation, you might have more specific images
  const serviceSlug = service.toLowerCase().replace(/[^\w]+/g, "-")
  const industrySlug = industry.toLowerCase().replace(/[^\w]+/g, "-")

  // Use existing images from the project
  const images = [
    "/images/sap-workflow/data-integration.jpg",
    "/images/sap-workflow/process-automation.jpg",
    "/images/sap-workflow/analytics-insights.jpg",
    "/images/sap-workflow/optimization.jpg",
    "/images/sap-workflow/user-experience.jpg",
    "/images/industries/manufacturing.jpg",
    "/images/industries/healthcare.jpg",
    "/images/industries/retail.jpg",
    "/images/industries/banking.jpg",
    "/images/industries/energy.jpg",
    "/images/industries/telecom.jpg",
    "/abstract-digital-background.png",
    "/interconnected-tech-network.png",
  ]

  // Deterministically select an image based on the combination
  const hash = (serviceSlug + industrySlug).split("").reduce((a, b) => {
    return a + b.charCodeAt(0)
  }, 0)

  return images[hash % images.length]
}

// Generate a random date within the last 3 months
const generateRandomDate = () => {
  const now = new Date()
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
  const randomTimestamp = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  const date = new Date(randomTimestamp)

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Generate a random read time between 3-15 minutes
const generateReadTime = () => {
  return `${Math.floor(Math.random() * 12) + 3} min read`
}

// Generate a slug from the title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
}

// Main function to generate blog posts
export const generateBlogPosts = (count: number) => {
  const posts = []

  for (let i = 0; i < count; i++) {
    // Randomly select service, industry, and technology
    const service = services[Math.floor(Math.random() * services.length)]
    const industry = industries[Math.floor(Math.random() * industries.length)]
    const technology = technologies[Math.floor(Math.random() * technologies.length)]

    // Generate title from template
    const titleTemplate = titleTemplates[Math.floor(Math.random() * titleTemplates.length)]
    const title = titleTemplate
      .replace("{service}", service)
      .replace("{industry}", industry)
      .replace("{technology}", technology)

    // Generate excerpt from template
    const excerptTemplate = excerptTemplates[Math.floor(Math.random() * excerptTemplates.length)]
    const excerpt = excerptTemplate
      .replace("{service}", service)
      .replace("{industry}", industry)
      .replace("{technology}", technology)

    // Generate other post metadata
    const date = generateRandomDate()
    const readTime = generateReadTime()
    const slug = generateSlug(title)
    const image = getImagePath(service, industry, technology)

    posts.push({
      id: `post-${i + 1}`,
      title,
      excerpt,
      image,
      date,
      readTime,
      service,
      industry,
      technology,
      slug,
    })
  }

  return posts
}
