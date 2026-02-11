import type { Metadata } from 'next';

import { AboutIntro } from '@/components/about/about-intro';
import { CareerTimeline } from '@/components/about/career-timeline';
import { FooterSection } from '@/components/home/footer-section';

export const metadata: Metadata = {
  title: 'About',
  description: '4\ub144 \ucc28 \ud504\ub860\ud2b8\uc5d4\ub4dc \uac1c\ubc1c\uc790 \ud669\uc724\ud638\uc758 \ucee4\ub9ac\uc5b4\uc640 \uae30\uc220 \uc2a4\ud0dd\uc744 \uc18c\uac1c\ud569\ub2c8\ub2e4.',
};

export default function AboutPage() {
  return (
    <div>
      <AboutIntro />
      <CareerTimeline />
      <FooterSection />
    </div>
  );
}
