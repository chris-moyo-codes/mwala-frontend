'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { InsightsSidebar, DEFAULT_INSIGHTS } from '@/components/shared/InsightsSidebar'
import { OnboardingTracker } from '@/components/shared/OnboardingTracker'
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Plus, 
  Users,
  TrendingUp, 
  Clock,
  Wallet,
  Activity,
  Zap,
  MoreVertical,
  Bell,
  Sparkles,
  UserPlus,
  FileText,
  Receipt,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// ─── Mock Data ──────────────────────────────────────────────────────────────
const KPI_STATS = [
  { label: 'Total Liquidity', value: 'MK 18,250,000', trend: '+14.2%', isPositive: true, icon: Wallet },
  { label: 'Net Revenue', value: 'MK 4,250,000', trend: '+12.5%', isPositive: true, icon: TrendingUp },
  { label: 'Outstanding Invoices', value: 'MK 1,840,000', trend: '-2.1%', isPositive: true, icon: Clock },
  { label: 'Active Customers', value: '142', trend: '+4 this week', isPositive: true, icon: Users },
]

const REVENUE_DATA = [
  { name: 'Jan', revenue: 2400, expected: 2400 },
  { name: 'Feb', revenue: 1398, expected: 2210 },
  { name: 'Mar', revenue: 9800, expected: 2290 },
  { name: 'Apr', revenue: 3908, expected: 2000 },
  { name: 'May', revenue: 4800, expected: 2181 },
  { name: 'Jun', revenue: 3800, expected: 2500 },
  { name: 'Jul', revenue: 4300, expected: 2100 },
]

const ACTIVITY_FEED = [
  { id: 1, type: 'payment', title: 'Payment Received', desc: 'Limbe Leaf paid Invoice #0089', amount: '+ MK 450,000', time: '2h ago' },
  { id: 2, type: 'customer', title: 'New Customer', desc: 'Sunbird Hotels added to directory', amount: null, time: '5h ago' },
  { id: 3, type: 'invoice', title: 'Invoice Sent', desc: 'Invoice #0090 sent to TNM Malawi', amount: 'MK 1.2M', time: '1d ago' },
  { id: 4, type: 'alert', title: 'Payment Overdue', desc: 'NICO General is 5 days late', amount: 'MK 890,000', time: '1d ago' },
]

const SMART_INSIGHTS = [
  { id: 1, text: 'Revenue increased 14% compared to the same period last month.', type: 'positive' },
  { id: 2, text: '3 invoices require immediate follow-up (Over 30 days late).', type: 'warning' },
  { id: 3, text: 'Limbe Leaf generated 27% of your total revenue this quarter.', type: 'neutral' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function GaugeChart({ value }: { value: number }) {
  // Simple SVG half-circle gauge
  const radius = 60
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex flex-col items-center justify-center pt-4 pb-2">
      <svg className="w-40 h-24 transform -rotate-180" viewBox="0 0 140 70">
        {/* Background track */}
        <path
          d="M 10 70 A 60 60 0 0 1 130 70"
          fill="none"
          stroke="#263043"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Value track */}
        <path
          d="M 10 70 A 60 60 0 0 1 130 70"
          fill="none"
          stroke="#22C55E"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute bottom-2 flex flex-col items-center">
        <span className="text-4xl font-black text-white tabular-nums">{value}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Excellent</span>
      </div>
    </div>
  )
}

