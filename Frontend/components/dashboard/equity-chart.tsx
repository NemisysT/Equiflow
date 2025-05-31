"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const equityData = [
  { name: "Alex Chen", value: 28.5, color: "#06b6d4" },
  { name: "Sarah Kim", value: 22.3, color: "#8b5cf6" },
  { name: "Marcus Johnson", value: 19.7, color: "#10b981" },
  { name: "Elena Rodriguez", value: 15.2, color: "#f59e0b" },
  { name: "Others", value: 14.3, color: "#64748b" },
]

export default function EquityChart() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>Equity Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={equityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {equityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-slate-400">Allocated</div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {equityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
