import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, onSnapshot, setDoc, getDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";

interface UserProfile {
  uid: string;
  email: string;
  phone?: string;
  displayName: string | null;
  role: "user" | "admin";
  createdAt: Timestamp | string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  cartCount: number;
  wishlistCount: number;
  cart: any[];
  wishlist: string[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    let cartUnsubscribe: (() => void) | null = null;
    let wishlistUnsubscribe: (() => void) | null = null;

    // Safety timeout to ensure app eventually loads
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      clearTimeout(safetyTimeout);
      
      if (firebaseUser) {
        // Fetch or create profile
        const profileRef = doc(db, "users", firebaseUser.uid);
        try {
          const profileSnap = await getDoc(profileRef);
          if (!profileSnap.exists()) {
            const newProfile: any = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName,
              phone: "",
              role: "user",
              createdAt: serverTimestamp(),
            };
            await setDoc(profileRef, newProfile);
            setProfile({ ...newProfile, createdAt: new Date().toISOString() });
          } else {
            setProfile(profileSnap.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }

        // Setup listeners
        cartUnsubscribe = onSnapshot(doc(db, "carts", firebaseUser.uid), (doc) => {
          if (doc.exists()) {
            setCart(doc.data().items || []);
          } else {
            setCart([]);
          }
        }, (error) => handleFirestoreError(error, OperationType.GET, `carts/${firebaseUser.uid}`));

        wishlistUnsubscribe = onSnapshot(doc(db, "wishlists", firebaseUser.uid), (doc) => {
          if (doc.exists()) {
            setWishlist(doc.data().productIds || []);
          } else {
            setWishlist([]);
          }
        }, (error) => handleFirestoreError(error, OperationType.GET, `wishlists/${firebaseUser.uid}`));
      } else {
        setProfile(null);
        setCart([]);
        setWishlist([]);
        if (cartUnsubscribe) cartUnsubscribe();
        if (wishlistUnsubscribe) wishlistUnsubscribe();
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(safetyTimeout);
      if (cartUnsubscribe) cartUnsubscribe();
      if (wishlistUnsubscribe) wishlistUnsubscribe();
    };
  }, []);

  const addToCart = async (productId: string, quantity = 1) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    const newCart = [...cart];
    const existingIndex = newCart.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ productId, quantity });
    }
    try {
      await setDoc(cartRef, { userId: user.uid, items: newCart, updatedAt: serverTimestamp() });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `carts/${user.uid}`);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    const newCart = cart.filter(item => item.productId !== productId);
    try {
      await setDoc(cartRef, { userId: user.uid, items: newCart, updatedAt: serverTimestamp() });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `carts/${user.uid}`);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) return;
    const wishlistRef = doc(db, "wishlists", user.uid);
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    try {
      await setDoc(wishlistRef, { userId: user.uid, productIds: newWishlist, updatedAt: serverTimestamp() });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `wishlists/${user.uid}`);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0), 
      wishlistCount: wishlist.length,
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      toggleWishlist
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
