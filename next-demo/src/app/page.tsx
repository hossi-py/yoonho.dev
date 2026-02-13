import { FeaturedProjects } from '@/components/home/featured-projects';
import { FooterSection } from '@/components/home/footer-section';
import { HeroSection } from '@/components/home/hero-section';
import { TechStackSection } from '@/components/home/tech-stack-section';

export default function Home() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <FeaturedProjects />
      <TechStackSection />
      <FooterSection />
    </div>
  );
}
