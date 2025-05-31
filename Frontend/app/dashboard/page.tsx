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
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <StatsGrid />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equity Distribution */}
          <EquityChart />

          {/* Contributors */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Top Contributors</h2>
            {contributors.map((contributor, index) => (
              <ContributorCard key={contributor.id} contributor={contributor} index={index} />
            ))}
          </div>
        </div>

        {/* Activity Stream */}
        <ActivityStream />
      </div>
    </div>
  )
}
