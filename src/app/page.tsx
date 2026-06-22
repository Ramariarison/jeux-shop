import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JeuxSection from "@/components/JeuxSection";
import CommentSection from "@/components/CommentSection";
import PourquoiSection from "@/components/PourquoiSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/services/user.service";
import { getJeux } from "@/services/jeux.service";

export default async function HomePage() {

  const user = await getCurrentUser();

  const jeux = await getJeux();

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <Header user={user}/>
      <HeroSection />
      <JeuxSection jeux={jeux}/>
      <CommentSection />
      <PourquoiSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
