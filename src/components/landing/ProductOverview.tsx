import { Container } from './Container'
import { SectionHeader } from './SectionHeader'

const HIGHLIGHTS = [
  {
    label: 'Unified ledger',
    detail: 'Every client, invoice, and payment in one authoritative record.',
  },
  {
    label: 'Audit-ready reports',
    detail: 'Financial statements and exports built for compliance and review.',
  },
  {
    label: 'Team-ready access',
    detail: 'Role-based workflows that scale from founder to finance department.',
  },
] as const

export function ProductOverview() {
  return (
    <section
      id="product"
      className="bg-white py-20 sm:py-28"
      aria-labelledby="product-heading"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            id="product-heading"
            eyebrow="Platform"
            title="One system for your entire financial operation"
            description="MWALA is not a point solution. It is the infrastructure layer that connects how you manage clients, bill for work, track payments, and report to stakeholders — with the rigor expected of institutional finance."
          />

          <div className="space-y-4">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-[#FAFAFA] p-6 transition-colors hover:border-slate-300"
              >
                <h3 className="text-sm font-semibold text-[#0F172A]">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
