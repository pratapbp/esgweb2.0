"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function AnimatedSapAiLogo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-16 w-auto" /> // Placeholder to prevent layout shift
  }

  const logoSrc = theme === "dark" ? "/images/logos/dark-theme/logo-256x256.png" : "/images/logos/logo-256x256.png"

  return (
    <Link href="/" className="relative flex items-center">
      <Image src={logoSrc || "/placeholder.svg"} alt="ESG Inc Logo" width={48} height={48} className="mr-2" priority />
    </Link>
  )
}
