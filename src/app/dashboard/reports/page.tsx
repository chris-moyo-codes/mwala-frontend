'use client'
// Import necessary components and utilities
import { useMemo } from 'react' // Added useMemo for memoizing data
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card'
import { Zap } from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { DashboardLayout } from '@/components/layout/DashboardLayout' // Moved DashboardLayout import
import { formatCurrency, formatDate } from '@/lib/utils'
import { mockInvoices, mockReceipts } from '@/mock-data'
import { cn } from '@/lib/utils'


export default function ReportsPage() {
  // Memoized data for charts and KPIs to optimize performance
  const revenueData = useMemo(() => [
    { month: 'Jan', received: 800000, pending: 300000 },
    { month: 'Feb', received: 1200000, pending: 400000 },
    { month: 'Mar', received: 950000, pending: 350000 },
    { month: 'Apr', received: 1500000, pending: 500000 },
    { month: 'May', received: 1800000, pending: 600000 },
    { month: 'Jun', received: 2100000, pending: 450000 },
  ], []);

  const invoiceStatusData = useMemo(() => [
    { name: 'Paid', value: mockInvoices.filter((i) => i.status === 'paid').length, color: '#16a34a' },
    { name: 'Pending', value: mockInvoices.filter((i) => i.status === 'pending').length, color: '#D4A017' },
    { name: 'Overdue', value: mockInvoices.filter((i) => i.status === 'overdue').length, color: '#ef4444' },
  ], []);

  const paymentMethodData = useMemo(() => [
    {
      method: 'Cash',
      count: mockReceipts.filter((r) => r.paymentMethod === 'cash').length,
      amount: mockReceipts
        .filter((r) => r.paymentMethod === 'cash')
        .reduce((sum, r) => sum + r.amount, 0),
    },
    {
      method: 'Bank Transfer',
      count: mockReceipts.filter((r) => r.paymentMethod === 'bank_transfer').length,
      amount: mockReceipts
        .filter((r) => r.paymentMethod === 'bank_transfer')
        .reduce((sum, r) => sum + r.amount, 0),
    },
    {
      method: 'Mobile Money',
      count: mockReceipts.filter((r) => r.paymentMethod === 'mobile_money').length,
      amount: mockReceipts
        .filter((r) => r.paymentMethod === 'mobile_money')
        .reduce((sum, r) => sum + r.amount, 0),
    },
  ], []);

  const totalInvoiced = useMemo(() => mockInvoices.reduce((sum, i) => sum + i.amount, 0), []);
  const totalPaid = useMemo(() => mockInvoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0), []);
  const totalReceived = useMemo(() => mockReceipts.reduce((sum, r) => sum + r.amount, 0), []);
  const collectionRate = useMemo(() => totalInvoiced > 0 ? (totalPaid / totalInvoiced) * 100 : 0, [totalInvoiced, totalPaid]);

  return (
    <DashboardLayout title="Reports">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">Financial Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enterprise-grade financial analytics and business performance.
          </p>
        </div>

        {/* SECTION: Executive Insights */}
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-[#0F172A] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 h-64 w-64 bg-[#D4A017]/10 rounded-full blur-[100px]" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-6 w-6 rounded-lg bg-[#D4A017] flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-[#0F172A] fill-current" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A017]">Mwala Intelligence Insights</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-2">
                <p className="text-lg font-medium leading-snug">Revenue increased <span className="text-[#D4A017] font-bold">18.4%</span> since last month.</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest text-opacity-70">Growth Velocity: Strong</p>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium leading-snug">Top customer contributed <span className="text-[#D4A017] font-bold">22%</span> of total monthly revenue.</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest text-opacity-70">Concentration Risk: Low</p>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium leading-snug">Outstanding balances decreased by <span className="text-[#D4A017] font-bold">12%</span> this cycle.</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest text-opacity-70">Collection Efficiency: Optimal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total Invoiced', value: formatCurrency(totalInvoiced), color: 'text-[#0F172A]' },
            { label: 'Total Received', value: formatCurrency(totalReceived), color: 'text-[#0F172A]' },
            { label: 'Collection Rate', value: `${collectionRate.toFixed(1)}%`, color: 'text-[#0F172A]' },
            { label: 'Outstanding', value: formatCurrency(totalInvoiced - totalPaid), color: 'text-slate-900' },
          ].map((kpi) => (
            <Card key={kpi.label} className="border-none shadow-sm ring-1 ring-slate-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1 group">
              <CardContent className="p-5">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">
                    {kpi.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className={cn("text-3xl font-bold tracking-tight tabular-nums transition-colors group-hover:text-black", kpi.color)}>
                      {kpi.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Trend */}
        <Card className="border-none shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Revenue Trend (6 Months)</CardTitle>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#0F172A]" /><span className="text-[10px] font-bold text-slate-500 uppercase">Received</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-[#D4A017]" /><span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="received" fill="#0F172A" name="Amount Received" radius={[2, 2, 0, 0]} />
                <Bar dataKey="pending" fill="#D4A017" name="Pending" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Invoice Status Distribution */}
          <Card className="border-none shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Invoice Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={invoiceStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {invoiceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="border-none shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Payment Methods Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {paymentMethodData.map((method) => (
                  <div key={method.method} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <div>
                      <p className="text-sm font-bold text-[#0F172A] group-hover:text-black transition-colors">{method.method}</p>
                      <p className="text-xs text-muted-foreground">{method.count} transactions</p>
                    </div>
                    <p className="text-sm font-bold text-[#0F172A] tabular-nums tracking-tight">
                      {formatCurrency(method.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cumulative Revenue Chart */}
        <Card className="border-none shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Cumulative Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis stroke="#64748B" tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#0F172A"
                  name="Cumulative Received"
                  strokeWidth={4}
                  dot={{ r: 4, fill: '#0F172A', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#D4A017', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
