"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Zap, Menu, X, Home, BarChart3, Vote, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Governance", href: "/governance", icon: Vote },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <motion.header
      className="border-b border-slate-800/50 bg-black/80 backdrop-blur-sm sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-5 h-5 text-black" />
            </motion.div>
            <span className="text-xl font-bold">Equiflow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`relative px-4 py-2 ${
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                    {isActive && (
                      <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" layoutId="activeTab" />
                    )}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 hidden sm:flex">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Live
            </Badge>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800" align="end">
                <DropdownMenuItem className="hover:bg-slate-800">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-800">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem className="hover:bg-slate-800 text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-slate-800 bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${isActive ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400"}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
