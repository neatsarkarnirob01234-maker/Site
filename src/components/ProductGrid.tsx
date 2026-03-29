import { Star, ShoppingCart, Heart, TrendingUp, Clock, Award } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "../lib/utils";

const popularCategories = [
  { name: "Shoes", icon: "https://picsum.photos/seed/shoes/100/100" },
  { name: "Bags", icon: "https://picsum.photos/seed/bags/100/100" },
  { name: "Jewelry", icon: "https://picsum.photos/seed/jewelry/100/100" },
  { name: "Clothing", icon: "https://picsum.photos/seed/clothing/100/100" },
  { name: "Electronics", icon: "https://picsum.photos/seed/electronics/100/100" },
  { name: "Home", icon: "https://picsum.photos/seed/home/100/100" },
];

const products = [
  {
    id: "1",
    name: "Premium Leather Handbag",
    price: 4500,
    rating: 4.8,
    reviews: 120,
    image: "https://picsum.photos/seed/bag1/400/400",
    stockStatus: "in-stock",
    category: "Bags"
  },
  {
    id: "2",
    name: "Wireless Noise Cancelling Headphones",
    price: 8900,
    rating: 4.9,
    reviews: 85,
    image: "https://picsum.photos/seed/headphone/400/400",
    stockStatus: "in-stock",
    category: "Electronics"
  },
  {
    id: "3",
    name: "Men's Classic Oxford Shoes",
    price: 3200,
    rating: 4.5,
    reviews: 45,
    image: "https://picsum.photos/seed/shoe1/400/400",
    stockStatus: "out-of-stock",
    category: "Shoes"
  },
  {
    id: "4",
    name: "Luxury Gold Plated Watch",
    price: 12500,
    rating: 4.7,
    reviews: 30,
    image: "https://picsum.photos/seed/watch1/400/400",
    stockStatus: "in-stock",
    category: "Watches"
  },
];

export default function ProductGrid() {
  const { addToCart, toggleWishlist, wishlist } = useAuth();

  return (
    <div className="space-y-12 py-8">
      {/* Popular Categories */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-black uppercase tracking-tighter">Popular Categories</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {popularCategories.map((cat) => (
            <div key={cat.name} className="group cursor-pointer flex flex-col items-center gap-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all p-1 bg-white shadow-sm">
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Today Trading / Flash Deals */}
      <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-secondary p-2 rounded-xl">
              <Clock className="h-6 w-6 text-slate-900" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Limited Trading</h2>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest">
            <span className="bg-secondary/10 px-3 py-1 rounded-full">Ends in: 04:23:15</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} dark />
          ))}
        </div>
      </section>

      {/* Most Sold Item */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-black uppercase tracking-tighter">Most Sold Item</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, dark = false }: { product: any; dark?: boolean }) {
  const { addToCart, toggleWishlist, wishlist } = useAuth();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className={cn(
      "group rounded-2xl overflow-hidden border transition-all duration-300",
      dark ? "bg-slate-800 border-slate-700 hover:bg-slate-750" : "bg-white border-slate-100 hover:shadow-xl hover:shadow-slate-200/50"
    )}>
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={cn(
              "p-2 rounded-full backdrop-blur-md shadow-lg transition-colors",
              isWishlisted ? "bg-secondary text-slate-900" : "bg-white/80 text-slate-600 hover:text-secondary"
            )}
          >
            <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        {product.stockStatus === "out-of-stock" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-secondary">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("h-3 w-3", i < Math.floor(product.rating) ? "fill-current" : "text-slate-300")}
              />
            ))}
          </div>
          <span className={cn("text-[10px] font-bold", dark ? "text-slate-400" : "text-slate-400")}>({product.reviews})</span>
        </div>
        <h3 className={cn("text-sm font-bold mb-1 line-clamp-1 transition-colors", dark ? "text-white group-hover:text-secondary" : "text-slate-800 group-hover:text-primary")}>
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={cn("text-lg font-black leading-none", dark ? "text-white" : "text-slate-900")}>৳{product.price.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 line-through">৳{(product.price * 1.2).toLocaleString()}</span>
          </div>
          <button
            onClick={() => addToCart(product.id)}
            disabled={product.stockStatus === "out-of-stock"}
            className={cn(
              "p-2.5 rounded-xl transition-colors shadow-lg",
              dark ? "bg-secondary text-slate-900 hover:bg-white" : "bg-slate-900 text-white hover:bg-primary",
              "disabled:bg-slate-200 disabled:cursor-not-allowed"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
