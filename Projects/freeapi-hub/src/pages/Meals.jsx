import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { Skeleton } from '../components/UI';
import { UtensilsCrossed, Tag, Utensils } from 'lucide-react';

const fetchMeals = () => api.get('/public/meals');

export default function Meals() {
  const { data, loading, error } = useFetch(fetchMeals);

  if (error) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="torii-badge w-fit">
          <Utensils className="w-3 h-3" />
          食事 — Meals
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          Global Meals
        </h1>
        <p style={{ color: 'var(--fg-muted)' }}>Delicious recipes from every corner of the world.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array(8).fill(0).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4 rounded-lg" />
                  <Skeleton className="h-3 w-1/2 rounded-lg" />
                  <div className="pt-4 flex gap-2">
                    <Skeleton className="h-7 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          : data?.data?.map((meal) => (
              <div
                key={meal.idMeal}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: 'rgba(9,9,13,0.85)', color: 'var(--fg)', backdropFilter: 'blur(8px)' }}
                    >
                      <Tag className="w-2.5 h-2.5" style={{ color: 'var(--crimson)' }} />
                      {meal.strCategory}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3
                    className="font-bold leading-snug group-hover:text-primary-400 transition-colors"
                    style={{ color: 'var(--fg)', fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {meal.strMeal}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="ink-tag">
                      <UtensilsCrossed className="w-3 h-3" />
                      {meal.strArea}
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        backgroundColor: 'var(--bg-muted)',
                        color: 'var(--fg-muted)',
                        border: '1px solid var(--border-muted)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(192,37,62,0.12)';
                        e.currentTarget.style.color = '#f47e94';
                        e.currentTarget.style.borderColor = 'rgba(192,37,62,0.4)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
                        e.currentTarget.style.color = 'var(--fg-muted)';
                        e.currentTarget.style.borderColor = 'var(--border-muted)';
                      }}
                    >
                      View Recipe →
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
