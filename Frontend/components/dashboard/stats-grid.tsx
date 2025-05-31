"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Globe, Vote } from "lucide-react"

const stats = [
  { label: "Your Equity", value: "28.5%", change: "+2.3%", icon: TrendingUp },
  { label: "Total Contributors", value: "24", change: "+3", icon: Users },
  { label: "Monthly Revenue", value: "$45.2K", change: "+12%", icon: Globe },
  { label: "Active Proposals", value: "3", change: "2 new", icon: Vote },
]

export default function StatsGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
          }}
        >
          <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">{stat.label}</span>
                <stat.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-emerald-400 text-sm">{stat.change}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
