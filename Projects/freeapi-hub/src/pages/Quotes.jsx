import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { Card, Skeleton } from '../components/UI';
import { Quote as QuoteIcon, User } from 'lucide-react';

const fetchQuotes = () => api.get('/public/quotes');

export default function Quotes() {
  const { data, loading, error } = useFetch(fetchQuotes);

  if (error) return (
    <div className="flex items-center justify-center py-20 text-center">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <div className="torii-badge w-fit">
          <QuoteIcon className="w-3 h-3" />
          引用 — Quotes
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          Wisdom Gallery
        </h1>
        <p className="text-lg" style={{ color: 'var(--fg-muted)' }}>
          Curated thoughts to inspire your creative journey.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
        {loading
          ? Array(9).fill(0).map((_, i) => (
              <Card key={i} className="p-6 break-inside-avoid">
                <Skeleton className="h-4 w-full mb-2 rounded-lg" />
                <Skeleton className="h-4 w-3/4 mb-4 rounded-lg" />
                <Skeleton className="h-3 w-1/2 rounded-lg" />
              </Card>
            ))
          : data?.data?.map((quote) => (
              <div
                key={quote._id}
                className="break-inside-avoid rounded-2xl p-7 group relative overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                
                <div
                  className="absolute -top-3 -left-2 text-7xl font-serif opacity-10 select-none leading-none"
                  style={{ color: 'var(--crimson)', fontFamily: "'Noto Serif JP', serif" }}
                >
                  "
                </div>

                <blockquote className="space-y-5 relative z-10">
                  <p
                    className="text-lg font-medium leading-relaxed"
                    style={{ fontFamily: "'Noto Serif JP', serif", color: 'var(--fg)' }}
                  >
                    {quote.content}
                  </p>

                  <footer
                    className="flex items-center gap-2 pt-4"
                    style={{ borderTop: '1px solid var(--border-muted)' }}
                  >
                    <div
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--crimson)' }}
                    >
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--fg-muted)' }}>
                      {quote.author}
                    </span>
                  </footer>
                </blockquote>
              </div>
            ))}
      </div>
    </div>
  );
}
