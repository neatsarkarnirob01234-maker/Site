import { Heart, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  const { wishlist } = useAuth();

  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="bg-slate-100 p-8 rounded-full">
          <Heart className="h-16 w-16 text-slate-400" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter">Your wishlist is empty</h2>
        <p className="text-slate-500">Save items you like for later!</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter">My Wishlist</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
