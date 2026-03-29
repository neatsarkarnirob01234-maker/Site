import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col group">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="text-xl font-black tracking-tighter uppercase leading-none">China Importer</span>
                  <span className="text-[9px] font-bold text-secondary tracking-[0.3em] uppercase whitespace-nowrap">Your Trusted Partner</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium B2B sourcing solutions connecting global businesses with verified manufacturers. Quality, trust, and excellence in every trade.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-secondary">Join Our Newsletter</h3>
            <p className="text-slate-400 text-sm mb-6 font-medium">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary transition-all"
              />
              <button className="bg-primary text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-secondary">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="bg-slate-800 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="text-sm font-bold text-slate-200">123 Trade Center, Gulshan, Dhaka</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="bg-slate-800 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-sm font-bold text-slate-200">+880 1234 567890</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2026 China Importer. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </footer>
  );
}
