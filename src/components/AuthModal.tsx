import { useState } from "react";
import { X, Mail, Phone, Lock, Chrome, ArrowRight, User } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { cn } from "../lib/utils";

export default function AuthModal({ isOpen, onClose, isPage = false }: { isOpen: boolean; onClose: () => void; isPage?: boolean }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!isOpen && !isPage) return null;

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user profile in Firestore immediately
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: name,
          phone: phone,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const content = (
    <div className={cn(
      "relative w-full max-w-md bg-white rounded-3xl overflow-hidden",
      !isPage && "shadow-2xl animate-in fade-in zoom-in duration-300"
    )}>
      {!isPage && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      )}

      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">
            {isLogin ? "Welcome Back" : "Join China Importer"}
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            {isLogin ? "Login to access your orders and wishlist." : "Create an account to start importing."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded-r-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:border-orange-500 focus:bg-white transition-all outline-none text-sm font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:border-orange-500 focus:bg-white transition-all outline-none text-sm font-medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </>
          )}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:border-orange-500 focus:bg-white transition-all outline-none text-sm font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:border-orange-500 focus:bg-white transition-all outline-none text-sm font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>{isLogin ? "Login" : "Register"}</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-gray-400">
            <span className="bg-white px-4">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white border-2 border-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center justify-center gap-3"
        >
          <Chrome className="h-5 w-5 text-orange-600" />
          <span>Google Account</span>
        </button>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 font-bold hover:underline"
          >
            {isLogin ? "Register Now" : "Login Now"}
          </button>
        </p>
      </div>
    </div>
  );

  if (isPage) return content;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {content}
    </div>
  );
}
