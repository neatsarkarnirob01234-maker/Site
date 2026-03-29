import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { products } from "../data/products";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useAuth();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  }).filter(item => item.id !== undefined);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="bg-slate-100 p-8 rounded-full">
          <ShoppingCart className="h-16 w-16 text-slate-400" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter">Your cart is empty</h2>
        <p className="text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-xl">
          <ShoppingCart className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest">{item.category}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => item.quantity > 1 && addToCart(item.id!, -1)}
                      className="p-1 hover:bg-slate-50 text-slate-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-1 text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item.id!, 1)}
                      className="p-1 hover:bg-slate-50 text-slate-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id!)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-lg">৳{(item.price! * item.quantity).toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">৳{item.price?.toLocaleString()} each</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
            <h2 className="text-xl font-black uppercase tracking-tighter">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span>৳{shipping.toLocaleString()}</span>
              </div>
              <div className="h-px bg-slate-800 my-4" />
              <div className="flex justify-between text-lg font-black">
                <span>Total</span>
                <span className="text-secondary">৳{total.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full bg-secondary text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors">
              Checkout Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
