import { FolderGit2, NotebookPen, User } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import CustomButton from '../custom/custom-button';
import SettingsPopover from './settings-popover';

export default function LNBContent({ expanded }: { expanded: boolean }) {
  return (
    <nav className="flex flex-col px-2 mt-2">
      <Link href="/abc">
        <CustomButton
          className={cn('cursor-pointer', expanded && 'justify-baseline pl-2.5 w-full')}
          icon={<User />}
          label="소개"
          tooltipContent={expanded ? '' : '소개'}
          variant="ghost"
          expanded={expanded}
        />
      </Link>
      <Link href="/projects">
        <CustomButton
          className={cn('cursor-pointer', expanded && 'justify-baseline pl-2.5 w-full')}
          icon={<FolderGit2 />}
          label="프로젝트"
          tooltipContent={expanded ? '' : '프로젝트'}
          variant="ghost"
          expanded={expanded}
        />
      </Link>
      <Link href="/blog">
        <CustomButton
          className={cn('cursor-pointer', expanded && 'justify-baseline pl-2.5 w-full')}
          icon={<NotebookPen />}
          label="기술 블로그"
          tooltipContent={expanded ? '' : '기술 블로그'}
          variant="ghost"
          expanded={expanded}
        />
      </Link>

      {/* 설정 */}
      <SettingsPopover className="absolute bottom-0 mb-3" />
    </nav>
  );
}
