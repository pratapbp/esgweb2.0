"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Brain,
  Shield,
  Zap,
  History,
  Play,
  Pause,
  Copy,
  Check,
  AlertTriangle,
  Info,
  Sparkles,
  Bot,
  Lock,
  Activity,
  FileText,
  HelpCircle,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

interface Command {
  id: string
  command: string
  description: string
  category: string
  aiGenerated: boolean
  blockchainHash?: string
  executionTime?: number
  status: "pending" | "running" | "completed" | "failed"
  timestamp: Date
  output?: string
  confidence?: number
}

interface AIInsight {
  type: "suggestion" | "warning" | "optimization" | "error"
  message: string
  confidence: number
  action?: string
}

interface BlockchainRecord {
  hash: string
  timestamp: Date
  command: string
  verified: boolean
  smartContract?: string
}

interface RPATask {
  id: string
  name: string
  status: "idle" | "running" | "completed" | "failed"
  progress: number
  description: string
  automation: boolean
}

export default function ESGCommandLauncher() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [aiSuggestions, setSuggestions] = useState<string[]>([])
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>([])
  const [rpaTasks, setRPATasks] = useState<RPATask[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionProgress, setExecutionProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("launcher")
  const [showHelp, setShowHelp] = useState(false)
  const [securityLevel, setSecurityLevel] = useState<"low" | "medium" | "high">("high")
  const [copied, setCopied] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Sample command categories and templates
  const commandCategories = [
    { name: "ESG Analytics", icon: Activity, color: "text-green-500" },
    { name: "Data Processing", icon: Brain, color: "text-blue-500" },
    { name: "Blockchain Ops", icon: Shield, color: "text-purple-500" },
    { name: "RPA Automation", icon: Zap, color: "text-orange-500" },
    { name: "Reporting", icon: FileText, color: "text-indigo-500" },
  ]

  const sampleCommands = [
    "generate-esg-report --type=sustainability --format=pdf",
    "analyze-carbon-footprint --scope=all --period=quarterly",
    "blockchain-verify --data=lca-postings --contract=smart-audit",
    "rpa-automate --workflow=data-extraction --source=external-apis",
    "ai-predict --model=environmental-impact --horizon=12months",
    "compliance-check --standard=iso14001 --audit=true",
    "stakeholder-report --recipients=board --schedule=monthly",
  ]

  // Initialize sample data
  useEffect(() => {
    const initializeData = () => {
      // Initialize command history
      const sampleHistory: Command[] = [
        {
          id: "1",
          command: "generate-esg-report --type=sustainability",
          description: "Generated comprehensive sustainability report",
          category: "ESG Analytics",
          aiGenerated: true,
          blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
          executionTime: 2.3,
          status: "completed",
          timestamp: new Date(Date.now() - 3600000),
          output: "Report generated successfully. 45 pages, 12 charts, 8 recommendations.",
          confidence: 0.95,
        },
        {
          id: "2",
          command: "blockchain-verify --data=lca-postings",
          description: "Verified LCA posting data integrity",
          category: "Blockchain Ops",
          aiGenerated: false,
          blockchainHash: "0x9876543210fedcba0987654321",
          executionTime: 1.8,
          status: "completed",
          timestamp: new Date(Date.now() - 7200000),
          output: "All 127 LCA postings verified. No anomalies detected.",
          confidence: 0.99,
        },
      ]
      setCommandHistory(sampleHistory)

      // Initialize blockchain records
      const sampleBlockchain: BlockchainRecord[] = [
        {
          hash: "0x1a2b3c4d5e6f7890abcdef1234567890",
          timestamp: new Date(Date.now() - 3600000),
          command: "generate-esg-report --type=sustainability",
          verified: true,
          smartContract: "ESGReportContract_v2.1",
        },
        {
          hash: "0x9876543210fedcba0987654321",
          timestamp: new Date(Date.now() - 7200000),
          command: "blockchain-verify --data=lca-postings",
          verified: true,
          smartContract: "DataVerificationContract_v1.5",
        },
      ]
      setBlockchainRecords(sampleBlockchain)

      // Initialize RPA tasks
      const sampleRPA: RPATask[] = [
        {
          id: "rpa-1",
          name: "Data Extraction Bot",
          status: "running",
          progress: 67,
          description: "Extracting ESG data from external APIs",
          automation: true,
        },
        {
          id: "rpa-2",
          name: "Report Distribution Bot",
          status: "completed",
          progress: 100,
          description: "Distributed monthly reports to stakeholders",
          automation: true,
        },
        {
          id: "rpa-3",
          name: "Compliance Monitoring Bot",
          status: "idle",
          progress: 0,
          description: "Monitoring regulatory compliance updates",
          automation: false,
        },
      ]
      setRPATasks(sampleRPA)
    }

    initializeData()
  }, [])

  // AI-powered command suggestions
  useEffect(() => {
    if (currentCommand.length > 2) {
      const generateSuggestions = () => {
        const filtered = sampleCommands.filter((cmd) => cmd.toLowerCase().includes(currentCommand.toLowerCase()))

        // AI-enhanced suggestions based on context
        const aiEnhanced = [
          ...filtered,
          `ai-optimize "${currentCommand}" --context=esg-operations`,
          `blockchain-log "${currentCommand}" --verify=true`,
          `rpa-schedule "${currentCommand}" --frequency=daily`,
        ].slice(0, 5)

        setSuggestions(aiEnhanced)

        // Generate AI insights
        const insights: AIInsight[] = [
          {
            type: "suggestion",
            message: `Consider adding --blockchain-verify flag for enhanced security`,
            confidence: 0.87,
            action: "add-flag",
          },
          {
            type: "optimization",
            message: `This command can be automated using RPA for better efficiency`,
            confidence: 0.92,
            action: "automate",
          },
        ]
        setAIInsights(insights)
      }

      const debounceTimer = setTimeout(generateSuggestions, 300)
      return () => clearTimeout(debounceTimer)
    } else {
      setSuggestions([])
      setAIInsights([])
    }
  }, [currentCommand])

  const executeCommand = async () => {
    if (!currentCommand.trim()) return

    setIsExecuting(true)
    setExecutionProgress(0)

    // Create new command record
    const newCommand: Command = {
      id: Date.now().toString(),
      command: currentCommand,
      description: `Executing: ${currentCommand}`,
      category: detectCategory(currentCommand),
      aiGenerated: false,
      status: "running",
      timestamp: new Date(),
    }

    setCommandHistory((prev) => [newCommand, ...prev])

    // Simulate command execution with progress
    const progressInterval = setInterval(() => {
      setExecutionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate blockchain hash
      const blockchainHash = generateBlockchainHash(currentCommand)

      // Create blockchain record
      const blockchainRecord: BlockchainRecord = {
        hash: blockchainHash,
        timestamp: new Date(),
        command: currentCommand,
        verified: true,
        smartContract: `ESGContract_${Math.random().toString(36).substr(2, 9)}`,
      }
      setBlockchainRecords((prev) => [blockchainRecord, ...prev])

      // Update command with results
      const completedCommand: Command = {
        ...newCommand,
        status: "completed",
        blockchainHash,
        executionTime: 2.1,
        output: generateCommandOutput(currentCommand),
        confidence: 0.94,
      }

      setCommandHistory((prev) => prev.map((cmd) => (cmd.id === newCommand.id ? completedCommand : cmd)))

      toast({
        title: "Command Executed Successfully",
        description: `${currentCommand} completed with blockchain verification`,
      })

      setCurrentCommand("")
    } catch (error) {
      // Handle execution error
      const failedCommand: Command = {
        ...newCommand,
        status: "failed",
        output: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      }

      setCommandHistory((prev) => prev.map((cmd) => (cmd.id === newCommand.id ? failedCommand : cmd)))

      toast({
        title: "Command Failed",
        description: "Please check the command syntax and try again",
        variant: "destructive",
      })
    } finally {
      setIsExecuting(false)
      setExecutionProgress(0)
    }
  }

  const detectCategory = (command: string): string => {
    if (command.includes("esg") || command.includes("sustainability")) return "ESG Analytics"
    if (command.includes("blockchain")) return "Blockchain Ops"
    if (command.includes("rpa") || command.includes("automate")) return "RPA Automation"
    if (command.includes("report") || command.includes("generate")) return "Reporting"
    return "Data Processing"
  }

  const generateBlockchainHash = (command: string): string => {
    return `0x${Math.random().toString(16).substr(2, 32)}`
  }

  const generateCommandOutput = (command: string): string => {
    const outputs = [
      "Operation completed successfully. All data verified and logged.",
      "Analysis complete. Generated 15 insights and 8 recommendations.",
      "Report generated with 95% accuracy. Blockchain hash recorded.",
      "Automation workflow deployed. Expected efficiency gain: 40%.",
      "Data extraction completed. 1,247 records processed and validated.",
    ]
    return outputs[Math.floor(Math.random() * outputs.length)]
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      executeCommand()
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (aiSuggestions.length > 0) {
        setCurrentCommand(aiSuggestions[0])
      }
    }
  }

  return (
    <>
      {/* Floating Command Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 group"
            >
              <Terminal className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Launcher Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className={`fixed ${isMaximized ? "inset-4" : "bottom-6 right-6 w-[800px] h-[600px]"} z-50 bg-gray-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Terminal className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">ESG Command Launcher</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">AI Enhanced • Blockchain Secured</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                  Security: {securityLevel.toUpperCase()}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHelp(!showHelp)}
                  className="text-gray-400 hover:text-purple-300"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-gray-400 hover:text-purple-300"
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border-b border-purple-500/20">
                  <TabsTrigger value="launcher" className="data-[state=active]:bg-purple-600/20">
                    <Terminal className="h-4 w-4 mr-2" />
                    Launcher
                  </TabsTrigger>
                  <TabsTrigger value="ai-insights" className="data-[state=active]:bg-blue-600/20">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Insights
                  </TabsTrigger>
                  <TabsTrigger value="blockchain" className="data-[state=active]:bg-purple-600/20">
                    <Shield className="h-4 w-4 mr-2" />
                    Blockchain
                  </TabsTrigger>
                  <TabsTrigger value="rpa" className="data-[state=active]:bg-orange-600/20">
                    <Zap className="h-4 w-4 mr-2" />
                    RPA Tasks
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-indigo-600/20">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>

                {/* Command Launcher Tab */}
                <TabsContent value="launcher" className="flex-1 p-4 space-y-4">
                  {/* Command Input */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          ref={inputRef}
                          value={currentCommand}
                          onChange={(e) => setCurrentCommand(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Enter ESG command... (Tab for AI suggestions)"
                          className="bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 pr-12"
                          disabled={isExecuting}
                        />
                        {isExecuting && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={executeCommand}
                        disabled={!currentCommand.trim() || isExecuting}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        {isExecuting ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>

                    {/* Execution Progress */}
                    {isExecuting && (
                      <div className="space-y-2">
                        <Progress value={executionProgress} className="h-2" />
                        <p className="text-xs text-gray-400">Executing command... {Math.round(executionProgress)}%</p>
                      </div>
                    )}
                  </div>

                  {/* AI Suggestions */}
                  {aiSuggestions.length > 0 && (
                    <Card className="bg-gray-800/50 border-blue-500/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-blue-300 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2" />
                          AI Suggestions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => setCurrentCommand(suggestion)}
                            className="p-2 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                          >
                            <code className="text-sm text-blue-300">{suggestion}</code>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Command Categories */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commandCategories.map((category) => (
                      <Card
                        key={category.name}
                        className="bg-gray-800/30 border-gray-700/50 hover:border-purple-500/30 transition-colors cursor-pointer"
                      >
                        <CardContent className="p-3 flex items-center space-x-3">
                          <category.icon className={`h-5 w-5 ${category.color}`} />
                          <span className="text-sm text-white">{category.name}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* AI Insights Tab */}
                <TabsContent value="ai-insights" className="flex-1 p-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">AI-Powered Insights</h3>
                        <Badge className="bg-blue-600/20 text-blue-300">{aiInsights.length} Active Insights</Badge>
                      </div>

                      {aiInsights.map((insight, index) => (
                        <Card key={index} className="bg-gray-800/50 border-blue-500/20">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`p-2 rounded-full ${
                                  insight.type === "suggestion"
                                    ? "bg-blue-600/20"
                                    : insight.type === "warning"
                                      ? "bg-yellow-600/20"
                                      : insight.type === "optimization"
                                        ? "bg-green-600/20"
                                        : "bg-red-600/20"
                                }`}
                              >
                                {insight.type === "suggestion" && <Info className="h-4 w-4 text-blue-400" />}
                                {insight.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-400" />}
                                {insight.type === "optimization" && <Sparkles className="h-4 w-4 text-green-400" />}
                                {insight.type === "error" && <AlertTriangle className="h-4 w-4 text-red-400" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-white text-sm">{insight.message}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    Confidence: {Math.round(insight.confidence * 100)}%
                                  </Badge>
                                  {insight.action && (
                                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                      {insight.action.replace("-", " ").toUpperCase()}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {aiInsights.length === 0 && (
                        <div className="text-center py-8">
                          <Bot className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">
                            No AI insights available. Start typing a command to get suggestions.
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Blockchain Tab */}
                <TabsContent value="blockchain" className="flex-1 p-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Blockchain Records</h3>
                        <Badge className="bg-purple-600/20 text-purple-300">
                          {blockchainRecords.length} Verified Records
                        </Badge>
                      </div>

                      {blockchainRecords.map((record, index) => (
                        <Card key={index} className="bg-gray-800/50 border-purple-500/20">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Shield className="h-4 w-4 text-purple-400" />
                                  <span className="text-sm font-medium text-white">Blockchain Hash</span>
                                  {record.verified && (
                                    <Badge className="bg-green-600/20 text-green-300 text-xs">Verified</Badge>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(record.hash, `hash-${index}`)}
                                  className="text-gray-400 hover:text-purple-300"
                                >
                                  {copied === `hash-${index}` ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>

                              <code className="block text-xs text-purple-300 bg-gray-900/50 p-2 rounded">
                                {record.hash}
                              </code>

                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Command:</span>
                                  <code className="text-blue-300">{record.command}</code>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Timestamp:</span>
                                  <span className="text-white">{record.timestamp.toLocaleString()}</span>
                                </div>
                                {record.smartContract && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Smart Contract:</span>
                                    <span className="text-green-300">{record.smartContract}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* RPA Tasks Tab */}
                <TabsContent value="rpa" className="flex-1 p-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">RPA Automation Tasks</h3>
                        <Badge className="bg-orange-600/20 text-orange-300">
                          {rpaTasks.filter((task) => task.status === "running").length} Active
                        </Badge>
                      </div>

                      {rpaTasks.map((task) => (
                        <Card key={task.id} className="bg-gray-800/50 border-orange-500/20">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Zap className="h-4 w-4 text-orange-400" />
                                  <span className="font-medium text-white">{task.name}</span>
                                </div>
                                <Badge
                                  className={`text-xs ${
                                    task.status === "running"
                                      ? "bg-orange-600/20 text-orange-300"
                                      : task.status === "completed"
                                        ? "bg-green-600/20 text-green-300"
                                        : task.status === "failed"
                                          ? "bg-red-600/20 text-red-300"
                                          : "bg-gray-600/20 text-gray-300"
                                  }`}
                                >
                                  {task.status.toUpperCase()}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-400">{task.description}</p>

                              {task.status === "running" && (
                                <div className="space-y-2">
                                  <Progress value={task.progress} className="h-2" />
                                  <p className="text-xs text-gray-400">Progress: {task.progress}%</p>
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-400">Automation:</span>
                                  <Badge variant={task.automation ? "default" : "outline"} className="text-xs">
                                    {task.automation ? "Enabled" : "Manual"}
                                  </Badge>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                    {task.status === "running" ? "Pause" : "Start"}
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                    Configure
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Command History Tab */}
                <TabsContent value="history" className="flex-1 p-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Command History</h3>
                        <Badge className="bg-indigo-600/20 text-indigo-300">{commandHistory.length} Commands</Badge>
                      </div>

                      {commandHistory.map((cmd) => (
                        <Card key={cmd.id} className="bg-gray-800/50 border-indigo-500/20">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <code className="text-sm text-indigo-300">{cmd.command}</code>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={`text-xs ${
                                      cmd.status === "completed"
                                        ? "bg-green-600/20 text-green-300"
                                        : cmd.status === "running"
                                          ? "bg-orange-600/20 text-orange-300"
                                          : cmd.status === "failed"
                                            ? "bg-red-600/20 text-red-300"
                                            : "bg-gray-600/20 text-gray-300"
                                    }`}
                                  >
                                    {cmd.status.toUpperCase()}
                                  </Badge>
                                  {cmd.aiGenerated && (
                                    <Badge className="bg-blue-600/20 text-blue-300 text-xs">AI Generated</Badge>
                                  )}
                                </div>
                              </div>

                              <p className="text-sm text-gray-400">{cmd.description}</p>

                              {cmd.output && (
                                <div className="bg-gray-900/50 p-2 rounded text-xs text-green-300">{cmd.output}</div>
                              )}

                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{cmd.timestamp.toLocaleString()}</span>
                                <div className="flex items-center space-x-4">
                                  {cmd.executionTime && <span>Execution: {cmd.executionTime}s</span>}
                                  {cmd.confidence && <span>Confidence: {Math.round(cmd.confidence * 100)}%</span>}
                                  {cmd.blockchainHash && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyToClipboard(cmd.blockchainHash!, `cmd-${cmd.id}`)}
                                      className="text-purple-400 hover:text-purple-300 p-1"
                                    >
                                      <Shield className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            {/* Help Panel */}
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="absolute right-0 top-0 w-80 h-full bg-gray-800/95 backdrop-blur-xl border-l border-purple-500/20 p-4 overflow-y-auto"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Help & Documentation</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowHelp(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator className="border-purple-500/20" />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-purple-300">Quick Commands</h4>
                    <div className="space-y-2 text-xs">
                      {sampleCommands.slice(0, 5).map((cmd, index) => (
                        <div key={index} className="bg-gray-900/50 p-2 rounded">
                          <code className="text-blue-300">{cmd}</code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-purple-300">Keyboard Shortcuts</h4>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex justify-between">
                        <span>Execute Command</span>
                        <kbd className="bg-gray-700 px-2 py-1 rounded">Enter</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Suggestion</span>
                        <kbd className="bg-gray-700 px-2 py-1 rounded">Tab</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Clear Input</span>
                        <kbd className="bg-gray-700 px-2 py-1 rounded">Esc</kbd>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-purple-300">Security Features</h4>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-3 w-3 text-green-400" />
                        <span>End-to-end encryption</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-3 w-3 text-purple-400" />
                        <span>Blockchain verification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-3 w-3 text-blue-400" />
                        <span>Real-time monitoring</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
