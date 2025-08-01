import { Suspense } from "react"
import AutomationCenterPage from "./automation-center-page"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AutomationCenterPage />
    </Suspense>
  )
}
