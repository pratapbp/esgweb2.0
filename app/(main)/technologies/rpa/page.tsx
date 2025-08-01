import type { Metadata } from "next"
import { RPAPage } from "./rpa-page"

export const metadata: Metadata = {
  title: "RPA & Intelligent Automation | Robotic Process Automation | ESGit",
  description:
    "Transform your enterprise with AI-powered RPA solutions. Automate HR, Finance, Staffing, and SAP workflows with intelligent bots that learn and adapt.",
  keywords:
    "RPA, Robotic Process Automation, Intelligent Automation, AI Bots, Workflow Automation, UiPath, Process Mining",
}

export default function RPATechnologyPage() {
  return <RPAPage />
}
