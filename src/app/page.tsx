import { CustomCursor } from "@/components/brand/CustomCursor";
import { HeroLoader } from "@/components/brand/HeroLoader";
import { SectionTransition } from "@/components/brand/SectionTransition";
import { CartDrawer } from "@/components/crown/CartDrawer";
import { CrownExperience } from "@/components/crown/CrownExperience";
import { Footer } from "@/components/crown/Footer";
import { Hero } from "@/components/crown/Hero";
import { Location } from "@/components/crown/Location";
import { Navbar } from "@/components/crown/Navbar";
import { QuickOrderBar } from "@/components/crown/QuickOrderBar";
import { SignatureMenu } from "@/components/crown/SignatureMenu";
import { SpecialOffer } from "@/components/crown/SpecialOffer";
import { StickyOrderBar } from "@/components/crown/StickyOrderBar";
import { TodaySpecial } from "@/components/crown/TodaySpecial";
import { WhyCrown } from "@/components/crown/WhyCrown";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--black)] text-[var(--white)]">
      <HeroLoader />
      <CustomCursor />
      <TodaySpecial />
      <Navbar />
      <Hero />
      <QuickOrderBar />
      <SignatureMenu />
      <SectionTransition direction="up" amount={0.15}>
        <WhyCrown />
      </SectionTransition>
      <SectionTransition direction="right" amount={0.15} withScale={false}>
        <CrownExperience />
      </SectionTransition>
      <SectionTransition direction="up" amount={0.15}>
        <SpecialOffer />
      </SectionTransition>
      <SectionTransition direction="up" amount={0.1}>
        <Location />
      </SectionTransition>
      <Footer />
      <StickyOrderBar />
      <CartDrawer />
    </main>
  );
}
