'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClarificationWorkflowSwitcher } from '@/components/shared/ClarificationWorkflowSwitcher'
import { SupplierNav } from '@/components/supplier/SupplierNav'

type Variant = 'full' | 'minimal'

function ProfileAvatar() {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cq-border bg-cq-bg text-xs font-bold text-cq-text"
      title="Profile"
    >
      P
    </span>
  )
}

export function SupplierPortalChrome({
  children,
  variant = 'full',
}: {
  children: ReactNode
  variant?: Variant
}) {
  const pathname = usePathname() ?? ''

  if (variant === 'minimal') {
    return (
      <div className="min-h-screen bg-cq-bg">
        <header className="sticky top-0 z-40 border-b border-cq-border bg-white">
          <div className="mx-auto w-full max-w-screen-2xl px-6 py-4 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center gap-y-3 md:flex-nowrap md:gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-[1_1_0%]">
                <Link
                  href="/supplier"
                  className="text-xl font-extrabold tracking-tight text-cq-text hover:opacity-80 md:text-2xl"
                >
                  eEnergy
                </Link>
                <span className="rounded-full border border-cq-border bg-cq-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cq-text-secondary">
                  Partner portal
                </span>
              </div>

              <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3 md:flex-[1_1_0%]">
                <ClarificationWorkflowSwitcher />
                <ProfileAvatar />
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cq-bg">
      <header className="sticky top-0 z-40 border-b border-cq-border bg-white">
        <div className="mx-auto w-full max-w-screen-2xl px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-y-3 md:flex-nowrap md:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-[1_1_0%]">
              <Link
                href="/supplier"
                className="text-xl font-extrabold tracking-tight text-cq-text hover:opacity-80 md:text-2xl"
              >
                eEnergy
              </Link>
              <span className="rounded-full border border-cq-border bg-cq-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cq-text-secondary">
                Partner portal
              </span>
            </div>

            <div className="order-last flex w-full justify-center md:order-none md:w-auto md:flex-none md:px-4">
              <h1 className="text-center text-lg font-extrabold text-cq-text md:text-xl">
                Projects Dashboard
              </h1>
            </div>

            <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3 md:flex-[1_1_0%]">
              <ClarificationWorkflowSwitcher />
              <ProfileAvatar />
            </div>
          </div>
        </div>
        <SupplierNav pathname={pathname} />
      </header>
      <main className="scroll-mt-20 pb-12">{children}</main>
    </div>
  )
}
