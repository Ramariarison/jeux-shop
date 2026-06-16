import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JeuxSection from "@/components/JeuxSection";
import CommentSection from "@/components/CommentSection";
import PourquoiSection from "@/components/PourquoiSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <Header />
      <HeroSection />
      <JeuxSection />
      <CommentSection />
      <PourquoiSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
