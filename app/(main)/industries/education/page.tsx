import type { Metadata } from "next"
import EducationPage from "./education-page"

export const metadata: Metadata = {
  title: "Education & EdTech Solutions | ESG - Digital Learning Transformation",
  description:
    "Transform educational institutions with ESG's AI-powered EdTech solutions. Digital learning platforms, student analytics, and sustainable campus management.",
  keywords: [
    "education technology",
    "EdTech solutions",
    "digital learning",
    "student analytics",
    "campus sustainability",
    "educational AI",
    "learning management systems",
    "ESG education",
  ],
}

export default function Education() {
  return <EducationPage />
}
