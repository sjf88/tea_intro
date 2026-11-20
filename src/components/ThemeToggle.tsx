"use client";

import { useSyncExternalStore } from "react";
import { writeLocal } from "@/lib/localStore";

type Theme = "light" | "dark";

// 目前主題以 <html data-theme> 為準（由 layout 的 inline script 在首次繪製前設定）
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // 伺服器端不知道使用者偏好，回傳 null 時先不畫圖示，避免 hydration 不一致
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.setAttribute("data-theme", next);
    writeLocal("theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? "切換為暗色模式" : "切換為亮色模式"}
      title={next === "dark" ? "暗色模式" : "亮色模式"}
      className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-ink-light ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {theme === "dark" ? (
          // 目前暗色 → 顯示太陽
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : theme === "light" ? (
          // 目前亮色 → 顯示月亮
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        ) : null}
      </svg>
    </button>
  );
}
