import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { Skeleton, Button } from '../components/UI';
import { RefreshCw, Laugh } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fetchJoke = () => api.get('/public/randomjokes/joke/random');

export default function Jokes() {
  const { data, loading, execute } = useFetch(fetchJoke);

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12">
      
      <div className="text-center space-y-3">
        <div className="torii-badge mx-auto w-fit mb-4">
          <Laugh className="w-3 h-3" />
          冗談 — Jokes
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          Daily Giggles
        </h1>
        <p className="text-lg" style={{ color: 'var(--fg-muted)' }}>
          Because life is too short to be serious.
        </p>
      </div>

      
      <div
        className="relative rounded-3xl p-12 min-h-[300px] flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <div className="torii-line absolute top-0 left-0 right-0" />

        
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[200px] font-bold opacity-[0.03]"
          style={{ fontFamily: "'Noto Serif JP', serif", color: 'var(--crimson)' }}
        >
          笑
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 w-full">
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-8 w-3/4 mx-auto rounded-xl" />
              <div className="pt-8"><Skeleton className="h-12 w-36 mx-auto rounded-xl" /></div>
            </motion.div>
          ) : (
            <motion.div
              key={data?.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 relative z-10"
            >
              <p
                className="text-2xl md:text-3xl font-medium leading-relaxed italic"
                style={{ fontFamily: "'Noto Serif JP', serif", color: 'var(--fg)' }}
              >
                "{data?.content}"
              </p>

              <button
                onClick={() => execute()}
                className="btn-crimson inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-bold"
              >
                <RefreshCw className="w-5 h-5" />
                Next Joke
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
      <div
        className="grid grid-cols-3 rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
      >
        {[
          { value: '10k+', label: 'Jokes Cached', jp: '笑話' },
          { value: 'Fresh', label: 'Updated Daily', jp: '新鮮' },
          { value: 'Free', label: 'Always Open', jp: '無料' },
        ].map((s, i) => (
          <div
            key={s.label}
            className="text-center py-6 px-4"
            style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}
          >
            <div className="text-2xl font-bold text-primary-500" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              {s.value}
            </div>
            <div className="text-[10px] tracking-widest text-primary-600 dark:text-primary-500 uppercase font-bold mt-0.5">
              {s.jp}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
