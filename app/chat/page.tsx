"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Mic, Paperclip, MoreVertical, ArrowLeft, Zap, Target, Apple, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "workout" | "nutrition" | "progress"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey there! I'm your AI fitness coach. I'm here to help you crush your fitness goals! What would you like to work on today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("workout") || lowerInput.includes("exercise")) {
      return "Great! I'd love to help you with a workout. Based on your fitness level, I recommend starting with a full-body routine. Would you like me to create a personalized workout plan for you? I can focus on strength training, cardio, or a combination of both!"
    }

    if (lowerInput.includes("nutrition") || lowerInput.includes("diet") || lowerInput.includes("meal")) {
      return "Nutrition is key to reaching your goals! I can help you create a meal plan that aligns with your fitness objectives. Are you looking to build muscle, lose weight, or maintain your current physique? Let me know your dietary preferences too!"
    }

    if (lowerInput.includes("progress") || lowerInput.includes("track")) {
      return "Tracking progress is essential for success! I can help you monitor your workouts, nutrition, and body measurements. Would you like me to set up some progress tracking goals for you? We can track strength gains, endurance improvements, or body composition changes."
    }

    return "I understand! Let me help you with that. As your AI fitness coach, I'm here to provide personalized guidance on workouts, nutrition, and tracking your progress. What specific area would you like to focus on first?"
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
  }

  const quickActions = [
    { icon: Zap, text: "Generate a workout plan", action: "Can you create a workout plan for me?" },
    { icon: Apple, text: "Meal suggestions", action: "What should I eat today?" },
    { icon: Target, text: "Set fitness goals", action: "Help me set some fitness goals" },
    { icon: TrendingUp, text: "Track my progress", action: "How can I track my progress?" },
  ]

  return (
    <div className="min-h-screen bg-[#091110] text-white circuit-pattern">
      {/* Header */}
      <div className="border-b border-[#2d2e2e]/30 bg-[#091110]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[#e3372e]/20 text-[#e3372e] border border-[#e3372e]/30 hover:border-[#e3372e]/50 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/public/images/top-coach-logo.png"
                  alt="AI Coach"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-[#e3372e]/50 glow-red"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#e3372e] rounded-full border-2 border-[#091110] animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-[#e3372e] to-white bg-clip-text text-transparent">
                  AI Fitness Coach
                </h1>
                <p className="text-sm text-[#2d2e2e]">Online • Ready to help</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-[#e3372e]/20 text-white">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "ai" && (
                <Image
                  src="/public/images/top-coach-logo.png"
                  alt="AI Coach"
                  width={32}
                  height={32}
                  className="rounded-full border border-[#e3372e]/50 flex-shrink-0 glow-red"
                />
              )}

              <div className={`max-w-[70%] ${message.sender === "user" ? "order-first" : ""}`}>
                <Card
                  className={`p-4 border-0 ${
                    message.sender === "user"
                      ? "bg-[#e3372e] text-white ml-auto glow-red"
                      : "bg-[#2d2e2e]/80 border-[#2d2e2e]/50 text-white backdrop-blur-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </Card>
                <p className={`text-xs text-[#2d2e2e] mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#2d2e2e]/80 flex items-center justify-center flex-shrink-0 border border-[#e3372e]/30">
                  <span className="text-xs font-medium text-white">You</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Image
                src="/public/images/top-coach-logo.png"
                alt="AI Coach"
                width={32}
                height={32}
                className="rounded-full border border-[#e3372e]/50 flex-shrink-0 glow-red"
              />
              <Card className="p-4 bg-[#2d2e2e]/80 border-[#2d2e2e]/50 backdrop-blur-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#e3372e] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#e3372e] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#e3372e] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </Card>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="p-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-[#e3372e] mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start gap-2 h-auto p-3 text-left hover:bg-[#e3372e]/20 border-[#2d2e2e]/50 bg-[#2d2e2e]/30 text-white backdrop-blur-sm hover:border-[#e3372e]/50 transition-all duration-300"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <action.icon className="h-4 w-4 text-[#e3372e]" />
                  <span className="text-sm">{action.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-[#2d2e2e]/30 bg-[#091110]/90 backdrop-blur-sm p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            <Button variant="ghost" size="icon" className="hover:bg-[#e3372e]/20 flex-shrink-0 text-white">
              <Paperclip className="h-5 w-5" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about fitness, nutrition, or workouts..."
                className="pr-12 bg-[#2d2e2e]/50 border-[#2d2e2e]/50 focus:border-[#e3372e]/50 text-white placeholder:text-[#2d2e2e] backdrop-blur-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 bg-[#e3372e] hover:bg-[#e3372e]/80 text-white"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="hover:bg-[#e3372e]/20 flex-shrink-0 text-white">
              <Mic className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center mt-2">
            <Badge variant="secondary" className="text-xs bg-[#2d2e2e]/50 text-white border-[#e3372e]/30">
              AI-powered fitness coaching • Secure & Private
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
