import type { Metadata } from "next"
import ManufacturingPage from "./manufacturing-page"

export const metadata: Metadata = {
  title: "Manufacturing Industry Solutions | Smart Manufacturing & Industrial Automation | ESG Inc",
  description:
    "Transform your manufacturing operations with AI-powered solutions, smart manufacturing, industrial automation, predictive maintenance, and IoT integration. Increase efficiency, reduce costs, and improve product quality.",
  keywords:
    "smart manufacturing, industrial automation, predictive maintenance, supply chain optimization, IoT manufacturing, Industry 4.0, manufacturing technology, digital transformation, manufacturing AI, industrial IoT",
  openGraph: {
    title: "Manufacturing Industry Solutions | ESG Inc",
    description:
      "AI-powered manufacturing solutions for smart factories, predictive maintenance, and supply chain optimization",
    type: "website",
    images: [
      {
        url: "/images/industries/manufacturing-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Manufacturing Solutions",
      },
    ],
  },
}

export default function Page() {
  return <ManufacturingPage />
}
