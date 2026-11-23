import Image from "next/image";
import TeaCard, { type Tea } from "@/components/TeaCard";
import ParallaxImage from "@/components/ParallaxImage";
import LuckyDraw from "@/components/LuckyDraw";
import WelcomeMessage from "@/components/WelcomeMessage";
import SubscribeForm from "@/components/SubscribeForm";

// 圖片檔名需與茶名一致：public/images/{name}.jpg
const teas: Tea[] = [
  {
    name: "高山烏龍",
    region: "阿里山・梨山・杉林溪",
    note: "生長於海拔千米以上的雲霧之中，花香清雅、湯色金黃，入口甘甜滑順。",
    tag: "輕發酵",
    aroma: "清雅花香",
    temp: "95°C",
  },
  {
    name: "凍頂烏龍",
    region: "南投鹿谷",
    note: "經傳統焙火，帶有熟果與焙香，喉韻厚實回甘，是台灣烏龍的經典代表。",
    tag: "中焙火",
    aroma: "熟果焙香",
    temp: "95–100°C",
  },
  {
    name: "東方美人",
    region: "新竹北埔・峨眉",
    note: "茶葉經小綠葉蟬叮咬後產生獨特蜜香，湯色琥珀，帶有熟果與蜂蜜韻味。",
    tag: "重發酵",
    aroma: "蜂蜜熟果",
    temp: "85–90°C",
  },
  {
    name: "文山包種",
    region: "新北坪林",
    note: "條索狀外型，發酵最輕的烏龍茶，清新花香如蘭，湯色蜜綠清澈。",
    tag: "清香型",
    aroma: "幽雅蘭香",
    temp: "85–90°C",
  },
  {
    name: "木柵鐵觀音",
    region: "台北木柵",
    note: "反覆焙揉而成，帶有特殊的「觀音韻」，果酸與焙火香交織，耐沖泡。",
    tag: "重焙火",
    aroma: "焙火果酸",
    temp: "95–100°C",
  },
  {
    name: "日月潭紅茶",
    region: "南投魚池",
    note: "台茶18號「紅玉」帶有天然肉桂與薄荷香氣，被譽為「台灣香」。",
    tag: "全發酵",
    aroma: "肉桂薄荷",
    temp: "90–95°C",
  },
];

const stats = [
  { value: "200+", label: "年製茶歷史" },
  { value: "1,000m", label: "高山茶園海拔" },
  { value: "6", label: "大經典茶種" },
];

const pillars = [
  ["風土", "高山雲霧、晝夜溫差大，造就茶葉細緻甘甜。"],
  ["工藝", "萎凋、浪菁、殺菁、揉捻、焙火，每一步皆是職人功夫。"],
  ["文化", "以茶會友、以茶待客，茶是台灣人生活的一部分。"],
];

const steps = [
  { title: "溫壺", desc: "以熱水溫熱茶壺與茶杯，喚醒茶器溫度。" },
  { title: "置茶", desc: "茶葉約佔壺身四分之一，球狀烏龍可略少。" },
  { title: "注水", desc: "烏龍茶建議 90–95°C，綠茶與包種約 85°C。" },
  { title: "出湯", desc: "首泡約 50 秒，之後每泡增加 10–15 秒。" },
];

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8 md:mb-12">
      <div className="mb-4 h-1 w-12 bg-ink" />
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-light">{sub}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1 text-ink">
      {/* Hero */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:gap-12 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
          <div className="flex flex-col gap-5 md:gap-6">
            <WelcomeMessage />
            <span className="w-fit rounded-md bg-sand px-3 py-1 text-sm font-medium tracking-wide">
              TAIWAN TEA · 台灣好茶
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              一葉匠心
              <br />
              台灣好茶
            </h1>
            <p className="max-w-lg text-base leading-8 text-ink-light sm:text-lg">
              從雲霧繚繞的高山茶園，到職人手中的揉捻與焙火，
              每一口台灣茶，都蘊藏著土地的溫度與百年的工藝。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#teas"
                className="rounded-md bg-ink px-6 py-3 text-center font-medium text-cream transition-colors hover:bg-ink-light"
              >
                探索茶種
              </a>
              <a
                href="#brew"
                className="rounded-md border-2 border-ink px-6 py-3 text-center font-medium transition-colors hover:bg-ink hover:text-cream"
              >
                沖泡指南
              </a>
              <LuckyDraw />
            </div>
          </div>

          <div className="theme-keep overflow-hidden rounded-lg bg-ink text-cream">
            {/* 手機 4:5 直式、平板 16:10 橫式、電腦回到 4:5 */}
            <div className="relative aspect-[4/5] max-h-[520px] w-full bg-ink-light md:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="/images/tea.avif"
                alt="一杯台灣好茶"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1152px) 470px, (min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 text-center sm:gap-3 sm:p-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-md bg-ink-dark px-2 py-3 sm:p-3">
                  <div className="text-lg font-bold sm:text-xl">{s.value}</div>
                  <div className="mt-1 text-xs text-cream/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 茶種 */}
      <section id="teas" className="scroll-mt-20 bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <SectionTitle title="經典台灣茶" sub="六款代表茶種，六種風土滋味" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teas.map((t) => (
              <TeaCard key={t.name} tea={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 故事 */}
      <section id="story" className="theme-keep relative isolate scroll-mt-20 overflow-hidden bg-ink text-cream">
        {/* 視差背景 + 墨綠遮罩 */}
        <ParallaxImage src="/images/tea2.avif" />
        <div aria-hidden className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <div className="mb-4 h-1 w-12 bg-cream" />
            <h2 className="text-3xl font-bold sm:text-4xl">茶的故事</h2>
            <p className="mt-6 leading-8 text-cream/80">
              十九世紀，茶苗隨先民渡海來台，在北部丘陵落地生根。
              台灣烏龍茶以「Formosa Oolong」之名遠銷海外，讓世界認識了這座島嶼。
            </p>
            <p className="mt-4 leading-8 text-cream/80">
              獨特的亞熱帶氣候、多雨潮濕的山區環境，加上世代傳承的製茶技藝，
              孕育出從清香到濃郁、層次豐富的台灣茶風味。
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {pillars.map(([title, desc]) => (
              <li key={title} className="flex gap-4 rounded-lg border border-cream/10 bg-ink-dark/70 p-4 sm:gap-5 sm:p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-cream text-lg font-bold text-ink">
                  {title[0]}
                </span>
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="mt-1 leading-7 text-cream/75">{desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 沖泡 */}
      <section id="brew" className="scroll-mt-20 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <SectionTitle title="沖泡四步驟" sub="在家也能泡出一壺好茶" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-lg border-2 border-ink p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ink font-bold text-cream">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-7 text-ink-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 訂閱 */}
      <section id="contact" className="scroll-mt-20 bg-sand">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-14 sm:px-6 md:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">來杯好茶吧</h2>
            <p className="mt-3 max-w-md leading-8 text-ink-light">
              訂閱我們的茶訊，第一時間收到當季新茶與品茶活動資訊。
            </p>
          </div>
          <SubscribeForm />
        </div>
      </section>
    </main>
  );
}
