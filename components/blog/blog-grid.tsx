"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import BlogCard from "./blog-card"
import { Button } from "@/components/ui/button"
import { generateBlogPosts } from "@/lib/blog-generator"

export default function BlogGrid() {
  const [posts, setPosts] = useState<any[]>([])
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching AI-generated blog posts
    const fetchPosts = async () => {
      setLoading(true)
      // In a real implementation, this would call an API
      const generatedPosts = generateBlogPosts(12)
      setPosts(generatedPosts)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 6)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.slice(0, visiblePosts).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  )
}
