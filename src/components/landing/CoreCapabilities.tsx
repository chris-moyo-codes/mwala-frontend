import { Container } from './Container'
import { SectionHeader } from './SectionHeader'
import { CAPABILITIES } from './constants'

export function CoreCapabilities() {
  return (
    <section
      id="features"
      className="bg-[#FAFAFA] py-20 sm:py-28"
      aria-labelledby="features-heading"
    >
      <Container>
        <SectionHeader
          id="features-heading"
          eyebrow="Capabilities"
          title="Everything your business needs to operate with confidence"
          description="Five integrated modules that replace fragmented tools and give your team a shared financial foundation."
          className="mb-14 sm:mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <article
              key={capability.title}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F172A] text-white">
                <capability.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-[#0F172A]">{capability.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
