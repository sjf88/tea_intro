"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * 滾動視差背景圖。
 * 放在 `relative overflow-hidden` 的父層中，圖片圖層比父層高 30%，
 * 捲動時以較慢速度位移，產生景深感。
 * 使用者若開啟「減少動態效果」，則維持靜態。
 */
export default function ParallaxImage({
  src,
  alt = "",
  strength = 0.12,
  sizes = "100vw",
}: {
  src: string;
  alt?: string;
  /** 位移幅度（相對父層高度），需小於 0.15 以免露出邊緣 */
  strength?: number;
  sizes?: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const parent = layer?.parentElement;
    if (!layer || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return; // 不在畫面中就不計算
      // -1（區塊在畫面下方）→ 0（置中）→ 1（區塊在畫面上方）
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      layer.style.transform = `translate3d(0, ${progress * rect.height * strength}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div
      ref={layerRef}
      aria-hidden={alt ? undefined : true}
      className="pointer-events-none absolute inset-x-0 -top-[15%] h-[130%] will-change-transform"
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
