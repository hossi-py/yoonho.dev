import { PROJECTS } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto py-20 px-4">
      {/* 1. Intro */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <div className="prose dark:prose-invert">
          <p className="text-lg leading-relaxed text-muted-foreground">
            안녕하세요. 4년 차 프론트엔드 개발자입니다. <br />
            초기 R&D 프로젝트부터 대규모 엔터프라이즈 시스템까지 다양한 규모의 프로젝트를
            경험했습니다. 단순히 기능을 구현하는 것을 넘어,{' '}
            <strong>사용자에게 가장 직관적인 경험</strong>이 무엇인지 고민하고 비즈니스 가치를
            극대화하는 기술적 의사결정을 내리는 것을 좋아합니다.
          </p>
        </div>
      </section>

      {/* 2. Career Journey (Timeline) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">🚀 My Journey</h2>

        <div className="relative border-l border-muted ml-3 space-y-12 pb-4">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="relative pl-8">
              {/* 타임라인 점 */}
              <div
                className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-background ${index === 0 ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                  {project.period}
                </span>
              </div>

              <div className="mb-3 text-primary/80 font-medium text-sm">{project.role}</div>

              <p className="text-muted-foreground mb-4">{project.description}</p>

              <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-muted-foreground/80 mb-4">
                {project.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Tech Stack Grid (간단하게) */}
      {/* ... (생략 가능 혹은 추가) ... */}
    </div>
  );
}
