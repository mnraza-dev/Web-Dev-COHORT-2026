import { motion } from 'framer-motion';
import { ArrowRight, Users, Utensils, Cat, MessageSquare, Quote, ShoppingBag, Video, Shield, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../utils/cn';
const features = [
  { name: 'Users', href: '/users', icon: Users, jp: 'ユーザー', desc: 'Random profiles from around the world.', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  { name: 'Meals', href: '/meals', icon: Utensils, jp: '食事', desc: 'Global recipes and food categories.', color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  { name: 'Cats', href: '/cats', icon: Cat, jp: '猫', desc: 'Random breeds with full temperament info.', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  { name: 'Jokes', href: '/jokes', icon: MessageSquare, jp: '冗談', desc: 'A curated feed of laughs and puns.', color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
  { name: 'Quotes', href: '/quotes', icon: Quote, jp: '引用', desc: 'Inspirational words from great minds.', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  { name: 'Products', href: '/products', icon: ShoppingBag, jp: '商品', desc: 'Premium products with rich metadata.', color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
  { name: 'Videos', href: '/videos', icon: Video, jp: '動画', desc: 'YouTube-style feed with real video data.', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  { name: 'Auth', href: '/auth', icon: Shield, jp: '認証', desc: 'Full auth flow — register, login, profile.', color: '#c0253e', bg: 'rgba(192,37,62,0.12)' },
];

const stats = [
  { value: '8+', jp: 'モジュール', label: 'Modules' },
  { value: '16', jp: '動画', label: 'Videos' },
  { value: '32+', jp: '商品', label: 'Products' },
  { value: '99.9%', jp: '稼働率', label: 'Uptime' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' } }),
};

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-20 pb-24">
      <section className="relative text-center space-y-8 pt-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '#c0253e' }} />
          <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full blur-[100px] opacity-10" style={{ backgroundColor: '#c9a227' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {user && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <span className="torii-badge mx-auto w-fit mb-6 inline-flex">
                <Sparkles className="w-3 h-3" />
                Welcome back, {user.username} · {user.role}
              </span>
            </motion.div>
          )}
          <h1
            className="text-6xl md:text-8xl font-bold tracking-tight leading-none"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            <span style={{ color: 'var(--fg)' }}>One Hub.</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #c0253e 0%, #f47e94 40%, #c9a227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Endless APIs.
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg mt-6" style={{ color: 'var(--fg-muted)', lineHeight: 1.7 }}>
            A curated playground for exploring Mugen API endpoints. From random users to full authentication flows — all in one place.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #c0253e, #9f1239)',
              boxShadow: '0 8px 32px rgba(192,37,62,0.4)',
            }}
          >
            <Zap className="w-5 h-5" />
            Explore Now
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--fg)',
            }}
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Products
          </Link>
        </motion.div>

        <div className="jp-divider max-w-xs mx-auto text-[11px] tracking-[0.3em]" style={{ color: 'var(--fg-subtle)' }}>
          <span>機能一覧</span>
        </div>
      </section>

      <section>
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-primary-600 mb-2">━ すべての機能</p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif", color: 'var(--fg)' }}>
            All Features
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Link to={f.href} className="group block h-full">
                <div
                  className="h-full flex flex-col p-6 rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = f.color + '60';
                    e.currentTarget.style.boxShadow = `0 8px 32px ${f.color}18`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: f.bg, color: f.color }}
                  >
                    <f.icon className="w-6 h-6" />
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-base font-bold" style={{ color: 'var(--fg)', fontFamily: "'Noto Serif JP', serif" }}>
                      {f.name}
                    </h3>
                    <span className="text-[10px] font-bold" style={{ color: f.color }}>{f.jp}</span>
                  </div>

                  <p className="text-sm flex-grow" style={{ color: 'var(--fg-muted)', lineHeight: 1.6 }}>{f.desc}</p>

                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-bold transition-all duration-200 group-hover:gap-2"
                    style={{ color: f.color }}
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="relative rounded-3xl p-12 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="torii-line absolute top-0 left-0 right-0" />
        <div className="torii-line absolute bottom-0 left-0 right-0" />

        <div
          className="absolute inset-0 flex items-center justify-center text-[180px] font-bold opacity-[0.025] select-none pointer-events-none"
          style={{ fontFamily: "'Noto Serif JP', serif", color: '#c0253e' }}
        >
          八
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <div
                className="text-5xl font-black"
                style={{ fontFamily: "'Noto Serif JP', serif", color: 'var(--fg)' }}
              >
                {s.value}
              </div>
              <div className="text-[10px] tracking-[0.25em] text-primary-500 font-bold uppercase">{s.jp}</div>
              <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
