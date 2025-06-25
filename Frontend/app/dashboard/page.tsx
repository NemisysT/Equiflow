"use client"

import StatsGrid from "@/components/dashboard/stats-grid"
import EquityChart from "@/components/dashboard/equity-chart"
import ContributorCard from "@/components/dashboard/contributor-card"
import ActivityStream from "@/components/dashboard/activity-stream"







const contributors = [
	{
		id: 1,
		name: "Alex Chen",
		username: "alexdev",
		avatar: "/placeholder.svg?height=40&width=40",
		equity: 28.5,
		score: 2847,
		role: "Lead Developer",
		contributions: 156,
		trend: "+12%",
	},
	{
		id: 2,
		name: "Sarah Kim",
		username: "sarahux",
		avatar: "/placeholder.svg?height=40&width=40",
		equity: 22.3,
		score: 2234,
		role: "Product Designer",
		contributions: 89,
		trend: "+8%",
	},
	{
		id: 3,
		name: "Marcus Johnson",
		username: "marcusj",
		avatar: "/placeholder.svg?height=40&width=40",
		equity: 19.7,
		score: 1967,
		role: "Backend Engineer",
		contributions: 134,
		trend: "+15%",
	},
	{
		id: 4,
		name: "Elena Rodriguez",
		username: "elenatech",
		avatar: "/placeholder.svg?height=40&width=40",
		equity: 15.2,
		score: 1523,
		role: "DevOps Engineer",
		contributions: 78,
		trend: "+5%",
	},
]

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#2D1A4D] to-[#1e293b] text-white relative overflow-hidden">
			{/* Animated gradient overlay */}
			<div className="absolute inset-0 pointer-events-none z-0">
				<div className="w-full h-full bg-gradient-to-tr from-purple-900/40 via-violet-700/20 to-indigo-900/30 animate-gradient-move" />
			</div>
			<div className="container mx-auto px-4 sm:px-6 py-10 space-y-10 relative z-10">
				{/* Stats Overview */}
				<StatsGrid />

				{/* Main Dashboard Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Equity Distribution */}
					<div className="bg-slate-900/70 rounded-2xl shadow-xl p-6 flex items-center justify-center">
						<EquityChart />
					</div>

					{/* Contributors */}
					<section className="lg:col-span-2">
						<h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent drop-shadow">
							Top Contributors
						</h2>
						<div className="space-y-4">
							{contributors.map((contributor, index) => (
								<ContributorCard
									key={contributor.id}
									contributor={contributor}
									index={index}
								/>
							))}
						</div>
					</section>
				</div>

				{/* Activity Stream */}
				<div className="bg-slate-900/70 rounded-2xl shadow-xl p-6">
					<ActivityStream />
				</div>
			</div>
			{/* 
      
      */}
		</div>
	)
}
