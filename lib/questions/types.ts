import type { ClarificationsProjectSlug } from '@/lib/clarifications/mock-data'

export type QuestionType = 'ai' | 'supplier'

export type AnswerStatus = 'answered' | 'partial' | 'awaiting' | 'not_asked'

export type SupplierAnswerAttachment = {
  name: string
  sizeLabel: string
}

export type SupplierAnswer = {
  supplierId: string
  supplierName: string
  status: AnswerStatus
  answerText?: string
  ageLabel?: string
  /** @deprecated Prefer `attachments` — kept for older rows */
  hasAttachment?: boolean
  attachments?: SupplierAnswerAttachment[]
  /** Ops clarification row — used for row navigation */
  clarificationId?: string
}

export type TenderQuestion = {
  id: string
  questionText: string
  type: QuestionType
  tenderSlug: ClarificationsProjectSlug
  createdAt: string
  ageLabel: string
  answers: SupplierAnswer[]
  /** First clarification in dispatch — supplier-type View link */
  detailClarificationId?: string
}

export type QuestionFilter = 'all' | 'ai' | 'supplier'

export type AskDestination = 'ai' | 'supplier'
