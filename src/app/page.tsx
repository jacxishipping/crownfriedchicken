import { CustomCursor } from "@/components/brand/CustomCursor";
import { CrownExperience } from "@/components/crown/CrownExperience";
import { Footer } from "@/components/crown/Footer";
import { Hero } from "@/components/crown/Hero";
import { Location } from "@/components/crown/Location";
import { Navbar } from "@/components/crown/Navbar";
import { QuickOrderBar } from "@/components/crown/QuickOrderBar";
import { SignatureMenu } from "@/components/crown/SignatureMenu";
import { SpecialOffer } from "@/components/crown/SpecialOffer";
import { StickyOrderBar } from "@/components/crown/StickyOrderBar";
import { WhyCrown } from "@/components/crown/WhyCrown";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--black)] text-white">
      <CustomCursor />
      <Navbar />
      <Hero />
      <QuickOrderBar />
      <SignatureMenu />
      <WhyCrown />
      <CrownExperience />
      <SpecialOffer />
      <Location />
      <Footer />
      <StickyOrderBar />
    </main>
  );
}
