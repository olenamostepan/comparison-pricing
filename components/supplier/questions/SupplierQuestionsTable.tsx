'use client'

import type { SupplierQuestion } from '@/lib/supplier/questions/types'
import { AnswerStatusCell } from '@/components/supplier/questions/AnswerStatusCell'
import { QuestionDirectionBadge } from '@/components/supplier/questions/QuestionDirectionBadge'
import { cn } from '@/lib/utils'

const btnOutline =
  'rounded-lg border border-cq-border bg-white px-3 py-1.5 text-sm font-bold text-cq-text hover:bg-cq-bg'
const btnGreenFilled =
  'rounded-lg bg-[var(--cq-green)] px-3 py-1.5 text-sm font-bold text-white hover:bg-[var(--cq-green-hover)]'

export function SupplierQuestionsTable({
  rows,
  onRespond,
  onView,
}: {
  rows: SupplierQuestion[]
  onRespond: (question: SupplierQuestion) => void
  onView: (question: SupplierQuestion) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-cq-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-cq-border bg-cq-bg/50 text-left text-xs font-bold uppercase tracking-wide text-cq-text-secondary">
              <th className="w-[40%] px-4 py-3 font-bold">Question</th>
              <th className="w-[50%] px-4 py-3 font-bold">Answer</th>
              <th className="w-[10%] px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cq-border">
            {rows.map((row) => {
              const showRespond =
                row.direction === 'cquel_asked' && row.status === 'awaiting_you'

              return (
                <tr key={row.id} className="transition-colors hover:bg-cq-bg/60">
                  <td className="px-4 py-4 align-top">
                    <p className="font-bold text-cq-text">{row.questionText}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <QuestionDirectionBadge direction={row.direction} />
                      <span className="text-xs text-cq-text-secondary">
                        {row.ageLabel}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <AnswerStatusCell question={row} />
                  </td>
                  <td className="px-4 py-4 align-top">
                    {showRespond ? (
                      <button
                        type="button"
                        className={btnGreenFilled}
                        onClick={() => onRespond(row)}
                      >
                        Respond
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={cn(btnOutline)}
                        onClick={() => onView(row)}
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
