import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { useAuthStore } from './store/useAuthStore';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Users = lazy(() => import('./pages/Users'));
const Meals = lazy(() => import('./pages/Meals'));
const Cats = lazy(() => import('./pages/Cats'));
const Jokes = lazy(() => import('./pages/Jokes'));
const Quotes = lazy(() => import('./pages/Quotes'));
const Products = lazy(() => import('./pages/Products'));
const Videos = lazy(() => import('./pages/Videos'));
const Auth = lazy(() => import('./pages/Auth'));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="meals" element={<Meals />} />
            <Route path="cats" element={<Cats />} />
            <Route path="jokes" element={<Jokes />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="products" element={<Products />} />
            <Route path="videos" element={<Videos />} />
            <Route path="auth" element={<Auth />} />

            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <div className="p-8">User Profile Protected</div>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