// ─── Onboarding Steps Data ────────────────────────────────────────────────────
const ONBOARDING_STEPS = [
  { id: 'profile', title: 'Complete Business Profile', description: 'Add your business name, logo, and contact details.', completed: true, ctaLabel: 'Done' },
  { id: 'customer', title: 'Add Your First Customer', description: 'Start building your customer intelligence directory.', completed: true, ctaLabel: 'Done' },
  { id: 'invoice', title: 'Create Your First Invoice', description: 'Issue a professional invoice to a customer.', completed: false, href: '/dashboard/invoices/new', ctaLabel: 'Create' },
  { id: 'payment', title: 'Record a Payment', description: 'Log an incoming payment and generate a receipt.', completed: false, href: '/dashboard/receipts/new', ctaLabel: 'Record' },
  { id: 'report', title: 'Generate a Financial Report', description: 'Get a full view of your business health score.', completed: false, href: '/dashboard/reports', ctaLabel: 'View' },
]

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function CommandCenterPage() {
  const [isInsightsOpen, setIsInsightsOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)

  return (
    <DashboardLayout title="Command Center">
      <div className="max-w-[1600px] mx-auto space-y-8 px-4 sm:px-6 pb-12">
        
        {/* Header / Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Command Center
            </h1>
            <p className="text-slate-400 font-medium">
              Real-time oversight of your financial operations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="bg-[#161F38] text-white hover:bg-[#263043] border-none shadow-sm gap-2"
              onClick={() => setIsInsightsOpen(true)}
            >
              <Sparkles className="h-4 w-4 text-[#E0B03B]" />
              AI Insights
            </Button>
            <Button variant="default" className="bg-[#E0B03B] hover:bg-[#c99a2c] text-[#0B1220] font-bold shadow-lg shadow-[#E0B03B]/20 gap-2">
              <Plus className="h-4 w-4 stroke-[3px]" />
              New Action
            </Button>
          </div>
        </div>

        {/* Onboarding Tracker */}
        {showOnboarding && (
          <OnboardingTracker
            steps={ONBOARDING_STEPS}
            onDismiss={() => setShowOnboarding(false)}
          />
        )}

        {/* 1. Executive KPI Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPI_STATS.map((stat, i) => (
            <Card key={i} className="border-[#263043] bg-[#111B31] shadow-sm hover:border-[#E0B03B]/50 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-lg bg-[#161F38] border border-[#263043]">
                    <stat.icon className="h-4 w-4 text-[#E0B03B]" />
                  </div>
                  <div className={cn(
                    "flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full border",
                    stat.isPositive ? "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20" : "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20"
                  )}>
                    {stat.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.trend}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold text-white tracking-tight tabular-nums">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Main Chart Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Analytics */}
            <Card className="border-[#263043] bg-[#111B31] shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-white text-lg font-bold">Revenue Analytics</CardTitle>
                  <CardDescription className="text-slate-400">Monthly gross collection vs projection</CardDescription>
                </div>
                <select className="bg-[#161F38] border border-[#263043] text-xs font-bold text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#E0B03B]">
                  <option>This Year</option>
                  <option>Last 6 Months</option>
                  <option>All Time</option>
                </select>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E0B03B" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#E0B03B" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#263043" />
                      <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `MK ${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#161F38', borderColor: '#263043', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#E0B03B' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#E0B03B" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Smart Insights Panel */}
            <Card className="border-[#263043] bg-[#111B31] shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="h-24 w-24 text-[#E0B03B]" />
              </div>
              <CardHeader className="relative pb-4 border-b border-[#263043]">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#E0B03B]" />
                  <CardTitle className="text-white text-base font-bold">MWALA Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative pt-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {SMART_INSIGHTS.map((insight) => (
                    <div key={insight.id} className="bg-[#161F38] border border-[#263043] rounded-xl p-4 shadow-sm hover:border-[#E0B03B]/30 transition-colors">
                      <div className={cn(
                        "h-2 w-2 rounded-full mb-3",
                        insight.type === 'positive' ? 'bg-[#22C55E]' : insight.type === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#3B82F6]'
                      )} />
                      <p className="text-sm font-medium text-slate-300 leading-relaxed">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            
            {/* Business Health Score */}
            <Card className="border-[#263043] bg-[#111B31] shadow-sm">
              <CardHeader className="pb-0 text-center">
                <CardTitle className="text-white text-base font-bold">Business Health Score</CardTitle>
                <CardDescription className="text-slate-400">Based on cash flow and collection rates</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-2 pb-6">
                <GaugeChart value={87} />
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6 w-full px-4">
                  <div className="text-center p-3 bg-[#161F38] rounded-lg border border-[#263043]">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Collection Rate</p>
                    <p className="text-lg font-bold text-white mt-1">94%</p>
                  </div>
                  <div className="text-center p-3 bg-[#161F38] rounded-lg border border-[#263043]">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Burn Rate</p>
                    <p className="text-lg font-bold text-[#22C55E] mt-1">Low</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="border-[#263043] bg-[#111B31] shadow-sm flex-1">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-[#263043]">
                <CardTitle className="text-white text-base font-bold">Recent Activity</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {ACTIVITY_FEED.map((item, i) => (
                    <div key={item.id} className="relative flex gap-4">
                      {/* Timeline line */}
                      {i !== ACTIVITY_FEED.length - 1 && (
                        <div className="absolute top-8 left-4 w-px h-full bg-[#263043]" />
                      )}
                      
                      <div className={cn(
                        "relative z-10 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-[#111B31]",
                        item.type === 'payment' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                        item.type === 'customer' ? 'bg-[#3B82F6]/20 text-[#3B82F6]' :
                        item.type === 'alert' ? 'bg-[#EF4444]/20 text-[#EF4444]' :
                        'bg-[#E0B03B]/20 text-[#E0B03B]'
                      )}>
                        {item.type === 'payment' ? <Wallet className="h-3 w-3" /> :
                         item.type === 'customer' ? <Users className="h-3 w-3" /> :
                         item.type === 'alert' ? <Bell className="h-3 w-3" /> :
                         <Activity className="h-3 w-3" />}
                      </div>
                      
                      <div className="flex-1 pb-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-bold text-white">{item.title}</p>
                          <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap ml-2">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                        {item.amount && (
                          <p className={cn(
                            "text-xs font-bold mt-1.5",
                            item.type === 'payment' ? 'text-[#22C55E]' : 'text-slate-300'
                          )}>{item.amount}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-6 text-xs text-slate-400 hover:text-white">
                  View Full History
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>

      {/* AI Insights Sidebar */}
      <InsightsSidebar
        insights={DEFAULT_INSIGHTS}
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
      />
    </DashboardLayout>
  )
}