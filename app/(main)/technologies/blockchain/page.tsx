import type { Metadata } from "next"
import BlockchainPage from "./blockchain-page"

export const metadata: Metadata = {
  title: "Blockchain Technology | ESGit - Trust, Transparency & Compliance",
  description:
    "Discover how ESGit leverages blockchain technology to build tamper-proof, auditable, and smart contract-enabled solutions for compliance-heavy workflows like LCA, payroll, and vendor billing.",
  keywords: "blockchain, smart contracts, distributed ledger, compliance, LCA ledger, audit trail, ESG Chain of Trust",
}

export default function Page() {
  return <BlockchainPage />
}
