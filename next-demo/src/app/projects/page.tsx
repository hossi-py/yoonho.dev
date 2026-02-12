import type { Metadata } from 'next';

import { ProjectListView } from '@/components/projects/project-list-view';

export const metadata: Metadata = {
  title: 'Projects | 황윤호',
  description: '프론트엔드 개발자 황윤호의 프로젝트 포트폴리오입니다.',
};

// ✨ Noise Background Component
function NoiseBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background pointer-events-none">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <NoiseBackground />

      <main className="min-h-screen px-6 pt-24 pb-32">
        <ProjectListView />
      </main>
    </>
  );
}
