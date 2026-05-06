import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Users, Utensils, Cat, MessageSquare, Quote,
  ShoppingBag, Video, LogOut, LogIn, Menu, X, Shield, ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home',     href: '/',         icon: Home,          jp: 'ホーム',   color: '#e11d48' },
  { name: 'Users',    href: '/users',     icon: Users,         jp: 'ユーザー', color: '#3b82f6' },
  { name: 'Meals',    href: '/meals',     icon: Utensils,      jp: '食事',     color: '#f97316' },
  { name: 'Cats',     href: '/cats',      icon: Cat,           jp: '猫',       color: '#a855f7' },
  { name: 'Jokes',    href: '/jokes',     icon: MessageSquare, jp: '冗談',     color: '#eab308' },
  { name: 'Quotes',   href: '/quotes',    icon: Quote,         jp: '引用',     color: '#10b981' },
  { name: 'Products', href: '/products',  icon: ShoppingBag,   jp: '商品',     color: '#ec4899' },
  { name: 'Videos',   href: '/videos',    icon: Video,         jp: '動画',     color: '#ef4444' },
];

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/auth') navigate('/auth');
  }, [isAuthenticated, location.pathname, navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>


      <nav
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
          borderBottom: '1px solid var(--border-muted)',
        }}
      >

        <div className="h-px w-full" style={{
          background: 'linear-gradient(to right, transparent, #c0253e 30%, #c0253e 70%, transparent)',
          boxShadow: '0 0 8px rgba(192,37,62,0.5)',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">


            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 flex-shrink-0">
                  <svg viewBox="0 0 32 32" fill="none">
                    <rect x="2" y="6" width="28" height="3" rx="1.5" fill="#c0253e"/>
                    <rect x="4" y="10" width="24" height="2" rx="1" fill="#c0253e" opacity="0.6"/>
                    <rect x="6" y="12" width="3" height="16" rx="1.5" fill="#c0253e"/>
                    <rect x="23" y="12" width="3" height="16" rx="1.5" fill="#c0253e"/>
                  </svg>
                </div>
                <div className="leading-none">
                  <div className="text-base font-bold text-primary-500" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    Mugen API
                  </div>
                  <div className="text-[9px] tracking-[0.3em] mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                    自由なAPI
                  </div>
                </div>
              </Link>


              {isAuthenticated && (
                <div className="hidden md:flex items-center gap-0.5">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
                          isActive ? "text-primary-400 bg-primary-950/60" : "hover:text-primary-400 hover:bg-primary-950/30"
                        )}
                        style={{ color: isActive ? undefined : 'var(--fg-muted)' }}
                      >
                        <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>


            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>

                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setProfileOpen((o) => !o)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all"
                      style={{ backgroundColor: profileOpen ? 'var(--bg-muted)' : 'transparent' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
                      onMouseLeave={e => !profileOpen && (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #c0253e, #9f1239)', boxShadow: '0 0 12px rgba(192,37,62,0.4)' }}
                      >
                        {user?.username?.[0]?.toUpperCase() ?? '?'}
                      </div>
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-semibold leading-none" style={{ color: 'var(--fg)' }}>
                          {user?.username}
                        </div>
                        <div className="text-[10px] mt-0.5 tracking-wider" style={{ color: 'var(--fg-muted)' }}>
                          {user?.role ?? 'USER'}
                        </div>
                      </div>
                      <ChevronDown
                        className={cn("w-3.5 h-3.5 hidden sm:block transition-transform duration-200", profileOpen && "rotate-180")}
                        style={{ color: 'var(--fg-muted)' }}
                      />
                    </button>


                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute right-0 top-full mt-2 w-64 rounded-2xl overflow-hidden z-50"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(192,37,62,0.1)',
                          }}
                        >

                          <div className="torii-line" />


                          <div className="p-5 space-y-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                                style={{
                                  background: 'linear-gradient(135deg, #c0253e, #9f1239)',
                                  boxShadow: '0 4px 16px rgba(192,37,62,0.4)',
                                }}
                              >
                                {user?.username?.[0]?.toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div
                                  className="font-bold text-base truncate"
                                  style={{ color: 'var(--fg)', fontFamily: "'Noto Serif JP', serif" }}
                                >
                                  {user?.username}
                                </div>
                                <div className="text-xs truncate" style={{ color: 'var(--fg-muted)' }}>
                                  {user?.email}
                                </div>
                              </div>
                            </div>


                            <div className="torii-badge w-fit">
                              <Shield className="w-3 h-3" />
                              {user?.role ?? 'USER'} · Active
                            </div>
                          </div>


                          <div className="torii-line mx-0" />


                          <div className="p-3">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                              style={{
                                background: 'linear-gradient(135deg, #c0253e, #9f1239)',
                                boxShadow: '0 4px 16px rgba(192,37,62,0.3)',
                              }}
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>


                  <button
                    className="md:hidden p-2 rounded-lg transition-all"
                    style={{ color: 'var(--fg-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #c0253e, #9f1239)', boxShadow: '0 4px 16px rgba(192,37,62,0.35)' }}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>


        {isAuthenticated && mobileMenuOpen && (
          <div
            className="md:hidden px-4 py-4 grid grid-cols-4 gap-2"
            style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-muted)' }}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-3 rounded-xl text-[11px] font-medium transition-all",
                  location.pathname === item.href ? "bg-primary-950/60 text-primary-400" : "hover:bg-primary-950/30"
                )}
                style={{ color: location.pathname === item.href ? undefined : 'var(--fg-muted)' }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                <span>{item.name}</span>
                <span className="text-[9px] opacity-50">{item.jp}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>


      <footer
        className="mt-16 py-10 text-center space-y-1"
        style={{ borderTop: '1px solid var(--border-muted)', backgroundColor: 'var(--bg-card)' }}
      >
        <p className="text-xs tracking-[0.3em] text-primary-600 uppercase font-bold">
          ━━ 自由なAPI Hub ━━
        </p>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
          © 2026 Mugen API · Built for Web Dev Cohort 2026
        </p>
      </footer>
    </div>
  );
}
