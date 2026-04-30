'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const OPS_HREF = '/clarifications'
const SUPPLIER_FOCUS_HREF = '/supplier'
const SUPPLIER_CLARIFICATIONS_HREF = '/supplier/clarifications'

function routeActive(pathname: string, href: string): boolean {
  if (href === SUPPLIER_FOCUS_HREF) {
    return pathname === '/supplier' || pathname === '/supplier/'
  }
  return pathname.startsWith(href)
}

export function ClarificationWorkflowSwitcher({
  className,
}: {
  className?: string
}) {
  const pathname = usePathname() ?? ''
  const onOps = pathname.startsWith('/clarifications')
  const summaryLabel = onOps ? 'Ops workspace' : 'Supplier workspace'

  const itemCls =
    'cursor-pointer gap-2 font-semibold text-cq-text focus:bg-cq-bg focus:text-cq-text'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border border-cq-border bg-white px-3 py-2 text-sm font-bold text-cq-text shadow-sm hover:bg-cq-bg',
          className,
        )}
        aria-label="Switch clarification prototype workspace"
      >
        <span className="max-w-[160px] truncate sm:max-w-none">{summaryLabel}</span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild className={itemCls}>
          <Link href={OPS_HREF}>
            {routeActive(pathname, OPS_HREF) ? (
              <Check className="h-4 w-4 text-[var(--cq-green)]" aria-hidden />
            ) : (
              <span className="w-4 shrink-0" aria-hidden />
            )}
            Ops · Clarifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className={itemCls}>
          <Link href={SUPPLIER_FOCUS_HREF}>
            {routeActive(pathname, SUPPLIER_FOCUS_HREF) ? (
              <Check className="h-4 w-4 text-[var(--cq-green)]" aria-hidden />
            ) : (
              <span className="w-4 shrink-0" aria-hidden />
            )}
            Supplier · Focus here now
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className={itemCls}>
          <Link href={SUPPLIER_CLARIFICATIONS_HREF}>
            {routeActive(pathname, SUPPLIER_CLARIFICATIONS_HREF) ? (
              <Check className="h-4 w-4 text-[var(--cq-green)]" aria-hidden />
            ) : (
              <span className="w-4 shrink-0" aria-hidden />
            )}
            Supplier · Clarifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
