"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

type MenuItem = {
  title: string
  href?: string
  description?: string
  submenu?: MenuItem[]
}

type MegaMenuProps = {
  items: MenuItem[]
}

export default function MegaMenu({ items }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleMouseEnter = (title: string) => {
    setActiveMenu(title)
  }

  const handleMouseLeave = () => {
    setActiveMenu(null)
  }

  return (
    <nav className="relative z-[100]">
      <div className="flex items-center space-x-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center space-x-1 py-2 text-sm font-medium transition-colors ${
                activeMenu === item.title ? "text-blue-400" : "text-white hover:text-blue-300"
              }`}
            >
              <span>{item.title}</span>
              {item.submenu && (
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${activeMenu === item.title ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {item.submenu && (
              <AnimatePresence>
                {activeMenu === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-screen max-w-md z-[200]"
                  >
                    <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#1a1d29] shadow-xl">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                        {item.description && <p className="text-sm text-gray-300 mb-4 max-w-md">{item.description}</p>}
                        <div className="grid grid-cols-1 gap-4">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href || "#"}
                              className="flex flex-col space-y-1 rounded-md p-3 hover:bg-gray-800 transition-colors"
                            >
                              <span className="text-white font-medium">{subItem.title}</span>
                              {subItem.description && (
                                <span className="text-sm text-gray-400">{subItem.description}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
