import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { ShoppingBag, PackageX } from "lucide-react";

export default function CategoryPage() {
  const { categoryName } = useParams();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl">
          <ShoppingBag className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            {categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1)}
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {filteredProducts.length} products available in this category
          </p>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-white rounded-3xl border border-slate-100">
          <div className="bg-slate-50 p-8 rounded-full">
            <PackageX className="h-16 w-16 text-slate-300" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black uppercase tracking-tighter">No products found</h2>
            <p className="text-slate-500 max-w-md mx-auto mt-2">
              We couldn't find any products in this category at the moment. Check back later or explore other categories.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
