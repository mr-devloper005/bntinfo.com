import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading desk',
    headline: 'Fresh thinking for work, life, and better decisions.',
    description: 'Explore practical guides, clear explainers, and thoughtful perspectives written to inform and inspire.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Browse recent ideas and timeless advice from across the journal.',
    chips: ['Practical guides', 'Expert perspectives', 'Fresh ideas'],
  },
  classified: {
    eyebrow: 'Notice board',
    headline: 'Fast-moving classifieds, offers, and time-sensitive posts.',
    description: 'Browse current offers, useful opportunities, and timely notices from across the community.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Prioritize urgency, short summaries, and direct browsing.',
    chips: ['Fast scan', 'Offers', 'Action cues'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Social bookmarks arranged like curated collections.',
    description: 'A carefully organized collection of useful resources, tools, references, and noteworthy links.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Curated resources need grouping and calm metadata.',
    chips: ['Collections', 'Resources', 'Reference flow'],
  },
  profile: {
    eyebrow: 'People and profiles',
    headline: 'Profiles with identity, trust, and reputation cues.',
    description: 'Meet the people, creators, and organizations contributing ideas and services to the community.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make identity and credibility visible before the grid begins.',
    chips: ['Identity first', 'Trust cues', 'Creator/business cards'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'PDFs and documents presented as a useful library.',
    description: 'Find downloadable guides, reports, documents, and reference material in one accessible library.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document surfaces need archive cues, file context, and clear browsing.',
    chips: ['Documents', 'Guides', 'Archive ready'],
  },
  listing: {
    eyebrow: 'Business directory',
    headline: 'Find trusted businesses for every next step.',
    description: 'Discover services, compare useful details, and connect directly with businesses that match your needs.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Search by category and review the details that matter before choosing.',
    chips: ['Local services', 'Easy comparison', 'Direct contact'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image posts with a gallery-first browsing experience.',
    description: 'Discover image-led stories, visual inspiration, and standout work from across the collection.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
