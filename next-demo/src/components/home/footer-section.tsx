import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Github, href: 'https://github.com/hossi-py', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Mail, href: '/contact', label: 'Email', external: false },
];

export function FooterSection() {
  return (
    <footer className="px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-border/50 pt-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {"Let's build something great together."}
              </p>
              <p className="text-xs text-muted-foreground/60">
                기술 이야기나 궁금한 점은 편하게 연락해 주세요.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external !== false ? '_blank' : undefined}
                  rel={link.external !== false ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'flex items-center justify-center h-9 w-9 rounded-xl',
                    'text-muted-foreground hover:text-foreground',
                    'bg-muted/30 hover:bg-muted/60',
                    'transition-all duration-200',
                    'hover:scale-105 active:scale-95'
                  )}
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
