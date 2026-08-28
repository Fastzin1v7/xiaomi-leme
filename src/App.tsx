import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import Xiaomi17Ultra from "@/sections/Xiaomi17Ultra";
import CategorySection from "@/sections/CategorySection";
import StoreSection from "@/sections/StoreSection";

export default function App() {
  return (
    <div className="relative">
      <div className="film-grain" />
      <Navbar />
      <main>
        <HeroSection />
        <Xiaomi17Ultra />
        <CategorySection />
        <StoreSection />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
