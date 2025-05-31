"use client"

import { useEffect, useRef } from "react"

interface BeamsProps {
  beamWidth?: number
  beamHeight?: number
  beamNumber?: number
  lightColor?: string
  speed?: number
  noiseIntensity?: number
  scale?: number
  rotation?: number
}

export default function Beams({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0,
}: BeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < beamNumber; i++) {
        const angle = (i / beamNumber) * Math.PI * 2 + rotation
        const noise = Math.sin(time * speed + i) * noiseIntensity
        const beamLength = Math.min(canvas.width, canvas.height) * scale

        const startX = centerX + Math.cos(angle) * (beamLength * 0.3)
        const startY = centerY + Math.sin(angle) * (beamLength * 0.3)
        const endX = centerX + Math.cos(angle) * (beamLength + noise * 20)
        const endY = centerY + Math.sin(angle) * (beamLength + noise * 20)

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        gradient.addColorStop(0, `${lightColor}00`)
        gradient.addColorStop(0.5, `${lightColor}80`)
        gradient.addColorStop(1, `${lightColor}00`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = beamWidth
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }

      time += 0.016
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [beamWidth, beamHeight, beamNumber, lightColor, speed, noiseIntensity, scale, rotation])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />
}
