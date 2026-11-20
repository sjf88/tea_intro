import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts, type Block } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | 福爾摩沙茶語`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === post.slug);
  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <main className="flex-1 bg-cream text-ink">
      {/* 封面 */}
      <header className="theme-keep relative isolate overflow-hidden bg-ink text-cream">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/80" />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <Link href="/blog" className="text-sm text-cream/80 hover:text-cream">
            ← 返回部落格
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-cream/80">
            <span className="rounded-md bg-cream px-2.5 py-1 text-xs font-medium text-ink">
              {post.category}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>約 {post.readMinutes} 分鐘閱讀</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/85">{post.excerpt}</p>
        </div>
      </header>

      {/* 內文 */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        {post.content.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </article>

      {/* 上一篇／下一篇 */}
      <nav aria-label="其他文章" className="border-t border-sand-dark">
        <div className="mx-auto grid max-w-3xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6">
          {prev ? <PostLink post={prev} label="← 上一篇" /> : <span className="hidden sm:block" />}
          {next ? <PostLink post={next} label="下一篇 →" alignRight /> : null}
        </div>
      </nav>
    </main>
  );
}

function PostLink({
  post,
  label,
  alignRight = false,
}: {
  post: { slug: string; title: string };
  label: string;
  alignRight?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`rounded-lg bg-sand p-5 transition-colors hover:bg-ink hover:text-cream ${
        alignRight ? "sm:text-right" : ""
      }`}
    >
      <div className="text-sm opacity-70">{label}</div>
      <div className="mt-1 font-semibold leading-snug">{post.title}</div>
    </Link>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 mb-4 flex items-center gap-3 text-2xl font-bold first:mt-0">
          <span aria-hidden className="h-6 w-1 bg-ink" />
          {block.text}
        </h2>
      );
    case "p":
      return <p className="my-5 text-lg leading-9 text-ink/90">{block.text}</p>;
    case "ul":
      return (
        <ul className="my-6 flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-8 text-ink/90">
              <span aria-hidden className="mt-3 h-2 w-2 shrink-0 rounded-sm bg-ink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 rounded-lg bg-ink px-6 py-6 text-lg leading-8 font-medium text-cream sm:px-8">
          {block.text}
        </blockquote>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-lg border-2 border-ink">
          <table className="w-full min-w-[32rem] text-left">
            <thead className="bg-ink text-cream">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-sand-dark odd:bg-cream even:bg-sand">
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 font-semibold whitespace-nowrap">
                        {cell}
                      </th>
                    ) : (
                      <td key={j} className="px-4 py-3 text-ink/90">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <p className="mt-12 rounded-lg border-l-4 border-ink bg-sand px-5 py-4 text-sm leading-7 text-ink-light">
          {block.text}
        </p>
      );
  }
}
