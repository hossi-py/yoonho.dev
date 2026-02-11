import { cn } from '@/lib/utils';

export function AboutIntro() {
  return (
    <section className="px-6 pt-16 pb-16">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            About
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Yoonho Hwang
          </h1>
          <p className="text-base text-muted-foreground font-medium">
            Frontend Developer
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            {'\uc548\ub155\ud558\uc138\uc694. 4\ub144 \ucc28 \ud504\ub860\ud2b8\uc5d4\ub4dc \uac1c\ubc1c\uc790\uc785\ub2c8\ub2e4.'}
            <br />
            {'\ucd08\uae30 R&D \ud504\ub85c\uc81d\ud2b8\ubd80\ud130 \ub300\uaddc\ubaa8 \uc5d4\ud130\ud504\ub77c\uc774\uc988 \uc2dc\uc2a4\ud15c\uae4c\uc9c0 \ub2e4\uc591\ud55c \uaddc\ubaa8\uc758 \ud504\ub85c\uc81d\ud2b8\ub97c '}
            {'\uacbd\ud5d8\ud588\uc2b5\ub2c8\ub2e4.'}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            {'\ub2e8\uc21c\ud788 \uae30\ub2a5\uc744 \uad6c\ud604\ud558\ub294 \uac83\uc744 \ub118\uc5b4, '}
            <strong className="text-foreground font-semibold">
              {'\uc0ac\uc6a9\uc790\uc5d0\uac8c \uac00\uc7a5 \uc9c1\uad00\uc801\uc778 \uacbd\ud5d8'}
            </strong>
            {'\uc774 \ubb34\uc5c7\uc778\uc9c0 \uace0\ubbfc\ud558\uace0'}
            <br />
            {'\ube44\uc988\ub2c8\uc2a4 \uac00\uce58\ub97c \uadf9\ub300\ud654\ud558\ub294 \uae30\uc220\uc801 \uc758\uc0ac\uacb0\uc815\uc744 \ub0b4\ub9ac\ub294 \uac83\uc744 \uc88b\uc544\ud569\ub2c8\ub2e4.'}
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
