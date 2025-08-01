import type React from "react"
import AINaviteHeader from "@/components/layout/ai-native-header"
import Footer from "@/components/layout/footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AINaviteHeader />
      <main className="flex-1 pt-32">{children}</main>
      <Footer />
    </>
  )
}
