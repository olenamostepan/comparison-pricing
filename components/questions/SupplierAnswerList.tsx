import { FileText } from 'lucide-react'
import type { SupplierAnswer } from '@/lib/questions/types'
import { cn } from '@/lib/utils'

const STATUS_DOT: Record<SupplierAnswer['status'], string> = {
  answered: 'bg-emerald-500',
  partial: 'bg-amber-500',
  awaiting: 'bg-red-500',
  not_asked: 'bg-cq-border',
}

function statusLabel(a: SupplierAnswer): string {
  if (a.status === 'awaiting') return '—'
  if (a.status === 'not_asked') return '—'
  if (a.answerText) return a.answerText
  return '—'
}

function answerAttachments(a: SupplierAnswer) {
  if (a.attachments?.length) return a.attachments
  return []
}

export function SupplierAnswerList({ answers }: { answers: SupplierAnswer[] }) {
  const visible = answers.filter((a) => a.status !== 'not_asked')
  if (visible.length === 0) {
    return <p className="text-sm text-cq-text-secondary">No supplier answers yet</p>
  }

  return (
    <ul className="space-y-3">
      {visible.map((a) => {
        const attachments = answerAttachments(a)
        return (
          <li
            key={a.supplierId}
            className="flex items-start gap-2 text-sm leading-relaxed text-cq-text"
          >
            <span
              className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', STATUS_DOT[a.status])}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p>
                <span className="font-semibold">{a.supplierName}:</span>{' '}
                <span
                  className={cn(
                    a.status === 'awaiting' && 'text-cq-text-secondary',
                    a.status === 'not_asked' && 'text-cq-text-secondary',
                  )}
                >
                  {statusLabel(a)}
                </span>
                {a.ageLabel && a.status !== 'not_asked' && a.status !== 'awaiting' && (
                  <span className="ml-1 text-xs text-cq-text-secondary">{a.ageLabel}</span>
                )}
              </p>
              {attachments.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {attachments.map((file, i) => (
                    <li
                      key={`${file.name}-${i}`}
                      className="flex max-w-full items-center gap-2 rounded-md border border-cq-border bg-cq-bg/40 px-2.5 py-1.5 text-xs"
                    >
                      <FileText
                        className="h-3.5 w-3.5 shrink-0 text-cq-text-secondary"
                        aria-hidden
                      />
                      <span className="min-w-0 truncate font-medium text-cq-text">
                        {file.name}
                      </span>
                      <span className="shrink-0 tabular-nums text-cq-text-secondary">
                        {file.sizeLabel}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
