import Link from "next/link";

export default function Footer() {
  return (
    <footer className="theme-keep bg-ink-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-cream text-lg font-bold text-ink">
              茶
            </span>
            <span className="text-lg font-semibold tracking-wider">福爾摩沙茶語</span>
          </div>
          <p className="mt-4 max-w-sm leading-7 text-cream/70">
            從山間茶園到你的茶杯，用心傳遞台灣茶的風土與工藝。
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-cream/50">探索</h3>
          <ul className="mt-4 flex flex-col gap-2 text-cream/80">
            <li><Link href="/#teas" className="hover:text-cream">經典茶種</Link></li>
            <li><Link href="/#story" className="hover:text-cream">茶的故事</Link></li>
            <li><Link href="/#brew" className="hover:text-cream">沖泡指南</Link></li>
            <li><Link href="/blog" className="hover:text-cream">茶語部落格</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-widest text-cream/50">聯絡我們</h3>
          <ul className="mt-4 flex flex-col gap-2 text-cream/80">
            <li>台北市大安區茶香路 1 號</li>
            <li>(02) 1234-5678</li>
            <li>hello@formosatea.example</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-cream/50 sm:px-6">
          © 2026 福爾摩沙茶語 · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
