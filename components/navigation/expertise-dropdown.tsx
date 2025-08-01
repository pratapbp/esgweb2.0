"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"

type ExpertiseItem = {
  title: string
  href: string
}

type ExpertiseDropdownProps = {
  items?: ExpertiseItem[]
}

export default function ExpertiseDropdown({ items }: ExpertiseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  // Define 20 major industries
  const industries: ExpertiseItem[] = [
    { title: "Manufacturing", href: "/industries/manufacturing" },
    { title: "Healthcare", href: "/industries/healthcare" },
    { title: "Financial Services", href: "/industries/financial-services" },
    { title: "Retail", href: "/industries/retail" },
    { title: "Automotive", href: "/industries/automotive" },
    { title: "Aerospace & Defense", href: "/industries/aerospace-defense" },
    { title: "Energy & Utilities", href: "/industries/energy-utilities" },
    { title: "Telecommunications", href: "/industries/telecommunications" },
    { title: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
    { title: "Consumer Goods", href: "/industries/consumer-goods" },
    { title: "Technology", href: "/industries/technology" },
    { title: "Media & Entertainment", href: "/industries/media-entertainment" },
    { title: "Transportation & Logistics", href: "/industries/transportation-logistics" },
    { title: "Construction", href: "/industries/construction" },
    { title: "Agriculture", href: "/industries/agriculture" },
    { title: "Education", href: "/industries/education" },
    { title: "Hospitality", href: "/industries/hospitality" },
    { title: "Insurance", href: "/industries/insurance" },
    { title: "Real Estate", href: "/industries/real-estate" },
    { title: "Public Sector", href: "/industries/public-sector" },
  ]

  // Initial visible industries (first 8)
  const visibleIndustries = showAll ? industries : industries.slice(0, 8)

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className={`flex items-center space-x-1 py-2 text-sm font-medium transition-colors ${
          isOpen ? "text-blue-400" : "text-white hover:text-blue-300"
        }`}
      >
        <span>Our Expertise</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-screen max-w-4xl z-[200]"
          >
            <div className="overflow-hidden rounded-lg border border-gray-700 expertise-dropdown">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">Our Expertise</h3>
                <p className="text-sm text-gray-300 mb-4 max-w-md">
                  Discover how ESG delivers tailored IT solutions across various industries, enhancing efficiency,
                  security, and digital transformation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {visibleIndustries.map((industry) => (
                    <Link
                      key={industry.title}
                      href={industry.href}
                      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-white font-medium">{industry.title}</span>
                    </Link>
                  ))}
                </div>

                {!showAll && industries.length > 8 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setShowAll(true)
                    }}
                    className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    <span>Show More Industries</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
