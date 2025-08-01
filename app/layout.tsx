import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ESGit - AI-Powered Enterprise Solutions",
  description:
    "Transform your business with AI-powered enterprise solutions, LCA management, and digital transformation tools.",
  keywords: ["AI", "Enterprise", "LCA", "Digital Transformation", "Business Solutions"],
  authors: [{ name: "ESGit Team" }],
  creator: "ESGit",
  publisher: "ESGit",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://esgit.com",
    title: "ESGit - AI-Powered Enterprise Solutions",
    description:
      "Transform your business with AI-powered enterprise solutions, LCA management, and digital transformation tools.",
    siteName: "ESGit",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESGit - AI-Powered Enterprise Solutions",
    description:
      "Transform your business with AI-powered enterprise solutions, LCA management, and digital transformation tools.",
    creator: "@esgit",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
