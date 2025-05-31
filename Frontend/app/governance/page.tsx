"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProposalCard from "@/components/governance/proposal-card"

const proposals = [
  {
    id: 1,
    title: "Increase contributor rewards pool",
    description: "Proposal to allocate additional 15% of revenue to contributor rewards",
    votes: { for: 78, against: 22 },
    deadline: "2 days left",
    status: "active",
  },
  {
    id: 2,
    title: "Implement quarterly vesting schedule",
    description: "Change from monthly to quarterly equity vesting for better predictability",
    votes: { for: 65, against: 35 },
    deadline: "5 days left",
    status: "active",
  },
]

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                Governance Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {proposals.map((proposal, i) => (
                  <ProposalCard key={proposal.id} proposal={proposal} index={i} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
