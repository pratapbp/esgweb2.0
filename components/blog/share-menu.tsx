"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Facebook, Mail, Link, X } from "lucide-react"

interface ShareMenuProps {
  url: string
  title: string
  onClose: () => void
}

export default function ShareMenu({ url, title, onClose }: ShareMenuProps) {
  const fullUrl = `https://esg-inc.com${url}`
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl)
    // Could add a toast notification here
  }

  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      color: "bg-[#1DA1F2] hover:bg-[#1a94df]",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      color: "bg-[#0077B5] hover:bg-[#006399]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${fullUrl}`)}`,
    },
  ]

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute right-0 bottom-10 z-50 bg-slate-800 rounded-lg shadow-xl border border-slate-700 w-52 overflow-hidden"
    >
      <div className="flex justify-between items-center p-2 border-b border-slate-700">
        <span className="text-xs font-medium text-gray-300">Share this article</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-2 grid grid-cols-4 gap-2">
        {shareOptions.map((option) => (
          <a
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${option.color} text-white p-2 rounded flex items-center justify-center`}
            title={`Share on ${option.name}`}
          >
            {option.icon}
          </a>
        ))}
      </div>

      <div className="p-2 border-t border-slate-700">
        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 text-white p-2 rounded"
        >
          <Link className="h-3.5 w-3.5" />
          Copy Link
        </button>
      </div>
    </motion.div>
  )
}
