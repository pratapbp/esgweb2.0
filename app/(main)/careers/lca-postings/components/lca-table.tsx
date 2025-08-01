"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Eye, Download, ExternalLink, Calendar, MapPin, DollarSign, FileText, Hash } from "lucide-react"

interface LCAPosting {
  id: string
  job_title: string
  location: string
  lca_number: string
  visa_type: "H1B" | "H1B1" | "E3"
  wage_range: string
  file_url?: string
  status: "pending" | "certified" | "expired"
  created_at: string
  created_by: string
  blockchain_hash?: string
}

interface LCATableProps {
  data: LCAPosting[]
  loading: boolean
  showAllColumns?: boolean
}

export default function LCATable({ data, loading, showAllColumns = true }: LCATableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLCA, setSelectedLCA] = useState<LCAPosting | null>(null)

  const filteredData = data.filter(
    (lca) =>
      lca.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lca.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lca.lca_number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "certified":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Certified</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case "expired":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Expired</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{status}</Badge>
    }
  }

  const getVisaTypeBadge = (type: string) => {
    switch (type) {
      case "H1B":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">H-1B</Badge>
      case "H1B1":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">H-1B1</Badge>
      case "E3":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">E-3</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{type}</Badge>
    }
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
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by job title, location, or LCA number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 pl-10 focus:border-cyan-500"
        />
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead className="text-gray-300">Job Title</TableHead>
              <TableHead className="text-gray-300">Location</TableHead>
              <TableHead className="text-gray-300">LCA Number</TableHead>
              <TableHead className="text-gray-300">Visa Type</TableHead>
              <TableHead className="text-gray-300">Wage Range</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              {showAllColumns && <TableHead className="text-gray-300">Posted Date</TableHead>}
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showAllColumns ? 8 : 7} className="text-center text-gray-400 py-8">
                  No LCA postings found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((lca) => (
                <TableRow key={lca.id} className="border-gray-800 hover:bg-gray-800/30">
                  <TableCell className="text-white font-medium">{lca.job_title}</TableCell>
                  <TableCell className="text-gray-300">{lca.location}</TableCell>
                  <TableCell className="text-gray-300 font-mono text-sm">{lca.lca_number}</TableCell>
                  <TableCell>{getVisaTypeBadge(lca.visa_type)}</TableCell>
                  <TableCell className="text-gray-300">{lca.wage_range}</TableCell>
                  <TableCell>{getStatusBadge(lca.status)}</TableCell>
                  {showAllColumns && (
                    <TableCell className="text-gray-300">{new Date(lca.created_at).toLocaleDateString()}</TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLCA(lca)}
                            className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">LCA Details</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Labor Condition Application Information
                            </DialogDescription>
                          </DialogHeader>
                          {selectedLCA && (
                            <div className="space-y-6">
                              <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-4 space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-sm">Job Title</span>
                                      </div>
                                      <p className="text-white font-medium">{selectedLCA.job_title}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">Location</span>
                                      </div>
                                      <p className="text-white">{selectedLCA.location}</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <Hash className="w-4 h-4" />
                                        <span className="text-sm">LCA Number</span>
                                      </div>
                                      <p className="text-white font-mono text-sm">{selectedLCA.lca_number}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <DollarSign className="w-4 h-4" />
                                        <span className="text-sm">Wage Range</span>
                                      </div>
                                      <p className="text-white">{selectedLCA.wage_range}</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">Posted Date</span>
                                      </div>
                                      <p className="text-white">
                                        {new Date(selectedLCA.created_at).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <span className="text-sm">Status</span>
                                      </div>
                                      <div>{getStatusBadge(selectedLCA.status)}</div>
                                    </div>
                                  </div>

                                  {selectedLCA.blockchain_hash && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-400">
                                        <Hash className="w-4 h-4" />
                                        <span className="text-sm">Blockchain Hash</span>
                                      </div>
                                      <p className="text-cyan-400 font-mono text-xs break-all bg-gray-900/50 p-2 rounded">
                                        {selectedLCA.blockchain_hash}
                                      </p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>

                              <div className="flex gap-3">
                                {selectedLCA.file_url && (
                                  <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white border-0">
                                    <a href={selectedLCA.file_url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      View Document
                                    </a>
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Export Details
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {lca.file_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <a href={lca.file_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-400">
        Showing {filteredData.length} of {data.length} LCA postings
      </div>
    </div>
  )
}
