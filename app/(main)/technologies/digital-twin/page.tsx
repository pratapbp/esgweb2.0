import type { Metadata } from "next"
import DigitalTwinPage from "./digital-twin-page"

export const metadata: Metadata = {
  title: "Digital Twins | ESGit - Virtual Simulation & Predictive Analytics",
  description:
    "Discover ESGit's digital twin technology that creates virtual replicas of physical systems for simulation, monitoring, and predictive analytics across industries.",
  keywords:
    "Digital Twins, Virtual Simulation, Predictive Analytics, IoT, Real-time Monitoring, Digital Transformation, Industry 4.0, Smart Manufacturing",
}

export default function DigitalTwin() {
  return <DigitalTwinPage />
}
