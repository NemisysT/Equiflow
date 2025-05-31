"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

const activities = [
  { user: "Alex Chen", action: "merged PR #234", time: "2 minutes ago", type: "commit" },
  { user: "Sarah Kim", action: "reviewed design proposal", time: "15 minutes ago", type: "review" },
  { user: "Marcus Johnson", action: "deployed v2.1.0", time: "1 hour ago", type: "deploy" },
  { user: "Elena Rodriguez", action: "updated CI pipeline", time: "3 hours ago", type: "config" },
]

export default function ActivityStream() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <motion.div
                key={i}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-800/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "commit"
                      ? "bg-cyan-400"
                      : activity.type === "review"
                        ? "bg-violet-400"
                        : activity.type === "deploy"
                          ? "bg-emerald-400"
                          : "bg-yellow-400"
                  }`}
                />
                <div className="flex-1">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-slate-400 ml-2">{activity.action}</span>
                </div>
                <div className="text-sm text-slate-500">{activity.time}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
