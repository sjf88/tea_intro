"use client";

import { useRef, useState } from "react";

/** 中獎機率：10% 抽中 9 折購物優惠券 */
const WIN_RATE = 0.1;
const STORAGE_KEY = "lucky-draw-result";
const DRAW_DURATION = 1600;

type Result = { win: true; code: string } | { win: false };
type Phase = "idle" | "drawing" | "done";

// 以 crypto 產生亂數，比 Math.random 更均勻
function random() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 2 ** 32;
}

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const buf = new Uint8Array(6);
  crypto.getRandomValues(buf);
  return "TEA90-" + Array.from(buf, (n) => chars[n % chars.length]).join("");
}

function loadResult(): Result | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Result) : null;
  } catch {
    return null;
  }
}

function saveResult(result: Result) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // 無痕模式等情況存不了也沒關係
  }
}

/**
 * 抽獎按鈕 + Modal。每位訪客（同一瀏覽器）只能抽一次，結果存在 localStorage。
 * 注意：抽獎邏輯在前端執行，僅適合行銷展示；若優惠券要實際折抵，
 * 需改由後端抽獎並發放、驗證券號。
 */
export default function LuckyDraw({ className = "" }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const open = () => {
    // 開啟時讀取先前結果，已抽過就直接顯示
    const saved = phase === "idle" ? loadResult() : null;
    if (saved) {
      setResult(saved);
      setPhase("done");
    }
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const draw = () => {
    if (phase !== "idle") return;
    setPhase("drawing");
    const next: Result = random() < WIN_RATE ? { win: true, code: makeCode() } : { win: false };
    saveResult(next);
    window.setTimeout(() => {
      setResult(next);
      setPhase("done");
    }, DRAW_DURATION);
  };

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // 複製失敗時使用者仍可手動選取券號
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`rounded-md bg-sand px-6 py-3 text-center font-medium text-ink transition-colors hover:bg-sand-dark ${className}`}
      >
        🎁 幸運抽獎
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="lucky-draw-title"
        onClick={(e) => {
          // 點擊背景（dialog 本身）關閉
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg bg-cream p-0 text-ink backdrop:bg-ink-dark/70"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="關閉"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-sand"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="mb-4 h-1 w-12 bg-ink" />
          <h2 id="lucky-draw-title" className="text-2xl font-bold">
            幸運好茶抽獎
          </h2>
          <p className="mt-2 leading-7 text-ink-light">
            每人限抽一次，有機會獲得全館 <strong className="text-ink">9 折購物優惠券</strong>！
          </p>

          {/* 抽獎轉盤區 */}
          <div className="mt-6 flex flex-col items-center gap-5 rounded-lg bg-sand p-6">
            <div
              aria-hidden
              className={`flex h-28 w-28 items-center justify-center rounded-full border-4 border-ink bg-cream text-5xl ${
                phase === "drawing" ? "animate-spin motion-reduce:animate-pulse" : ""
              }`}
            >
              {phase === "done" ? (result?.win ? "🎉" : "🍵") : "🎁"}
            </div>

            <div aria-live="polite" className="w-full text-center">
              {phase === "idle" && (
                <button
                  type="button"
                  onClick={draw}
                  className="w-full rounded-md bg-ink px-6 py-3 font-medium text-cream transition-colors hover:bg-ink-light"
                >
                  開始抽獎
                </button>
              )}

              {phase === "drawing" && <p className="py-3 font-medium">抽獎中…</p>}

              {phase === "done" && result?.win && (
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-bold">恭喜中獎！獲得 9 折購物優惠券</p>
                  <div className="flex items-stretch gap-2">
                    <code className="flex-1 select-all rounded-md border-2 border-dashed border-ink bg-cream px-3 py-2 font-mono text-lg tracking-wider">
                      {result.code}
                    </code>
                    <button
                      type="button"
                      onClick={() => copy(result.code)}
                      className="rounded-md bg-ink px-4 font-medium text-cream transition-colors hover:bg-ink-light"
                    >
                      {copied ? "已複製" : "複製"}
                    </button>
                  </div>
                  <p className="text-sm text-ink-light">結帳時輸入券號即可享 9 折優惠。</p>
                </div>
              )}

              {phase === "done" && result && !result.win && (
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-bold">差一點點！這次沒有中獎</p>
                  <p className="text-sm text-ink-light">感謝參加，歡迎來杯好茶轉換心情。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
