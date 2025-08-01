import { Suspense } from "react"
import LCAPostingsPage from "./lca-postings-page"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <LCAPostingsPage />
    </Suspense>
  )
}
