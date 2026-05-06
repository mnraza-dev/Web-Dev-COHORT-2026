import { useState, useEffect, useRef } from 'react';
import { Card, Skeleton, Button } from '../components/UI';
import { RefreshCw, Download, Heart, Star, Globe, Clock, Cat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const CAT_API_URL = 'https://api.freeapi.app/api/v1/public/cats/cat/random';

const StatBar = ({ label, value, max = 5 }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
      <span>{label}</span>
      <span>{value}/{max}</span>
    </div>
    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full bg-primary-500"
      />
    </div>
  </div>
);

export default function Cats() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const getRandomCat = async () => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(CAT_API_URL, { signal: controller.signal });
      if (!response.ok) throw new Error('Failed to fetch cat');

      const json = await response.json();
      const catData = json?.data;

      if (!catData?.image) throw new Error('Invalid API response');

      setCat(catData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomCat();
    return () => controllerRef.current?.abort();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl text-primary-600"
        >
          <Cat className="w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl font-bold  tracking-tight">Random Cat Breeds</h1>
        <p className="text-slate-500 max-w-lg">
          Discover a random cat breed — click to fetch another!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        <div className="lg:col-span-3 relative group">
          <Card className="overflow-hidden border-none shadow-2xl bg-slate-200 dark:bg-slate-800 min-h-[380px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full min-h-[380px] flex items-center justify-center"
                >
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                  <RefreshCw className="w-12 h-12 text-primary-600 animate-spin relative z-10" />
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center space-y-4"
                >
                  <p className="text-red-500 font-medium">{error}</p>
                  <Button onClick={getRandomCat}>Try Again</Button>
                </motion.div>
              ) : cat?.image ? (
                <motion.img
                  key={cat.image}
                  src={cat.image}
                  alt={cat.name ?? 'Adorable Cat'}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-auto max-h-[65vh] object-contain"
                />
              ) : null}
            </AnimatePresence>

            
            {!loading && !error && cat?.image && (
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg hover:text-red-500 transition-all active:scale-90">
                  <Heart className="w-5 h-5" />
                </button>
                <a
                  href={cat.image}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg hover:text-emerald-600 transition-all active:scale-90 flex items-center justify-center"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
            )}
          </Card>

          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="info-skeleton" className="space-y-3">
                <Skeleton className="h-8 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-16 w-full rounded-lg" />
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-5 w-full rounded" />)}
              </motion.div>
            ) : cat ? (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">{cat.name}</h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {cat.origin && (
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Globe className="w-4 h-4 text-primary-500" />
                        {cat.origin}
                      </span>
                    )}
                    {cat.life_span && (
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Clock className="w-4 h-4 text-primary-500" />
                        {cat.life_span} yrs
                      </span>
                    )}
                  </div>
                </div>

                {cat.temperament && (
                  <div className="flex flex-wrap gap-1.5">
                    {cat.temperament.split(', ').slice(0, 5).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {cat.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">
                    {cat.description}
                  </p>
                )}

                <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                  {[
                    { label: 'Adaptability', value: cat.adaptability },
                    { label: 'Affection', value: cat.affection_level },
                    { label: 'Energy', value: cat.energy_level },
                    { label: 'Intelligence', value: cat.intelligence },
                    { label: 'Child Friendly', value: cat.child_friendly },
                  ].filter(s => s.value != null).map((s) => (
                    <StatBar key={s.label} label={s.label} value={s.value} />
                  ))}
                </div>

                {cat.wikipedia_url && (
                  <a
                    href={cat.wikipedia_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:underline"
                  >
                    <Star className="w-3.5 h-3.5" /> Read on Wikipedia
                  </a>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={getRandomCat}
          disabled={loading}
          className="rounded-2xl px-12 py-7 text-xl shadow-2xl shadow-primary-500/30 gap-3"
        >
          <RefreshCw className={cn("w-6 h-6", loading && "animate-spin")} />
          {loading ? "Finding a cat..." : "New Cat Please!"}
        </Button>
      </div>
    </div>
  );
}
