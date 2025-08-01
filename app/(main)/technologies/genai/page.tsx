import type { Metadata } from "next"
import GenAIPage from "./genai-page"

export const metadata: Metadata = {
  title: "Generative AI Solutions | ESGit - Intelligent Enterprise Automation",
  description:
    "Discover ESGit's GenAI capabilities including LLMs, AI copilots, document intelligence, and autonomous workflows. Transform your enterprise with cutting-edge generative AI.",
  keywords: [
    "Generative AI",
    "LLMs",
    "AI Copilots",
    "GPT-4",
    "Document Intelligence",
    "Prompt Engineering",
    "AI Automation",
    "Enterprise AI",
  ],
  openGraph: {
    title: "Generative AI Solutions | ESGit",
    description: "Transform your enterprise with cutting-edge generative AI solutions",
    images: ["/images/genai-hero.jpg"],
  },
}

export default function GenAI() {
  return <GenAIPage />
}
