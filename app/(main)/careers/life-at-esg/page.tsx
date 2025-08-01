import { Suspense } from "react"
import LifeAtESGPage from "./life-at-esg-page"
import PentagonLoader from "@/components/loaders/pentagon-loader"

export default function LifeAtESG() {
  return (
    <Suspense fallback={<PentagonLoader />}>
      <LifeAtESGPage />
    </Suspense>
  )
}
