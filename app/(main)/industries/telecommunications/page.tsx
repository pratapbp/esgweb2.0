import type { Metadata } from "next"
import TelecommunicationsPage from "./telecommunications-page"

export const metadata: Metadata = {
  title: "Telecommunications Solutions | 5G Networks & IoT Connectivity | ESG Inc",
  description:
    "Transform telecommunications with advanced 5G networks, IoT connectivity platforms, and intelligent network optimization. Enable seamless global communication.",
  keywords:
    "telecommunications, 5G networks, IoT connectivity, network optimization, telecom infrastructure, mobile networks, fiber optic",
}

export default function Page() {
  return <TelecommunicationsPage />
}
