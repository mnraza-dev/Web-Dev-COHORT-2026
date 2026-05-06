import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { Skeleton } from '../components/UI';
import { ShoppingCart, Star, ArrowUpRight, ShoppingBag, Tag, Package } from 'lucide-react';
import { useState } from 'react';

const fetchProducts = () => api.get('/public/randomproducts');
function ProductCard({ product }) {
  const [imgSrc, setImgSrc] = useState(product.thumbnail);
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(0);

  return (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div className="relative h-52 overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc(product.images?.[0] ?? '')}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <div
            className="absolute top-3 left-3 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #c0253e, #9f1239)' }}
          >
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        <div className="absolute top-3 right-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button
            className="p-2.5 rounded-xl text-white shadow-lg transition-all active:scale-90"
            style={{ background: 'linear-gradient(135deg, #c0253e, #9f1239)', boxShadow: '0 4px 16px rgba(192,37,62,0.4)' }}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(9,9,13,0.85)', color: 'var(--fg)' }}
          >
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {product.rating.toFixed(1)}
          </div>
          {product.stock <= 50 && (
            <div
              className="px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(9,9,13,0.85)', color: '#f47e94' }}
            >
              {product.stock} left
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="ink-tag capitalize">
            <Tag className="w-2.5 h-2.5" />
            {product.category}
          </span>
          <span className="ink-tag">
            {product.brand}
          </span>
        </div>

        <h3
          className="font-bold leading-snug line-clamp-1 group-hover:text-primary-400 transition-colors"
          style={{ color: 'var(--fg)', fontFamily: "'Noto Serif JP', serif" }}
        >
          {product.title}
        </h3>
        <p className="mt-1 text-xs line-clamp-2 flex-grow" style={{ color: 'var(--fg-muted)' }}>
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-xl font-black"
                style={{ color: 'var(--fg)', fontFamily: "'Noto Serif JP', serif" }}
              >
                ${discountedPrice}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs line-through" style={{ color: 'var(--fg-muted)' }}>
                  ${product.price}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wider font-bold" style={{ color: 'var(--fg-subtle)' }}>
              Free Shipping
            </span>
          </div>

          <button
            className="p-3 rounded-xl transition-all active:scale-90"
            style={{ backgroundColor: 'var(--bg-muted)', border: '1px solid var(--border-muted)', color: 'var(--fg-muted)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #c0253e, #9f1239)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-muted)';
              e.currentTarget.style.color = 'var(--fg-muted)';
              e.currentTarget.style.borderColor = 'var(--border-muted)';
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { data, loading, error } = useFetch(fetchProducts);
  const products = data?.data ?? [];

  if (error) return (
    <div className="flex items-center justify-center py-20 text-center">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="torii-badge w-fit">
            <ShoppingBag className="w-3 h-3" />
            商品 — Products
          </div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Marketplace
          </h1>
          <p style={{ color: 'var(--fg-muted)' }}>
            {data?.totalItems
              ? `${data.totalItems} products · Page ${data.page} of ${data.totalPages}`
              : 'Premium products curated from top vendors.'}
          </p>
        </div>
        {!loading && (
          <div className="flex gap-4">
            {[
              { label: '商品', value: data?.totalItems ?? '—', sub: 'Products' },
              { label: '頁', value: data?.totalPages ?? '—', sub: 'Pages' },
            ].map(s => (
              <div
                key={s.label}
                className="text-center px-5 py-3 rounded-xl"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="text-lg font-black" style={{ color: 'var(--fg)', fontFamily: "'Noto Serif JP', serif" }}>
                  {s.value}
                </div>
                <div className="text-[10px] tracking-widest text-primary-500 font-bold uppercase">{s.label}</div>
                <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array(8).fill(0).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <Skeleton className="h-52 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-3 w-3/4 rounded-lg" />
                <Skeleton className="h-3 w-2/3 rounded-lg" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-7 w-20 rounded-lg" />
                  <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
              </div>
            </div>
          ))
          : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
