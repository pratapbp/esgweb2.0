"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle, AlertCircle, FileText, Download, Eye, Shield, Clock, Info } from "lucide-react"
import { toast } from "sonner"

interface DocumentPreviewProps {
  formData: any
  onDataChange: (data: any) => void
  validationErrors: Record<string, string[]>
  accessibilityMode: boolean
}

interface UploadedDocument {
  file: File
  id: string
  uploadProgress: number
  isUploading: boolean
  error?: string
}

export function DocumentPreview({ formData, onDataChange, validationErrors, accessibilityMode }: DocumentPreviewProps) {
  const [mainDocument, setMainDocument] = useState<UploadedDocument | null>(null)
  const [supportingDocs, setSupportingDocs] = useState<UploadedDocument[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: any) => {
    onDataChange({
      ...formData,
      [field]: value,
    })
  }

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [".pdf", ".doc", ".docx"]

    if (file.size > maxSize) {
      return `File size exceeds 10MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${allowedTypes.join(", ")}`
    }

    return null
  }

  const simulateUpload = (file: File, isMain = true): Promise<void> => {
    return new Promise((resolve, reject) => {
      const docId = Math.random().toString(36).substring(2)
      const newDoc: UploadedDocument = {
        file,
        id: docId,
        uploadProgress: 0,
        isUploading: true,
      }

      if (isMain) {
        setMainDocument(newDoc)
      } else {
        setSupportingDocs((prev) => [...prev, newDoc])
      }

      const interval = setInterval(() => {
        if (isMain) {
          setMainDocument((prev) => {
            if (!prev) return null
            const newProgress = prev.uploadProgress + 10
            if (newProgress >= 100) {
              clearInterval(interval)
              const finalDoc = { ...prev, uploadProgress: 100, isUploading: false }
              handleInputChange("document_file", file)
              resolve()
              return finalDoc
            }
            return { ...prev, uploadProgress: newProgress }
          })
        } else {
          setSupportingDocs((prev) =>
            prev.map((doc) => {
              if (doc.id === docId) {
                const newProgress = doc.uploadProgress + 10
                if (newProgress >= 100) {
                  clearInterval(interval)
                  const currentSupporting = formData.supporting_documents || []
                  handleInputChange("supporting_documents", [...currentSupporting, file])
                  resolve()
                  return { ...doc, uploadProgress: 100, isUploading: false }
                }
                return { ...doc, uploadProgress: newProgress }
              }
              return doc
            }),
          )
        }
      }, 100)
    })
  }

  const onMainDocDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      setUploadError(null)

      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0]?.message || "File rejected"
        setUploadError(error)
        toast.error(error)
        return
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        const validationError = validateFile(file)

        if (validationError) {
          setUploadError(validationError)
          toast.error(validationError)
          return
        }

        try {
          await simulateUpload(file, true)
          toast.success("LCA document uploaded successfully!")

          if (accessibilityMode) {
            const announcement = document.createElement("div")
            announcement.setAttribute("aria-live", "polite")
            announcement.setAttribute("aria-atomic", "true")
            announcement.className = "sr-only"
            announcement.textContent = `Main LCA document ${file.name} uploaded successfully`
            document.body.appendChild(announcement)
            setTimeout(() => document.body.removeChild(announcement), 1000)
          }
        } catch (error) {
          toast.error("Upload failed. Please try again.")
        }
      }
    },
    [formData, accessibilityMode],
  )

  const onSupportingDocDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0]?.message || "File rejected"
        toast.error(error)
        return
      }

      for (const file of acceptedFiles) {
        const validationError = validateFile(file)
        if (validationError) {
          toast.error(`${file.name}: ${validationError}`)
          continue
        }

        try {
          await simulateUpload(file, false)
          toast.success(`${file.name} uploaded successfully!`)
        } catch (error) {
          toast.error(`Failed to upload ${file.name}`)
        }
      }
    },
    [formData],
  )

  const {
    getRootProps: getMainRootProps,
    getInputProps: getMainInputProps,
    isDragActive: isMainDragActive,
  } = useDropzone({
    onDrop: onMainDocDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled: !!mainDocument,
  })

  const {
    getRootProps: getSupportingRootProps,
    getInputProps: getSupportingInputProps,
    isDragActive: isSupportingDragActive,
  } = useDropzone({
    onDrop: onSupportingDocDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  })

  const removeMainDocument = () => {
    setMainDocument(null)
    handleInputChange("document_file", null)
    toast.info("Main document removed")
  }

  const removeSupportingDocument = (docId: string) => {
    setSupportingDocs((prev) => {
      const updatedDocs = prev.filter((doc) => doc.id !== docId)
      const updatedFiles = updatedDocs.map((doc) => doc.file)
      handleInputChange("supporting_documents", updatedFiles)
      return updatedDocs
    })
    toast.info("Supporting document removed")
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const hasFieldError = (field: string) => {
    return validationErrors[field] && validationErrors[field].length > 0
  }

  const getFieldError = (field: string) => {
    return validationErrors[field]?.[0]
  }

  return (
    <div className="space-y-6" role="region" aria-labelledby="document-upload-title">
      <div className="text-center mb-6">
        <h2 id="document-upload-title" className="text-2xl font-bold text-white mb-2">
          Document Upload & Management
        </h2>
        <p className="text-slate-400">Upload your certified LCA document and any supporting materials</p>
      </div>

      {/* Main LCA Document Upload */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" aria-hidden="true" />
              Main LCA Document *{accessibilityMode && <span className="sr-only">Required</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!mainDocument ? (
              <div
                {...getMainRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                  isMainDragActive
                    ? "border-blue-400 bg-blue-500/10"
                    : hasFieldError("document_file")
                      ? "border-red-400 bg-red-500/10"
                      : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/30"
                }`}
                role="button"
                tabIndex={0}
                aria-label="Upload main LCA document. Drag and drop or click to browse files."
              >
                <input {...getMainInputProps()} aria-describedby="main-doc-help" />
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isMainDragActive
                        ? "bg-blue-500/20"
                        : hasFieldError("document_file")
                          ? "bg-red-500/20"
                          : "bg-slate-700/50"
                    }`}
                  >
                    <Upload
                      className={`w-8 h-8 ${
                        isMainDragActive
                          ? "text-blue-400"
                          : hasFieldError("document_file")
                            ? "text-red-400"
                            : "text-slate-400"
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-medium text-white mb-2">
                      {isMainDragActive ? "Drop your LCA document here" : "Upload Main LCA Document"}
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                      Drag and drop your certified LCA document here, or click to browse
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      <Badge className="bg-slate-700/50 text-slate-300">PDF</Badge>
                      <Badge className="bg-slate-700/50 text-slate-300">DOC</Badge>
                      <Badge className="bg-slate-700/50 text-slate-300">DOCX</Badge>
                    </div>

                    <p className="text-xs text-slate-500">Maximum file size: 10MB</p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={`border rounded-lg p-6 ${
                  mainDocument.isUploading ? "border-blue-500/30 bg-blue-500/10" : "border-green-500/30 bg-green-500/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        mainDocument.isUploading ? "bg-blue-500/20" : "bg-green-500/20"
                      }`}
                    >
                      {mainDocument.isUploading ? (
                        <Clock className="w-6 h-6 text-blue-400" aria-hidden="true" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-green-400" aria-hidden="true" />
                      )}
                    </div>

                    <div>
                      <p className="text-white font-medium">{mainDocument.file.name}</p>
                      <p className="text-slate-400 text-sm">
                        {formatFileSize(mainDocument.file.size)} •
                        {mainDocument.isUploading ? " Uploading..." : " Upload complete"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!mainDocument.isUploading && (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-slate-600/50 text-slate-400 hover:bg-slate-500/10 bg-transparent"
                          aria-label={`Preview ${mainDocument.file.name}`}
                        >
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-slate-600/50 text-slate-400 hover:bg-slate-500/10 bg-transparent"
                          aria-label={`Download ${mainDocument.file.name}`}
                        >
                          <Download className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeMainDocument}
                      disabled={mainDocument.isUploading}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                      aria-label={`Remove ${mainDocument.file.name}`}
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                {mainDocument.isUploading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>Uploading...</span>
                      <span>{mainDocument.uploadProgress}%</span>
                    </div>
                    <Progress
                      value={mainDocument.uploadProgress}
                      className="h-2"
                      aria-label={`Upload progress: ${mainDocument.uploadProgress}%`}
                    />
                  </div>
                )}
              </div>
            )}

            <div id="main-doc-help" className="mt-4">
              <Alert className="bg-blue-500/10 border-blue-500/30">
                <Shield className="h-4 w-4 text-blue-400" aria-hidden="true" />
                <AlertDescription className="text-blue-300">
                  <strong>Important:</strong> Upload your certified LCA document from the Department of Labor. This
                  document must be approved and contain all required information including case number, wage details,
                  and worksite information.
                </AlertDescription>
              </Alert>
            </div>

            {hasFieldError("document_file") && (
              <Alert className="mt-4 bg-red-500/10 border-red-500/30">
                <AlertCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
                <AlertDescription className="text-red-300" role="alert">
                  {getFieldError("document_file")}
                </AlertDescription>
              </Alert>
            )}

            {uploadError && (
              <Alert className="mt-4 bg-red-500/10 border-red-500/30">
                <AlertCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
                <AlertDescription className="text-red-300" role="alert">
                  {uploadError}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Supporting Documents */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <File className="w-5 h-5" aria-hidden="true" />
              Supporting Documents
              <Badge className="bg-slate-700/50 text-slate-300 ml-2">Optional</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getSupportingRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                isSupportingDragActive
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/30"
              }`}
              role="button"
              tabIndex={0}
              aria-label="Upload supporting documents. Drag and drop or click to browse files."
            >
              <input {...getSupportingInputProps()} aria-describedby="supporting-docs-help" />
              <div className="flex flex-col items-center space-y-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSupportingDragActive ? "bg-blue-500/20" : "bg-slate-700/50"
                  }`}
                >
                  <Upload
                    className={`w-6 h-6 ${isSupportingDragActive ? "text-blue-400" : "text-slate-400"}`}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-white font-medium mb-1">
                    {isSupportingDragActive ? "Drop supporting documents here" : "Add Supporting Documents"}
                  </p>
                  <p className="text-slate-400 text-sm">
                    Upload additional documents like job descriptions, organizational charts, etc.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-slate-600/50 text-slate-400 hover:bg-slate-500/10 bg-transparent"
                >
                  Browse Files
                </Button>
              </div>
            </div>

            <div id="supporting-docs-help" className="mt-4">
              <p className="text-slate-400 text-sm">
                Optional: Upload additional documents that support your LCA posting such as detailed job descriptions,
                organizational charts, or other relevant materials. Multiple files are supported.
              </p>
            </div>

            {/* Supporting Documents List */}
            {supportingDocs.length > 0 && (
              <div className="mt-6 space-y-3" role="list" aria-label="Supporting documents">
                <h4 className="text-white font-medium">Uploaded Supporting Documents</h4>
                {supportingDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className={`border rounded-lg p-4 ${
                      doc.isUploading ? "border-blue-500/30 bg-blue-500/10" : "border-slate-600/50 bg-slate-800/30"
                    }`}
                    role="listitem"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            doc.isUploading ? "bg-blue-500/20" : "bg-slate-700/50"
                          }`}
                        >
                          {doc.isUploading ? (
                            <Clock className="w-5 h-5 text-blue-400" aria-hidden="true" />
                          ) : (
                            <File className="w-5 h-5 text-slate-400" aria-hidden="true" />
                          )}
                        </div>

                        <div>
                          <p className="text-white font-medium">{doc.file.name}</p>
                          <p className="text-slate-400 text-sm">
                            {formatFileSize(doc.file.size)}
                            {doc.isUploading && " • Uploading..."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!doc.isUploading && (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-slate-600/50 text-slate-400 hover:bg-slate-500/10 bg-transparent"
                              aria-label={`Preview ${doc.file.name}`}
                            >
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-slate-600/50 text-slate-400 hover:bg-slate-500/10 bg-transparent"
                              aria-label={`Download ${doc.file.name}`}
                            >
                              <Download className="w-4 h-4" aria-hidden="true" />
                            </Button>
                          </>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSupportingDocument(doc.id)}
                          disabled={doc.isUploading}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                          aria-label={`Remove ${doc.file.name}`}
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>

                    {doc.isUploading && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                          <span>Uploading...</span>
                          <span>{doc.uploadProgress}%</span>
                        </div>
                        <Progress
                          value={doc.uploadProgress}
                          className="h-2"
                          aria-label={`Upload progress for ${doc.file.name}: ${doc.uploadProgress}%`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Document Metadata */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="w-5 h-5" aria-hidden="true" />
              Document Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="document_version" className="text-white">
                  Document Version
                </Label>
                <Input
                  id="document_version"
                  value={formData.document_version || "1.0"}
                  onChange={(e) => handleInputChange("document_version", e.target.value)}
                  placeholder="1.0"
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                  aria-describedby="document_version-help"
                />
                <p id="document_version-help" className="text-slate-400 text-sm mt-1">
                  Version number for document tracking
                </p>
              </div>

              <div>
                <Label htmlFor="posting_status" className="text-white">
                  Posting Status
                </Label>
                <Input
                  id="posting_status"
                  value="Draft"
                  readOnly
                  className="bg-slate-700/50 border-slate-600/50 text-white"
                  aria-describedby="posting_status-help"
                />
                <p id="posting_status-help" className="text-slate-400 text-sm mt-1">
                  Current status of this posting
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="document_notes" className="text-white">
                Document Notes
              </Label>
              <Textarea
                id="document_notes"
                value={formData.document_notes || ""}
                onChange={(e) => handleInputChange("document_notes", e.target.value)}
                placeholder="Additional notes about the documents or special instructions..."
                className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 min-h-[80px]"
                aria-describedby="document_notes-help"
              />
              <p id="document_notes-help" className="text-slate-400 text-sm mt-1">
                Optional: Add any additional notes or special instructions about the uploaded documents
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upload Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Upload Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    mainDocument ? "bg-green-500/20" : "bg-slate-700/50"
                  }`}
                >
                  {mainDocument ? (
                    <CheckCircle className="w-8 h-8 text-green-400" aria-hidden="true" />
                  ) : (
                    <FileText className="w-8 h-8 text-slate-400" aria-hidden="true" />
                  )}
                </div>
                <p className="text-white font-medium">Main LCA Document</p>
                <p className={`text-sm ${mainDocument ? "text-green-400" : "text-slate-400"}`}>
                  {mainDocument ? "Uploaded" : "Required"}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-blue-500/20">
                  <File className="w-8 h-8 text-blue-400" aria-hidden="true" />
                </div>
                <p className="text-white font-medium">Supporting Documents</p>
                <p className="text-blue-400 text-sm">{supportingDocs.length} uploaded</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-purple-500/20">
                  <Shield className="w-8 h-8 text-purple-400" aria-hidden="true" />
                </div>
                <p className="text-white font-medium">Security</p>
                <p className="text-purple-400 text-sm">Encrypted Storage</p>
              </div>
            </div>

            {mainDocument && (
              <Alert className="mt-6 bg-green-500/10 border-green-500/30">
                <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                <AlertDescription className="text-green-300">
                  <strong>Ready to proceed:</strong> Your main LCA document has been uploaded successfully. You can now
                  proceed to the final review step.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
