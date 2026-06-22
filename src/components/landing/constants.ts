import {
  Users,
  FileText,
  Receipt,
  CreditCard,
  BarChart3,
  Shield,
  TrendingUp,
  Clock,
  Building2,
  type LucideIcon,
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
] as const

export const TRUSTED_BY = [
  'Limbe Leaf',
  'Sunbird Hotels',
  'Malawi Beverages',
  'NICO General',
  'TNM Business',
  'Press Corporation',
] as const

export const CAPABILITIES: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: 'Client Management',
    description:
      'Centralize customer records, contact history, and account balances in one authoritative system of record.',
    icon: Users,
  },
  {
    title: 'Contract Management',
    description:
      'Track agreements, renewal dates, and obligations with structured workflows that keep every deal accountable.',
    icon: FileText,
  },
  {
    title: 'Invoice Management',
    description:
      'Generate professional invoices, automate follow-ups, and maintain a complete billing history for every client.',
    icon: Receipt,
  },
  {
    title: 'Payment Tracking',
    description:
      'Monitor receivables in real time, reconcile payments against invoices, and surface overdue accounts instantly.',
    icon: CreditCard,
  },
  {
    title: 'Reporting & Analytics',
    description:
      'Access audit-ready financial reports, revenue trends, and operational dashboards built for decision-makers.',
    icon: BarChart3,
  },
]

export const KPIS = [
  {
    value: '5,000+',
    label: 'Businesses on platform',
    description: 'Across 12 African markets',
  },
  {
    value: 'MK 14.2B',
    label: 'Revenue tracked',
    description: 'Securely managed transactions',
  },
  {
    value: '24,000',
    label: 'Invoices processed daily',
    description: 'Automated billing cycles',
  },
  {
    value: '99.9%',
    label: 'Platform uptime',
    description: 'Enterprise-grade reliability',
  },
] as const

export const BENEFITS: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: 'Financial clarity',
    description:
      'Replace fragmented spreadsheets with a single source of truth for every transaction, client, and contract.',
    icon: BarChart3,
  },
  {
    title: 'Operational stability',
    description:
      'Structured workflows and audit trails ensure your records remain consistent, complete, and defensible.',
    icon: Shield,
  },
  {
    title: 'Accelerated growth',
    description:
      'Clean financial data unlocks faster decisions, stronger client relationships, and access to capital.',
    icon: TrendingUp,
  },
  {
    title: 'Time efficiency',
    description:
      'Automate invoicing, payment reminders, and report generation so your team focuses on what matters.',
    icon: Clock,
  },
  {
    title: 'Institutional credibility',
    description:
      'Professional documentation and standardized processes signal seriousness to partners and investors.',
    icon: Building2,
  },
  {
    title: 'Scalable infrastructure',
    description:
      'Built to grow with your business — from a single operator to a multi-department enterprise.',
    icon: Users,
  },
]

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Set up your workspace',
    description:
      'Import clients, configure your billing preferences, and establish your financial structure in minutes.',
  },
  {
    step: '02',
    title: 'Run daily operations',
    description:
      'Create invoices, track payments, manage contracts, and maintain client relationships from one dashboard.',
  },
  {
    step: '03',
    title: 'Report with confidence',
    description:
      'Generate financial reports, monitor KPIs, and share audit-ready documentation with stakeholders.',
  },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'MWALA transformed how we manage client relationships and billing. Our financial records are now audit-ready at all times.',
    name: 'Chisomo Banda',
    role: 'Managing Director',
    company: 'Banda Logistics',
  },
  {
    quote:
      'We moved from spreadsheets to a proper operating system. The clarity it gives our finance team is remarkable.',
    name: 'Grace Mwale',
    role: 'Finance Director',
    company: 'Sunbird Hotels Group',
  },
  {
    quote:
      'Professional invoicing and payment tracking helped us win larger corporate contracts. MWALA made us look the part.',
    name: 'James Phiri',
    role: 'CEO',
    company: 'Phiri Trading Co.',
  },
] as const

export const PRICING_TIERS = [
  {
    name: 'Starter',
    price: 'MK 25,000',
    period: '/month',
    description: 'For solo operators and small teams getting started.',
    features: [
      'Up to 50 clients',
      'Unlimited invoices',
      'Payment tracking',
      'Basic reporting',
      'Email support',
    ],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Business',
    price: 'MK 75,000',
    period: '/month',
    description: 'For growing businesses that need full operational control.',
    features: [
      'Unlimited clients',
      'Contract management',
      'Advanced analytics',
      'Multi-user access',
      'Priority support',
      'Custom branding',
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations requiring dedicated infrastructure and support.',
    features: [
      'Everything in Business',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantees',
      'On-site training',
      'Advanced security controls',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
] as const

export const FOOTER_LINKS = {
  product: [
    { label: 'Client Management', href: '#features' },
    { label: 'Invoicing', href: '#features' },
    { label: 'Reporting', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security', href: '#' },
  ],
} as const
