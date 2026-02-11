import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { TechStackSection } from '@/components/home/tech-stack-section';
import { FooterSection } from '@/components/home/footer-section';

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
