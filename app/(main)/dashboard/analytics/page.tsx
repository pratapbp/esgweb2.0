import { Suspense } from "react"
import DashboardAnalyticsPage from "./dashboard-analytics-page"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardAnalyticsPage />
    </Suspense>
  )
}
