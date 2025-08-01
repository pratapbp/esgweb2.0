import type { Metadata } from "next"
import AutomotivePage from "./automotive-page"

export const metadata: Metadata = {
  title: "Automotive Industry Solutions | Electric Vehicles & Autonomous Driving | ESG Inc",
  description:
    "Transform automotive operations with cutting-edge EV platforms, autonomous driving systems, and connected car technologies. Drive innovation in mobility.",
  keywords:
    "automotive technology, electric vehicles, autonomous driving, connected cars, automotive AI, smart manufacturing, vehicle IoT",
}

export default function Page() {
  return <AutomotivePage />
}
