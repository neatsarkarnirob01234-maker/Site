import { ShieldCheck, Truck, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Suppliers",
    description: "Every manufacturer is vetted for quality and reliability."
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Optimized logistics for direct delivery from China."
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description: "Access millions of products from diverse industries."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated account managers for your business needs."
  }
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-t border-gray-100">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="bg-primary/5 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <feature.icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter mb-1">{feature.title}</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
