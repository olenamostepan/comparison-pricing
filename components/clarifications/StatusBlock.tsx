import type { Clarification } from '@/lib/clarifications/types'
import {
  sectionFromPerspective,
  statusLabelFromPerspective,
  type Perspective,
} from '@/lib/clarifications/perspective'

export function StatusBlock({
  item,
  perspective,
  align = 'right',
}: {
  item: Clarification
  perspective: Perspective
  align?: 'left' | 'right'
}) {
  const section = sectionFromPerspective(item, perspective)
  const primary = statusLabelFromPerspective(item.status, perspective)

  let subLine: string | null = null

  if (item.overdue && (item.status === 'awaiting' || item.status === 'review')) {
    subLine = 'overdue'
  } else if (
    item.rollup?.awaitingRemainder &&
    section === 'in_progress'
  ) {
    const { repliedCount, totalCount } = item.rollup
    subLine = `${Math.max(totalCount - repliedCount, 0)} still awaiting`
  } else if (
    section === 'in_progress' &&
    item.rollup &&
    !item.rollup.awaitingRemainder
  ) {
    subLine = `${item.rollup.repliedCount} replies received`
  } else if (item.status === 'batch_review' && item.rollup) {
    subLine = `${item.rollup.repliedCount} replies received`
  }

  return (
    <div className={align === 'left' ? 'text-left sm:text-right' : 'text-right'}>
      <p className="text-sm font-medium text-cq-text">{primary}</p>
      {subLine ? (
        <p className="text-xs text-cq-text-secondary">{subLine}</p>
      ) : null}
    </div>
  )
}
