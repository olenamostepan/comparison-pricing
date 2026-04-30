import Link from "next/link"
import Image from "next/image"
import { Inbox, MessageSquare } from "lucide-react"

const projects = [
  {
    slug: "solar",
    title: "Solar",
    description: "Project 322 — Braehead. Shopping centre, LL1–LL3, Red Parking, car park roofs. Supplier price comparison with Full-Scope and Smaller systems.",
    href: "/supplier-comparison",
    icon: "/site elements/solar.svg",
  },
  {
    slug: "led",
    title: "LED (Berlin)",
    description: "Project 310 — Alexanderstraße 1/3/5, Berlin. 2,494 luminaires, ranked by €/luminaire.",
    href: "/supplier-comparison/led",
    icon: "/site elements/Avatar.svg",
  },
  {
    slug: "led-rostock",
    title: "LED (Rostock)",
    description: "tender_651_650 — Doberaner Straße 114-116, Rostock. 2 suppliers (490 / 1,029 luminaires).",
    href: "/supplier-comparison/led-rostock",
    icon: "/site elements/Avatar.svg",
  },
]

const workflowScenarios = [
  {
    slug: "clarifications-ops",
    title: "Clarifications (ops)",
    description:
      "Buyer workspace: raise questions from Solar comparison or here, track supplier replies, review impact, and accept changes onto the bid.",
    href: "/clarifications",
    icon: MessageSquare,
    cta: "Open ops prototype",
  },
  {
    slug: "clarifications-supplier",
    title: "Clarifications (supplier)",
    description:
      "Supplier workspace: inbox of questions from CQuel, reply with text or files, and see threads move as the buyer reviews.",
    href: "/supplier/clarifications",
    icon: Inbox,
    cta: "Open supplier prototype",
  },
] as const

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="bg-white border-b border-[#F3F4F6]">
        <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-10 py-6 flex flex-col gap-2">
          <p className="text-sm text-[#4D5761] font-semibold uppercase tracking-wide">CQuel Prototype Library</p>
          <h1 className="text-[32px] font-extrabold text-[#1E2832] leading-tight">
            Pick a tender scenario to explore
          </h1>
          <p className="text-base text-[#4D5761] max-w-3xl">
            Interactive prototypes below: tender comparisons first, then collaboration workflows you can open directly as ops or as supplier.
          </p>
        </div>
      </header>

      <main className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-10 py-10 space-y-12">
        <section>
          <h2 className="text-lg font-extrabold text-[#1E2832] mb-4">Tender comparison</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={project.href}
                className="group rounded-2xl border border-[#E4E7EC] bg-white shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <Image
                      src={project.icon}
                      alt={project.title}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#4D5761] uppercase tracking-wide mb-1">Project</p>
                    <h3 className="text-2xl font-extrabold text-[#1E2832] mb-2">{project.title}</h3>
                    <p className="text-sm text-[#4D5761]">{project.description}</p>
                  </div>
                </div>
                <span className="flex h-10 px-4 items-center gap-2 rounded-lg bg-[#29B273] text-white font-bold text-sm group-hover:bg-[#239f63] transition-colors w-fit">
                  View Comparison
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold text-[#1E2832] mb-1">Collaboration workflow</h2>
          <p className="text-sm text-[#4D5761] mb-4 max-w-2xl">
            Tender-adjacent flows — pick the ops dashboard or the supplier inbox to try the same mock clarification loop.
          </p>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
            {workflowScenarios.map((w) => {
              const Icon = w.icon
              return (
                <Link
                  key={w.slug}
                  href={w.href}
                  className="group rounded-2xl border border-[#E4E7EC] bg-white shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] text-[#29B273]">
                      <Icon className="w-9 h-9" aria-hidden />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#4D5761] uppercase tracking-wide mb-1">
                        Workflow
                      </p>
                      <h3 className="text-2xl font-extrabold text-[#1E2832] mb-2">{w.title}</h3>
                      <p className="text-sm text-[#4D5761]">{w.description}</p>
                    </div>
                  </div>
                  <span className="flex h-10 px-4 items-center gap-2 rounded-lg bg-[#29B273] text-white font-bold text-sm group-hover:bg-[#239f63] transition-colors w-fit">
                    {w.cta}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
