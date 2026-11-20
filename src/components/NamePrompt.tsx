"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { readLocal, useLocalValue, writeLocal } from "@/lib/localStore";

export const NAME_KEY = "visitor-name";
const OPEN_EVENT = "open-name-prompt";
const MAX_LENGTH = 20;

/** 從任何地方重新開啟稱呼輸入框（例如「更改稱呼」按鈕） */
export function openNamePrompt() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * 第一次進站時詢問訪客稱呼，存在 localStorage。
 * 已經填過就不再自動跳出。
 */
export default function NamePrompt() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const name = useLocalValue(NAME_KEY);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const open = () => {
      if (inputRef.current) inputRef.current.value = readLocal(NAME_KEY) ?? "";
      if (!dialog.open) dialog.showModal();
    };

    if (!readLocal(NAME_KEY)) open();
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const close = () => dialogRef.current?.close();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (inputRef.current?.value ?? "").trim().slice(0, MAX_LENGTH);
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    writeLocal(NAME_KEY, value);
    close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="name-prompt-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg bg-cream p-0 text-ink backdrop:bg-ink-dark/70"
    >
      <form onSubmit={submit} className="p-6 sm:p-8">
        <div className="mb-4 h-1 w-12 bg-ink" />
        <h2 id="name-prompt-title" className="text-2xl font-bold">
          {name ? "更改稱呼" : "歡迎來到福爾摩沙茶語"}
        </h2>
        <p className="mt-2 leading-7 text-ink-light">我們該怎麼稱呼你呢？</p>

        <label htmlFor="visitor-name" className="sr-only">
          你的稱呼
        </label>
        <input
          ref={inputRef}
          id="visitor-name"
          type="text"
          required
          maxLength={MAX_LENGTH}
          autoComplete="nickname"
          placeholder="例如：小明"
          className="mt-5 w-full rounded-md border-2 border-ink bg-cream px-4 py-3 outline-none placeholder:text-ink-light/60 focus:bg-white dark:focus:bg-sand"
        />

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={close}
            className="rounded-md border-2 border-ink px-5 py-2.5 font-medium transition-colors hover:bg-ink hover:text-cream"
          >
            {name ? "取消" : "先略過"}
          </button>
          <button
            type="submit"
            className="rounded-md bg-ink px-5 py-2.5 font-medium text-cream transition-colors hover:bg-ink-light"
          >
            確定
          </button>
        </div>
      </form>
    </dialog>
  );
}
