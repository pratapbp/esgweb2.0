"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

interface VerticalNavProps {
  items: NavItem[]
  className?: string
}

export function VerticalNav({ items, className }: VerticalNavProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<string[]>([])

  const toggleExpand = (title: string) => {
    setExpanded((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const NavItem = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const isActive = pathname === item.href
    const isExpanded = expanded.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    // Check if any child is active
    const isChildActive =
      hasChildren &&
      item.children!.some(
        (child) =>
          pathname === child.href ||
          (child.children && child.children.some((grandchild) => pathname === grandchild.href)),
      )

    return (
      <li>
        <div className="flex flex-col">
          <div className="flex items-center">
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(item.title)}
                className={cn(
                  "flex items-center justify-between w-full py-2 px-3 rounded-md text-sm transition-colors",
                  isActive || isChildActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                  depth > 0 && "text-sm",
                )}
              >
                <span className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.title}
                </span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isExpanded ? "rotate-180" : "")}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center w-full py-2 px-3 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                  depth > 0 && "text-sm",
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.title}
              </Link>
            )}
          </div>

          {/* Children */}
          {hasChildren && (
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 pl-2 border-l border-border overflow-hidden"
                >
                  {item.children!.map((child, index) => (
                    <NavItem key={index} item={child} depth={depth + 1} />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          )}
        </div>
      </li>
    )
  }

  return (
    <nav className={cn("w-full", className)}>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </ul>
    </nav>
  )
}
