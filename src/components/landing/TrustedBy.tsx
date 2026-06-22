import { Container } from './Container'
import { TRUSTED_BY } from './constants'

export function TrustedBy() {
  return (
    <section className="border-y border-slate-200 bg-white py-12 sm:py-16" aria-label="Trusted by">
      <Container>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Trusted by growing enterprises
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {TRUSTED_BY.map((brand) => (
            <li
              key={brand}
              className="text-sm font-semibold tracking-tight text-slate-400 transition-colors hover:text-slate-600 sm:text-base"
            >
              {brand}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
