import { Preloader } from "@/components/sections/Preloader";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Problem } from "@/components/sections/Problem";
import { DiamondReveal } from "@/components/sections/DiamondReveal";
import { Stats } from "@/components/sections/Stats";
import { Solutions } from "@/components/sections/Solutions";
import { Segments } from "@/components/sections/Segments";
import { CasesIntro } from "@/components/sections/CasesIntro";
import { CaseExpand } from "@/components/sections/CaseExpand";
import { CaseDetail } from "@/components/sections/CaseDetail";
import { ScaleStatement } from "@/components/sections/ScaleStatement";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { WhyDiamond } from "@/components/sections/WhyDiamond";
import { Testimonials } from "@/components/sections/Testimonials";
import { Manifesto } from "@/components/sections/Manifesto";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";
import { Reveal } from "@/components/motion/Reveal";

/** "Do escuro ao destaque": the page starts dark and switches on as you scroll. */
export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main">
        <Hero />
        <ClientMarquee />
        <Problem />
        <DiamondReveal />
        <Stats />
        <Solutions />
        <Segments />
        <section id="projetos" aria-labelledby="projetos-title">
          <CasesIntro />
          <CaseExpand />
          <CaseDetail />
        </section>
        <ScaleStatement />
        <Portfolio />
        <Process />
        <WhyDiamond />
        <Testimonials />
        <Manifesto />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileCtaBar />
      <Reveal />
    </>
  );
}
