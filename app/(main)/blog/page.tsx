import { Suspense } from "react"
import BlogHero from "@/components/blog/blog-hero"
import BlogFilter from "@/components/blog/blog-filter"
import BlogGrid from "@/components/blog/blog-grid"
import EmailSubscribe from "@/components/blog/email-subscribe"
import TrendingTopics from "@/components/blog/trending-topics"
import AIContentGenerator from "@/components/blog/ai-content-generator"
import BlogSkeleton from "@/components/blog/blog-skeleton"

export const metadata = {
  title: "AI-Enhanced Blog | ESG Inc",
  description: "Explore our AI-generated insights on SAP, AI technologies, and industry solutions",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <BlogHero />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogFilter />
            <Suspense fallback={<BlogSkeleton />}>
              <BlogGrid />
            </Suspense>
          </div>

          <div className="space-y-8">
            <AIContentGenerator />
            <TrendingTopics />
            <EmailSubscribe />
          </div>
        </div>
      </div>
    </div>
  )
}
