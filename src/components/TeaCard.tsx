"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";

export type Tea = {
  name: string;
  region: string;
  tag: string;
  note: string;
  aroma: string;
  temp: string;
};

const SIZES = "(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw";

export default function TeaCard({
  tea,
}: {
  tea: Tea;
}) {
  const [flipped, setFlipped] = useState(false);
  // 圖片檔名需與茶名一致：public/images/{name}.jpg
  const src = `/images/${tea.name}.jpg`;

  const toggle = () => setFlipped((v) => !v);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${tea.name}，${flipped ? "點擊返回" : "點擊查看介紹"}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className="group relative cursor-pointer rounded-lg perspective-distant outline-none focus-visible:ring-4 focus-visible:ring-ink/40"
    >
      {/* Tooltip（不隨卡片翻轉） */}
      <span
        role="tooltip"
        className="pointer-events-none absolute top-4 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-cream opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {flipped ? "點擊返回" : "點擊查看介紹"}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-ink" />
      </span>

      <div
        className={`relative h-full transition-transform duration-700 transform-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* 正面：完整圖片 + 名稱、產地、焙火程度 */}
        <div
          aria-hidden={flipped}
          className="flex h-full flex-col overflow-hidden rounded-lg bg-cream backface-hidden"
        >
          <div className="relative aspect-square overflow-hidden bg-sand-dark">
            {/* 底層：同圖填滿並以米色淡化，讓完整圖片的留白不突兀 */}
            <Image src={src} alt="" fill sizes={SIZES} className="object-cover" aria-hidden />
            <div className="absolute inset-0 bg-sand/85" />
            {/* 上層：完整呈現的圖片 */}
            <Image
              src={src}
              alt={`${tea.name}茶葉`}
              fill
              sizes={SIZES}
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* 翻面提示（觸控裝置沒有 hover，也能知道可以點） */}
            <span className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-md bg-ink text-cream">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
              </svg>
            </span>
          </div>
          <div className="flex items-start justify-between gap-3 p-5">
            <div>
              <h3 className="text-xl font-semibold">{tea.name}</h3>
              <p className="mt-1 text-sm text-ink-light">{tea.region}</p>
            </div>
            <span className="shrink-0 rounded-md bg-sand px-3 py-1 text-xs font-medium text-ink">
              {tea.tag}
            </span>
          </div>
        </div>

        {/* 背面：茶葉圖片 + 墨綠遮罩 + 介紹 */}
        <div
          aria-hidden={!flipped}
          className="theme-keep absolute inset-0 overflow-hidden rounded-lg text-cream backface-hidden rotate-y-180"
        >
          <Image src={src} alt="" fill sizes={SIZES} className="object-cover" aria-hidden />
          <div className="absolute inset-0 bg-ink/85" />
          <div className="relative flex h-full flex-col overflow-y-auto p-5 sm:p-6">
            <span className="w-fit rounded-md bg-cream px-3 py-1 text-xs font-medium text-ink">
              {tea.tag}
            </span>
            <h3 className="mt-3 text-2xl font-bold">{tea.name}</h3>
            <p className="mt-1 text-sm text-cream/70">{tea.region}</p>
            <div className="my-4 h-0.5 w-10 bg-cream/60" />
            <p className="leading-7 text-cream/90">{tea.note}</p>
            <dl className="mt-auto grid grid-cols-2 gap-3 pt-4 text-sm">
              <div className="rounded-md bg-ink-dark/70 p-3">
                <dt className="text-cream/60">香氣</dt>
                <dd className="mt-1 font-medium">{tea.aroma}</dd>
              </div>
              <div className="rounded-md bg-ink-dark/70 p-3">
                <dt className="text-cream/60">建議水溫</dt>
                <dd className="mt-1 font-medium">{tea.temp}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
