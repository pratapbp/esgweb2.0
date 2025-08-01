import type { Metadata } from "next"
import TechnologiesPage from "./technologies-page"

export const metadata: Metadata = {
  title: "Technologies | ESG - Empowering Intelligent Enterprises",
  description:
    "Discover ESG's cutting-edge technology stack including GenAI, Blockchain, RPA, IoT, and more. Leading the future of intelligent enterprise solutions.",
  keywords:
    "GenAI, Blockchain, RPA, IoT, Cybersecurity AI, Cloud Solutions, Digital Twin, SAP BTP, Enterprise Technology",
}

export default function Technologies() {
  return <TechnologiesPage />
}
