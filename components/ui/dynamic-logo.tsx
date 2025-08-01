"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DynamicLogoProps {
  variant?: "header" | "footer" | "standalone"
  adaptive?: boolean
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  hasTouch: boolean
  pixelRatio: number
  connectionSpeed: "slow" | "fast" | "unknown"
  batteryLevel?: number
  isLowPowerMode?: boolean
}

interface AIBehavior {
  animationIntensity: number
  showParticles: boolean
  enableGlow: boolean
  adaptiveSize: number
  hideOnScroll: boolean
  performanceMode: "high" | "medium" | "low"
}

export default function DynamicLogo({
  variant = "standalone",
  adaptive = false,
  className,
  size = "md",
}: DynamicLogoProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
    pixelRatio: 1,
    connectionSpeed: "unknown",
  })

  const [aiBehavior, setAiBehavior] = useState<AIBehavior>({
    animationIntensity: 1,
    showParticles: false, // Disabled by default to prevent errors
    enableGlow: false, // Disabled by default to prevent errors
    adaptiveSize: 48,
    hideOnScroll: false,
    performanceMode: "high",
  })

  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-20 w-auto",
  }

  const variantClasses = {
    header: "transition-all duration-300 hover:scale-105",
    footer: "opacity-80 hover:opacity-100 transition-opacity duration-300",
    standalone: "drop-shadow-lg",
  }

  // AI-powered device detection and analysis
  useEffect(() => {
    const analyzeDevice = () => {
      if (typeof window === "undefined") return

      const windowWidth = window.innerWidth || 1024
      const windowHeight = window.innerHeight || 768
      const userAgent = navigator?.userAgent || ""
      const pixelRatio = window.devicePixelRatio || 1

      // Device type detection
      const isMobile = windowWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isTablet = windowWidth > 768 && windowWidth <= 1024 && /iPad|Android/i.test(userAgent)
      const isDesktop =
        windowWidth > 1024 && !/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

      // Touch capability
      const hasTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)

      // Network speed estimation
      const connection =
        typeof navigator !== "undefined"
          ? (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
          : null
      let connectionSpeed: "slow" | "fast" | "unknown" = "unknown"

      if (connection && connection.effectiveType) {
        const effectiveType = connection.effectiveType
        connectionSpeed = effectiveType === "4g" || effectiveType === "3g" ? "fast" : "slow"
      }

      const newDeviceInfo: DeviceInfo = {
        isMobile,
        isTablet,
        isDesktop,
        hasTouch,
        pixelRatio,
        connectionSpeed,
      }

      setDeviceInfo(newDeviceInfo)

      // AI decision making for behavior adaptation
      const aiAnalysis = analyzeOptimalBehavior(newDeviceInfo, windowWidth, windowHeight)
      setAiBehavior(aiAnalysis)
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      analyzeDevice()
      window.addEventListener("resize", analyzeDevice)
      return () => window.removeEventListener("resize", analyzeDevice)
    }
  }, [])

  // AI behavior analysis engine
  const analyzeOptimalBehavior = (device: DeviceInfo, width: number, height: number): AIBehavior => {
    let performanceMode: "high" | "medium" | "low" = "high"
    let animationIntensity = 1
    let showParticles = false // Disabled for stability
    let enableGlow = false // Disabled for stability
    let adaptiveSize = 48
    let hideOnScroll = false

    // Performance mode determination
    if (device.isMobile || device.isLowPowerMode || device.connectionSpeed === "slow") {
      performanceMode = "low"
      animationIntensity = 0.3
      showParticles = false
      enableGlow = false
    } else if (device.isTablet || device.pixelRatio > 2) {
      performanceMode = "medium"
      animationIntensity = 0.6
      showParticles = false
      enableGlow = false
    }

    // Adaptive sizing based on variant and device
    switch (variant) {
      case "header":
        if (device.isMobile) {
          adaptiveSize = isScrolled ? 28 : 32
          hideOnScroll = width < 480
        } else if (device.isTablet) {
          adaptiveSize = isScrolled ? 32 : 36
        } else {
          adaptiveSize = isScrolled ? 36 : 40
        }
        break
      case "footer":
        adaptiveSize = device.isMobile ? 32 : device.isTablet ? 36 : 40
        break
      default:
        adaptiveSize = device.isMobile ? 24 : device.isTablet ? 28 : 32
        break
    }

    return {
      animationIntensity,
      showParticles,
      enableGlow,
      adaptiveSize,
      hideOnScroll,
      performanceMode,
    }
  }

  // Scroll behavior tracking
  useEffect(() => {
    if (variant !== "header" || typeof window === "undefined") return

    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)

      // Re-analyze behavior on scroll changes
      if (adaptive) {
        const aiAnalysis = analyzeOptimalBehavior(deviceInfo, window.innerWidth, window.innerHeight)
        setAiBehavior(aiAnalysis)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [variant, adaptive, deviceInfo])

  if (aiBehavior.hideOnScroll && isScrolled && deviceInfo.isMobile) {
    return null
  }

  return (
    <div className={cn("flex items-center space-x-3", variantClasses[variant], className)}>
      <div className="relative">
        <Image
          src="/images/logos/logo-1024x1024.webp"
          alt="ESG Inc. Logo"
          width={80}
          height={80}
          className={cn("object-contain", sizeClasses[size])}
          priority={variant === "header"}
          onError={(e) => {
            // Fallback to PNG if WebP fails
            const target = e.target as HTMLImageElement
            if (target.src.includes(".webp")) {
              target.src = "/images/logos/logo-1024x1024.png"
            }
          }}
        />
        {adaptive && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {variant !== "header" && (
        <div className="hidden sm:block">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ESG Inc.
          </span>
          <div className="text-xs text-gray-400 font-medium tracking-wider">Enterprise Solutions Group</div>
        </div>
      )}
    </div>
  )
}
