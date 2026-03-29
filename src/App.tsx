import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import { ShoppingCart, Heart, User, Package, Settings, LogOut } from "lucide-react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest">China Importer Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-primary/20 selection:text-primary">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 md:pt-24">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-8">
      <Hero />
      <Features />
      <ProductGrid />
    </div>
  );
}

function AccountPage() {
  const { user, profile } = useAuth();
  if (!user) return <Navigate to="/" />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <User className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">{profile?.displayName || "User"}</h1>
            <p className="text-sm text-gray-500 font-medium">{profile?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
              {profile?.role} Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors group">
            <Package className="h-6 w-6 text-gray-400 group-hover:text-orange-500 mb-4" />
            <h3 className="font-bold text-sm mb-1">Order History</h3>
            <p className="text-xs text-gray-400">Track your shipments</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors group">
            <Settings className="h-6 w-6 text-gray-400 group-hover:text-orange-500 mb-4" />
            <h3 className="font-bold text-sm mb-1">Profile Settings</h3>
            <p className="text-xs text-gray-400">Manage your info</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="p-6 bg-red-50 rounded-2xl border border-red-100 hover:border-red-200 transition-colors group text-left"
          >
            <LogOut className="h-6 w-6 text-red-400 group-hover:text-red-500 mb-4" />
            <h3 className="font-bold text-sm mb-1 text-red-600">Logout</h3>
            <p className="text-xs text-red-400">Sign out of account</p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Recent Orders</h2>
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-200 mx-auto mb-4" />
          <p className="text-sm text-gray-400 font-medium">No orders placed yet.</p>
          <button className="mt-4 text-orange-600 font-bold text-sm hover:underline uppercase tracking-widest">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/account" />;
  return (
    <div className="flex items-center justify-center py-12">
      <AuthModal isOpen={true} onClose={() => {}} isPage={true} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
