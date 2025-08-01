"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

type DropdownItem = {
  title: string
  href: string
  description?: string
}

type DropdownMenuProps = {
  title: string
  items: DropdownItem[]
  description?: string
}

export default function DropdownMenu({ title, items, description }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className={`flex items-center space-x-1 py-2 text-sm font-medium transition-colors ${
          isOpen ? "text-blue-400" : "text-white hover:text-blue-300"
        }`}
      >
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-screen max-w-md z-[200]"
          >
            <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#1a1d29] shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                {description && <p className="text-sm text-gray-300 mb-4 max-w-md">{description}</p>}
                <div className="grid grid-cols-1 gap-4">
                  {items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-white font-medium">{item.title}</span>
                      {item.description && <span className="text-sm text-gray-400">{item.description}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
