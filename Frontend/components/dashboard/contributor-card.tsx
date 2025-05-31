"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ContributorCardProps {
  contributor: {
    id: number
    name: string
    username: string
    avatar: string
    equity: number
    score: number
    role: string
    contributions: number
    trend: string
  }
  index: number
}

export default function ContributorCard({ contributor, index }: ContributorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/50 transition-all cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {contributor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{contributor.name}</div>
                <div className="text-sm text-slate-400">@{contributor.username}</div>
                <Badge variant="outline" className="border-slate-600 text-slate-300 mt-1">
                  {contributor.role}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400">{contributor.equity}%</div>
              <div className="text-sm text-emerald-400">{contributor.trend}</div>
              <div className="text-xs text-slate-500 mt-1">{contributor.contributions} contributions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
