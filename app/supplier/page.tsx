'use client'

import { FocusItemCard } from '@/components/supplier/FocusItemCard'
import { HeroStats } from '@/components/supplier/HeroStats'
import {
  DEMO_SUPPLIER_ID,
  SEED_FOCUS_NON_QUESTION_ITEMS,
} from '@/lib/clarifications/mock-data'
import {
  isVisibleToDemoSupplier,
  sectionFromPerspective,
} from '@/lib/clarifications/perspective'
import { clarificationToFocusItem } from '@/lib/clarifications/supplier-focus'
import { useClarifications } from '@/lib/clarifications/store'

const MOCK_ACTIVE_PROJECTS = 24
const MOCK_PIPELINE = '£2.1M'

export default function SupplierFocusPage() {
  const { items } = useClarifications()

  const supplierItems = items.filter((c) => isVisibleToDemoSupplier(c, DEMO_SUPPLIER_ID))

  const needActionCount = supplierItems.filter(
    (c) => sectionFromPerspective(c, 'supplier') === 'needs_attention',
  ).length

  const questionCards = supplierItems
    .filter((c) => sectionFromPerspective(c, 'supplier') === 'needs_attention')
    .map(clarificationToFocusItem)

  const gridItems = [...questionCards, ...SEED_FOCUS_NON_QUESTION_ITEMS]

  return (
    <div className="mx-auto max-w-screen-2xl px-5 py-8 sm:px-8 lg:px-10">
      <header className="mb-8 border-l-4 border-[var(--cq-green)] pl-4 lg:mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cq-text-secondary">
          Today
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-cq-text sm:text-3xl">
          Focus here now
        </h1>
        <p className="mt-2 max-w-xl text-sm text-cq-text-secondary">
          Prioritised actions across your pipeline — questions, updates, and profile tasks.
        </p>
      </header>

      <HeroStats
        activeProjects={MOCK_ACTIVE_PROJECTS}
        needActionCount={needActionCount}
        pipelineLabel={MOCK_PIPELINE}
      />

      <section className="mt-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-cq-text">
              Needs your attention
            </h2>
            <p className="text-xs text-cq-text-secondary">Sorted by what blocked buyers care about first</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gridItems.map((item) => (
            <FocusItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
