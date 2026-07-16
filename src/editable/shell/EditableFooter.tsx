'use client'

import Link from 'next/link'
import { ArrowRight, LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <section className="border-y border-white/15 px-4 py-14 text-center sm:py-20">
        <p className="text-[10px] font-bold uppercase tracking-[.3em] text-[var(--slot4-accent-soft)]">The bntinfo digest</p>
        <h2 className="editable-display mx-auto mt-4 max-w-2xl text-3xl font-medium sm:text-5xl">Useful ideas and standout businesses, in one thoughtful read.</h2>
        <Link href="/article" className="mt-7 inline-flex items-center gap-2 border-b border-white pb-1 text-xs font-bold uppercase tracking-[.18em]">Explore the journal <ArrowRight className="h-4 w-4" /></Link>
      </section>
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div><Link href="/" className="inline-flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center bg-white p-2"><img src="/favicon.png?v=20260413" alt="" className="h-full w-full object-contain" /></span><span className="editable-display text-3xl font-semibold">{SITE_CONFIG.name}</span></Link><p className="mt-4 max-w-sm text-sm leading-7 text-white/60">Practical articles and trusted business listings for curious readers, customers, and growing brands.</p></div>
        <div><p className="footer-label">Discover</p><div className="mt-4 grid gap-3">{tasks.map((task) => <Link key={task.key} href={task.route} className="footer-link">{task.label}</Link>)}</div></div>
        <div><p className="footer-label">Your account</p><div className="mt-4 grid gap-3">{session ? <><span className="text-sm text-white/65">Signed in as {session.name}</span><Link href="/create" className="footer-link">Create</Link><button type="button" onClick={logout} className="footer-link flex items-center gap-2 text-left"><LogOut className="h-4 w-4" /> Logout</button></> : <><Link href="/login" className="footer-link">Login</Link><Link href="/signup" className="footer-link">Sign up</Link></>}</div></div>
      </div>
      <div className="border-t border-white/15 px-5 py-5 text-center text-[10px] uppercase tracking-[.2em] text-white/45">© {new Date().getFullYear()} {SITE_CONFIG.name} · About · Contact · Privacy</div>
    </footer>
  )
}
