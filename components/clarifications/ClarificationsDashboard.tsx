'use client'

import { ClarificationRow } from '@/components/clarifications/ClarificationRow'
import type { Clarification } from '@/lib/clarifications/types'
import { DEMO_SUPPLIER_ID } from '@/lib/clarifications/mock-data'
import {
  isVisibleToDemoSupplier,
  sectionFromPerspective,
  type Perspective,
} from '@/lib/clarifications/perspective'
import { useClarifications } from '@/lib/clarifications/store'

/** Groups clarifications into three buckets using derived sections only (never `c.section`). */
export function ClarificationsDashboard({ perspective }: { perspective: Perspective }) {
  const { items } = useClarifications()

  const visible =
    perspective === 'supplier'
      ? items.filter((c) => isVisibleToDemoSupplier(c, DEMO_SUPPLIER_ID))
      : items

  const needs = visible.filter(
    (c) => sectionFromPerspective(c, perspective) === 'needs_attention',
  )
  const progress = visible.filter(
    (c) => sectionFromPerspective(c, perspective) === 'in_progress',
  )
  const done = visible.filter((c) => sectionFromPerspective(c, perspective) === 'done')

  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-10 px-6 pb-20 sm:px-8 lg:px-10">
      <DashboardSection title="Needs Attention" items={needs} perspective={perspective} />
      <DashboardSection title="In Progress" items={progress} perspective={perspective} />
      <DashboardSection title="Done" items={done} perspective={perspective} />
    </div>
  )
}

function DashboardSection({
  title,
  items,
  perspective,
}: {
  title: string
  items: Clarification[]
  perspective: Perspective
}) {
  return (
    <section>
      <h2 className="mb-4 text-base font-extrabold text-cq-text">
        {title} ({items.length})
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-cq-border bg-white p-4 shadow-sm sm:p-5"
          >
            <ClarificationRow item={item} perspective={perspective} />
          </div>
        ))}
      </div>
    </section>
  )
}
