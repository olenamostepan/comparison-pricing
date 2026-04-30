'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export type SupplierNavTab =
  | 'focus'
  | 'clarifications'
  | 'projects'
  | 'tenders'
  | 'surveys'
  | 'pricing'
  | 'contracts'

const TABS: Array<{
  id: SupplierNavTab
  label: string
  href?: string
  activePrefix?: string
}> = [
  { id: 'focus', label: 'Focus here now', href: '/supplier', activePrefix: '/supplier' },
  {
    id: 'clarifications',
    label: 'Clarifications',
    href: '/supplier/clarifications',
    activePrefix: '/supplier/clarifications',
  },
  { id: 'projects', label: 'Projects' },
  { id: 'tenders', label: 'Tenders' },
  { id: 'surveys', label: 'Surveys' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contracts', label: 'Contracts' },
]

function isTabActive(
  tab: (typeof TABS)[number],
  pathname: string,
): boolean {
  if (tab.id === 'focus') {
    return pathname === '/supplier' || pathname === '/supplier/'
  }
  if (tab.activePrefix) {
    if (tab.id === 'clarifications') {
      return pathname.startsWith('/supplier/clarifications')
    }
    return pathname.startsWith(tab.activePrefix)
  }
  return false
}

/** Same underline tab strip pattern as `ClarificationsTopChrome` (ops). */
export function SupplierNav({ pathname }: { pathname: string }) {
  return (
    <nav
      className="border-t border-cq-border bg-white"
      aria-label="Supplier portal sections"
    >
      <div className="mx-auto flex max-w-screen-2xl gap-1 overflow-x-auto px-6 sm:gap-2 sm:px-8 lg:px-10">
        {TABS.map((tab) => {
          const active = isTabActive(tab, pathname)
          if (!tab.href) {
            return (
              <span
                key={tab.id}
                className="relative shrink-0 cursor-default whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-cq-text-secondary sm:px-4"
                title="Prototype: tab not wired"
              >
                {tab.label}
              </span>
            )
          }
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                'relative shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition-colors sm:px-4',
                active
                  ? 'border-[var(--cq-green)] text-cq-text'
                  : 'border-transparent text-cq-text-secondary hover:text-cq-text',
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
