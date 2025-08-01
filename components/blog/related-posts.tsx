import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

interface RelatedPostsProps {
  posts: any[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors"
        >
          <div className="relative h-40 overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <div className="flex items-center text-xs text-gray-400 mb-2">
              <div className="flex items-center mr-3">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
