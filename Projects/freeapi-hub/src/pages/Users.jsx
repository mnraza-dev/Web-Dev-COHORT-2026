import { useFetch } from '../hooks/useFetch';
import api from '../services/api';
import { Skeleton, Button } from '../components/UI';
import { Mail, MapPin, Phone, RefreshCw, Users as UsersIcon } from 'lucide-react';

const fetchUsers = () => api.get('/public/randomusers');

export default function Users() {
  const { data, loading, error, execute } = useFetch(fetchUsers);

  if (error) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="torii-badge w-fit">
            <UsersIcon className="w-3 h-3" />
            ユーザー — Users
          </div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Random Profiles
          </h1>
          <p style={{ color: 'var(--fg-muted)' }}>Discover interesting profiles from the database.</p>
        </div>
        <Button onClick={() => execute()} disabled={loading} className="btn-crimson gap-2 self-start sm:self-end">
          <RefreshCw className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? Array(6).fill(0).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 space-y-4"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-grow">
                    <Skeleton className="h-4 w-32 rounded-lg" />
                    <Skeleton className="h-3 w-48 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-3 w-full rounded-lg" />
                  <Skeleton className="h-3 w-full rounded-lg" />
                  <Skeleton className="h-3 w-3/4 rounded-lg" />
                </div>
              </div>
            ))
          : data?.data?.map((user) => (
              <div
                key={user.login.uuid}
                className="group rounded-2xl p-6 transition-all duration-300"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={user.picture.large}
                      alt={user.name.first}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-600/30 group-hover:ring-primary-500/60 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold truncate" style={{ color: 'var(--fg)', fontFamily: "'Noto Serif JP', serif" }}>
                      {user.name.title} {user.name.first} {user.name.last}
                    </h3>
                    <p className="text-sm truncate" style={{ color: 'var(--fg-muted)' }}>@{user.login.username}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    { icon: Mail,    text: user.email },
                    { icon: Phone,   text: user.phone },
                    { icon: MapPin,  text: `${user.location.city}, ${user.location.country}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm">
                      <div className="p-1.5 rounded-lg flex-shrink-0" style={{ backgroundColor: 'var(--bg-muted)' }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: 'var(--crimson)' }} />
                      </div>
                      <span className="truncate" style={{ color: 'var(--fg-muted)' }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 pt-4 flex justify-between items-center"
                  style={{ borderTop: '1px solid var(--border-muted)' }}
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--fg-subtle)' }}>
                    {user.id.value || 'N/A'}
                  </span>
                  <span className="ink-tag capitalize">{user.gender}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
