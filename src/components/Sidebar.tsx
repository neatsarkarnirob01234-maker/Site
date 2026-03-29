import { 
  Footprints, 
  ShoppingBag, 
  Gem, 
  Shirt, 
  Smartphone, 
  Home, 
  Watch, 
  ChevronRight,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const categories = [
  { name: "Shoes", icon: Footprints, count: 120 },
  { name: "Bags", icon: ShoppingBag, count: 85 },
  { name: "Jewelry", icon: Gem, count: 45 },
  { name: "Clothing", icon: Shirt, count: 210 },
  { name: "Electronics", icon: Smartphone, count: 150 },
  { name: "Home & Kitchen", icon: Home, count: 95 },
  { name: "Watches", icon: Watch, count: 60 },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[105] lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-[110] lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span className="text-lg font-bold text-primary">Categories</span>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-primary">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <div className="hidden lg:block mb-4 px-2">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Categories
            </h2>
          </div>
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-primary/5 hover:text-primary transition-all"
              onClick={() => onClose()}
            >
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-bold">{category.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-primary/50">{category.count}</span>
                <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-primary/50" />
              </div>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-primary/30 transition-colors" />
            <h3 className="text-sm font-black mb-1 relative z-10 leading-tight">Direct China Sourcing</h3>
            <p className="text-[10px] text-slate-400 mb-4 relative z-10">Access verified manufacturers with premium support.</p>
            <button className="w-full bg-secondary text-slate-900 text-[10px] font-black uppercase tracking-widest py-2 rounded-xl hover:bg-white transition-colors relative z-10">
              Get Started
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
