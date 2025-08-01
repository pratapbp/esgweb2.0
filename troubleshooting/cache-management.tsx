"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  RefreshCw,
  Trash2,
  HardDrive,
  CloudLightning,
  Globe,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CacheStatus {
  type: string
  status: "fresh" | "stale" | "expired" | "clearing"
  lastUpdated: string
  size: string
  entries: number
}

export default function CacheManagement() {
  const [cacheStatuses, setCacheStatuses] = useState<CacheStatus[]>([
    {
      type: "Browser Cache",
      status: "stale",
      lastUpdated: "2 hours ago",
      size: "45.2 MB",
      entries: 1247,
    },
    {
      type: "Service Worker",
      status: "fresh",
      lastUpdated: "15 minutes ago",
      size: "12.8 MB",
      entries: 342,
    },
    {
      type: "CDN Cache",
      status: "stale",
      lastUpdated: "4 hours ago",
      size: "128.5 MB",
      entries: 2891,
    },
    {
      type: "DNS Cache",
      status: "fresh",
      lastUpdated: "5 minutes ago",
      size: "2.1 KB",
      entries: 15,
    },
  ])

  const [isClearing, setIsClearing] = useState<string | null>(null)

  const clearCache = async (cacheType: string) => {
    setIsClearing(cacheType)

    // Update status to clearing
    setCacheStatuses((prev) =>
      prev.map((cache) => (cache.type === cacheType ? { ...cache, status: "clearing" as const } : cache)),
    )

    // Simulate cache clearing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update status to fresh
    setCacheStatuses((prev) =>
      prev.map((cache) =>
        cache.type === cacheType
          ? {
              ...cache,
              status: "fresh" as const,
              lastUpdated: "Just now",
              entries: Math.floor(cache.entries * 0.1),
              size: `${(Number.parseFloat(cache.size) * 0.1).toFixed(1)} MB`,
            }
          : cache,
      ),
    )

    setIsClearing(null)
  }

  const clearAllCaches = async () => {
    for (const cache of cacheStatuses) {
      await clearCache(cache.type)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fresh":
        return "bg-green-500/20 text-green-400"
      case "stale":
        return "bg-yellow-500/20 text-yellow-400"
      case "expired":
        return "bg-red-500/20 text-red-400"
      case "clearing":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fresh":
        return <CheckCircle className="h-4 w-4" />
      case "stale":
        return <AlertTriangle className="h-4 w-4" />
      case "expired":
        return <AlertTriangle className="h-4 w-4" />
      case "clearing":
        return <RefreshCw className="h-4 w-4 animate-spin" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Cache Management</h2>
          <p className="text-gray-400">Monitor and manage different cache layers</p>
        </div>
        <Button
          onClick={clearAllCaches}
          disabled={isClearing !== null}
          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All Caches
        </Button>
      </div>

      {/* Cache Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cacheStatuses.map((cache, index) => (
          <motion.div
            key={cache.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    {cache.type === "Browser Cache" && <HardDrive className="h-5 w-5 text-cyan-400" />}
                    {cache.type === "Service Worker" && <Settings className="h-5 w-5 text-cyan-400" />}
                    {cache.type === "CDN Cache" && <CloudLightning className="h-5 w-5 text-cyan-400" />}
                    {cache.type === "DNS Cache" && <Globe className="h-5 w-5 text-cyan-400" />}
                    <span className="text-sm">{cache.type}</span>
                  </div>
                  <Badge className={getStatusColor(cache.status)}>
                    {getStatusIcon(cache.status)}
                    <span className="ml-1 capitalize">{cache.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-gray-300">{cache.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size:</span>
                    <span className="text-gray-300">{cache.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entries:</span>
                    <span className="text-gray-300">{cache.entries.toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  onClick={() => clearCache(cache.type)}
                  disabled={isClearing === cache.type}
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  {isClearing === cache.type ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cache
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Cache Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-cyan-400" />
              Browser Cache Instructions
            </CardTitle>
            <CardDescription>Manual steps to clear browser cache</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-400">Chrome/Edge</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>1. Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)</li>
                <li>2. Select "All time" from time range</li>
                <li>3. Check "Cached images and files"</li>
                <li>4. Click "Clear data"</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-400">Firefox</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>1. Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)</li>
                <li>2. Select "Everything" from time range</li>
                <li>3. Check "Cache"</li>
                <li>4. Click "Clear Now"</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudLightning className="h-5 w-5 text-cyan-400" />
              CDN Cache Instructions
            </CardTitle>
            <CardDescription>Steps to purge CDN cache</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-400">Vercel Dashboard</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>1. Go to Vercel dashboard</li>
                <li>2. Select your project</li>
                <li>3. Go to "Functions" tab</li>
                <li>4. Click "Purge Cache"</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-400">Automatic Invalidation</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• CDN cache typically updates within 5-10 minutes</li>
                <li>• New deployments automatically invalidate cache</li>
                <li>• Check cache headers in browser dev tools</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cache Troubleshooting */}
      <Alert className="border-yellow-500/20 bg-yellow-500/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Cache Troubleshooting Tips</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>
            <strong>If pages still show old content after clearing cache:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Try incognito/private browsing mode</li>
            <li>Check if service worker is caching content</li>
            <li>Verify deployment completed successfully</li>
            <li>Test from different network/device</li>
            <li>Check for proxy or firewall caching</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
