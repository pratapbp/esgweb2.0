"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Book,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Copy,
  Terminal,
  Globe,
  RefreshCw,
  Settings,
  Bug,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface TroubleshootingStep {
  id: string
  title: string
  description: string
  commands?: string[]
  links?: { text: string; url: string }[]
  severity: "low" | "medium" | "high"
}

interface CommonIssue {
  id: string
  title: string
  description: string
  symptoms: string[]
  solutions: TroubleshootingStep[]
  category: string
}

export default function TroubleshootingGuide() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null)

  const commonIssues: CommonIssue[] = [
    {
      id: "cache-issues",
      title: "Pages Not Updating (Cache Issues)",
      description: "Updated content is not visible due to caching at various levels",
      category: "Cache",
      symptoms: [
        "Old content still visible after deployment",
        "Changes not reflected in browser",
        "Inconsistent content across different devices",
        "API responses showing stale data",
      ],
      solutions: [
        {
          id: "browser-cache",
          title: "Clear Browser Cache",
          description: "Remove cached files from browser storage",
          commands: ["# Chrome/Edge: Ctrl+Shift+Delete", "# Firefox: Ctrl+Shift+Delete", "# Safari: Cmd+Option+E"],
          severity: "low",
        },
        {
          id: "hard-refresh",
          title: "Perform Hard Refresh",
          description: "Force browser to reload all resources",
          commands: ["# Windows: Ctrl+Shift+R", "# Mac: Cmd+Shift+R", "# Alternative: Ctrl+F5"],
          severity: "low",
        },
        {
          id: "cdn-purge",
          title: "Purge CDN Cache",
          description: "Clear cache at CDN level",
          commands: ["vercel --purge", "# Or use Vercel dashboard"],
          links: [{ text: "Vercel Dashboard", url: "https://vercel.com/dashboard" }],
          severity: "medium",
        },
      ],
    },
    {
      id: "deployment-issues",
      title: "Deployment Failures",
      description: "Build or deployment process failing",
      category: "Deployment",
      symptoms: [
        "Build process fails with errors",
        "Deployment stuck in pending state",
        "TypeScript compilation errors",
        "Missing environment variables",
      ],
      solutions: [
        {
          id: "check-logs",
          title: "Check Build Logs",
          description: "Review deployment logs for specific errors",
          commands: ["vercel logs", "# Or check Vercel dashboard logs"],
          severity: "high",
        },
        {
          id: "fix-typescript",
          title: "Fix TypeScript Errors",
          description: "Resolve TypeScript compilation issues",
          commands: ["npm run type-check", "npx tsc --noEmit", "npm run build"],
          severity: "high",
        },
        {
          id: "env-variables",
          title: "Verify Environment Variables",
          description: "Ensure all required environment variables are set",
          commands: ["vercel env ls", "vercel env add [NAME]"],
          severity: "medium",
        },
      ],
    },
    {
      id: "routing-issues",
      title: "Page Not Found (404 Errors)",
      description: "Routes not working correctly or returning 404 errors",
      category: "Routing",
      symptoms: [
        "404 errors on valid pages",
        "Dynamic routes not working",
        "Nested routes failing",
        "API routes returning 404",
      ],
      solutions: [
        {
          id: "check-file-structure",
          title: "Verify File Structure",
          description: "Ensure files follow Next.js App Router conventions",
          commands: [
            "# Check app directory structure",
            "ls -la app/",
            "# Verify page.tsx files exist",
            "find app -name 'page.tsx'",
          ],
          severity: "high",
        },
        {
          id: "dynamic-routes",
          title: "Fix Dynamic Routes",
          description: "Ensure dynamic route files are properly named",
          commands: [
            "# Dynamic routes should use [param] syntax",
            "# Example: app/blog/[slug]/page.tsx",
            "# Check for proper export",
          ],
          severity: "medium",
        },
      ],
    },
    {
      id: "performance-issues",
      title: "Slow Loading Performance",
      description: "Pages loading slowly or timing out",
      category: "Performance",
      symptoms: ["Long page load times", "Large bundle sizes", "Slow API responses", "Poor Core Web Vitals scores"],
      solutions: [
        {
          id: "bundle-analysis",
          title: "Analyze Bundle Size",
          description: "Identify large dependencies and optimize",
          commands: ["npm run build", "npx @next/bundle-analyzer"],
          severity: "medium",
        },
        {
          id: "optimize-images",
          title: "Optimize Images",
          description: "Use Next.js Image component and optimize assets",
          commands: ["# Use next/image component", "# Implement proper image formats"],
          severity: "low",
        },
        {
          id: "code-splitting",
          title: "Implement Code Splitting",
          description: "Use dynamic imports for better performance",
          commands: ["# Use dynamic imports", "const Component = dynamic(() => import('./Component'))"],
          severity: "medium",
        },
      ],
    },
    {
      id: "network-issues",
      title: "Network Connectivity Problems",
      description: "Issues with network connectivity or DNS resolution",
      category: "Network",
      symptoms: [
        "Cannot reach website",
        "DNS resolution failures",
        "SSL certificate errors",
        "Intermittent connectivity",
      ],
      solutions: [
        {
          id: "dns-flush",
          title: "Flush DNS Cache",
          description: "Clear local DNS cache",
          commands: [
            "# Windows",
            "ipconfig /flushdns",
            "# Mac",
            "sudo dscacheutil -flushcache",
            "# Linux",
            "sudo systemctl restart systemd-resolved",
          ],
          severity: "low",
        },
        {
          id: "check-dns",
          title: "Check DNS Resolution",
          description: "Verify DNS is resolving correctly",
          commands: ["nslookup esgit.vercel.app", "dig esgit.vercel.app", "ping esgit.vercel.app"],
          severity: "medium",
        },
      ],
    },
  ]

  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(command)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error("Failed to copy command:", err)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <HelpCircle className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Bug className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Troubleshooting Guide</h2>
        <p className="text-xl text-gray-300">Comprehensive solutions for common deployment and visibility issues</p>
      </div>

      <Tabs defaultValue="issues" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="issues">Common Issues</TabsTrigger>
          <TabsTrigger value="commands">Quick Commands</TabsTrigger>
          <TabsTrigger value="escalation">Escalation</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-6">
          <div className="space-y-4">
            {commonIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Collapsible
                  open={expandedIssue === issue.id}
                  onOpenChange={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                >
                  <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bug className="h-5 w-5 text-cyan-400" />
                            <span>{issue.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {issue.category}
                            </Badge>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedIssue === issue.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </motion.div>
                        </CardTitle>
                        <CardDescription>{issue.description}</CardDescription>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="space-y-6">
                        {/* Symptoms */}
                        <div>
                          <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Symptoms
                          </h4>
                          <ul className="space-y-1">
                            {issue.symptoms.map((symptom, idx) => (
                              <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                                <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Solutions */}
                        <div>
                          <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Solutions
                          </h4>
                          <div className="space-y-4">
                            {issue.solutions.map((solution, idx) => (
                              <Card key={solution.id} className="bg-gray-800 border-gray-600">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-white">{solution.title}</h5>
                                    <Badge className={getSeverityColor(solution.severity)}>
                                      {getSeverityIcon(solution.severity)}
                                      <span className="ml-1 capitalize">{solution.severity}</span>
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-400 mb-3">{solution.description}</p>

                                  {solution.commands && (
                                    <div className="space-y-2">
                                      <h6 className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                                        Commands
                                      </h6>
                                      {solution.commands.map((command, cmdIdx) => (
                                        <div
                                          key={cmdIdx}
                                          className="bg-gray-900 p-3 rounded font-mono text-sm flex items-center justify-between group"
                                        >
                                          <span className="text-green-400">{command}</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyCommand(command)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            {copiedCommand === command ? (
                                              <CheckCircle className="h-4 w-4 text-green-400" />
                                            ) : (
                                              <Copy className="h-4 w-4" />
                                            )}
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {solution.links && (
                                    <div className="space-y-2 mt-3">
                                      <h6 className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                                        Helpful Links
                                      </h6>
                                      {solution.links.map((link, linkIdx) => (
                                        <a
                                          key={linkIdx}
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                          {link.text}
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="commands" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Browser Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-400" />
                  Browser Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Ctrl+Shift+R - Hard refresh",
                  "Ctrl+Shift+Delete - Clear cache",
                  "F12 - Open DevTools",
                  "Ctrl+Shift+I - Open DevTools",
                  "Ctrl+U - View page source",
                ].map((command, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 p-3 rounded font-mono text-sm flex items-center justify-between group"
                  >
                    <span className="text-green-400">{command}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCommand(command)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedCommand === command ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-cyan-400" />
                  System Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "ipconfig /flushdns - Flush DNS (Windows)",
                  "sudo dscacheutil -flushcache - Flush DNS (Mac)",
                  "nslookup esgit.vercel.app - Check DNS",
                  "ping esgit.vercel.app - Test connectivity",
                  "curl -I https://esgit.vercel.app - Check headers",
                ].map((command, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 p-3 rounded font-mono text-sm flex items-center justify-between group"
                  >
                    <span className="text-green-400">{command}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCommand(command)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedCommand === command ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Vercel Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  Vercel Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "vercel --prod - Deploy to production",
                  "vercel logs - View deployment logs",
                  "vercel env ls - List environment variables",
                  "vercel domains ls - List domains",
                  "vercel --help - Show help",
                ].map((command, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 p-3 rounded font-mono text-sm flex items-center justify-between group"
                  >
                    <span className="text-green-400">{command}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCommand(command)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedCommand === command ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Development Commands */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-cyan-400" />
                  Development Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "npm run build - Build project",
                  "npm run dev - Start development server",
                  "npm run type-check - Check TypeScript",
                  "npm run lint - Run linter",
                  "npm install - Install dependencies",
                ].map((command, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 p-3 rounded font-mono text-sm flex items-center justify-between group"
                  >
                    <span className="text-green-400">{command}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCommand(command)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedCommand === command ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="escalation" className="space-y-6">
          <Alert className="border-yellow-500/20 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>When to Escalate</AlertTitle>
            <AlertDescription className="mt-2">
              If the above solutions don't resolve your issue, it may be time to escalate to support channels.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vercel Support */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-cyan-400" />
                  Vercel Support
                </CardTitle>
                <CardDescription>Official Vercel support channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <a
                    href="https://vercel.com/help"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Vercel Help Center</h4>
                        <p className="text-sm text-gray-400">Documentation and guides</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-cyan-400" />
                    </div>
                  </a>
                  <a
                    href="https://github.com/vercel/vercel/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">GitHub Discussions</h4>
                        <p className="text-sm text-gray-400">Community support</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-cyan-400" />
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Next.js Support */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-cyan-400" />
                  Next.js Resources
                </CardTitle>
                <CardDescription>Next.js documentation and community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Next.js Documentation</h4>
                        <p className="text-sm text-gray-400">Official documentation</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-cyan-400" />
                    </div>
                  </a>
                  <a
                    href="https://github.com/vercel/next.js/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Next.js Discussions</h4>
                        <p className="text-sm text-gray-400">Community help</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-cyan-400" />
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Escalation Checklist */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-cyan-400" />
                Pre-Escalation Checklist
              </CardTitle>
              <CardDescription>Information to gather before contacting support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-yellow-400">Technical Information</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Deployment URL and commit hash
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Error messages and stack traces
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Browser and version information
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Network and device information
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-yellow-400">Troubleshooting Steps</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Steps already attempted
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      When the issue first occurred
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Frequency and reproducibility
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Impact on users and business
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
