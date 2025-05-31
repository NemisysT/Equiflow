"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Equity Updates</div>
                      <div className="text-sm text-slate-400">Get notified when your equity changes</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Governance Proposals</div>
                      <div className="text-sm text-slate-400">Notifications for new proposals</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Connected Accounts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-full" />
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-slate-400">@alexdev</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                      Connected
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                  Disconnect Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
