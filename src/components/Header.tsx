import { Search, ShoppingCart, Heart, User, Menu, Camera, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { analyzeImageForSearch } from "../lib/gemini";
import { cn } from "../lib/utils";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchingImage, setIsSearchingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, cartCount, wishlistCount } = useAuth();
  const navigate = useNavigate();

  const handleImageSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSearchingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(",")[1];
        const mimeType = file.type;
        
        const result = await analyzeImageForSearch(base64Data, mimeType);
        if (result) {
          setSearchQuery(result);
          // Optionally auto-submit or navigate to search results
          // For now just fill the search bar
        }
        setIsSearchingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image search failed:", error);
      setIsSearchingImage(false);
    }
  };

  const triggerImageSearch = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex-shrink-0 flex items-center group">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">China Importer</span>
                <span className="text-[9px] font-bold text-secondary tracking-[0.3em] uppercase whitespace-nowrap">Your Trusted Partner</span>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products, brands, and categories..."
                className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-12 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400 group-focus-within:text-primary transition-colors" />
              
              <div className="absolute right-2 top-1.5 flex items-center gap-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSearch}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={triggerImageSearch}
                  disabled={isSearchingImage}
                  className={cn(
                    "p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-all",
                    isSearchingImage && "animate-pulse text-primary"
                  )}
                  title="Search by image"
                >
                  {isSearchingImage ? (
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  ) : (
                    <Camera className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 p-2 text-gray-600 hover:text-primary transition-colors">
              <User className="h-6 w-6" />
              <span className="hidden sm:block text-sm font-medium">
                {user ? "Account" : "Login"}
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-12 focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-gray-400" />
            
            <div className="absolute right-2 top-1 flex items-center gap-1">
              <button
                onClick={triggerImageSearch}
                disabled={isSearchingImage}
                className={cn(
                  "p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-all",
                  isSearchingImage && "animate-pulse text-primary"
                )}
              >
                {isSearchingImage ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <Camera className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
