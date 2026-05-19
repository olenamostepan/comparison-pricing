'use client'

import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const btnGhost =
  'rounded-lg border border-cq-border bg-white px-4 py-2 text-sm font-bold text-cq-text hover:bg-cq-bg'
const btnGreenFilled =
  'rounded-lg bg-[var(--cq-green)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--cq-green-hover)] disabled:opacity-50'

const SUGGESTIONS = [
  'When is the tender deadline?',
  'Can I submit a partial bid?',
  'Is the brief final?',
]

export function SupplierAskQuestionModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (text: string) => void
}) {
  const [question, setQuestion] = React.useState('')

  React.useEffect(() => {
    if (!open) setQuestion('')
  }, [open])

  const canSend = question.trim().length > 0

  function handleSend() {
    if (!canSend) return
    onSubmit(question.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[calc(100dvh-2rem)] gap-5 overflow-y-auto border-cq-border p-6 sm:max-w-[520px]"
      >
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-xl font-bold text-cq-text">
            Ask a question
          </DialogTitle>
          <p className="text-sm text-cq-text-secondary">
            Your question will be sent to the CQuel team handling this tender.
          </p>
        </DialogHeader>

        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What would you like to clarify?"
          rows={4}
          className="min-h-[96px] resize-y border-cq-border text-cq-text"
        />

        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuestion(s)}
              className="rounded-lg border border-cq-border bg-cq-bg/50 px-2.5 py-1 text-left text-xs font-medium text-cq-text hover:border-cq-green/50"
            >
              {s}
            </button>
          ))}
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <DialogClose type="button" className={btnGhost}>
            Cancel
          </DialogClose>
          <button
            type="button"
            disabled={!canSend}
            onClick={handleSend}
            className={btnGreenFilled}
          >
            Send to CQuel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
