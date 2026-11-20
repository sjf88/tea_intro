import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "茶語部落格 | 福爾摩沙茶語",
  description: "關於茶葉的知識與生活分享：喝茶的好處、台灣茶的特色、現泡茶與罐裝茶的差異。",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="flex-1 bg-cream text-ink">
      {/* 頁首 */}
      <section className="theme-keep bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <div className="mb-4 h-1 w-12 bg-cream" />
          <h1 className="text-4xl font-bold sm:text-5xl">茶語部落格</h1>
          <p className="mt-4 max-w-xl leading-8 text-cream/80">
            從健康、風土到日常選茶，用三篇短文帶你更認識手中的這杯茶。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        {/* 精選文章 */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-lg bg-sand transition-colors hover:bg-sand-dark md:grid-cols-2"
        >
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-80">
            <Image
              src={featured.cover}
              alt={featured.coverAlt}
              fill
              loading="eager"
              sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
            <PostMeta category={featured.category} date={featured.date} minutes={featured.readMinutes} />
            <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{featured.title}</h2>
            <p className="leading-8 text-ink-light">{featured.excerpt}</p>
            <ReadMore />
          </div>
        </Link>

        {/* 其他文章 */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg bg-sand transition-colors hover:bg-sand-dark"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  fill
                  sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <PostMeta category={p.category} date={p.date} minutes={p.readMinutes} />
                <h2 className="text-xl font-bold leading-snug sm:text-2xl">{p.title}</h2>
                <p className="leading-7 text-ink-light">{p.excerpt}</p>
                <div className="mt-auto">
                  <ReadMore />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function PostMeta({ category, date, minutes }: { category: string; date: string; minutes: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-light">
      <span className="rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-cream">{category}</span>
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden>·</span>
      <span>約 {minutes} 分鐘閱讀</span>
    </div>
  );
}

function ReadMore() {
  return (
    <span className="inline-flex items-center gap-2 font-medium">
      閱讀全文
      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
    </span>
  );
}
