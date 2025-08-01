"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeploymentDiagnostics from "@/troubleshooting/deployment-diagnostics"
import CacheManagement from "@/troubleshooting/cache-management"
import NetworkDiagnostics from "@/troubleshooting/network-diagnostics"
import TroubleshootingGuide from "@/troubleshooting/troubleshooting-guide"

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Deployment Troubleshooting Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive diagnostics and solutions for deployment visibility issues, caching problems, and network
            connectivity
          </p>
        </motion.div>

        <Tabs defaultValue="diagnostics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="cache">Cache Management</TabsTrigger>
            <TabsTrigger value="network">Network Tests</TabsTrigger>
            <TabsTrigger value="guide">Troubleshooting Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="diagnostics">
            <DeploymentDiagnostics />
          </TabsContent>

          <TabsContent value="cache">
            <CacheManagement />
          </TabsContent>

          <TabsContent value="network">
            <NetworkDiagnostics />
          </TabsContent>

          <TabsContent value="guide">
            <TroubleshootingGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
