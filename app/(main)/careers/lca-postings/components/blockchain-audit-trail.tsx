"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Hash, Shield, Clock, FileText, ExternalLink, RefreshCw } from "lucide-react"

interface BlockchainTransaction {
  id: string
  hash: string
  resource_type: string
  resource_id: string
  action: string
  user_id: string
  user_name: string
  timestamp: string
  block_number?: number
  gas_used?: number
  status: "confirmed" | "pending" | "failed"
}

interface BlockchainAuditTrailProps {
  resourceType: string
}

export default function BlockchainAuditTrail({ resourceType }: BlockchainAuditTrailProps) {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<BlockchainTransaction | null>(null)

  useEffect(() => {
    fetchAuditTrail()
  }, [resourceType])

  const fetchAuditTrail = async () => {
    setLoading(true)
    try {
      // Mock data - in real app would fetch from /api/lca/audit
      const mockTransactions: BlockchainTransaction[] = [
        {
          id: "1",
          hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
          resource_type: "LCA",
          resource_id: "lca-001",
          action: "CREATE",
          user_id: "admin-001",
          user_name: "HR Admin",
          timestamp: "2024-01-15T10:30:00Z",
          block_number: 18945672,
          gas_used: 21000,
          status: "confirmed",
        },
        {
          id: "2",
          hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
          resource_type: "LCA",
          resource_id: "lca-002",
          action: "UPDATE",
          user_id: "admin-001",
          user_name: "HR Admin",
          timestamp: "2024-01-16T14:22:00Z",
          block_number: 18945891,
          gas_used: 25000,
          status: "confirmed",
        },
        {
          id: "3",
          hash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
          resource_type: "LCA",
          resource_id: "lca-003",
          action: "CREATE",
          user_id: "admin-002",
          user_name: "Compliance Officer",
          timestamp: "2024-01-17T09:15:00Z",
          block_number: 18946123,
          gas_used: 22500,
          status: "pending",
        },
      ]

      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
      setTransactions(mockTransactions)
    } catch (error) {
      console.error("Error fetching audit trail:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{status}</Badge>
    }
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "CREATE":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">CREATE</Badge>
      case "UPDATE":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">UPDATE</Badge>
      case "DELETE":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">DELETE</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{action}</Badge>
    }
  }

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-800 rounded mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-800/50 rounded mb-2"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-cyan-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Blockchain Audit Trail</h3>
            <p className="text-gray-400 text-sm">Immutable record of all {resourceType} activities</p>
          </div>
        </div>
        <Button
          onClick={fetchAuditTrail}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Transactions</p>
                <p className="text-2xl font-bold text-white">{transactions.length}</p>
              </div>
              <Hash className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Confirmed</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {transactions.filter((t) => t.status === "confirmed").length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {transactions.filter((t) => t.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Gas Used</p>
                <p className="text-2xl font-bold text-purple-400">
                  {transactions.reduce((sum, t) => sum + (t.gas_used || 0), 0).toLocaleString()}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">Hash</TableHead>
                  <TableHead className="text-gray-300">Action</TableHead>
                  <TableHead className="text-gray-300">Resource</TableHead>
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Timestamp</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-gray-700 hover:bg-gray-800/30">
                    <TableCell className="text-cyan-400 font-mono text-sm">{formatHash(transaction.hash)}</TableCell>
                    <TableCell>{getActionBadge(transaction.action)}</TableCell>
                    <TableCell className="text-gray-300">
                      {transaction.resource_type}-{transaction.resource_id}
                    </TableCell>
                    <TableCell className="text-gray-300">{transaction.user_name}</TableCell>
                    <TableCell className="text-gray-300">{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                            className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">Transaction Details</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Blockchain transaction information
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm text-gray-400">Transaction Hash</label>
                                  <p className="text-cyan-400 font-mono text-sm break-all bg-gray-800/50 p-2 rounded">
                                    {selectedTransaction.hash}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm text-gray-400">Block Number</label>
                                  <p className="text-white font-mono">
                                    {selectedTransaction.block_number?.toLocaleString() || "N/A"}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm text-gray-400">Action</label>
                                  <div>{getActionBadge(selectedTransaction.action)}</div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm text-gray-400">Status</label>
                                  <div>{getStatusBadge(selectedTransaction.status)}</div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm text-gray-400">Gas Used</label>
                                  <p className="text-white">
                                    {selectedTransaction.gas_used?.toLocaleString() || "N/A"}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm text-gray-400">Timestamp</label>
                                  <p className="text-white">
                                    {new Date(selectedTransaction.timestamp).toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4">
                                <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white border-0">
                                  <a
                                    href={`https://etherscan.io/tx/${selectedTransaction.hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View on Etherscan
                                  </a>
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
