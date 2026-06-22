'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Zap,
  Globe,
  ChevronRight,
  TrendingUp,
  Users,
  FileText,
  Receipt,
  PieChart,
  Star,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Building2,
  Landmark,
  Lock,
  Layers,
  RefreshCw,
  MessageSquare,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string
  a: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-[#D4A017] flex items-center justify-center shadow-lg shadow-[#D4A017]/30 group-hover:shadow-[#D4A017]/50 transition-shadow">
            <span className="text-[#0a0e1a] font-black text-sm">M</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            MWALA<span className="text-[#D4A017]">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Platform', 'Solutions', 'Pricing', 'About'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/login"
            className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#b88a14] text-[#0a0e1a] font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#D4A017]/30 hover:-translate-y-0.5 active:translate-y-0">
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0a0e1a]/98 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
          {['Platform', 'Solutions', 'Pricing', 'About'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">
              {item}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link href="/login" className="text-center text-sm font-semibold text-slate-300 py-3 border border-white/10 rounded-xl hover:border-white/30 transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="text-center text-sm font-bold bg-[#D4A017] text-[#0a0e1a] py-3 rounded-xl hover:bg-[#b88a14] transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0e1a]">
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-[#D4A017]/8 top-[-100px] left-[-200px]" />
      <div className="orb w-[500px] h-[500px] bg-[#10b981]/6 bottom-[-100px] right-[-150px]" />
      <div className="orb w-[300px] h-[300px] bg-[#3b82f6]/5 top-[40%] left-[60%]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="animate-fade-up opacity-0 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-10 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
          Financial Operating System for Africa
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-delay-1 opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-[-0.04em] leading-[0.95] text-white mb-8">
          Build your business<br />
          <span className="gradient-text-gold">on solid ground.</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up-delay-2 opacity-0 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
          MWALA is the institutional-grade financial operating system built for African enterprises. 
          Invoice faster, manage customers smarter, and unlock capital.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login"
            className="group inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#b88a14] text-[#0a0e1a] font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#D4A017]/30 hover:-translate-y-1 w-full sm:w-auto justify-center">
            Start for Free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#platform"
            className="inline-flex items-center gap-2 text-white font-semibold text-base px-8 py-4 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto justify-center">
            See the Platform
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          {['No credit card required', 'Setup in 2 minutes', 'Bank-grade security', '5,000+ businesses'].map(t => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" />
              {t}
            </span>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="mt-24 relative max-w-6xl mx-auto">
          {/* Fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0e1a] to-transparent z-10 pointer-events-none" />

          <div className="glass rounded-3xl p-3 shadow-card-dark">
            <div className="rounded-2xl overflow-hidden bg-[#0d1220] border border-white/5">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-white/5">
                <div className="flex gap-1.5">
                  {['#ff5f57','#ffbd2e','#28ca41'].map(c => (
                    <div key={c} className="h-3 w-3 rounded-full" style={{backgroundColor: c}} />
                  ))}
                </div>
                <div className="flex-1 mx-4 bg-white/5 rounded-md px-3 py-1 text-[11px] text-slate-500 text-left">
                  app.mwala.co/dashboard
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="grid grid-cols-12 gap-3 p-4 min-h-[340px]">
                {/* Sidebar */}
                <div className="col-span-2 bg-[#111827]/80 rounded-xl p-3 space-y-2 hidden md:block">
                  <div className="h-7 w-7 rounded-lg bg-[#D4A017] mb-4 flex items-center justify-center">
                    <span className="text-[#0a0e1a] font-black text-xs">M</span>
                  </div>
                  {[
                    { icon: BarChart3, label: 'Dashboard', active: true },
                    { icon: FileText, label: 'Invoices' },
                    { icon: Receipt, label: 'Receipts' },
                    { icon: Users, label: 'Clients' },
                    { icon: PieChart, label: 'Reports' },
                  ].map(({ icon: Icon, label, active }) => (
                    <div key={label}
                      className={`flex items-center gap-2 px-2 py-2 rounded-lg text-[10px] font-semibold transition-colors ${
                        active ? 'bg-[#D4A017]/10 text-[#D4A017]' : 'text-slate-500 hover:text-slate-300'
                      }`}>
                      <Icon className="h-3 w-3 flex-shrink-0" />
                      <span className="hidden lg:block">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="col-span-12 md:col-span-10 grid grid-cols-3 gap-3">
                  {/* Stat cards */}
                  {[
                    { label: 'Total Revenue', value: 'MK 12.4M', delta: '+18%', color: '#10b981' },
                    { label: 'Pending Invoices', value: 'MK 3.1M', delta: '24 invoices', color: '#D4A017' },
                    { label: 'Managed Clients', value: '1,242', delta: '+12 this month', color: '#3b82f6' },
                  ].map(({ label, value, delta, color }) => (
                    <div key={label} className="glass rounded-xl p-4 space-y-2">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                      <p className="text-lg font-black text-white leading-none">{value}</p>
                      <p className="text-[9px] font-semibold" style={{ color }}>{delta}</p>
                    </div>
                  ))}

                  {/* Revenue chart */}
                  <div className="col-span-2 glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider">Revenue Trend</p>
                      <div className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[45, 60, 40, 75, 55, 80, 65, 90, 70, 85, 60, 95].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm transition-all"
                          style={{
                            height: `${h}%`,
                            background: i === 11
                              ? 'linear-gradient(to top, #D4A017, #f4d47c)'
                              : 'rgba(255,255,255,0.08)'
                          }} />
                      ))}
                    </div>
                  </div>

                  {/* Recent invoices */}
                  <div className="glass rounded-xl p-4">
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">Recent</p>
                    <div className="space-y-2.5">
                      {[
                        { n: 'Limbe Leaf', a: 'MK 450k', s: 'Paid', c: '#10b981' },
                        { n: 'TNM Malawi', a: 'MK 1.2M', s: 'Pending', c: '#D4A017' },
                        { n: 'NICO Gen', a: 'MK 890k', s: 'Overdue', c: '#ef4444' },
                      ].map(({ n, a, s, c }) => (
                        <div key={n} className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-white">{n}</p>
                            <p className="text-[9px] text-slate-500">{a}</p>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: c, background: `${c}15` }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating metric cards */}
          <div className="absolute -left-6 top-1/3 animate-float hidden xl:block">
            <div className="glass-light rounded-2xl p-4 shadow-xl w-44">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">↑ 24%</span>
              </div>
              <p className="text-xs font-black text-slate-800">MK 2.4M</p>
              <p className="text-[10px] text-slate-500">Collected this week</p>
            </div>
          </div>

          <div className="absolute -right-6 top-1/4 animate-float-slow hidden xl:block" style={{ animationDelay: '1s' }}>
            <div className="glass-light rounded-2xl p-4 shadow-xl w-44">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ShieldCheck className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-600">Bank-grade</span>
              </div>
              <p className="text-xs font-black text-slate-800">256-bit SSL</p>
              <p className="text-[10px] text-slate-500">Data encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoMarquee() {
  const brands = ['Limbe Leaf', 'Sunbird Hotels', 'Malawi Beverages', 'NICO General', 'TNM Business', 'Press Corporation', 'Standard Bank', 'Airtel Malawi']
  const doubled = [...brands, ...brands]

  return (
    <section className="py-16 bg-[#0d1220] border-y border-white/5 overflow-hidden">
      <p className="text-center text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-10">
        Trusted by leading African businesses
      </p>
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {doubled.map((brand, i) => (
          <span key={i} className="text-lg font-black text-slate-700 hover:text-slate-400 transition-colors cursor-default tracking-tighter flex-shrink-0">
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  const { ref, visible } = useScrollAnimation()

  const stats = [
    { value: '5,000+', label: 'Growing Businesses', sub: 'Across 12 African markets' },
    { value: 'MK 14.2B', label: 'Capital Tracked', sub: 'Securely managed revenue' },
    { value: '24k', label: 'Daily Invoices', sub: 'Automated billing cycles' },
    { value: '99.9%', label: 'Uptime SLA', sub: 'Enterprise reliability' },
  ]

  return (
    <section ref={ref} className="py-28 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, sub }, i) => (
            <div key={i}
              className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">{value}</p>
              <p className="text-[11px] font-bold text-[#D4A017] uppercase tracking-widest mb-1">{label}</p>
              <p className="text-[11px] text-slate-600">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformSection() {
  const { ref, visible } = useScrollAnimation()
  const [active, setActive] = useState(0)

  const features = [
    {
      icon: FileText,
      title: 'Professional Invoicing',
      desc: 'Create, send, and track invoices in seconds. Automate reminders and get paid 3x faster with digital receipts your clients trust.',
      stats: ['Auto-reminders', 'PDF export', 'WhatsApp delivery'],
      color: '#D4A017',
    },
    {
      icon: Users,
      title: 'Customer Intelligence',
      desc: 'Know exactly who owes you, their payment history, and their lifetime value. Build lasting client relationships with institutional-grade data.',
      stats: ['Payment history', 'Credit scoring', 'Relationship CRM'],
      color: '#10b981',
    },
    {
      icon: BarChart3,
      title: 'Financial Analytics',
      desc: 'Real-time dashboards that show your cash flow, revenue trends, and business health. The reports banks and investors want to see.',
      stats: ['Cash flow forecasting', 'Profit & Loss', 'Tax-ready reports'],
      color: '#3b82f6',
    },
    {
      icon: Receipt,
      title: 'Receipt Management',
      desc: 'Issue branded digital receipts instantly via WhatsApp, email, or SMS. Build trust with every transaction.',
      stats: ['Multi-channel delivery', 'Branded templates', 'Payment tracking'],
      color: '#a855f7',
    },
  ]

  return (
    <section id="platform" ref={ref} className="py-32 bg-[#0d1220]">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.2em] mb-4">
            <span className="h-px w-8 bg-[#D4A017]" />
            Built for the African Hustle
            <span className="h-px w-8 bg-[#D4A017]" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mt-4">
            Everything you need<br />to scale your business.
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            From first invoice to institutional finance — MWALA grows with you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Feature list */}
          <div className="space-y-3">
            {features.map(({ icon: Icon, title, desc, stats, color }, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group ${
                  active === i
                    ? 'bg-white/5 border-white/10 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-white/3 hover:border-white/5'
                }`}>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: active === i ? `${color}20` : 'rgba(255,255,255,0.05)' }}>
                    <Icon className="h-5 w-5 transition-colors" style={{ color: active === i ? color : '#64748b' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-base mb-1 transition-colors ${active === i ? 'text-white' : 'text-slate-400'}`}>
                      {title}
                    </h3>
                    {active === i && (
                      <>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">{desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {stats.map(s => (
                            <span key={s} className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                              style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                    active === i ? 'rotate-90 text-white' : 'text-slate-600'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          {/* Feature preview panel */}
          <div className="sticky top-28">
            <div className="glass rounded-3xl p-6 min-h-[480px] flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${features[active].color}20` }}>
                  {React.createElement(features[active].icon, {
                    className: 'h-4 w-4',
                    style: { color: features[active].color }
                  })}
                </div>
                <span className="text-sm font-bold text-white">{features[active].title}</span>
                <div className="ml-auto flex gap-1">
                  {[1,2,3].map(d => (
                    <div key={d} className="h-2 w-2 rounded-full" style={{
                      background: d === 1 ? features[active].color : 'rgba(255,255,255,0.1)'
                    }} />
                  ))}
                </div>
              </div>

              {/* Dynamic preview content per feature */}
              {active === 0 && <InvoicePreview />}
              {active === 1 && <CustomerPreview />}
              {active === 2 && <AnalyticsPreview />}
              {active === 3 && <ReceiptPreview />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InvoicePreview() {
  return (
    <div className="flex-1 bg-white/3 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Invoice</p>
          <p className="text-base font-black text-white">INV-2024-0089</p>
        </div>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">Paid</span>
      </div>
      <div className="h-px bg-white/5" />
      {[
        { item: 'Consulting Services', qty: 'x3', amount: 'MK 450,000' },
        { item: 'Software License', qty: 'x1', amount: 'MK 120,000' },
        { item: 'Support Package', qty: 'x1', amount: 'MK 80,000' },
      ].map(({ item, qty, amount }) => (
        <div key={item} className="flex items-center justify-between text-[11px]">
          <div>
            <p className="font-semibold text-slate-200">{item}</p>
            <p className="text-slate-600">{qty}</p>
          </div>
          <p className="font-bold text-white">{amount}</p>
        </div>
      ))}
      <div className="h-px bg-white/5" />
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">Total Due</span>
        <span className="text-lg font-black text-[#D4A017]">MK 650,000</span>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">Client</p>
          <p className="text-[11px] font-bold text-white mt-1">Limbe Leaf Ltd</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">Due Date</p>
          <p className="text-[11px] font-bold text-white mt-1">Dec 31, 2024</p>
        </div>
      </div>
    </div>
  )
}

function CustomerPreview() {
  return (
    <div className="flex-1 space-y-3">
      {[
        { name: 'Limbe Leaf Ltd', type: 'Corporate', balance: 'MK 1.2M', status: 'Active', color: '#10b981' },
        { name: 'TNM Malawi', type: 'Telecom', balance: 'MK 3.4M', status: 'Active', color: '#10b981' },
        { name: 'NICO General', type: 'Insurance', balance: 'MK 890k', status: 'Overdue', color: '#ef4444' },
      ].map(({ name, type, balance, status, color }) => (
        <div key={name} className="bg-white/3 rounded-xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-default">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-black text-white flex-shrink-0">
            {name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{name}</p>
            <p className="text-[11px] text-slate-500">{type}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">{balance}</p>
            <span className="text-[10px] font-bold" style={{ color }}>{status}</span>
          </div>
        </div>
      ))}
      <div className="bg-white/3 rounded-xl p-4 flex items-center justify-between">
        <p className="text-[11px] text-slate-500">Total managed relationships</p>
        <p className="text-base font-black text-white">1,242</p>
      </div>
    </div>
  )
}

function AnalyticsPreview() {
  const bars = [42, 58, 45, 72, 51, 83, 65, 91, 74, 88, 61, 96]
  return (
    <div className="flex-1 space-y-4">
      <div className="bg-white/3 rounded-xl p-4">
        <div className="flex items-end gap-1 h-28">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all duration-500"
              style={{
                height: `${h}%`,
                background: i === bars.length - 1
                  ? 'linear-gradient(to top, #D4A017, #f4d47c)'
                  : i >= bars.length - 3 ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.08)'
              }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-slate-600">
          <span>Jan</span><span>Jun</span><span>Dec</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Net Revenue', value: 'MK 12.4M', delta: '+18%', c: '#10b981' },
          { label: 'Outstanding', value: 'MK 3.1M', delta: '24 inv.', c: '#D4A017' },
        ].map(({ label, value, delta, c }) => (
          <div key={label} className="bg-white/3 rounded-xl p-3">
            <p className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="text-base font-black text-white mt-1">{value}</p>
            <p className="text-[10px] font-bold mt-0.5" style={{ color: c }}>{delta}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReceiptPreview() {
  return (
    <div className="flex-1 bg-white/3 rounded-2xl p-5">
      <div className="text-center mb-4">
        <div className="h-10 w-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center mx-auto mb-3">
          <Receipt className="h-5 w-5 text-[#a855f7]" />
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Receipt</p>
        <p className="text-xl font-black text-white mt-1">RCP-2024-0312</p>
      </div>
      <div className="space-y-2 mb-4">
        {[
          { label: 'Amount Received', value: 'MK 650,000' },
          { label: 'Payment Method', value: 'Bank Transfer' },
          { label: 'Reference', value: 'TXN-8829-NICO' },
          { label: 'Date', value: 'Dec 22, 2024' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-[11px]">
            <span className="text-slate-500">{label}</span>
            <span className="text-white font-semibold">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        <div className="flex-1 bg-[#a855f7]/10 text-[#a855f7] text-[10px] font-bold py-2 rounded-lg text-center border border-[#a855f7]/20">
          Send WhatsApp
        </div>
        <div className="flex-1 bg-white/5 text-slate-300 text-[10px] font-bold py-2 rounded-lg text-center border border-white/10">
          Download PDF
        </div>
      </div>
    </div>
  )
}

function AfricanRealitySection() {
  const { ref, visible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-32 bg-[#0a0e1a] relative overflow-hidden">
      <div className="orb w-96 h-96 bg-[#D4A017]/5 top-0 right-0" />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-20 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-10">
            <div>
              <span className="text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.2em]">Built for the African Reality</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mt-4">
                Beyond the ledger.<br />
                <span className="gradient-text-gold">Built for the institution.</span>
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  icon: Layers,
                  title: 'Graduate from Spreadsheets',
                  desc: 'Paper trails and manual entries are growth limiters. MWALA formalizes your records so you\'re always ready for an audit or an investor.',
                },
                {
                  icon: Building2,
                  title: 'Bridge the Trust Gap',
                  desc: 'Professional invoicing and instant digital receipts build immediate credibility with corporate clients and international partners.',
                },
                {
                  icon: Landmark,
                  title: 'Unlock Working Capital',
                  desc: 'Clean financial data is the first step toward financing. We provide the reports banks need to see to say \'Yes\' to your expansion.',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4A017]/10 group-hover:border-[#D4A017]/20 transition-all duration-300">
                    <Icon className="h-5 w-5 text-slate-500 group-hover:text-[#D4A017] transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1">{title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial card */}
          <div className="relative">
            <div className="bg-[#0d1220] rounded-3xl p-10 border border-white/5 relative overflow-hidden">
              <div className="orb w-64 h-64 bg-[#D4A017]/6 -top-16 -right-16" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-[#D4A017] text-[#D4A017]" />)}
                </div>
                <div className="h-0.5 w-12 bg-[#D4A017] mb-6" />
                <blockquote className="text-xl font-medium text-white leading-relaxed mb-8">
                  &ldquo;MWALA didn&apos;t just give us software; they gave us a system to prove we were a serious business. We secured a MK 50M loan within 3 months.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#D4A017] to-[#b8860b] flex items-center justify-center text-[#0a0e1a] font-black">
                    CB
                  </div>
                  <div>
                    <p className="font-bold text-white">Chisomo Banda</p>
                    <p className="text-sm text-[#D4A017] font-medium uppercase tracking-widest text-[10px]">MD, Banda Logistics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-4 glass-light rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#10b981] flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-800">Loan Approved</p>
                  <p className="text-[10px] text-slate-500">MK 50,000,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesGrid() {
  const { ref, visible } = useScrollAnimation()

  const items = [
    { icon: Zap, title: 'Get Paid 3× Faster', desc: 'Automate your entire invoicing lifecycle from estimates to instant digital receipts.', color: '#D4A017' },
    { icon: BarChart3, title: 'Predict Your Growth', desc: 'Real-time cash flow forecasting tells you exactly when you\'ll hit your next milestone.', color: '#10b981' },
    { icon: ShieldCheck, title: 'Become Bank-Ready', desc: 'Maintain digital records that make your business attractive to lenders and investors.', color: '#3b82f6' },
    { icon: Lock, title: 'Bank-Grade Security', desc: '256-bit SSL encryption and enterprise-grade access controls protect your data.', color: '#a855f7' },
    { icon: RefreshCw, title: 'Automated Workflows', desc: 'Recurring invoices, payment reminders, and statement generation — all automated.', color: '#f97316' },
    { icon: MessageSquare, title: 'WhatsApp Delivery', desc: 'Send invoices and receipts directly via WhatsApp — meeting customers where they are.', color: '#10b981' },
  ]

  return (
    <section id="solutions" ref={ref} className="py-32 bg-[#0d1220]">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.2em] mb-4">
            <span className="h-px w-8 bg-[#D4A017]" />
            Core Capabilities
            <span className="h-px w-8 bg-[#D4A017]" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i}
              className={`group p-7 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${color}15` }}>
                <Icon className="h-6 w-6" style={{ color }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { ref, visible } = useScrollAnimation()

  const testimonials = [
    { quote: 'Before MWALA, we were losing track of thousands in unpaid invoices every month. Now our collection rate is 94%.', name: 'Mphatso Phiri', role: 'CEO, Phiri Trading Co.', initials: 'MP' },
    { quote: 'The professional invoices alone changed how clients perceive us. We went from small business to institutional overnight.', name: 'Grace Mwale', role: 'Director, Mwale Consulting', initials: 'GM' },
    { quote: 'MWALA\'s reporting gave us the financial statements that secured our first commercial loan. Game changer.', name: 'James Nkosi', role: 'Founder, Nkosi Supplies', initials: 'JN' },
  ]

  return (
    <section ref={ref} className="py-32 bg-[#0a0e1a] relative overflow-hidden">
      <div className="orb w-96 h-96 bg-[#D4A017]/5 bottom-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.2em] mb-4">
            <span className="h-px w-8 bg-[#D4A017]" />
            Testimonials
            <span className="h-px w-8 bg-[#D4A017]" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
            Businesses that chose<br />to level up.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, initials }, i) => (
            <div key={i}
              className={`glass rounded-2xl p-8 flex flex-col justify-between transition-all duration-700 hover:-translate-y-1 hover:border-white/15 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-[#D4A017] text-[#D4A017]" />)}
                </div>
                <blockquote className="text-slate-300 text-sm leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>
              </div>
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4A017] to-[#b8860b] flex items-center justify-center text-[#0a0e1a] font-black text-sm">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{name}</p>
                  <p className="text-[11px] text-slate-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const { ref, visible } = useScrollAnimation()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs: FaqItem[] = [
    { q: 'How long does setup take?', a: 'Less than 2 minutes. Create an account, add your business details, and send your first invoice. No technical knowledge required.' },
    { q: 'Is my financial data secure?', a: 'Yes. We use 256-bit SSL encryption, the same standard used by global banks. Your data is backed up daily and never shared with third parties.' },
    { q: 'Can I use MWALA for multiple businesses?', a: 'Absolutely. You can manage multiple business entities from a single MWALA account, with separate financial records for each.' },
    { q: 'Does MWALA work offline?', a: 'MWALA is a cloud-based platform requiring an internet connection. All data syncs in real time across all your devices.' },
    { q: 'What currencies does MWALA support?', a: 'MWALA natively supports Malawian Kwacha (MK) with additional African currency support planned. Multi-currency reporting is on our roadmap.' },
    { q: 'Can I export my data?', a: 'Yes. Export your financial records, invoices, and reports in PDF or CSV format at any time. Your data always belongs to you.' },
  ]

  return (
    <section ref={ref} className="py-32 bg-[#0d1220]">
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.2em] mb-4">
            <span className="h-px w-8 bg-[#D4A017]" />
            FAQ
            <span className="h-px w-8 bg-[#D4A017]" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
            Common questions.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i}
              className={`glass rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 60}ms` }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group">
                <span className="font-semibold text-white text-sm pr-8">{q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-[#D4A017]' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-40' : 'max-h-0'}`}>
                <p className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const { ref, visible } = useScrollAnimation()
  return (
    <section ref={ref} className="py-24 bg-[#0a0e1a] px-6">
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0d1220] via-[#111827] to-[#0d1220] border border-white/10 p-12 md:p-20 text-center">
          {/* Orbs */}
          <div className="orb w-72 h-72 bg-[#D4A017]/12 -top-12 -right-12" />
          <div className="orb w-72 h-72 bg-[#10b981]/8 -bottom-12 -left-12" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.2em] mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#D4A017] animate-pulse" />
              Start today — no credit card required
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Build your business<br />
              <span className="gradient-text-gold">on solid ground.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
              Join 5,000+ African businesses that trust MWALA to run their finances. Setup in 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login"
                className="group inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#b88a14] text-[#0a0e1a] font-bold text-base px-10 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#D4A017]/30 hover:-translate-y-1 w-full sm:w-auto justify-center">
                Open Your Account Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login"
                className="inline-flex items-center gap-2 text-white font-semibold text-base px-8 py-4 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto justify-center">
                View Product Demo
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
              {['No credit card required', 'Cancel anytime', '24/7 Support', 'Free forever plan'].map(t => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#060810] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#D4A017] flex items-center justify-center shadow-lg shadow-[#D4A017]/30">
                <span className="text-[#0a0e1a] font-black text-sm">M</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                MWALA<span className="text-[#D4A017]">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              The Financial Operating System for African Businesses. Professional infrastructure for the next generation of African enterprises.
            </p>
            <p className="text-[11px] text-slate-700 uppercase tracking-widest font-bold">
              Malawi • English
            </p>
          </div>

          {[
            { title: 'Product', links: ['Invoicing', 'Receipts', 'Reporting', 'Customers', 'Analytics'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security', 'Cookies'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-700 font-medium">
            © {new Date().getFullYear()} Mwala Business Finance. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 uppercase tracking-widest">
            <Globe className="h-3.5 w-3.5" />
            Africa First
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e1a]">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <LogoMarquee />
        <StatsSection />
        <PlatformSection />
        <AfricanRealitySection />
        <FeaturesGrid />
        <TestimonialsSection />
        <FaqSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}