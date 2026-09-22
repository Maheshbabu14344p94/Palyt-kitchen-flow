import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ChefHat,
  Check,
  Clock3,
  ShoppingBag,
  TriangleAlert,
} from 'lucide-react';
import type { Ingredient, Recipe } from '../types';
import { isDishAvailable } from '../logic/inventory';

const bg =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85';

const vids = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4',
];

const copy = [
  [
    'Built for ease, not urgency',
    'Drift strips away the noise that makes organizing feel draining. Every surface is made to be soft, quiet, and intuitive so you can move forward, not get stuck decoding.',
  ],
  [
    'The gentlest way to start',
    'Beginning your day should feel natural, not daunting. Drift eases you into motion with subtle cues and a quiet view of what deserves your energy right now.',
  ],
  [
    'Deep, undivided focus',
    'No interruptions, no clutter. Drift holds you in the present task with a stripped-back layout that softens all else until you are truly ready to shift.',
  ],
];

const foodAssets = {
  biryani: '/assets/biryani.png',
  chicken: '/assets/fried-chicken.png',
};

function FeatureCard({
  title,
  desc,
  video,
  index,
  active,
}: {
  title: string;
  desc: string;
  video: string;
  index: number;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setReveal(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      id={`feature-${index}`}
      className={`rounded-[30px] border border-white/15 bg-black/25 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-700 ease-out md:p-7 xl:p-8 ${
        reveal ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
      } ${active ? 'ring-1 ring-white/20' : ''}`}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <ChefHat size={19} className="text-white/80" />
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-medium text-white md:text-2xl">
              {title}
            </h3>
            <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/40">
              0{index + 1}
            </span>
          </div>

          <p className="mt-4 text-sm font-medium leading-relaxed text-white/55">
            {desc}
          </p>
        </div>

        <div className="w-full shrink-0 overflow-hidden rounded-2xl bg-black/30 md:w-[43%]">
          <div className="aspect-video">
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function FoodVisual({
  src,
  label,
  className = '',
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`relative flex min-h-[270px] items-center justify-center overflow-visible ${className}`}>
      <div className="absolute inset-8 rounded-full bg-[#9b5b16]/15 blur-3xl" />
      <img
        src={src}
        alt=""
        className="relative z-10 max-h-[300px] w-auto max-w-full object-contain drop-shadow-[0_28px_35px_rgba(0,0,0,0.42)] transition-transform duration-700 hover:scale-[1.035]"
      />
      <div className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
        {label}
      </div>
    </div>
  );
}

export default function MenuSection({
  stock,
  recipes,
  onOrder,
  lastOrder,
}: {
  stock: Ingredient[];
  recipes: Recipe[];
  onOrder: (r: Recipe) => void;
  lastOrder: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { threshold: 0.55 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#17110b] px-4 py-20 md:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <img
        src={bg}
        alt=""
        className="pointer-events-none fixed inset-0 -z-0 h-full w-full object-cover opacity-75"
      />
      <div className="absolute inset-0 -z-0 bg-[#17110b]/45" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:hidden">
          <div className="flex items-center gap-2 text-white/50">
            <ChefHat size={16} />
            <span className="text-[11px] uppercase tracking-[.2em]">
              Menu intelligence
            </span>
          </div>
          <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] text-white md:text-5xl">
            Software that flows with your kitchen, not over it.
          </h2>
        </div>

        <div className="space-y-8">
          {/* Feature 01 */}
          <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)] lg:items-center">
            <div className="flex min-h-[280px] flex-col justify-end lg:min-h-[300px]">
              <div className="mb-4 flex items-center gap-2 text-white/45">
                <ChefHat size={15} />
                <span className="text-[10px] uppercase tracking-[.25em]">Menu intelligence</span>
              </div>
              <div className="text-sm font-medium text-white/60">
                {lastOrder ? `Latest order: ${lastOrder}` : 'Watch an order change the menu in real time.'}
              </div>
              <a
                href="#menu-live"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Jump to live menu
                <ArrowDownRight size={15} />
              </a>
            </div>

            <FeatureCard
              title={copy[0][0]}
              desc={copy[0][1]}
              video={vids[0]}
              index={0}
              active={active === 0}
            />
          </div>

          {/* Feature 02 + biryani */}
          <div
            ref={(el) => {
              refs.current[1] = el;
            }}
            data-index={1}
            className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)] lg:items-center"
          >
            <FoodVisual src={foodAssets.biryani} label="Biryani · Always a good idea" />

            <FeatureCard
              title={copy[1][0]}
              desc={copy[1][1]}
              video={vids[1]}
              index={1}
              active={active === 1}
            />
          </div>

          {/* Feature 03 + fried chicken */}
          <div
            ref={(el) => {
              refs.current[2] = el;
            }}
            data-index={2}
            className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)] lg:items-center"
          >
            <FoodVisual
              src={foodAssets.chicken}
              label="KFC · Crispy always wins"
              className="min-h-[320px]"
            />

            <FeatureCard
              title={copy[2][0]}
              desc={copy[2][1]}
              video={vids[2]}
              index={2}
              active={active === 2}
            />
          </div>

          {/* Live menu + quote */}
          <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)] lg:items-center">
            <div className="px-3 py-8 lg:px-5">
              <div className="relative pl-5">
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#d9c4aa]/50 to-transparent" />
                <div className="text-5xl leading-none text-[#D9C4AA]">“</div>
                <blockquote className="mt-2 font-serif text-3xl leading-[1.05] text-[#FFF9F2] xl:text-[42px]">
                  Why wasting time,
                  <br />
                  <em className="font-serif text-[#D9C4AA]">let’s order first.</em>
                </blockquote>
                <div className="mt-5 h-px w-14 bg-[#D9C4AA]/60" />
                <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.35em] text-white/35">
                  Good food · Better days
                </p>
              </div>
            </div>

            <div
              id="menu-live"
              className="relative overflow-hidden rounded-[34px] border border-white/75 bg-[#FFF9F2] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)] md:p-10 lg:p-11"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[#D9C4AA]/10" />

              <div className="relative z-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#321C04]/50">
                      <ShoppingBag size={16} />
                      <span className="text-[11px] uppercase tracking-[.2em]">Diner view</span>
                    </div>
                    <h3 className="mt-2 text-3xl font-normal text-[#321C04] md:text-4xl">Live menu</h3>
                    <p className="mt-2 max-w-md text-sm text-[#321C04]/55">
                      Availability updates from stock and par levels automatically.
                    </p>
                  </div>

                  {lastOrder && (
                    <div className="rounded-2xl bg-[#D9C4AA]/45 px-4 py-3 text-sm text-[#321C04]">
                      <span className="font-semibold">Ordered:</span> {lastOrder}
                    </div>
                  )}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {recipes.map((r) => {
                    const ok = isDishAvailable(r, stock);
                    return (
                      <div
                        key={r.dish}
                        className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                          ok
                            ? 'border-[#D9C4AA] bg-white shadow-[0_8px_25px_rgba(50,28,4,0.04)]'
                            : 'border-[#321C04]/10 bg-[#321C04]/[.035]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-medium text-[#321C04]">{r.dish}</h4>
                            <p className="mt-1 text-sm text-[#321C04]/55">₹{r.price}</p>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                              ok
                                ? 'bg-[#D9C4AA]/50 text-[#321C04]'
                                : 'bg-[#321C04]/10 text-[#321C04]/65'
                            }`}
                          >
                            {ok ? <Check size={11} /> : <TriangleAlert size={11} />}{' '}
                            {ok ? 'Available' : 'Unavailable'}
                          </span>
                        </div>

                        <button
                          disabled={!ok}
                          onClick={() => onOrder(r)}
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#321C04] py-2.5 text-sm font-medium text-[#FFF9F2] transition hover:bg-[#1F1003] disabled:cursor-not-allowed disabled:bg-[#321C04]/15 disabled:text-[#321C04]/40"
                        >
                          <Clock3 size={14} />
                          {ok ? 'Order one' : 'Cannot order'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
