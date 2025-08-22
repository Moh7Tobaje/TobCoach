"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function FloatingChatButton() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-[#e3372e]/20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-[#e3372e]/30 animate-pulse"></div>

        <Link href="/chat">
          <Button
            size="lg"
            className="relative h-14 w-14 rounded-full bg-[#e3372e] hover:bg-[#e3372e]/90 text-white shadow-lg glow-red transition-all duration-300 hover:scale-110"
          >
            <div className="flex items-center justify-center">
              <Image
                src="/public/images/top-coach-logo.png"
                alt="AI Coach"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
          </Button>
        </Link>

        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-[#e3372e] rounded-full border-2 border-[#091110] flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#2d2e2e] text-white text-xs rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with AI Coach
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2d2e2e]"></div>
        </div>
      </div>
    </div>
  )
}
