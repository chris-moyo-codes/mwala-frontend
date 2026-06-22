'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { CustomerTable } from '@/components/customers/CustomerTable'
import { CustomerDetail } from '@/components/customers/CustomerDetail'
import { mockCustomers, mockInvoices, mockReceipts } from '@/mock-data' // Added mockInvoices, mockReceipts
import { Customer, Invoice, Receipt } from '@/types' // Added Invoice, Receipt types
import { Plus, Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, AlertCircle, HeartHandshake, Zap, ChevronRight, Clock } from 'lucide-react' // Added AlertCircle, HeartHandshake, Zap, ChevronRight, Clock
import { cn, formatCurrency, formatDate, calculateCustomerMetrics } from '@/lib/utils' // Added calculateCustomerMetrics
// Mock data augmentation for customer insights
export default function CustomersPage() { // Customers Page component
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // --- Mock Data Augmentation for new insights ---
  // In a real app, these would come from an API
  const augmentedCustomers = useMemo(() => {
    return mockCustomers.map(customer => {
      const metrics = calculateCustomerMetrics(customer.id, mockInvoices, mockReceipts);
      
      // Augment with mock industry and health status for demonstration
      const industries = ['Retail', 'Logistics', 'Manufacturing', 'Services', 'Agriculture', 'Technology'];
      const randomIndustry = industries[Math.floor(Math.random() * industries.length)];

      let healthStatus: 'healthy' | 'growing' | 'at_risk' | 'inactive' = 'healthy';
      if (metrics.outstandingBalance > 500000) healthStatus = 'at_risk';
      else if (metrics.totalRevenue > 10000000 && metrics.outstandingBalance === 0) healthStatus = 'growing';
      else if (metrics.lastActivity && (Date.now() - metrics.lastActivity.getTime()) > (90 * 24 * 60 * 60 * 1000)) healthStatus = 'inactive'; // Inactive if no activity for 90 days

      let collectionPerformance: 'good' | 'average' | 'poor' = 'good';
      if (metrics.overdueInvoicesCount > 0) collectionPerformance = 'poor';
      else if (metrics.totalInvoices > 0 && metrics.totalPaidInvoices / metrics.totalInvoices < 0.8) collectionPerformance = 'average';

      return {
        ...customer,
        ...metrics,
        industry: randomIndustry,
        healthStatus,
        collectionPerformance,
      };
    });
  }, [mockCustomers, mockInvoices, mockReceipts]);

  const filteredCustomers = augmentedCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus

    return matchesSearch && matchesStatus
  })
  
  const {
    totalCustomers,
    activeCustomers,
    totalOutstandingBalance,
    totalCustomerValue,
    customerGrowthRate, // Mocked for now
    customerHealthMatrix,
    topRevenueContributors,
    customersRequiringAttention,
    mwalaIntelligenceInsights
  } = useMemo(() => {
    const totalCustomers = augmentedCustomers.length;
    const activeCustomers = augmentedCustomers.filter(c => c.status === 'active').length;
    const totalOutstandingBalance = augmentedCustomers.reduce((sum, c) => sum + c.outstandingBalance, 0);
    const totalCustomerValue = augmentedCustomers.reduce((sum, c) => sum + c.totalRevenue, 0);
    const customerGrowthRate = '+5.2%'; // Placeholder, would be calculated from historical data

    // Customer Health Matrix
    const healthMatrix = {
      healthy: { count: 0, revenue: 0, performance: 0 },
      growing: { count: 0, revenue: 0, performance: 0 },
      at_risk: { count: 0, revenue: 0, performance: 0 },
      inactive: { count: 0, revenue: 0, performance: 0 },
    };
    augmentedCustomers.forEach(c => {
      healthMatrix[c.healthStatus].count++;
      healthMatrix[c.healthStatus].revenue += c.totalRevenue;
      // Simple average for performance, real logic would be more complex
      healthMatrix[c.healthStatus].performance += (c.collectionPerformance === 'good' ? 80 : c.collectionPerformance === 'average' ? 50 : 20);
    });
    Object.values(healthMatrix).forEach(h => {
      if (h.count > 0) h.performance = h.performance / h.count;
    });

    // Top Revenue Contributors
    const topRevenueContributors = [...augmentedCustomers]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);

    // Customers Requiring Attention
    const customersRequiringAttention = [...augmentedCustomers]
      .filter(c => c.healthStatus === 'at_risk' || c.collectionPerformance === 'poor' || c.outstandingBalance > 0)
      .sort((a, b) => b.outstandingBalance - a.outstandingBalance) // Prioritize by outstanding balance
      .slice(0, 5);

    // MWALA Intelligence Insights
    const mwalaIntelligenceInsights = [
      { 
        id: 1, 
        text: `Concentration Risk: ${((topRevenueContributors.reduce((s, c) => s + c.totalRevenue, 0) / (totalCustomerValue || 1)) * 100).toFixed(0)}% of revenue from top 3 clients.`, 
        subtext: 'Diversification recommended for bankability.', 
        type: 'risk', 
        actionLabel: 'Review Portfolio', 
        actionHref: '/dashboard/customers?filter=concentration' 
      },
      { 
        id: 2, 
        text: `Capital Readiness: Ledger is 98% reconciled for current quarter.`, 
        subtext: 'Audit-trail is healthy for financing.', 
        type: 'compliance', 
        actionLabel: 'Generate Report', 
        actionHref: '/dashboard/reports?type=audit' 
      },
      { id: 3, text: `Liquidity Signal: Mean Time to Payment (MTTP) has dropped by 4.2 days.`, subtext: 'Cash velocity is accelerating.', type: 'velocity' },
      { id: 4, text: `B2B Trust Score: Your network trust rating is 'Prime'.`, subtext: 'Eligible for Tier-1 lender integration.', type: 'trust' },
      // Add a dynamic insight for customers requiring attention
      ...(customersRequiringAttention.length > 0 ? [{ id: 5, text: `${customersRequiringAttention.length} customers require immediate attention.`, subtext: 'High outstanding balances or overdue invoices.', type: 'attention', actionLabel: 'View Attention List', actionHref: '/dashboard/customers?filter=attention' }] : [])
    ];

    return { totalCustomers, activeCustomers, totalOutstandingBalance, totalCustomerValue, customerGrowthRate, customerHealthMatrix: healthMatrix, topRevenueContributors, customersRequiringAttention, mwalaIntelligenceInsights };
  }, [augmentedCustomers]);

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedCustomer(null), 300)
  };

  const [isSplitView, setIsSplitView] = useState(false);
  useEffect(() => {
    setIsSplitView(isDetailOpen);
  }, [isDetailOpen]);

  return (
    <DashboardLayout title="Customers">
      <div className={cn("flex gap-8", isSplitView ? "h-[calc(100vh-10rem)]" : "")}>
        <div className={cn("flex-1 space-y-6", isSplitView ? "max-w-[calc(100%-400px)]" : "max-w-[1200px] mx-auto")}>
        {/* Page header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Customer Intelligence Center</h1>
            <p className="text-slate-400 font-medium mt-1">
              Customer Relationship Intelligence for Ambitious Businesses.
            </p>
          </div>
          <Button variant="default" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E0B03B] hover:bg-[#c99a2c] text-[#0B1220] font-bold shadow-lg shadow-[#E0B03B]/20">
            <Plus className="h-4 w-4 stroke-[3px]" />
            Add Customer
          </Button>
        </div>

        {/* SECTION 1: Executive Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Customers', value: totalCustomers, icon: Users, trend: '+3.1%', context: 'vs last month', isPositive: true },
            { label: 'Active Customers', value: activeCustomers, icon: Users, trend: '+1.5%', context: 'vs last month', isPositive: true },
            { label: 'Outstanding Balance', value: formatCurrency(totalOutstandingBalance), icon: DollarSign, trend: null, color: 'text-[#EF4444]' },
            { label: 'Growth Rate', value: customerGrowthRate, icon: TrendingUp, trend: '+5.2%', isPositive: true },
          ].map((kpi) => (
            <Card key={kpi.label} className="border-[#263043] bg-[#111B31] shadow-sm hover:border-[#E0B03B]/50 transition-all duration-300 group">
              <CardContent className="p-5">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {kpi.label}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className={cn("text-2xl font-bold tabular-nums tracking-tight", kpi.color || "text-white")}>
                      {kpi.value}
                    </p>
                    {kpi.trend && (
                      <span className={cn(
                        "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full border",
                        kpi.isPositive ? "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20" : "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20"
                      )}>
                        {kpi.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {kpi.trend}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* SECTION 2: Customer Health Matrix & SECTION 7: MWALA Intelligence */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Customer Health Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Customer Health Matrix</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Healthy', status: 'healthy', icon: HeartHandshake, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10', data: customerHealthMatrix.healthy },
                { label: 'Growing', status: 'growing', icon: TrendingUp, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10', data: customerHealthMatrix.growing },
                { label: 'At Risk', status: 'at_risk', icon: AlertCircle, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', data: customerHealthMatrix.at_risk },
                { label: 'Inactive', status: 'inactive', icon: Clock, color: 'text-slate-400', bg: 'bg-slate-400/10', data: customerHealthMatrix.inactive },
              ].map((health) => (
                <Card key={health.status} className="border-[#263043] bg-[#111B31] shadow-sm hover:border-slate-400/50 transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className={cn("text-[10px] font-bold uppercase tracking-widest", health.color)}>{health.label}</p>
                      <health.icon className={cn("h-4 w-4", health.color)} />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white tabular-nums tracking-tight">{health.data.count}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {formatCurrency(health.data.revenue)} Rev
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">•</span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {health.data.performance.toFixed(0)}% Perf.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SECTION 7: MWALA Intelligence */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">MWALA Intelligence</h2>
            <Card className="border-[#263043] bg-[#111B31] text-white overflow-hidden relative shadow-2xl group cursor-default">
              <div className="absolute top-0 right-0 h-48 w-48 bg-[#E0B03B]/10 blur-[100px] rounded-full transition-opacity group-hover:opacity-100 opacity-60" />
              <CardContent className="p-8 space-y-8 relative z-10">
                {mwalaIntelligenceInsights.map((insight) => (
                  <div key={insight.id} className="space-y-2 group">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-[#E0B03B]" />
                      <p className="text-[9px] font-bold text-[#E0B03B] uppercase tracking-[0.25em]">Strategic Insight</p>
                    </div>
                    <p className="text-lg font-medium leading-snug text-white">
                      {insight.text}
                    </p>
                    {insight.subtext && <p className="text-sm text-slate-400">{insight.subtext}</p>}
                    {insight.actionLabel && insight.actionHref && (
                      <Link href={insight.actionHref} className="inline-flex items-center gap-1 text-xs font-bold text-[#E0B03B] hover:text-white transition-colors mt-2">
                        {insight.actionLabel} <ChevronRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                ))}
                <Button variant="secondary" className="w-full text-[10px] h-12 uppercase tracking-widest font-bold bg-[#161F38] hover:bg-[#263043] text-white border-none">
                  View Customer Strategy Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SECTION 5: Top Revenue Contributors & SECTION 6: Customers Requiring Attention */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Top Revenue Contributors */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Top Revenue Contributors</h2>
            <Card className="border-[#263043] bg-[#111B31] shadow-sm overflow-hidden">
              <div className="divide-y divide-[#263043]">
                {topRevenueContributors.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 hover:bg-[#161F38] transition-all cursor-pointer group" onClick={() => handleRowClick(customer)}>
                    <div className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-lg bg-[#161F38] border border-[#263043] flex items-center justify-center text-slate-400 group-hover:bg-[#E0B03B] group-hover:text-[#0B1220] transition-all duration-300">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-[#E0B03B]">{customer.name}</p>
                        <p className="text-[10px] text-slate-400">{customer.businessName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#22C55E] tabular-nums">{formatCurrency(customer.totalRevenue)}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">{customer.industry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Customers Requiring Attention */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Customers Requiring Attention</h2>
            <div className="space-y-3">
              {customersRequiringAttention.length > 0 ? customersRequiringAttention.map((customer) => (
                <div
                  key={customer.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                    customer.healthStatus === 'at_risk' ? "bg-[#EF4444]/10 border-[#EF4444]/20 hover:border-[#EF4444]/50" : "bg-[#F59E0B]/10 border-[#F59E0B]/20 hover:border-[#F59E0B]/50"
                  )}
                  onClick={() => handleRowClick(customer)}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-9 w-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                      customer.healthStatus === 'at_risk' ? "bg-[#EF4444]/20 text-[#EF4444]" : "bg-[#F59E0B]/20 text-[#F59E0B]"
                    )}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-slate-300">{customer.name}</p>
                      <p className="text-[9px] uppercase font-bold tracking-[0.15em] mt-0.5 text-slate-400">
                        {customer.healthStatus === 'at_risk' ? 'At Risk' : 'Pending Action'} • {formatCurrency(customer.outstandingBalance)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                  </div>
                </div>
              )) : (
                <div className="p-6 text-center text-slate-500 italic">
                  No customers currently require special attention.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Customer Directory */}
        <div className="pt-4">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Customer Directory</h2>
          {filteredCustomers.length > 0 ? (
            <CustomerTable
              customers={filteredCustomers}
              onRowClick={handleRowClick}
              selectedCustomerId={selectedCustomer?.id}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <p className="text-lg font-semibold text-white">Strong businesses are built on strong customer relationships.</p>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Start by adding your first customer to begin building your intelligence.
              </p>
              <Button variant="default" className="bg-[#E0B03B] hover:bg-[#c99a2c] text-[#0B1220] font-bold shadow-lg shadow-[#E0B03B]/20 px-6">
                <Plus className="h-4 w-4 stroke-[3px] mr-2" /> Add First Customer
              </Button>
              {searchTerm || filterStatus !== 'all' ? (
                <Button variant="ghost" onClick={() => { setSearchTerm(''); setFilterStatus('all'); }}>
                  Clear all filters
                </Button>
              ) : null}
            </div>
          )}
        </div>
        </div>

        {/* SECTION 4: Customer Profile Split View */}
        <CustomerDetail
          customer={selectedCustomer}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      </div>
    </DashboardLayout>
  );
}
