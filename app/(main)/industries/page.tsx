import type { Metadata } from "next"
import IndustriesPage from "./industries-page"

export const metadata: Metadata = {
  title: "Our Expertise | ESG - Industry Solutions",
  description:
    "Discover ESG's expertise across 20+ industries. We deliver tailored technology solutions that drive innovation and digital transformation.",
}

export default function Industries() {
  return <IndustriesPage />
}
