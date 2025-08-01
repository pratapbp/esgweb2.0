"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, Share2, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShareMenu from "./share-menu"

interface BlogCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    image: string
    date: string
    readTime: string
    service: string
    industry: string
    technology: string
    slug: string
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>

        <div className="absolute top-3 left-3 flex gap-2">
          {post.service && (
            <span className="px-2 py-1 rounded-full text-xs bg-blue-600/70 text-white backdrop-blur-sm">
              {post.service}
            </span>
          )}
          {post.industry && (
            <span className="px-2 py-1 rounded-full text-xs bg-purple-600/70 text-white backdrop-blur-sm">
              {post.industry}
            </span>
          )}
        </div>

        {post.technology && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 rounded-full text-xs bg-green-600/70 text-white backdrop-blur-sm">
              {post.technology}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center text-xs text-gray-400 mb-3">
          <div className="flex items-center mr-4">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`} className="group">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-300 text-sm mb-4 flex-grow">{post.excerpt}</p>

        <div className="flex justify-between items-center mt-auto">
          <Link href={`/blog/${post.slug}`}>
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
              Read More
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-slate-700"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <Share2 className="h-4 w-4" />
              </Button>

              {showShareMenu && (
                <ShareMenu url={`/blog/${post.slug}`} title={post.title} onClose={() => setShowShareMenu(false)} />
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-slate-700"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-blue-400" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
