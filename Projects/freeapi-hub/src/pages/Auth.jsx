import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';
import { Button } from '../components/UI';
import { LogIn, UserPlus, LogOut, Mail, User, Shield, CheckCircle, RefreshCw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--fg-muted)' }}>
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-muted)' }} />
      <input
        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          backgroundColor: 'var(--bg-muted)',
          border: '1px solid var(--border-muted)',
          color: 'var(--fg)',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(192,37,62,0.6)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-muted)'}
        {...props}
      />
    </div>
  </div>
);

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'USER' });
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { isAuthenticated, login, logout, user, setUser } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && !user) {
      api.get('/users/current-user')
        .then(r => setUser(r.data))
        .catch(() => logout());
    }
  }, [isAuthenticated, user, setUser, logout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/users/login' : '/users/register';
      const payload = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;
      const response = await api.post(endpoint, payload);
      if (isLogin) {
        login(response.data.user, response.data.accessToken);
        navigate('/');
      } else {
        setIsLogin(true);
        setError('');
        alert('Registration successful! Please sign in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div
            className="rounded-3xl p-10 space-y-8 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            
            <div className="torii-line absolute top-0 left-0 right-0" />

            
            <div className="absolute -top-6 -right-6 opacity-[0.04]">
              <Shield className="w-52 h-52" style={{ color: 'var(--crimson)' }} />
            </div>

            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #c0253e, #9f1239)', boxShadow: '0 8px 32px rgba(192,37,62,0.45)' }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>{user?.username}</h1>
                <p style={{ color: 'var(--fg-muted)' }} className="text-sm mt-1">{user?.email}</p>
              </div>
              <span className="torii-badge">
                <CheckCircle className="w-3 h-3" />
                Active Session
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '役割 / Role', value: user?.role },
                { label: 'ID',           value: `#${user?._id?.slice(-6)}` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-5 rounded-2xl space-y-1"
                  style={{ backgroundColor: 'var(--bg-muted)', border: '1px solid var(--border-muted)' }}
                >
                  <p className="text-[10px] tracking-widest uppercase font-bold" style={{ color: 'var(--fg-muted)' }}>{label}</p>
                  <p className="font-bold truncate" style={{ color: 'var(--fg)' }}>{value}</p>
                </div>
              ))}
            </div>

            <Button
              variant="danger"
              className="w-full py-4 rounded-2xl text-base"
              onClick={() => { logout(); navigate('/auth'); }}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">

        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="torii-badge mx-auto w-fit mb-4">
            <Shield className="w-3 h-3" />
            認証 — Authentication
          </div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            {isLogin ? 'Enter your credentials to continue.' : 'Join the Mugen API today.'}
          </p>
        </motion.div>

        
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-8 space-y-5 relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="torii-line absolute top-0 left-0 right-0" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <InputField icon={Mail} label="Email Address" type="email" required placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField icon={User} label="Username" type="text" required placeholder="username"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
            />

            <InputField icon={Lock} label="Password" type="password" required placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />

            {error && (
              <p className="text-sm font-medium text-red-400 bg-red-950/40 border border-red-900/50 px-4 py-2 rounded-xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="btn-crimson w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                <><LogIn className="w-5 h-5" /> Sign In</>
              ) : (
                <><UserPlus className="w-5 h-5" /> Create Account</>
              )}
            </button>
          </form>

          <div className="jp-divider text-[10px] tracking-widest" style={{ color: 'var(--fg-subtle)' }}>
            <span>または</span>
          </div>

          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="w-full text-sm font-semibold transition-colors py-2 rounded-xl"
            style={{ color: 'var(--fg-muted)' }}
            onMouseEnter={e => e.target.style.color = '#f47e94'}
            onMouseLeave={e => e.target.style.color = 'var(--fg-muted)'}
          >
            {isLogin ? "Don't have an account? Sign Up →" : "Already have an account? Sign In →"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}