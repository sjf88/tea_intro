"use client";

import { useSyncExternalStore } from "react";

/**
 * 讓多個元件共用同一筆 localStorage 資料。
 * 寫入時發出事件通知訂閱者；跨分頁則靠瀏覽器的 storage 事件同步。
 */
const EVENT = "local-store-change";

export function readLocal(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // 無痕模式或封鎖儲存時
  }
}

export function writeLocal(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // 存不了就只在本次頁面生效
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** 伺服器端與 hydration 期間回傳 null，之後換成 localStorage 的值 */
export function useLocalValue(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => readLocal(key),
    () => null,
  );
}
