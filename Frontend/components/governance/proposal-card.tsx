"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Clock } from "lucide-react"

interface ProposalCardProps {
  proposal: {
    id: number
    title: string
    description: string
    votes: { for: number; against: number }
    deadline: string
    status: string
  }
  index: number
}

export default function ProposalCard({ proposal, index }: ProposalCardProps) {
  return (
    <motion.div
      className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/30 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
          <p className="text-slate-400 mb-4">{proposal.description}</p>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
              <Clock className="w-3 h-3 mr-1" />
              {proposal.deadline}
            </Badge>
            <span className="text-sm text-slate-500">Proposal #{proposal.id}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Your Vote</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Against</span>
              <Switch />
              <span className="text-sm">For</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-emerald-400">For: {proposal.votes.for}%</span>
          <span className="text-red-400">Against: {proposal.votes.against}%</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden bg-slate-700">
          <motion.div
            className="bg-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${proposal.votes.for}%` }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
          <motion.div
            className="bg-red-400"
            initial={{ width: 0 }}
            animate={{ width: `${proposal.votes.against}%` }}
            transition={{ duration: 1, delay: index * 0.2 + 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
