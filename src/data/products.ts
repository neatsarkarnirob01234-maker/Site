export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  stockStatus: "in-stock" | "out-of-stock";
  category: string;
}

export const products: Product[] = [
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
  {
    id: "5",
    name: "Silk Evening Dress",
    price: 7500,
    rating: 4.6,
    reviews: 25,
    image: "https://picsum.photos/seed/dress1/400/400",
    stockStatus: "in-stock",
    category: "Clothing"
  },
  {
    id: "6",
    name: "Smart Fitness Tracker",
    price: 3500,
    rating: 4.4,
    reviews: 150,
    image: "https://picsum.photos/seed/tracker1/400/400",
    stockStatus: "in-stock",
    category: "Electronics"
  }
];
