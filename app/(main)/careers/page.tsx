import { Suspense } from "react"
import CareersLandingPage from "./careers-landing-page"
import PentagonLoader from "@/components/loaders/pentagon-loader"

export const metadata = {
  title: "Careers - Join Our Team | Executive Software Guild",
  description:
    "Discover exciting career opportunities at Executive Software Guild. We're hiring talented professionals in SAP, Software Engineering, and Technology consulting.",
  keywords: "careers, jobs, software engineer, SAP consultant, H1B sponsorship, LCA compliant positions",
}

export default function CareersPage() {
  return (
    <Suspense fallback={<PentagonLoader />}>
      <CareersLandingPage />
    </Suspense>
  )
}
