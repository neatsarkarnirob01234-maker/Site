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
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span className="text-lg font-bold text-orange-600">Categories</span>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-orange-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <div className="hidden lg:block mb-4 px-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Browse Categories
            </h2>
          </div>
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all"
              onClick={() => onClose()}
            >
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5 text-gray-400 group-hover:text-orange-500" />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400 group-hover:text-orange-400">{category.count}</span>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-orange-400" />
              </div>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
          <div className="bg-orange-600 rounded-xl p-4 text-white">
            <h3 className="text-sm font-bold mb-1">Import from China</h3>
            <p className="text-[10px] text-orange-100 mb-3">Get the best B2B deals directly from manufacturers.</p>
            <button className="w-full bg-white text-orange-600 text-[10px] font-bold py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
