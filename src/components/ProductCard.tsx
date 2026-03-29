import { Star, ShoppingCart, Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "../lib/utils";
import { Product } from "../data/products";

export default function ProductCard({ product, dark = false }: { product: Product; dark?: boolean }) {
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
