import Link from 'next/link';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PROJECTS } from '@/lib/projects';

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section with Search Focus */}
      <section className="pt-20 pb-10 flex flex-col items-center text-center px-4">
        <Badge variant="secondary" className="mb-4 px-3 py-1 rounded-full text-sm font-normal">
          <Sparkles className="w-3 h-3 mr-2 inline-block text-yellow-500" />
          Frontend Developer | Next.js & AI Enthusiast
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          사용자 경험을 혁신하는
          <br />
          프론트엔드 엔지니어
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          비즈니스 문제를 기술로 해결하고, <br className="md:hidden" />
          확장 가능한 웹 아키텍처를 설계합니다.
        </p>

        {/* Fake Search Bar - Trigger for Cmd+K */}
        <div className="relative w-full max-w-lg group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <button
            className="relative w-full flex items-center gap-3 px-4 py-4 bg-background border rounded-xl shadow-sm hover:border-primary/50 transition-colors text-muted-foreground text-left"
            // onClick={/* trigger command palette */}
          >
            <Search className="w-5 h-5" />
            <span className="flex-1">프로젝트, 기술 블로그 검색...</span>
            <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border bg-muted px-2 text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </section>

      {/* 2. Featured Projects */}
      <section className="container max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
            <p className="text-muted-foreground">최근 진행한 주요 프로젝트입니다.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/projects" className="group">
              전체 보기{' '}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={project.href} className="group">
              <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{project.role.split(' ')[0]}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.period.split('~')[0]}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs font-normal bg-muted/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs text-muted-foreground py-0.5 px-2">
                        + {project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
