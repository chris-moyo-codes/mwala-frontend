import { cn } from '@/lib/utils'
import { TrendingUp, Users, Clock } from 'lucide-react'

const TRANSACTIONS = [
  { customer: 'Limbe Leaf Tobacco', amount: 'MK 450,000', status: 'Paid' as const },
  { customer: 'Malawi Beverages', amount: 'MK 1,200,000', status: 'Pending' as const },
  { customer: 'Sunbird Hotels', amount: 'MK 890,000', status: 'Overdue' as const },
]

const STATUS_STYLES = {
  Paid: 'text-emerald-700 bg-emerald-50',
  Pending: 'text-amber-700 bg-amber-50',
  Overdue: 'text-red-700 bg-red-50',
}

export function DashboardPreview() {
  return (
    <div
      className="relative mx-auto mt-16 max-w-5xl lg:mt-20"
      aria-hidden="true"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="mx-auto flex h-6 w-48 items-center justify-center rounded-md bg-white text-[10px] font-medium text-slate-400">
            app.mwala.com/dashboard
          </div>
        </div>

        <div className="grid gap-3 bg-slate-50 p-3 sm:grid-cols-12 sm:gap-4 sm:p-4">
          {/* Revenue card */}
          <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-5 sm:col-span-4">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                <TrendingUp className="h-4 w-4 text-[#0F172A]" />
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                +18.2%
              </span>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Net Revenue
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-[#0F172A] sm:text-2xl">
                MK 12,450,000
              </p>
            </div>
            <div className="space-y-2">
              {[72, 58, 85, 64].map((width, i) => (
                <div key={i} className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#0F172A]"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 sm:col-span-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Recent Activity
            </p>
            <div className="space-y-3">
              {TRANSACTIONS.map((row) => (
                <div
                  key={row.customer}
                  className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-xs font-medium text-[#0F172A]">{row.customer}</span>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#0F172A]">{row.amount}</p>
                    <span
                      className={cn(
                        'mt-0.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold',
                        STATUS_STYLES[row.status]
                      )}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clients card */}
          <div className="flex flex-col justify-center rounded-xl border border-slate-100 bg-[#0F172A] p-5 sm:col-span-3">
            <Users className="mb-3 h-5 w-5 text-[#D4A017]" />
            <p className="text-2xl font-semibold tracking-tight text-white">1,242</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Active Clients
            </p>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-[#0F172A] bg-slate-600"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar hint */}
        <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-4 py-2.5">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] text-slate-400">Last updated 2 minutes ago</span>
        </div>
      </div>
    </div>
  )
}
