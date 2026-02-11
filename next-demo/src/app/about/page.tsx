import type { Metadata } from 'next';

import { AboutIntro } from '@/components/about/about-intro';
import { CareerTimeline } from '@/components/about/career-timeline';
import { FooterSection } from '@/components/home/footer-section';

export const metadata: Metadata = {
  title: 'About',
  description: '4년 차 프론트엔드 개발자 황윤호의 커리어와 기술 스택을 소개합니다.',
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
