import type { Metadata } from "next"
import CloudPage from "./cloud-page"

export const metadata: Metadata = {
  title: "Cloud Computing | ESGit - Enterprise Cloud Solutions & Services",
  description:
    "Discover ESGit's comprehensive cloud computing solutions including IaaS, PaaS, SaaS, multi-cloud strategies, and cloud migration services for enterprise transformation.",
  keywords:
    "Cloud Computing, IaaS, PaaS, SaaS, Multi-Cloud, Cloud Migration, AWS, Azure, Google Cloud, Hybrid Cloud, Cloud Security",
}

export default function Cloud() {
  return <CloudPage />
}
