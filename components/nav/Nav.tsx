'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { navLinks, navActions, type NavLink } from './nav-data'

// ─── Icon component ───────────────────────────────────────────────────────────
function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-5 h-5 shrink-0', className)}
      aria-hidden
    >
      <path d={path} />
    </svg>
  )
}

// ─── Chevron ──────────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-180')}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─── Hamburger / Close icon ───────────────────────────────────────────────────
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
      aria-hidden
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

// ─── Desktop Mega Dropdown ────────────────────────────────────────────────────
function MegaDropdown({ link, isOpen }: { link: NavLink; isOpen: boolean }) {
  const dropdown = link.dropdown
  if (!dropdown) return null

  const hasTwoColumns  = dropdown.columns.length === 2
  const hasThreeOrMore = dropdown.columns.length >= 3

  return (
    <div
      role="region"
      aria-label={`${link.label} menu`}
      className={cn(
        'absolute top-full left-1/2 -translate-x-1/2 z-50',
        'bg-white border border-gray-80 rounded-2xl shadow-raised',
        'transition-all duration-200 origin-top',
        isOpen
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
        // Width depends on number of columns
        hasTwoColumns  && 'w-[640px]',
        hasThreeOrMore && 'w-[920px]',
        !hasTwoColumns && !hasThreeOrMore && 'w-[380px]',
      )}
    >
      <div className="p-6 flex gap-6">
        {/* Columns */}
        <div
          className={cn(
            'flex gap-6',
            hasThreeOrMore ? 'flex-1' : 'flex-1',
          )}
        >
          {dropdown.columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={cn(
                'flex flex-col gap-1',
                // Industry column (last in Solutions) gets smaller text, more items
                colIdx === dropdown.columns.length - 1 && hasThreeOrMore
                  ? 'flex-1'
                  : 'flex-1',
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-2">
                {col.heading}
              </p>

              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-start gap-3 rounded-xl px-2 py-2',
                    'hover:bg-primary-0 transition-colors duration-150',
                    // Industry links are compact — no icon, no description
                    !item.icon && !item.description && 'py-1.5',
                  )}
                >
                  {item.icon && (
                    <span className="mt-0.5 p-1.5 rounded-lg bg-gray-40 text-gray-820 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors shrink-0">
                      <Icon path={item.icon} className="w-4 h-4" />
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className={cn(
                      'font-medium text-gray-880 group-hover:text-primary-600 transition-colors leading-snug',
                      item.description ? 'text-sm' : 'text-xs',
                    )}>
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="text-xs text-gray-600 mt-0.5 leading-snug">
                        {item.description}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Testimonial card — only if present AND dropdown is wide enough */}
        {dropdown.testimonial && hasTwoColumns && (
          <div className="w-48 shrink-0 bg-gray-40 rounded-xl p-4 flex flex-col justify-between">
            <p className="text-xs text-gray-840 leading-relaxed italic">
              &ldquo;{dropdown.testimonial.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-2">
              {dropdown.testimonial.avatar && (
                <img
                  src={dropdown.testimonial.avatar}
                  alt={dropdown.testimonial.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              )}
              <div>
                <p className="text-xs font-semibold text-gray-880 leading-tight">
                  {dropdown.testimonial.name}
                </p>
                <p className="text-xs text-gray-600 leading-tight">
                  {dropdown.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Mobile Overlay ───────────────────────────────────────────────────────────
function MobileOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const pathname = usePathname()

  // Close overlay on route change
  useEffect(() => { onClose() }, [pathname, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 bg-white flex flex-col',
        'transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0' : 'translate-x-full',
      )}
      aria-hidden={!open}
    >
      {/* Top bar — matches nav height */}
      <div className="h-[72px] flex items-center justify-between px-5 border-b border-gray-80 shrink-0">
        <Link href="/" onClick={onClose}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.prod.website-files.com/64133c2645948d0c2427bc00/641b64adf2dbde09200ad940_Logo-FactoryFix-Color.svg"
            alt="FactoryFix"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 rounded-lg text-gray-820 hover:bg-gray-40 transition-colors"
        >
          <MenuIcon open={true} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
        {navLinks.map((link) => {
          const hasDropdown = !!link.dropdown
          const isExpanded  = expandedSection === link.label

          if (!hasDropdown) {
            return (
              <Link
                key={link.label}
                href={link.href ?? '/'}
                onClick={onClose}
                className="flex items-center py-3 text-base font-medium text-gray-880 hover:text-primary-500 transition-colors border-b border-gray-80"
              >
                {link.label}
              </Link>
            )
          }

          return (
            <div key={link.label} className="border-b border-gray-80">
              <button
                onClick={() => setExpandedSection(isExpanded ? null : link.label)}
                className="flex items-center justify-between w-full py-3 text-base font-medium text-gray-880"
                aria-expanded={isExpanded}
              >
                {link.label}
                <Chevron open={isExpanded} />
              </button>

              {isExpanded && link.dropdown && (
                <div className="pb-4 space-y-5">
                  {link.dropdown.columns.map((col, colIdx) => (
                    <div key={colIdx}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        {col.heading}
                      </p>
                      <div className="space-y-0.5">
                        {col.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 py-2 text-sm text-gray-860 hover:text-primary-500 transition-colors"
                          >
                            {item.icon && (
                              <Icon path={item.icon} className="w-4 h-4 text-gray-400 shrink-0" />
                            )}
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom CTA buttons */}
      <div className="px-5 pb-8 pt-4 flex flex-col gap-3 shrink-0 border-t border-gray-80">
        <Link
          href="/sign-up"
          onClick={onClose}
          className="w-full text-center py-3 px-6 bg-gray-880 text-white text-sm font-semibold rounded-lg hover:bg-gray-860 transition-colors"
        >
          Sign up
        </Link>
        <a
          href="https://admin.factoryfix.com/login"
          className="w-full text-center py-3 px-6 border border-gray-80 text-gray-880 text-sm font-semibold rounded-lg hover:bg-gray-40 transition-colors"
        >
          Login
        </a>
      </div>
    </div>
  )
}

// ─── Main Nav Component ───────────────────────────────────────────────────────
export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname   = usePathname()

  // Close dropdown on route change
  useEffect(() => { setOpenDropdown(null) }, [pathname])

  // Hover logic with a small delay so the dropdown doesn't flicker
  // when the cursor moves between the trigger and the dropdown panel
  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenDropdown(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white">
        <div className="site-container">
          <nav
            className="flex items-center justify-between h-[72px] gap-6"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center" aria-label="FactoryFix home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.prod.website-files.com/64133c2645948d0c2427bc00/641b64adf2dbde09200ad940_Logo-FactoryFix-Color.svg"
                alt="FactoryFix"
                width={148}
                height={34}
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop nav — all items on the right */}
            <div className="hidden lg:flex items-center gap-1 ml-auto">
              {navLinks.map((link) => {
                const hasDropdown = !!link.dropdown
                const isOpen      = openDropdown === link.label

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => hasDropdown && handleMouseEnter(link.label)}
                    onMouseLeave={() => hasDropdown && handleMouseLeave()}
                  >
                    {hasDropdown ? (
                      <button
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                          isOpen
                            ? 'text-gray-880 bg-gray-40'
                            : 'text-gray-860 hover:text-gray-880 hover:bg-gray-40',
                        )}
                      >
                        {link.label}
                        <Chevron open={isOpen} />
                      </button>
                    ) : (
                      <Link
                        href={link.href ?? '/'}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-860 hover:text-gray-880 hover:bg-gray-40 rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                    {hasDropdown && (
                      <MegaDropdown link={link} isOpen={isOpen} />
                    )}
                  </div>
                )
              })}

              {/* Login — 2px outline, bold, #210e50 */}
              <a
                href="https://admin.factoryfix.com/login"
                className="px-4 py-2 text-sm font-bold transition-colors hover:bg-gray-40"
                style={{ color: '#210e50', border: '2px solid #210e50', borderRadius: '6px' }}
              >
                Login
              </a>

              {/* Sign up — #210e50 background */}
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: '#210e50', borderRadius: '6px', marginLeft: '16px' }}
              >
                Sign up
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-820 hover:bg-gray-40 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={false} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay — rendered outside the header so it covers everything */}
      <MobileOverlay open={mobileOpen} onClose={closeMobile} />

      {/* Backdrop for desktop dropdown — transparent, just catches outside clicks */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setOpenDropdown(null)}
          aria-hidden
        />
      )}
    </>
  )
}
