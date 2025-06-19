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

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
}

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}






export default function GovernancePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-[#1e293b] relative overflow-hidden">
			{/* Animated gradient overlay */}
			<div className="absolute inset-0 pointer-events-none z-0">
				<div className="w-full h-full bg-gradient-to-tr from-purple-900/40 via-violet-700/20 to-indigo-900/30 animate-gradient-move" />
			</div>
			<div className="container mx-auto px-6 py-12 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<Card className="bg-slate-900/60 border border-slate-800/60 backdrop-blur-xl shadow-2xl rounded-2xl">
						<CardHeader>
							<CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent drop-shadow">
								Governance Proposals
							</CardTitle>
							<p className="mt-2 text-slate-300 text-base font-medium">
								Participate in shaping the future of the protocol. Cast your vote on active proposals below.
							</p>
						</CardHeader>
						<CardContent>
							<motion.div
								className="space-y-8"
								variants={containerVariants}
								initial="hidden"
								animate="show"
							>
								{proposals.map((proposal, i) => (
									<motion.div key={proposal.id} variants={cardVariants}>
										<ProposalCard proposal={proposal} index={i} />
									</motion.div>
								))}
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
			{/* Optional: Add a subtle animated gradient keyframes in your global CSS */}
			{/* 
      @keyframes gradient-move {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-gradient-move {
        background-size: 200% 200%;
        animation: gradient-move 8s ease-in-out infinite;
      }
      */}
		</div>
	)
}
