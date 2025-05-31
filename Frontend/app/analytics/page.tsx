"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts"

const activityData = [
  { date: "Jan", commits: 45, reviews: 23, equity: 25.2 },
  { date: "Feb", commits: 52, reviews: 31, equity: 26.1 },
  { date: "Mar", commits: 48, reviews: 28, equity: 27.3 },
  { date: "Apr", commits: 61, reviews: 35, equity: 28.5 },
]

const contributionData = [
  { name: "Alex Chen", commits: 156, reviews: 89, docs: 23 },
  { name: "Sarah Kim", commits: 89, reviews: 134, docs: 45 },
  { name: "Marcus Johnson", commits: 134, reviews: 67, docs: 12 },
  { name: "Elena Rodriguez", commits: 78, reviews: 45, docs: 34 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Equity Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Area type="monotone" dataKey="equity" stroke="#06b6d4" strokeWidth={2} fill="url(#equityGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Contribution Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contributionData}>
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Bar dataKey="commits" fill="#06b6d4" />
                  <Bar dataKey="reviews" fill="#8b5cf6" />
                  <Bar dataKey="docs" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
