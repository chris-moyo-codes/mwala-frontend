import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/shared/Button'
import { cn } from '@/lib/utils'
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe,
  ChevronRight,
  TrendingUp,
  Users
} from 'lucide-react'

export const metadata = {
  title: 'MWALA | Professional Business Management for African SMEs',
  description: 'The definitive platform for managing customers, invoices, and business growth in Africa.',
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] selection:bg-[#D4A017]/30">
      {/* Navigation */} 
      <nav className="sticky top-0 z-50 w-full border-b border-[#0F172A]/10 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-[#0F172A]">
              MWALA<span className="text-[#D4A017]">.</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">Platform</Link>
            <Link href="#solutions" className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">Solutions</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-[#0F172A] transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button variant="default" className="shadow-xl shadow-slate-200 px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                <span className="flex h-2 w-2 rounded-full bg-[#D4A017] animate-pulse" />
                Institutional Infrastructure
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]">
                Build your business on <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#D4A017] to-[#0F172A]">
                  solid ground.
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Professionalize your operations, automate your invoicing, and unlock capital.
                MWALA is the operating system for the next generation of African enterprises.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button variant="default" size="lg" className="h-14 px-8 text-base shadow-2xl shadow-slate-300 gap-2 w-full sm:w-auto transition-all hover:-translate-y-0.5">
                  Get Started for Free <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="lg" className="h-14 px-8 text-base w-full sm:w-auto transition-all hover:-translate-y-0.5">
                  Watch Product Tour
                </Button>
              </div>
            </div>

            {/* Hero Mockup Preview */}
            <div className="mt-20 relative max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent z-10" />
              <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_48px_80px_-16px_rgba(15,23,42,0.15)] ring-1 ring-[#0F172A]/5">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 aspect-[21/9] relative overflow-hidden grid grid-cols-12 gap-1 p-1">
                    {/* Left: Financial Pulse Mockup */}
                    <div className="col-span-4 bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+18%</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net Revenue</p>
                          <p className="text-2xl font-bold text-[#0F172A]">MK 12,450,000</p>
                        </div>
                        <div className="space-y-2 pt-2">
                          {[60, 45, 80, 55].map((w, i) => (
                            <div key={i} className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0F172A]" style={{ width: `${w}%` }} />
                            </div>
                          ))}
                        </div>
                    </div>

                    {/* Center: Live Ledger Mockup */}
                    <div className="col-span-5 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">Recent Activity</p>
                          <div className="h-2 w-2 rounded-full bg-[#D4A017] animate-pulse" />
                        </div>
                        <div className="space-y-3">
                          {[
                            { n: 'Limbe Leaf', a: 'MK 450k', s: 'Paid' },
                            { n: 'TNM Malawi', a: 'MK 1.2M', s: 'Pending' },
                            { n: 'NICO Gen', a: 'MK 890k', s: 'Overdue' }
                          ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
                              <span className="text-[11px] font-bold text-[#0F172A]">{row.n}</span>
                              <div className="text-right">
                                <p className="text-[10px] font-bold">{row.a}</p>
                                <p className={cn("text-[9px] font-medium", row.s === 'Paid' ? 'text-emerald-600' : row.s === 'Overdue' ? 'text-red-600' : 'text-[#D4A017]')}>{row.s}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                    </div>

                    {/* Right: Growth Stats Mockup */}
                    <div className="col-span-3 bg-[#0F172A] rounded-xl shadow-lg p-6 flex flex-col justify-center border border-white/10">
                        <Users className="h-6 w-6 text-[#D4A017] mb-4" />
                        <p className="text-3xl font-bold text-white tracking-tighter">1,242</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Managed Relationships</p>
                        <div className="mt-6 flex -space-x-2">
                          {[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-[#0F172A] bg-slate-700" />)}
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-40 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F172A]/5 rounded-full blur-[120px]" />
          </div>
        </section>

        {/* Trust/Social Proof */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 text-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20 max-w-5xl mx-auto">
              {[
                { v: '5,000+', l: 'Growing Businesses', desc: 'Across 12 African markets' },
                { v: 'MK 14.2B', l: 'Capital Tracked', desc: 'Securely managed revenue' },
                { v: '24k', l: 'Daily Invoices', desc: 'Automated billing cycles' },
                { v: 'Audit-Ready', l: 'Financial Records', desc: 'Bank-grade compliance' }
              ].map((stat, i) => (
                <div key={i} className="space-y-2 text-left md:text-center">
                  <p className="text-3xl font-black text-[#0F172A] tracking-tighter">{stat.v}</p>
                  <div>
                    <p className="text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.1em]">{stat.l}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
              {['Limbe Leaf', 'Sunbird Hotels', 'Malawi Beverages', 'NICO General', 'TNM Business'].map(brand => (
                <span key={brand} className="text-xl font-bold text-slate-900 tracking-tighter">{brand}</span>
              ))}
            </div>
          </div>
        </section>

        {/* The African Business Reality Section */}
        <section className="py-32 bg-[#F8FAFC]">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
                  Beyond the Ledger: <br />
                  Built for the hustle, <br />
                  <span className="text-[#D4A017]">Engineered for the institution.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { t: "Graduate from Spreadsheets", d: "Paper trails and manual entries are growth limiters. MWALA formalizes your records so you're always ready for an audit or an investor." },
                    { t: "Bridge the Trust Gap", d: "Professional invoicing and instant digital receipts build immediate credibility with corporate clients and international partners." },
                    { t: "Unlock Working Capital", d: "Clean financial data is the first step toward financing. We provide the reports banks need to see to say 'Yes' to your expansion." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 h-5 w-5 rounded-full bg-[#D4A017]/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-3 w-3 text-[#D4A017]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-lg">{item.t}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-[#0F172A] rounded-3xl p-8 aspect-square flex flex-col justify-end overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  <div className="relative z-10 space-y-4">
                    <div className="h-1 w-20 bg-[#D4A017]" />
                    <p className="text-2xl font-medium text-white leading-relaxed">
                      "MWALA didn't just give us software; they gave us a system to prove we were a serious business."
                    </p>
                    <div className="pt-4">
                      <p className="font-bold text-white">Chisomo Banda</p>
                      <p className="text-sm text-[#D4A017] font-medium uppercase tracking-widest">MD, Banda Logistics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="features" className="py-32 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-sm font-bold text-[#D4A017] uppercase tracking-widest italic">Built for the African Hustle</h2>
              <p className="text-4xl font-bold text-[#0F172A] tracking-tight">
                Everything you need to move from "Managing" to "Scaling."
              </p>
            </div>
            <Link href="/login" className="text-sm font-bold text-[#0F172A] flex items-center gap-2 group">
              Explore all features <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Get Paid 3x Faster',
                desc: 'Stop chasing checks. Automate your invoicing lifecycle from professional estimates to instant digital receipts.',
                icon: Zap
              },
              {
                title: 'Predict Your Growth',
                desc: 'Know exactly who owes you and when your business will hit its next milestone with real-time cash flow forecasting.',
                icon: BarChart3
              },
              {
                title: 'Become Bank-Ready',
                desc: 'Move away from paper trails. Maintain digital records that make your business attractive to lenders and investors.',
                icon: ShieldCheck
              }
            ].map((feature, i) => (
              <div key={i} className="group space-y-6 p-8 rounded-2xl bg-white/50 hover:bg-white ring-1 ring-transparent hover:ring-slate-100 shadow-none hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-lg">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 container mx-auto px-6">
          <div className="bg-[#0F172A] rounded-[2rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 h-64 w-64 bg-[#D4A017]/10 rounded-full blur-[100px]" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Ready to scale your business?
              </h2>
              <p className="text-slate-400 text-lg">
                Join hundreds of entrepreneurs who have moved their business to MWALA.
                Setup takes less than 2 minutes.
              </p>
              <div className="pt-6">
                <Link href="/login">
                    <Button variant="accent" size="lg" className="h-14 px-10">
                        Open Your Account Now
                    </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                {['No credit card required', 'Cancel anytime', '24/7 Support'].map(text => (
                  <div key={text} className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    <CheckCircle2 className="h-3 w-3 text-[#D4A017]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <span className="text-2xl font-black tracking-tighter text-[#0F172A]">
                MWALA<span className="text-[#D4A017]">.</span>
              </span>
              <p className="text-sm text-slate-500 leading-relaxed">
                Professional infrastructure for African small and medium enterprises. 
                Built for growth.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-[#0F172A]">Invoicing</Link></li>
                <li><Link href="#" className="hover:text-[#0F172A]">Reporting</Link></li>
                <li><Link href="#" className="hover:text-[#0F172A]">Customers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-[#0F172A]">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#0F172A]">Careers</Link></li>
                <li><Link href="#" className="hover:text-[#0F172A]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-[#0F172A]">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#0F172A]">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-[#0F172A]">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-medium">
              © {new Date().getFullYear()} Mwala Business Finance. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Globe className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Malawi • English</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}