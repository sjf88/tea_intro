"use client";

import { useLocalValue } from "@/lib/localStore";
import { NAME_KEY, openNamePrompt } from "@/components/NamePrompt";

/** 首頁歡迎訊息：有稱呼才顯示 */
export default function WelcomeMessage() {
  const name = useLocalValue(NAME_KEY);
  if (!name) return null;

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium">
      <span>歡迎你，{name} 👋</span>
      <button
        type="button"
        onClick={openNamePrompt}
        className="text-sm text-ink-light underline underline-offset-4 hover:text-ink"
      >
        更改稱呼
      </button>
    </p>
  );
}
