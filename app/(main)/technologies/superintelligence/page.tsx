import type { Metadata } from "next"
import SuperintelligencePage from "./superintelligence-page"

export const metadata: Metadata = {
  title: "Superintelligence | ESGit - Advanced AI Research & Development",
  description:
    "Explore ESGit's research and development in superintelligence, artificial general intelligence (AGI), and the future of AI systems that surpass human cognitive abilities.",
  keywords:
    "Superintelligence, Artificial General Intelligence, AGI, AI Research, Machine Intelligence, Cognitive Computing, AI Ethics, Future AI",
}

export default function Superintelligence() {
  return <SuperintelligencePage />
}
