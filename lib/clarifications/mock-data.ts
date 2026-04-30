/**
 * Seed data for Clarifications prototype. Edit freely for new test cases.
 */
import type { Clarification, FocusItem } from './types'

/** Demo supplier portal user — Tom @ EvoEnergy */
export const DEMO_SUPPLIER_ID = 'evo-energy'
export const DEMO_SUPPLIER_NAME = 'Evo Energy'

export const DEFAULT_BID_CONTEXT_322: Record<string, string> = {
  'Total CapEx': '£412k',
  'PPA rate': '9.4 p/kWh',
  Maintenance: '£12.3k / yr',
  Warranty: '20 years performance',
}

/**
 * Recipient checklist for Raise modal — IDs align with `/supplier-comparison` rows (Solar, LED, Rostock).
 */
export const MOCK_CLARIFICATION_RECIPIENTS = [
  { id: 'electron-green', name: 'Electron Green' },
  { id: 'sustain-commercial-solar', name: 'Sustain Commercial Solar' },
  { id: 'low-carbon-energy-company', name: 'The Low Carbon Energy Company Ltd' },
  { id: 'ortus-energy-ltd', name: 'Ortus Energy Ltd.' },
  { id: 'evo-energy', name: 'Evo Energy' },
  { id: 'oracle-energy', name: 'Oracle Energy' },
  { id: 'german-led-tech', name: 'German LED Tech' },
  { id: 'ecowatt', name: 'Ecowatt GmbH' },
  { id: 'die-stromspar', name: 'Die Stromspar GmbH' },
  { id: 'led-on', name: 'LED ON GmbH' },
  { id: 'beka-solar', name: 'Beka Solar Energie GmbH' },
  { id: 'genesis', name: 'Genesis 1.3 Limited' },
  { id: 'saflux', name: 'SAFLUX GmbH' },
  { id: 'die-stromspar-rostock', name: 'Die Stromspar GmbH' },
  { id: 'wisag-rostock', name: 'WISAG Gebäudetechnik Nord-Ost' },
] satisfies Array<{ id: string; name: string }>

export const DEFAULT_CLARIFICATION_PROJECT = 'Manchester Office Solar'

/** Match comparison route context when opening Raise modal */
export type ClarificationsProjectSlug = 'solar' | 'led' | 'led-rostock'

export function clarificationProjectLabel(
  slug: ClarificationsProjectSlug,
): string {
  if (slug === 'led') return 'Alexanderstraße Berlin LED'
  if (slug === 'led-rostock') return 'Doberaner Straße Rostock LED'
  return DEFAULT_CLARIFICATION_PROJECT
}

export function clarificationBidId(slug: ClarificationsProjectSlug): string {
  if (slug === 'led') return '310'
  if (slug === 'led-rostock') return '651'
  return '322'
}

