"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Github, CheckCircle, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingFlow() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleComplete = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <CardTitle className="text-2xl">Join Equiflow</CardTitle>
            <p className="text-slate-400">Connect your GitHub and start earning equity</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Step {step} of 3</span>
                <span>{Math.round((step / 3) * 100)}%</span>
              </div>
              <Progress value={(step / 3) * 100} className="h-2" />
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="text-lg font-semibold">Connect GitHub</h3>
                <p className="text-slate-400">We'll analyze your contributions to calculate your equity share</p>
                <Button className="w-full bg-slate-800 hover:bg-slate-700" onClick={() => setStep(2)}>
                  <Github className="w-5 h-5 mr-2" />
                  Authorize GitHub Access
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="text-lg font-semibold">Select Your Role</h3>
                <p className="text-slate-400">Choose your primary contribution type</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Developer", "Designer", "DevOps", "Product"].map((role) => (
                    <Button
                      key={role}
                      variant="outline"
                      className="border-slate-700 hover:border-cyan-500 hover:bg-cyan-500/10"
                      onClick={() => setStep(3)}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 text-center"
              >
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-semibold">Welcome to Equiflow!</h3>
                <p className="text-slate-400">Your account is set up. Start contributing to earn equity.</p>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black" onClick={handleComplete}>
                  Enter Dashboard
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
