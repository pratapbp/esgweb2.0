import { Suspense } from "react"
import LCAPostingsPage from "./lca-postings-page"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LCAPostingsPage />
    </Suspense>
  )
}

// Move this file to a new folder or rename it to avoid conflict.
// Example: Rename to `/E:/badugu/esgwebsite/app/(main)/dashboard/lca-postings/main-page.tsx`
// Or move it to `/E:/badugu/esgwebsite/app/(main)/dashboard/lca-postings/main/page.tsx`
