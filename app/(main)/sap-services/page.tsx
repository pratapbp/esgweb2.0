import type { Metadata, Viewport } from "next"
import SAPHero from "@/components/sap/hero"
import AIEnhancedWorkflow from "@/components/sap/ai-enhanced-workflow"
import ServiceShowcase from "@/components/sap/service-showcase"
import IndustryImpact from "@/components/sap/industry-impact"
import ClientTestimonials from "@/components/sap/client-testimonials"
import PartnershipBadges from "@/components/sap/partnership-badges"
import AILeadForm from "@/components/sap/ai-lead-form"
import TechnicalInsights from "@/components/sap/technical-insights"

export const metadata: Metadata = {
  title: "SAP Services Enhanced with Gen AI | ESG Inc",
  description:
    "Transform your enterprise with our AI-powered SAP solutions offering advanced analytics, automation, and intelligent process optimization.",
  keywords: "SAP services, SAP consulting, AI-powered SAP, S/4HANA, SAP implementation, digital transformation, Gen AI",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function SAPServicesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <SAPHero />
      <ServiceShowcase />
      <AIEnhancedWorkflow />
      <TechnicalInsights />
      <IndustryImpact />
      <ClientTestimonials />
      <PartnershipBadges />
      <AILeadForm />
    </main>
  )
}
