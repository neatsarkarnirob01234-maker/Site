import { TrendingUp, Clock, Award } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const popularCategories = [
  { name: "Shoes", icon: "https://picsum.photos/seed/shoes/100/100" },
  { name: "Bags", icon: "https://picsum.photos/seed/bags/100/100" },
  { name: "Jewelry", icon: "https://picsum.photos/seed/jewelry/100/100" },
  { name: "Clothing", icon: "https://picsum.photos/seed/clothing/100/100" },
  { name: "Electronics", icon: "https://picsum.photos/seed/electronics/100/100" },
  { name: "Home", icon: "https://picsum.photos/seed/home/100/100" },
];

export default function ProductGrid() {
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
          {products.slice(0, 4).map((product) => (
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
