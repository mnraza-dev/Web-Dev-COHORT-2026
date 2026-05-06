import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { Skeleton } from '../components/UI';
import { Play, MoreVertical, Eye, ThumbsUp, Video } from 'lucide-react';
import { cn } from '../utils/cn';

const fetchVideos = () => api.get('/public/youtube/videos');
const formatDuration = (iso) => {
  if (!iso) return '';
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = m[1] ? `${m[1]}:` : '';
  const min = m[2] ? (m[1] ? m[2].padStart(2, '0') : m[2]) : '0';
  const sec = (m[3] || '0').padStart(2, '0');
  return `${h}${min}:${sec}`;
};

const formatViews = (n) => {
  if (!n) return '0';
  const v = parseInt(n);
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
  if (v >= 1_000) return (v / 1_000).toFixed(1) + 'K';
  return v.toString();
};

const formatDate = (d) => {
  if (!d) return '';
  const days = Math.ceil(Math.abs(new Date() - new Date(d)) / 86_400_000);
  if (days > 365) return Math.floor(days / 365) + ' yr ago';
  if (days > 30) return Math.floor(days / 30) + ' mo ago';
  return days + ' days ago';
};

const categories = ['All', 'Trending', 'JavaScript', 'React', 'Next.js', 'Python', 'DevOps', 'AI', 'Gaming', 'Music'];

export default function Videos() {
  const { data, loading, error } = useFetch(fetchVideos);
  const videos = data?.data ?? [];

  if (error) return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
      <div className="p-5 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <Video className="w-12 h-12" style={{ color: 'var(--crimson)' }} />
      </div>
      <h2 className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>Failed to load videos</h2>
      <p className="text-sm max-w-xs" style={{ color: 'var(--fg-muted)' }}>{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="torii-badge w-fit">
          <Video className="w-3 h-3" />
          動画 — Videos
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          Video Library
        </h1>
        <p style={{ color: 'var(--fg-muted)' }}>
          {data?.totalItems ? `${data.totalItems} videos · Page ${data.page} of ${data.totalPages}` : 'Curated tutorials and talks.'}
        </p>
      </div>
      <div
        className="sticky top-16 z-40 -mx-4 px-4 py-3 backdrop-blur-xl"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg) 88%, transparent)',
          borderBottom: '1px solid var(--border-muted)',
        }}
      >
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map((tag, i) => (
            <button
              key={tag}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                i === 0
                  ? "text-white font-bold"
                  : "hover:opacity-100 opacity-70"
              )}
              style={i === 0
                ? { background: 'linear-gradient(135deg, #c0253e, #9f1239)', boxShadow: '0 2px 12px rgba(192,37,62,0.35)' }
                : { backgroundColor: 'var(--bg-muted)', color: 'var(--fg-muted)', border: '1px solid var(--border-muted)' }
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
        {loading
          ? Array(12).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="flex gap-3 mt-1">
                <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                <div className="space-y-2 flex-grow">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
            </div>
          ))
          : videos.map((video) => {
            const v = video.items;
            const videoUrl = `https://www.youtube.com/watch?v=${v.id}`;
            const thumb =
              v.snippet?.thumbnails?.maxres?.url ??
              v.snippet?.thumbnails?.standard?.url ??
              v.snippet?.thumbnails?.high?.url ??
              v.snippet?.thumbnails?.medium?.url;

            return (
              <a
                key={v.id}
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-3"
              >
                <div
                  className="relative aspect-video rounded-xl overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-muted)' }}
                >
                  <img
                    src={thumb}
                    alt={v.snippet?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[11px] font-bold bg-black/80 text-white">
                    {formatDuration(v.contentDetails?.duration)}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-3.5 rounded-full scale-90 group-hover:scale-100 text-white shadow-2xl"
                      style={{ background: 'linear-gradient(135deg, #c0253e, #9f1239)', boxShadow: '0 0 24px rgba(192,37,62,0.6)' }}
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                    style={{ background: 'linear-gradient(135deg, #c0253e, #9f1239)' }}
                  >
                    {v.snippet?.channelTitle?.[0]?.toUpperCase() ?? 'H'}
                  </div>

                  <div className="flex flex-col min-w-0 flex-grow">
                    <h3
                      className="text-[14px] font-semibold line-clamp-2 leading-snug transition-colors group-hover:text-primary-400"
                      style={{ color: 'var(--fg)' }}
                    >
                      {v.snippet?.title}
                    </h3>

                    <span
                      className="mt-0.5 text-[13px] font-medium"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {v.snippet?.channelTitle}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[12px]" style={{ color: 'var(--fg-subtle)' }}>
                      <Eye className="w-3 h-3" />
                      <span>{formatViews(v.statistics?.viewCount)} views</span>
                      <span>•</span>
                      <span>{formatDate(v.snippet?.publishedAt)}</span>
                    </div>

                    {v.statistics?.likeCount && (
                      <div className="flex items-center gap-1 mt-1 text-[11px]" style={{ color: 'var(--crimson)' }}>
                        <ThumbsUp className="w-2.5 h-2.5" />
                        <span>{formatViews(v.statistics.likeCount)} likes</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex-shrink-0 self-start p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    style={{ color: 'var(--fg-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}
