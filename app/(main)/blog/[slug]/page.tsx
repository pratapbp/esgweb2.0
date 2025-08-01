import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateBlogPosts } from "@/lib/blog-generator"
import RelatedPosts from "@/components/blog/related-posts"
import EmailSubscribe from "@/components/blog/email-subscribe"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In a real implementation, you would fetch the post data from an API
  const posts = generateBlogPosts(20)
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | ESG Inc Blog`,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real implementation, you would fetch the post data from an API
  const posts = generateBlogPosts(20)
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Generate related posts based on the same industry or technology
  const relatedPosts = posts
    .filter((p) => p.id !== post.id && (p.industry === post.industry || p.technology === post.technology))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <Link href="/blog">
              <Button
                variant="outline"
                size="sm"
                className="mb-6 bg-slate-900/50 backdrop-blur-sm border-slate-700 text-white hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-600/70 text-white backdrop-blur-sm">
                  {post.service}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-purple-600/70 text-white backdrop-blur-sm">
                  {post.industry}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-600/70 text-white backdrop-blur-sm">
                  {post.technology}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{post.title}</h1>

              <div className="flex items-center text-gray-300 mb-4">
                <div className="flex items-center mr-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="lead text-xl text-gray-300">{post.excerpt}</p>

                <h2>
                  Introduction to {post.service} in {post.industry}
                </h2>
                <p>
                  The integration of {post.service} with {post.technology} is transforming how {post.industry}{" "}
                  businesses operate in today's digital landscape. Companies that leverage these technologies gain
                  significant competitive advantages through improved efficiency, reduced costs, and enhanced
                  decision-making capabilities.
                </p>

                <h2>Key Benefits of {post.technology} Integration</h2>
                <p>
                  When properly implemented, {post.technology} can dramatically enhance the capabilities of{" "}
                  {post.service} systems. The most successful {post.industry} organizations are already seeing results
                  in several key areas:
                </p>

                <ul>
                  <li>Improved operational efficiency and reduced manual processes</li>
                  <li>Enhanced data accuracy and real-time insights</li>
                  <li>Predictive capabilities that anticipate market changes</li>
                  <li>Streamlined workflows and better resource allocation</li>
                  <li>Increased agility and faster response to changing conditions</li>
                </ul>

                <h2>Implementation Strategies for {post.industry} Organizations</h2>
                <p>
                  Successful implementation of {post.service} with {post.technology} requires careful planning and
                  execution. Organizations should consider the following approach:
                </p>

                <ol>
                  <li>Assess current systems and identify integration opportunities</li>
                  <li>Develop a clear roadmap with measurable objectives</li>
                  <li>Start with pilot projects to demonstrate value</li>
                  <li>Build cross-functional teams with both technical and business expertise</li>
                  <li>Invest in training and change management</li>
                </ol>

                <h2>
                  Case Study: {post.industry} Leader Transforms with {post.service}
                </h2>
                <p>
                  A leading {post.industry} organization recently implemented {post.service} enhanced with{" "}
                  {post.technology} capabilities. Within six months, they achieved:
                </p>

                <ul>
                  <li>40% reduction in processing time for key workflows</li>
                  <li>25% improvement in forecast accuracy</li>
                  <li>Significant cost savings through optimized resource allocation</li>
                  <li>Enhanced customer satisfaction through faster response times</li>
                </ul>

                <h2>
                  Future Trends: {post.technology} in {post.industry}
                </h2>
                <p>
                  Looking ahead, we expect to see continued evolution in how {post.technology} enhances {post.service}{" "}
                  implementations in the {post.industry} sector. Emerging trends include:
                </p>

                <ul>
                  <li>Greater automation of complex decision processes</li>
                  <li>Enhanced integration across the entire technology ecosystem</li>
                  <li>More sophisticated predictive capabilities</li>
                  <li>Increased focus on security and compliance</li>
                </ul>

                <h2>Conclusion</h2>
                <p>
                  The combination of {post.service} and {post.technology} represents a significant opportunity for{" "}
                  {post.industry} organizations to transform their operations and gain competitive advantage. By taking
                  a strategic approach to implementation and focusing on measurable business outcomes, companies can
                  realize substantial benefits in efficiency, accuracy, and decision-making capabilities.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Share this article</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-twitter"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-linkedin"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-facebook"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-mail"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>

          <div className="space-y-8">
            <EmailSubscribe />

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Topics in this article</h3>
              <div className="flex flex-wrap gap-2">
                <Link href={`/blog/topic/${post.service.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="px-3 py-1.5 rounded-full text-sm bg-blue-900/50 text-blue-300 border border-blue-800/50 hover:bg-blue-800/50">
                    {post.service}
                  </span>
                </Link>
                <Link href={`/blog/topic/${post.industry.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="px-3 py-1.5 rounded-full text-sm bg-purple-900/50 text-purple-300 border border-purple-800/50 hover:bg-purple-800/50">
                    {post.industry}
                  </span>
                </Link>
                <Link href={`/blog/topic/${post.technology.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="px-3 py-1.5 rounded-full text-sm bg-green-900/50 text-green-300 border border-green-800/50 hover:bg-green-800/50">
                    {post.technology}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
