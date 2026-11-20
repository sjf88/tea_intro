"use client";

import { useState, type FormEvent } from "react";

// 帳號@網域.頂級網域：不允許空白、連續的點，頂級網域至少 2 個英文字母
const EMAIL_RE = /^[^\s@.]+(\.[^\s@.]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

function validate(value: string): string | null {
  const email = value.trim();
  if (!email) return "請輸入 Email";
  if (email.length > 254 || !EMAIL_RE.test(email)) return "Email 格式不正確，例如：name@example.com";
  return null;
}

/**
 * 訂閱表單：送出時驗證 Email 格式；送出過一次後，邊打字邊即時更新錯誤訊息。
 * 目前沒有後端，驗證通過後只顯示成功訊息。
 */
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);
  const error = touched ? validate(email) : null;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (validate(email)) {
      (e.currentTarget.elements.namedItem("email") as HTMLInputElement | null)?.focus();
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <p role="status" className="w-full max-w-md rounded-md border-2 border-ink bg-cream px-4 py-3 font-medium">
        訂閱成功！我們會寄送茶訊到 {email.trim()}。
      </p>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="subscribe-email" className="sr-only">
          Email
        </label>
        <input
          id="subscribe-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="輸入你的 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "subscribe-email-error" : undefined}
          className={`flex-1 rounded-md border-2 bg-cream px-4 py-3 placeholder:text-ink-light/60 outline-none focus:bg-white dark:focus:bg-sand ${
            error ? "border-red-700 dark:border-red-400" : "border-ink"
          }`}
        />
        <button
          type="submit"
          className="rounded-md bg-ink px-6 py-3 font-medium text-cream transition-colors hover:bg-ink-light"
        >
          訂閱
        </button>
      </div>
      {error && (
        <p id="subscribe-email-error" role="alert" className="mt-2 text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
