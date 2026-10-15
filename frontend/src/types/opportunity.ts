export type OpportunityCategory =
  | 'Hackathon'
  | 'Internship'
  | 'Job'
  | 'Event'
  | 'Workshop'

export type OpportunityMode = 'Online' | 'Offline' | 'Hybrid'

export type SortOption = 'deadline' | 'newest' | 'title'

export type ViewMode = 'all' | 'saved'

export interface Opportunity {
  id: string
  title: string
  organization: string
  category: OpportunityCategory
  description: string
  mode: OpportunityMode
  location: string
  deadline: string | null
  sourceUrl: string | null
  tags: string[]
  lastVerified: string
  isSample: boolean
}