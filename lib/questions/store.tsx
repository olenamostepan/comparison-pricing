'use client'

import * as React from 'react'
import type { ClarificationsProjectSlug } from '@/lib/clarifications/mock-data'
import {
  clarificationBidId,
  clarificationProjectLabel,
  DEFAULT_CLARIFICATION_PROJECT,
} from '@/lib/clarifications/mock-data'
import { useClarifications } from '@/lib/clarifications/store'
import type { AskDestination, TenderQuestion } from './types'
import { mergeTenderQuestions, mockAiAnswersForQuestion } from './adapters'
import { tenderSuppliersForSlug } from './tender-suppliers'
import { SEED_AI_QUESTIONS_SOLAR } from './mock-ai-data'

function newQuestionId(prefix: string): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}`
}

type QuestionsContextValue = {
  getQuestions: (slug: ClarificationsProjectSlug) => TenderQuestion[]
  askQuestion: (
    slug: ClarificationsProjectSlug,
    question: string,
    destination: AskDestination,
    supplierIds: string[],
  ) => void
  askModalOpen: boolean
  openAskModal: () => void
  closeAskModal: () => void
}

const QuestionsContext = React.createContext<QuestionsContextValue | undefined>(
  undefined,
)

export function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const { items: clarifications, sendNewClarifications } = useClarifications()
  const [aiQuestions, setAiQuestions] = React.useState<TenderQuestion[]>(
    SEED_AI_QUESTIONS_SOLAR,
  )
  const [askModalOpen, setAskModalOpen] = React.useState(false)

  const getQuestions = React.useCallback(
    (slug: ClarificationsProjectSlug) =>
      mergeTenderQuestions(slug, aiQuestions, clarifications),
    [aiQuestions, clarifications],
  )

  const askQuestion = React.useCallback(
    (
      slug: ClarificationsProjectSlug,
      question: string,
      destination: AskDestination,
      supplierIds: string[],
    ) => {
      const text = question.trim()
      if (!text) return

      if (destination === 'ai') {
        const row: TenderQuestion = {
          id: newQuestionId('ai'),
          questionText: text,
          type: 'ai',
          tenderSlug: slug,
          createdAt: new Date().toISOString(),
          ageLabel: 'just now',
          answers: mockAiAnswersForQuestion(slug, text),
        }
        setAiQuestions((prev) => [row, ...prev])
        return
      }

      const recipients = tenderSuppliersForSlug(slug).filter((s) =>
        supplierIds.includes(s.id),
      )
      if (recipients.length === 0) return

      sendNewClarifications({
        question: text,
        recipients,
        bidId: clarificationBidId(slug),
        bidLabel: `Bid ${clarificationBidId(slug)}`,
        project:
          slug === 'solar'
            ? DEFAULT_CLARIFICATION_PROJECT
            : clarificationProjectLabel(slug),
        raisedBy: 'You',
      })
    },
    [sendNewClarifications],
  )

  const value = React.useMemo(
    () => ({
      getQuestions,
      askQuestion,
      askModalOpen,
      openAskModal: () => setAskModalOpen(true),
      closeAskModal: () => setAskModalOpen(false),
    }),
    [getQuestions, askQuestion, askModalOpen],
  )

  return (
    <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>
  )
}

export function useQuestions() {
  const ctx = React.useContext(QuestionsContext)
  if (!ctx) {
    throw new Error('useQuestions must be used within QuestionsProvider')
  }
  return ctx
}
