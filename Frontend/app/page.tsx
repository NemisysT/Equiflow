"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, ArrowRight, TrendingUp, Users, Vote, Clock, CheckCircle, Zap, Globe, Activity } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"
import Link from "next/link"
import Beams from "@/components/Beams/Beams"

// Mock data
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

const equityData = contributors.map((c, i) => ({
  name: c.name,
  value: c.equity,
  color: i === 0 ? "#06b6d4" : i === 1 ? "#8b5cf6" : i === 2 ? "#10b981" : "#f59e0b",
}))

const activityData = [
  { date: "Jan", commits: 45, reviews: 23, equity: 25.2 },
  { date: "Feb", commits: 52, reviews: 31, equity: 26.1 },
  { date: "Mar", commits: 48, reviews: 28, equity: 27.3 },
  { date: "Apr", commits: 61, reviews: 35, equity: 28.5 },
]

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

export default function EquiflowUI() {
  const [currentView, setCurrentView] = useState("landing")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(1)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (currentView === "landing") {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Custom Background with Beams - Full Page */}
        <div style={{ width: "100%", height: "100%", position: "fixed", top: 0, left: 0, zIndex: 0 }}>
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0}
          />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight">
              Equity That{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 bg-clip-text text-transparent">
                Evolves
              </span>{" "}
              With You
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
              Track. Earn. Govern. Equiflow automates equity distribution for real contributors.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-3"
                onClick={() => setCurrentView("onboarding")}
              >
                <Github className="w-5 h-5 mr-2" />
                Connect GitHub
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3"
                onClick={() => setCurrentView("dashboard")}
              >
                View Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
          >
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Real-time Tracking",
                description: "Monitor contributions and equity changes as they happen",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Fair Distribution",
                description: "Automated equity allocation based on actual contribution value",
              },
              {
                icon: <Vote className="w-6 h-6" />,
                title: "Decentralized Governance",
                description: "Vote on proposals and shape the future of your organization",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-xl flex items-center justify-center mb-4 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    )
  }

  if (currentView === "onboarding") {
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
                  <span>Step {onboardingStep} of 3</span>
                  <span>{Math.round((onboardingStep / 3) * 100)}%</span>
                </div>
                <Progress value={(onboardingStep / 3) * 100} className="h-2" />
              </div>

              {onboardingStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="text-lg font-semibold">Connect GitHub</h3>
                  <p className="text-slate-400">We'll analyze your contributions to calculate your equity share</p>
                  <Button className="w-full bg-slate-800 hover:bg-slate-700" onClick={() => setOnboardingStep(2)}>
                    <Github className="w-5 h-5 mr-2" />
                    Authorize GitHub Access
                  </Button>
                </motion.div>
              )}

              {onboardingStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="text-lg font-semibold">Select Your Role</h3>
                  <p className="text-slate-400">Choose your primary contribution type</p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Developer", "Designer", "DevOps", "Product"].map((role) => (
                      <Button
                        key={role}
                        variant="outline"
                        className="border-slate-700 hover:border-cyan-500 hover:bg-cyan-500/10"
                        onClick={() => setOnboardingStep(3)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}

              {onboardingStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-semibold">Welcome to Equiflow!</h3>
                  <p className="text-slate-400">Your account is set up. Start contributing to earn equity.</p>
                  <Button
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black"
                    onClick={() => setCurrentView("dashboard")}
                  >
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dashboard Header */}
      <motion.header
        className="border-b border-slate-800/50 bg-black/80 backdrop-blur-sm sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }}>
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold">Equiflow</span>
              </motion.div>

              <nav className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" className="text-cyan-400">
                  Dashboard
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  Analytics
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  Governance
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                Live
              </Badge>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400"
            >
              Governance
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Overview */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {[
                { label: "Your Equity", value: "28.5%", change: "+2.3%", icon: <TrendingUp className="w-5 h-5" /> },
                { label: "Total Contributors", value: "24", change: "+3", icon: <Users className="w-5 h-5" /> },
                { label: "Monthly Revenue", value: "$45.2K", change: "+12%", icon: <Globe className="w-5 h-5" /> },
                { label: "Active Proposals", value: "3", change: "2 new", icon: <Vote className="w-5 h-5" /> },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">{stat.label}</span>
                        <div className="text-cyan-400">{stat.icon}</div>
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-emerald-400 text-sm">{stat.change}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Equity Distribution */}
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
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
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contributors */}
              <motion.div variants={fadeInUp} initial="initial" animate="animate" className="lg:col-span-2">
                <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Top Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contributors.map((contributor, i) => (
                        <motion.div
                          key={contributor.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-10 h-10">
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
                            </div>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {contributor.role}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-cyan-400">{contributor.equity}%</div>
                            <div className="text-sm text-emerald-400">{contributor.trend}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Activity Stream */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: "Alex Chen", action: "merged PR #234", time: "2 minutes ago", type: "commit" },
                      { user: "Sarah Kim", action: "reviewed design proposal", time: "15 minutes ago", type: "review" },
                      { user: "Marcus Johnson", action: "deployed v2.1.0", time: "1 hour ago", type: "deploy" },
                      { user: "Elena Rodriguez", action: "updated CI pipeline", time: "3 hours ago", type: "config" },
                    ].map((activity, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-800/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
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
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                    Governance Proposals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {proposals.map((proposal, i) => (
                      <motion.div
                        key={proposal.id}
                        className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/30 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
                            <p className="text-slate-400 mb-4">{proposal.description}</p>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {proposal.deadline}
                              </Badge>
                              <span className="text-sm text-slate-500">Proposal #{proposal.id}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm text-slate-400 mb-1">Your Vote</div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">Against</span>
                                <Switch />
                                <span className="text-sm">For</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-emerald-400">For: {proposal.votes.for}%</span>
                            <span className="text-red-400">Against: {proposal.votes.against}%</span>
                          </div>
                          <div className="flex h-2 rounded-full overflow-hidden bg-slate-700">
                            <motion.div
                              className="bg-emerald-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${proposal.votes.for}%` }}
                              transition={{ duration: 1, delay: i * 0.2 }}
                            />
                            <motion.div
                              className="bg-red-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${proposal.votes.against}%` }}
                              transition={{ duration: 1, delay: i * 0.2 + 0.1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
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
                      <Area
                        type="monotone"
                        dataKey="equity"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fill="url(#equityGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Background with Beams */}
      <div style={{ width: "100%", height: "600px", position: "absolute", top: 0, left: 0, zIndex: 0 }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight">
            Equity That{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 bg-clip-text text-transparent">
              Evolves
            </span>{" "}
            With You
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
            Track. Earn. Govern. Equiflow automates equity distribution for real contributors.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-3">
                <Github className="w-5 h-5 mr-2" />
                Connect GitHub
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
        >
          {[
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Real-time Tracking",
              description: "Monitor contributions and equity changes as they happen",
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Fair Distribution",
              description: "Automated equity allocation based on actual contribution value",
            },
            {
              icon: <Vote className="w-6 h-6" />,
              title: "Decentralized Governance",
              description: "Vote on proposals and shape the future of your organization",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-xl flex items-center justify-center mb-4 text-cyan-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
