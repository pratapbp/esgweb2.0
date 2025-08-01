import type { Metadata } from "next"
import CybersecurityPage from "./cybersecurity-page"

export const metadata: Metadata = {
  title: "Cybersecurity AI Solutions | ESGit - Advanced Threat Protection",
  description:
    "Discover ESGit's AI-powered cybersecurity solutions including threat detection, incident response, data loss prevention, and SIEM. Protect your enterprise with zero-trust architecture and intelligent security automation.",
  keywords:
    "cybersecurity AI, threat detection, incident response, data loss prevention, SIEM, zero trust, security automation, enterprise security, cyber threat intelligence, security analytics",
}

export default function Cybersecurity() {
  return <CybersecurityPage />
}
