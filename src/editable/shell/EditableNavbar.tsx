'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, LogOut, PenLine } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const taskLinks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 4), [])
  const links = [{ label: 'Home', href: '/' }, ...taskLinks.map((task) => ({ label: task.label, href: task.route })), { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]

  return (
    <header className="editorial-nav sticky top-0 z-50 bg-[var(--editable-nav-bg)]/95 backdrop-blur-xl">
      <div className="hidden" aria-hidden="true">
        <div className="mx-auto flex h-9 max-w-[var(--editable-container)] items-center justify-between px-4 text-[10px] uppercase tracking-[.22em] sm:px-6 lg:px-8">
          <span>Ideas · Guides · Local discovery</span>
          <span className="hidden text-white/65 sm:block">Read well. Choose confidently.</span>
        </div>
      </div>
      <div className="mx-auto grid min-h-[84px] max-w-[var(--editable-container)] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => setOpen(!open)} className="nav-icon" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        <Link href="/" className="flex items-center gap-3 justify-self-center" aria-label={`${SITE_CONFIG.name} home`}>
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden border border-[var(--editable-border)] bg-white p-1.5 sm:h-14 sm:w-14">
            <img src="/favicon.png?v=20260413" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="text-left">
            <span className="editable-display block text-[clamp(1.65rem,3vw,2.5rem)] font-semibold leading-none tracking-[-.045em]">{SITE_CONFIG.name}</span>
            <span className="mt-1.5 hidden text-[8px] font-semibold uppercase tracking-[.3em] text-[var(--slot4-muted-text)] sm:block">Business &amp; knowledge journal</span>
          </span>
        </Link>
        <div className="flex items-center justify-end gap-2">
          <Link href="/search" className="nav-icon" aria-label="Search"><Search /></Link>
          {session ? (
            <>
              <span className="hidden max-w-28 truncate text-sm font-semibold md:block">{session.name}</span>
              <Link href="/create" className="nav-action hidden sm:inline-flex"><PenLine className="h-4 w-4" /> Create</Link>
              <button type="button" onClick={logout} className="nav-icon" aria-label="Logout"><LogOut /></button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden text-xs font-semibold uppercase tracking-[.14em] sm:block">Login</Link>
              <Link href="/signup" className="nav-action hidden sm:inline-flex">Sign up</Link>
            </>
          )}
        </div>
      </div>
      <nav className="hidden border-y border-[var(--editable-border)] lg:block">
        <div className="mx-auto flex h-12 max-w-[var(--editable-container)] items-center justify-center gap-9 px-8">
          {links.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return <Link key={item.href} href={item.href} className={`nav-link ${active ? 'is-active' : ''}`}>{item.label}</Link>
          })}
        </div>
      </nav>
      {open ? (
        <div className="absolute inset-x-0 border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 shadow-xl lg:hidden">
          <div className="mx-auto grid max-w-xl gap-1">{links.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[var(--editable-border)] px-2 py-3 text-sm font-semibold uppercase tracking-[.14em]">{item.label}</Link>)}</div>
          <div className="mx-auto mt-4 flex max-w-xl gap-2 sm:hidden">{session ? <><Link href="/create" className="nav-action">Create</Link><button onClick={logout} className="nav-action">Logout</button></> : <><Link href="/login" className="nav-action">Login</Link><Link href="/signup" className="nav-action">Sign up</Link></>}</div>
        </div>
      ) : null}
    </header>
  )
}
