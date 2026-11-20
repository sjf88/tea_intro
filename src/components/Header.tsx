"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

// 首頁區塊用 "/#id"，從其他分頁點擊也能回到首頁對應區塊
const links = [
  { href: "/#teas", label: "茶種" },
  { href: "/#story", label: "茶的故事" },
  { href: "/#brew", label: "沖泡" },
  { href: "/blog", label: "部落格" },
  { href: "/#contact", label: "聯絡" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  const isActive = (href: string) => href === "/blog" && pathname.startsWith("/blog");

  return (
    <header className="theme-keep sticky top-0 z-30 bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6 md:py-4">
        <Link href="/" onClick={close} className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-cream text-lg font-bold text-ink">
            茶
          </span>
          <span className="text-lg font-semibold tracking-wider">福爾摩沙茶語</span>
        </Link>

        {/* 平板／電腦：橫向選單 */}
        <nav className="hidden items-center gap-6 text-sm md:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`border-b-2 py-1 transition-colors hover:border-cream hover:text-cream ${
                isActive(l.href) ? "border-cream text-cream" : "border-transparent text-cream/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
        <ThemeToggle />

        <Link
          href="/#contact"
          className="hidden rounded-md bg-cream px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand md:inline-block"
        >
          訂閱茶訊
        </Link>

        {/* 手機：漢堡選單按鈕 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "關閉選單" : "開啟選單"}
          className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-ink-light md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        </div>
      </div>

      {/* 手機：展開選單 */}
      <nav
        id="mobile-menu"
        className={`border-t border-cream/10 md:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col px-4 py-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={close}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`block rounded-md px-3 py-3 transition-colors hover:bg-ink-light ${
                  isActive(l.href) ? "bg-ink-light text-cream" : "text-cream/90"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="px-3 pb-3 pt-2">
            <Link
              href="/#contact"
              onClick={close}
              className="block rounded-md bg-cream py-3 text-center font-medium text-ink transition-colors hover:bg-sand"
            >
              訂閱茶訊
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
