import { cn } from '@/lib/utils';

interface TechItem {
  name: string;
  category: 'framework' | 'language' | 'tool' | 'style';
}

const techItems: TechItem[] = [
  { name: 'Vue 3', category: 'framework' },
  { name: 'React', category: 'framework' },
  { name: 'Next.js', category: 'framework' },
  { name: 'TypeScript', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'Tailwind CSS', category: 'style' },
  { name: 'TanStack Query', category: 'tool' },
  { name: 'Storybook', category: 'tool' },
  { name: 'Pinia', category: 'tool' },
  { name: 'Zustand', category: 'tool' },
  { name: 'Vite', category: 'tool' },
  { name: 'MSW', category: 'tool' },
];

const categoryStyles: Record<TechItem['category'], string> = {
  framework: 'bg-primary/8 text-primary border-primary/15 hover:bg-primary/15 hover:border-primary/30',
  language: 'bg-chart-3/8 text-chart-3 border-chart-3/15 hover:bg-chart-3/15 hover:border-chart-3/30',
  tool: 'bg-chart-2/8 text-chart-2 border-chart-2/15 hover:bg-chart-2/15 hover:border-chart-2/30',
  style: 'bg-chart-5/8 text-chart-5 border-chart-5/15 hover:bg-chart-5/15 hover:border-chart-5/30',
};

export function TechStackSection() {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Tech Stack
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            {'\uc8fc\ub85c \uc0ac\uc6a9\ud558\ub294 \uae30\uc220'}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {techItems.map((tech) => (
            <div
              key={tech.name}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium',
                'border backdrop-blur-sm',
                'transition-all duration-200',
                'cursor-default',
                categoryStyles[tech.category]
              )}
            >
              {tech.name}
            </div>
          ))}
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-4 mt-6">
          {[
            { label: 'Framework', category: 'framework' as const },
            { label: 'Language', category: 'language' as const },
            { label: 'Tool', category: 'tool' as const },
            { label: 'Styling', category: 'style' as const },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div
                className={cn(
                  'h-2 w-2 rounded-full',
                  item.category === 'framework' && 'bg-primary',
                  item.category === 'language' && 'bg-chart-3',
                  item.category === 'tool' && 'bg-chart-2',
                  item.category === 'style' && 'bg-chart-5'
                )}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
