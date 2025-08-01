import type { Metadata } from "next"
import TheoryOfMindPage from "./theory-of-mind-page"

export const metadata: Metadata = {
  title: "Theory of Mind | ESGit - AI Empathy & Human Understanding",
  description:
    "Explore ESGit's research in Theory of Mind for AI systems, developing empathetic artificial intelligence that understands human behavior, emotions, and social interactions.",
  keywords:
    "Theory of Mind, AI Empathy, Human-AI Interaction, Social Intelligence, Cognitive AI, Emotional Intelligence, AI Psychology, Human Behavior",
}

export default function TheoryOfMind() {
  return <TheoryOfMindPage />
}
