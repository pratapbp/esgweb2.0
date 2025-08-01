"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, RefreshCw, TrendingUp, Shield, FileText, Clock } from "lucide-react"

interface ComplianceAlert {
  id: string
  type: string
  severity: "low" | "medium" | "high"
  message: string
  lca_id?: string
  recommendation?: string
}

interface ComplianceCopilotProps {
  alerts: ComplianceAlert[]
  onRefresh: () => void
}

export default function ComplianceCopilot({ alerts, onRefresh }: ComplianceCopilotProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onRefresh()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const complianceScore = Math.max(0, 100 - alerts.length * 10)
  const highAlerts = alerts.filter((a) => a.severity === "high").length
  const mediumAlerts = alerts.filter((a) => a.severity === "medium").length
  const lowAlerts = alerts.filter((a) => a.severity === "low").length

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Compliance Score</p>
                <p className="text-2xl font-bold text-white">{complianceScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-cyan-400" />
            </div>
            <Progress value={complianceScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-red-400">{highAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Medium Priority</p>
                <p className="text-2xl font-bold text-yellow-400">{mediumAlerts}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Low Priority</p>
                <p className="text-2xl font-bold text-blue-400">{lowAlerts}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-gray-900/50 border-gray-800">
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              Active Alerts ({alerts.length})
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              Compliance Trends
            </TabsTrigger>
          </TabsList>

          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <TabsContent value="alerts" className="space-y-4">
          {alerts.length === 0 ? (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">All Clear!</h3>
                <p className="text-gray-400">No compliance issues detected at this time.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Card key={alert.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-medium">{alert.message}</h4>
                          <p className="text-gray-400 text-sm mt-1">Type: {alert.type}</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                    </div>

                    {alert.recommendation && (
                      <Alert className="bg-cyan-500/10 border-cyan-500/30 mt-3">
                        <AlertDescription className="text-gray-300">
                          <strong className="text-cyan-400">Recommendation:</strong> {alert.recommendation}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white border-0">
                        Auto-Fix
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI-Powered Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <h4 className="text-white font-medium mb-2">Wage Compliance Optimization</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Consider updating wage ranges to align with current prevailing wage determinations.
                  </p>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                    Apply Suggestion
                  </Button>
                </div>

                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <h4 className="text-white font-medium mb-2">Documentation Enhancement</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Add supporting documentation links to improve transparency and compliance.
                  </p>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                    Apply Suggestion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Compliance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <span className="text-gray-300">Overall Compliance</span>
                  <span className="text-emerald-400 font-medium">↗ +5% this month</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-cyan-400 font-medium">↗ 15% faster</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <span className="text-gray-300">Documentation Quality</span>
                  <span className="text-emerald-400 font-medium">↗ +12% improvement</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