export const SEED_CLARIFICATIONS: Clarification[] = [
  {
    id: 'cl-ppa-review',
    title: 'PPA rate clarification',
    question:
      'Can you confirm the PPA escalation path after year one and confirm whether indexation caps out in year 15?',
    linkedField: 'PPA rate',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: 'Evo Energy',
    supplierId: 'evo-energy',
    project: DEFAULT_CLARIFICATION_PROJECT,
    raisedAgo: '2d ago',
    raisedBy: 'Lucija',
    status: 'review',
    reply: {
      text: 'Confirming escalation is +2.5% annually, capped until year 15. After year 15 the rate fixes at year-15 nominal value.',
      from: 'Tom',
      fromCompany: 'Evo Energy',
      timeAgo: '4 hours ago',
      source: 'on-platform reply',
      trust: 'high',
      attachments: [
        { name: 'PPA-appendix-draft.pdf', sizeLabel: '1.5 MB' },
        { name: 'Rate-sheet.xlsx', sizeLabel: '480 KB' },
      ],
    },
    impact: {
      fieldLabel: 'PPA rate',
      currentValue: '9.4 p/kWh',
      currentNote: '(interpretation unclear)',
      proposedValue: '9.4 p/kWh year 1',
      proposedNote: '+2.5% p.a., capped year 15',
    },
  },
  {
    id: 'cl-om-review-od',
    title: 'O&M scope clarification',
    question:
      'Please clarify whether inverter replacement labour is covered under the headline O&M line or priced separately.',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: 'Oracle Energy',
    supplierId: 'oracle-energy',
    project: DEFAULT_CLARIFICATION_PROJECT,
    raisedAgo: '5d ago',
    raisedBy: 'Jamie',
    status: 'review',
    overdue: true,
    reply: {
      text: 'Inverter replacement labour included in headline O&M; parts beyond warranty priced as variations.',
      from: 'Sam',
      fromCompany: 'Oracle Energy',
      timeAgo: '1d ago',
      source: 'doc-extract',
      trust: 'medium',
    },
    impact: {
      fieldLabel: 'O&M (annual)',
      currentValue: '£12.3k',
      proposedValue: '£12.3k · labour inclusive',
      proposedNote: 'Inverter swaps under SLA',
    },
  },
  {
    id: 'cl-access-info',
    title: 'Access & lifting package',
    question:
      'We need crane mobilisation assumptions and weekday vs weekend outage windows for LL3 rooftop.',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: 'Sustain Commercial Solar',
    supplierId: 'sustain-commercial-solar',
    project: DEFAULT_CLARIFICATION_PROJECT,
    raisedAgo: '1w ago',
    raisedBy: 'Lucija',
    status: 'need_response',
    reply: {
      text: 'We do not currently hold the landlord lifting protocol for LL3. Can you share the approved method statement when available?',
      from: 'Priya',
      fromCompany: 'Sustain Commercial Solar',
      timeAgo: '3d ago',
      source: 'on-platform reply',
      trust: 'verified',
    },
  },
  {
    id: 'cl-batch-415',
    title: 'Deemed export capacity',
    question:
      'Confirm whether each bid includes G99 queue position and export MPAN registration as part of handover documentation.',
    bidId: '415',
    bidLabel: 'Tender 415',
    supplier: 'Multiple suppliers',
    project: DEFAULT_CLARIFICATION_PROJECT,
    tenderLabel: 'Tender 415',
    raisedAgo: '4d ago',
    raisedBy: 'Ops',
    status: 'batch_review',
    rollup: { repliedCount: 4, totalCount: 8 },
    reply: {
      text: 'Partial responses received; three suppliers still processing legal review on export MPAN wording.',
      from: 'System',
      fromCompany: 'CQuel',
      timeAgo: '2h ago',
      source: 'manual',
      trust: 'low',
    },
  },
  {
    id: 'cl-warranty-await',
    title: 'Warranty term alignment',
    question:
      'Please align performance warranty term with module manufacturer deck (25 years) instead of 20 years shown in schedule.',
    linkedField: 'Warranty',
    bidContext: DEFAULT_BID_CONTEXT_322,
    bidSubmittedLabel: 'Submitted 14 days ago',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: 'Low Carbon Energy Company Ltd',
    supplierId: 'low-carbon-energy-company',
    project: DEFAULT_CLARIFICATION_PROJECT,
    raisedAgo: '3d ago',
    raisedBy: 'Jamie',
    status: 'awaiting',
  },
  {
    id: 'cl-evo-export-limit',
    title: 'Export capacity clarification',
    question:
      'Confirm whether the 100 kW export assumption in our bid remains valid if the client upgrades the main incomer in Q3.',
    linkedField: 'Export capacity',
    bidContext: {
      ...DEFAULT_BID_CONTEXT_322,
      'Export capacity': '100 kW capped',
    },
    bidSubmittedLabel: 'Submitted 14 days ago',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: DEMO_SUPPLIER_NAME,
    supplierId: DEMO_SUPPLIER_ID,
    project: 'Solar PV - Schenkendorfstraße',
    raisedAgo: '5h ago',
    raisedBy: 'Lucija',
    status: 'awaiting',
    overdue: true,
  },
  {
    id: 'cl-evo-ppa-path',
    title: 'PPA rate clarification',
    question:
      'Can you confirm the PPA escalation path after year one and whether indexation caps out in year 15?',
    linkedField: 'PPA rate',
    bidContext: DEFAULT_BID_CONTEXT_322,
    bidSubmittedLabel: 'Submitted 14 days ago',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: DEMO_SUPPLIER_NAME,
    supplierId: DEMO_SUPPLIER_ID,
    project: 'Solar PV - Schenkendorfstraße',
    raisedAgo: '2d ago',
    raisedBy: 'Lucija',
    status: 'awaiting',
  },
  {
    id: 'cl-evo-om-split',
    title: 'O&M scope — inverter labour',
    question:
      'Please confirm inverter replacement labour sits inside the headline O&M fee rather than as a provisional.',
    linkedField: 'Maintenance',
    bidContext: DEFAULT_BID_CONTEXT_322,
    bidSubmittedLabel: 'Submitted 14 days ago',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: DEMO_SUPPLIER_NAME,
    supplierId: DEMO_SUPPLIER_ID,
    project: 'Solar PV - Schenkendorfstraße',
    raisedAgo: '4d ago',
    raisedBy: 'Jamie',
    status: 'awaiting',
  },
  {
    id: 'cl-evo-access-crane',
    title: 'Crane mobilisation windows',
    question:
      'Share crane mobilisation assumptions and confirm weekday-only outage windows for the LL3 rooftop phase.',
    linkedField: 'Total CapEx',
    bidContext: DEFAULT_BID_CONTEXT_322,
    bidSubmittedLabel: 'Submitted 14 days ago',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: DEMO_SUPPLIER_NAME,
    supplierId: DEMO_SUPPLIER_ID,
    project: 'Solar PV - Schenkendorfstraße',
    raisedAgo: '1w ago',
    raisedBy: 'Lucija',
    status: 'awaiting',
  },
  {
    id: 'cl-hs-await-od',
    title: 'H&S provisional split',
    question:
      'Break out edge protection vs crane hire within the H&S provisional so we can benchmark against other bids.',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: 'Electron Green',
    supplierId: 'electron-green',
    project: DEFAULT_CLARIFICATION_PROJECT,
    raisedAgo: '6d ago',
    raisedBy: 'Lucija',
    status: 'awaiting',
    overdue: true,
  },
  {
    id: 'cl-broadcast-progress',
    title: 'Commissioning evidence pack',
    question:
      'Confirm format of handover commissioning pack (IV curve traces, witness test sign-off, DNO G99 letter).',
    bidId: '415',
    bidLabel: 'Tender 415',
    supplier: 'Multiple suppliers',
    project: DEFAULT_CLARIFICATION_PROJECT,
    tenderLabel: 'Tender 415',
    raisedAgo: '2d ago',
    raisedBy: 'Ops',
    status: 'awaiting',
    rollup: { repliedCount: 3, totalCount: 8, awaitingRemainder: true },
  },
  {
    id: 'cl-applied-panel',
    title: 'Panel manufacturer lock-in',
    question: 'Confirm whether alternate Tier-1 module brands remain acceptable post shortlist.',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: 'Ortus Energy Ltd.',
    supplierId: 'ortus-energy-ltd',
    project: DEFAULT_CLARIFICATION_PROJECT,
    raisedAgo: '2w ago',
    raisedBy: 'Lucija',
    status: 'applied',
    reply: {
      text: 'We will lock JA Solar for this phase; alternates withdrawn subject to LC approval.',
      from: 'Alex',
      fromCompany: 'Ortus Energy Ltd.',
      timeAgo: '13d ago',
      source: 'on-platform reply',
      trust: 'high',
    },
    impact: {
      fieldLabel: 'Module OEM',
      currentValue: 'Tier-1 alternate allowed',
      proposedValue: 'JA Solar nominated',
      proposedNote: 'Alternates withdrawn',
    },
  },
  {
    id: 'cl-closed-dno',
    title: 'Feed-in limit assumption',
    question: 'Clarify whether 100 kW export cap is feeder-level or MPAN-level for Red Car Park roofs.',
    bidId: '322',
    bidLabel: 'Bid 322',
    supplier: 'Electron Green',
    supplierId: 'electron-green',
    project: DEFAULT_CLARIFICATION_PROJECT,
    raisedAgo: '3w ago',
    raisedBy: 'Jamie',
    status: 'closed',
    reply: {
      text: 'We interpreted as MPAN-level; awaiting DNO clarification from client team — parking this thread.',
      from: 'Riya',
      fromCompany: 'Electron Green',
      timeAgo: '19d ago',
      source: 'manual',
      trust: 'low',
    },
  },
]

/** Bid update + profile placeholders; question cards are derived from clarifications in the shared store. */
export const SEED_FOCUS_NON_QUESTION_ITEMS: FocusItem[] = [
  {
    id: 'fi-bid-update',
    kind: 'bid_update',
    title: 'Revised line items uploaded',
    contextLine: 'Leeds warehouse · Atlas Retail',
    ageLabel: '1d',
    primaryAction: 'go_to_project',
  },
  {
    id: 'fi-profile',
    kind: 'profile',
    title: 'Insurance certificate expiring',
    contextLine: `Company profile · ${DEMO_SUPPLIER_NAME}`,
    ageLabel: '3d',
    primaryAction: 'go_to_profile',
  },
]
