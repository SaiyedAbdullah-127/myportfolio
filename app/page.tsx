import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StatsSection from "@/components/StatsSection";
import TechMarquee from "@/components/ui/TechMarquee";
import ExperienceTimeline from "@/components/ui/ExperienceTimeline";

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <Hero />
      <About />
      <StatsSection />
      <Skills />
      <TechMarquee />
      <Projects />
      <ExperienceTimeline />
      <Contact />
      <Footer />
    </PageTransition>
  );
}
