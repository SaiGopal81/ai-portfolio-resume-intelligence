import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { SkillsGalaxy } from '@/components/skills/SkillsGalaxy';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { CodingDashboard } from '@/components/coding/CodingDashboard';
import { ContactSection } from '@/components/contact/ContactSection';
import { AIChatbot } from '@/components/chatbot/AIChatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <Navbar />
      
      <div className="relative">
        <HeroSection />
        
        {/* Decorative background elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[120px]" />
          <div className="absolute top-3/4 -right-1/4 w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-600/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 flex flex-col gap-12 sm:gap-24 pb-24">
          <AboutSection />
          <ExperienceSection />
          <SkillsGalaxy />
          <ProjectsSection />
          <CodingDashboard />
          <ContactSection />
        </div>
      </div>

      <Footer />
      <AIChatbot />
    </main>
  );
}
