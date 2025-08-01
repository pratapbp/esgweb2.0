import { Suspense } from "react"
import BenchManagementPage from "./bench-management-page"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BenchManagementPage />
    </Suspense>
  )
}
