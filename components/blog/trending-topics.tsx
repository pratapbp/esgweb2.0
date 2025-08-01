"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

const trendingTopics = [
  { name: "SAP S/4HANA Migration", count: 24, slug: "sap-s4hana-migration" },
  { name: "AI in Supply Chain", count: 18, slug: "ai-supply-chain" },
  { name: "Predictive Analytics", count: 15, slug: "predictive-analytics" },
  { name: "Cloud Integration", count: 12, slug: "cloud-integration" },
  { name: "Digital Transformation", count: 10, slug: "digital-transformation" },
  { name: "Cybersecurity", count: 9, slug: "cybersecurity" },
  { name: "Data Governance", count: 7, slug: "data-governance" },
]

export default function TrendingTopics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-500/20 p-2 rounded-full">
          <TrendingUp className="h-5 w-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Trending Topics</h3>
      </div>

      <ul className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <motion.li
            key={topic.slug}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link href={`/blog/topic/${topic.slug}`} className="flex items-center justify-between group">
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors">{topic.name}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-gray-400">{topic.count}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
