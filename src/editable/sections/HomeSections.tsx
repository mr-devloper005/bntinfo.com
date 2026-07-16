import Link from 'next/link'
import { ArrowRight, Building2, MapPin, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'
const safeTitle = (post?: SitePost) => post?.title?.trim() || 'Discover something useful'

function StoryImage({ post, className = '' }: { post: SitePost; className?: string }) {
  return <img src={getEditablePostImage(post)} alt={safeTitle(post)} className={`h-full w-full object-cover ${className}`} loading="lazy" />
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const secondary = posts.slice(1, 3)
  return (
    <section className="overflow-hidden bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-10 sm:py-16`}>
        <div className="mb-9 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[.3em] text-[var(--slot4-accent-fill)]">Welcome to {SITE_CONFIG.name}</p>
          <h1 className="editable-display mx-auto mt-3 max-w-4xl text-balance text-[clamp(2.5rem,5.6vw,5.4rem)] font-medium leading-[.95] tracking-[-.045em]">Ideas for better decisions, and businesses worth knowing.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">Read practical perspectives, compare local services, and discover useful products from one beautifully considered place.</p>
        </div>
        {lead ? (
          <div className="hero-reveal grid overflow-hidden bg-[var(--slot4-dark-bg)] text-white lg:grid-cols-[1.65fr_.85fr]">
            <Link href={postHref(primaryTask, lead, primaryRoute)} className="group relative min-h-[360px] overflow-hidden sm:min-h-[520px]">
              <StoryImage post={lead} className="absolute inset-0 transition duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 border-b border-white pb-1 text-[10px] font-bold uppercase tracking-[.2em]">{getEditableCategory(lead)}</span>
            </Link>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--slot4-accent-soft)]">Editor’s selection</p>
              <h2 className="editable-display mt-5 text-4xl font-medium leading-[.98] sm:text-5xl">{safeTitle(lead)}</h2>
              <p className="mt-6 line-clamp-4 text-sm leading-7 text-white/65">{getEditableExcerpt(lead, 210) || 'A considered guide with useful context, practical details, and a clearer way forward.'}</p>
              <Link href={postHref(primaryTask, lead, primaryRoute)} className="mt-8 inline-flex w-fit items-center gap-2 border-b border-white pb-1 text-xs font-bold uppercase tracking-[.16em]">Read the story <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-[var(--editable-border)] px-6 py-24 text-center"><Sparkles className="mx-auto text-[var(--slot4-accent)]" /><h2 className="editable-display mt-4 text-3xl">Fresh discoveries are on the way.</h2></div>
        )}
        {secondary.length ? <div className="mt-5 grid gap-5 md:grid-cols-2">{secondary.map((post) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[120px_1fr] items-center gap-5 border-b border-[var(--editable-border)] pb-5 sm:grid-cols-[180px_1fr]"><div className="aspect-[4/3] overflow-hidden"><StoryImage post={post} className="transition duration-700 group-hover:scale-105" /></div><div><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p><h3 className="editable-display mt-2 text-2xl font-semibold leading-none sm:text-3xl">{safeTitle(post)}</h3></div></Link>)}</div> : null}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const items = posts.slice(0, 10)
  if (!items.length) return null
  const doubled = [...items, ...items]
  return (
    <section className="editorial-marquee overflow-hidden border-y border-[var(--editable-border)] bg-[var(--slot4-warm)] py-8">
      <div className="mb-6 text-center text-[10px] font-bold uppercase tracking-[.3em] text-[var(--slot4-muted-text)]">Endless discovery · hover to pause</div>
      <div className="editorial-marquee-track gap-4 px-2">{doubled.map((post, i) => <Link key={`${post.id || post.slug}-${i}`} href={postHref(primaryTask, post, primaryRoute)} className="group flex w-[300px] shrink-0 items-center gap-4 border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-3 sm:w-[380px]"><div className="h-24 w-28 shrink-0 overflow-hidden"><StoryImage post={post} className="transition duration-700 group-hover:scale-110" /></div><div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p><h3 className="editable-display mt-2 line-clamp-2 text-xl font-semibold leading-none">{safeTitle(post)}</h3></div></Link>)}</div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[3]
  const list = posts.slice(4, 8)
  if (!feature && !list.length) return null
  return (
    <section className={`${container} py-16 sm:py-24`}>
      <div className="flex items-end justify-between border-b border-[var(--slot4-page-text)] pb-4"><div><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[var(--slot4-accent-fill)]">The latest journal</p><h2 className="editable-display mt-2 text-4xl font-semibold sm:text-5xl">Read, learn, stay informed.</h2></div><Link href={primaryRoute} className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[.16em] sm:flex">All articles <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
        {feature ? <Link href={postHref(primaryTask, feature, primaryRoute)} className="group"><div className="aspect-[16/11] overflow-hidden"><StoryImage post={feature} className="transition duration-700 group-hover:scale-105" /></div><p className="mt-5 text-[10px] font-bold uppercase tracking-[.24em] text-[var(--slot4-accent-fill)]">Featured perspective</p><h3 className="editable-display mt-2 text-4xl font-semibold leading-[.98] sm:text-5xl">{safeTitle(feature)}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(feature, 180)}</p></Link> : null}
        <div className="divide-y divide-[var(--editable-border)] border-y border-[var(--editable-border)]">{list.map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid grid-cols-[40px_1fr_100px] items-center gap-4 py-5 sm:grid-cols-[54px_1fr_150px]"><span className="editable-display text-3xl text-[var(--slot4-accent)]">0{index + 1}</span><div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[var(--slot4-muted-text)]">{getEditableCategory(post)}</p><h3 className="editable-display mt-1 line-clamp-2 text-2xl font-semibold leading-none sm:text-3xl">{safeTitle(post)}</h3></div><div className="aspect-[4/3] overflow-hidden"><StoryImage post={post} className="transition duration-700 group-hover:scale-105" /></div></Link>)}</div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const listingTask = SITE_CONFIG.tasks.find((task) => task.key === 'listing' && task.enabled)
  const items = (timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts).slice(8, 16)
  if (!items.length) return null
  return (
    <section className="bg-[var(--slot4-warm)] py-16 sm:py-24"><div className={container}>
      <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><div className="lg:sticky lg:top-52 lg:self-start"><Building2 className="h-8 w-8 text-[var(--slot4-accent-fill)]" /><p className="mt-6 text-[10px] font-bold uppercase tracking-[.3em] text-[var(--slot4-accent-fill)]">Business directory</p><h2 className="editable-display mt-3 text-5xl font-semibold leading-[.9]">Find a better fit for what comes next.</h2><p className="mt-5 text-sm leading-7 text-[var(--slot4-muted-text)]">Explore services, products, and businesses with clear information designed for easy comparison.</p><form action={listingTask?.route || '/listing'} className="mt-7 flex border-b border-[var(--slot4-page-text)] pb-2"><Search className="h-4 w-4" /><input name="q" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" placeholder="Search businesses and services" /></form></div>
      <div className="grid gap-5 sm:grid-cols-2">{items.map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`group overflow-hidden bg-[var(--slot4-surface-bg)] ${index % 3 === 0 ? 'sm:row-span-2' : ''}`}><div className={index % 3 === 0 ? 'aspect-[4/5] overflow-hidden' : 'aspect-[16/9] overflow-hidden'}><StoryImage post={post} className="transition duration-700 group-hover:scale-105" /></div><div className="p-5"><div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-[var(--slot4-accent-fill)]"><MapPin className="h-3 w-3" /> {getEditableCategory(post)}</div><h3 className="editable-display mt-2 text-2xl font-semibold leading-none sm:text-3xl">{safeTitle(post)}</h3></div></Link>)}</div></div>
    </div></section>
  )
}

export function EditableHomeCta() {
  return <section className="px-4 py-20 text-center sm:py-28"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[var(--slot4-accent-fill)]">Share what you know</p><h2 className="editable-display mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[.95] sm:text-7xl">Bring your story or business into the conversation.</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[var(--slot4-muted-text)]">Publish a useful article or introduce your business to people actively looking to learn, compare, and discover.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/create" className="nav-action px-7">Create a post</Link><Link href="/contact" className="inline-flex items-center border border-[var(--slot4-page-text)] px-7 py-3 text-xs font-bold uppercase tracking-[.16em]">Contact us</Link></div></section>
}
