'use client'
// Import necessary React hooks and components
import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { 
  ArrowUpRight, 
  Plus, 
  Users,
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  CreditCard
  
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data for the "Pulse"
const STATS = [
  {
    label: 'Monthly Revenue',
    value: 'MK 4,250,000',
    trend: '+12.5%',
    isPositive: true,
    icon: TrendingUp,
  },
  {
    label: 'Outstanding Invoices',
    value: 'MK 1,840,000',
    trend: '8 Overdue',
    isPositive: false,
    icon: Clock,
  },
  {
    label: 'Active Customers',
    value: '142',
    trend: '+4 this week',
    isPositive: true,
    icon: Users,
  },
]

const RECENT_TRANSACTIONS = [
  { id: 1, customer: 'Limbe Leaf Tobacco', amount: 'MK 450,000', status: 'Paid', date: '2h ago' },
  { id: 2, customer: 'Malawi Beverages', amount: 'MK 1,200,000', status: 'Pending', date: '5h ago' },
  { id: 3, customer: 'Sunbird Hotels', amount: 'MK 890,000', status: 'Overdue', date: '1d ago' },
]

export default function DashboardPage() {
  return (
    <DashboardLayout title="Business Overview">
      <div className="max-w-[1400px] mx-auto space-y-8 px-4 sm:px-6">
        
        {/* Header Section: The "Command" area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight text-[#0F172A]">
              Welcome back, <span className="text-slate-900">Admin</span>
            </h1>
            <p className="text-muted-foreground font-medium">
              Here is what is happening with Mwala Business today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">
              Download Report
            </Button>
            <Button variant="default" className="shadow-lg shadow-slate-200 gap-2">
              <Plus className="h-4 w-4 stroke-[3px]" />
              Create New
            </Button>
          </div>
        </div>

        {/* KPI Section: The "Pulse" */}
        <div className="grid gap-6 md:grid-cols-3">
          {STATS.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <stat.icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className={cn(
                    "flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full ring-1 ring-inset",
                    stat.isPositive ? "text-emerald-700 bg-emerald-50 ring-emerald-600/10" : "text-[#D4A017] bg-[#D4A017]/5 ring-[#D4A017]/10"
                  )}>
                    {stat.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#0F172A] tracking-tighter tabular-nums transition-colors group-hover:text-black">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Executive Overview: Unified Storytelling */}
        <div className="grid gap-6 lg:grid-cols-3 pb-8">
          
          {/* Column 1: Revenue Overview */}
          <Card className="border-none shadow-sm ring-1 ring-slate-100 flex flex-col transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">Revenue Overview</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#16A34A]" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#0F172A] tabular-nums">MK 4.25M</span>
                  <span className="text-xs font-bold text-[#16A34A]">+12.5%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Net revenue this month</p>
              </div>
              
              {/* Mini Trend Visualization */}
              <div className="flex items-end gap-1 h-12 w-full pt-2">
                {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 rounded-t-[2px] transition-all",
                      i === 6 ? "bg-[#D4A017]" : "bg-slate-100"
                    )}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              
              <div className="pt-4 border-t border-slate-50">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Projected EOM</span>
                  <span className="font-bold text-[#0F172A]">MK 5.10M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Column 2: Payment Activity */}
          <Card className="border-none shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">Payment Activity</CardTitle>
                <CreditCard className="h-4 w-4 text-slate-300" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50 px-6">
                {RECENT_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="py-3 px-2 -mx-2 rounded-md flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        tx.status === 'Paid' ? "bg-emerald-400" : tx.status === 'Overdue' ? "bg-red-400" : "bg-[#D4A017]"
                      )} />
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">{tx.customer}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{tx.date}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] tabular-nums">{tx.amount}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 mt-2">
                <Button variant="ghost" className="w-full text-[10px] uppercase tracking-widest">
                  Operational Ledger
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Column 3: Business Health */}
          <Card className="border-none shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">Business Health</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-slate-300" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Active Customers</p>
                  <p className="text-xl font-bold text-[#0F172A]">142</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Retention</p>
                  <p className="text-xl font-bold text-[#16A34A]">98.2%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Collection Rate</p>
                  <p className="text-xl font-bold text-slate-900">91.4%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Debt Exposure</p>
                  <p className="text-xl font-bold text-red-600">MK 1.8M</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Growth Velocity</span>
                  <span className="text-[10px] font-bold text-[#16A34A]">Strong</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0F172A] w-[85%]" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  )
}