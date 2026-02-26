import {
  FolderGit2,
  Github,
  Home,
  Linkedin,
  type LucideIcon,
  Mail,
  PenLine,
  User,
} from 'lucide-react';

import { PROJECTS } from '@/lib/projects';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_CONFIG: NavSection[] = [
  {
    label: 'Portfolio',
    items: [
      { icon: Home, label: 'Home', href: '/' },
      { icon: User, label: 'About', href: '/about' },
      { icon: FolderGit2, label: 'Projects', href: '/projects', badge: PROJECTS.length.toString() },
      { icon: PenLine, label: 'Blog', href: '/blog' },
    ],
  },
  {
    label: 'Connect',
    items: [
      {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com/hossi-py',
        external: true,
      },
      {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/yourusername',
        external: true,
      },
      { icon: Mail, label: 'Contact', href: '/contact' },
    ],
  },
];

// Flat version for search or simple lists
export const ALL_NAV_ITEMS = NAV_CONFIG.flatMap((s) => s.items);
