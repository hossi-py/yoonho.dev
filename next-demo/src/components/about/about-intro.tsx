import { cn } from '@/lib/utils';

export function AboutIntro() {
  return (
    <section className="px-6 pt-16 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">About</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Yoonho Hwang
          </h1>
          <p className="text-base text-muted-foreground font-medium">Frontend Developer</p>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            안녕하세요. 4년 차 프론트엔드 개발자 황윤호입니다.
            <br />
            초기 R&D 프로젝트부터 대규모 엔터프라이즈 시스템까지 다양한 규모의 프로젝트를
            경험했습니다.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            단순히 기능을 구현하는 것을 넘어
            <strong className="text-foreground font-semibold">
              {' '}
              사용자에게 가장 직관적인 경험
            </strong>
            이 무엇인지 고민하고
            <br />
            비즈니스 가치를 극대화하는 기술적 의사결정을 내리는 것을 좋아합니다.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { value: '4+', label: 'Years Exp.' },
            { value: '5', label: 'Projects' },
            { value: '18+', label: 'UI Components' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col items-center py-5 rounded-2xl',
                'bg-card/40 backdrop-blur-sm',
                'border border-border/50'
              )}
            >
              <span className="text-2xl font-bold text-primary mb-1">{stat.value}</span>
              <span className="text-[11px] text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
