import type { Clarification } from './types'

/** Prototype site addresses keyed by project name */
const SITE_BY_PROJECT: Record<string, string> = {
  'Manchester Office Solar': '1 Spinningfields Square, Manchester M3 3AP',
  'Solar PV - Schenkendorfstraße': 'Schenkendorfstraße 62, 12439 Berlin',
  'Alexanderstraße Berlin LED': 'Alexanderstraße 12, 10178 Berlin',
  'Doberaner Straße Rostock LED': 'Doberaner Straße 45, 18057 Rostock',
}

export function clarificationSiteAddress(c: Clarification): string {
  return SITE_BY_PROJECT[c.project] ?? c.project
}
