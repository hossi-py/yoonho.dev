'use client';

import { Palette, Pointer, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { type SettingsState, useSettingsStore } from '@/stores/settings-store';

import RainbowFrame from '../custom/rainbow-frame';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

const labItems = [
  {
    icon: Palette,
    title: '배경 애니메이션',
    description: '테마에 따라\n배경 애니메이션이 적용됩니다.',
    key: 'bgAnimation',
  },
  {
    icon: Pointer,
    title: '커스텀 커서',
    description: '',
    key: 'customCursor',
  },
  {
    icon: Zap,
    title: '스크롤 애니메이션',
    description: '',
    key: 'scrollAnimation',
  },
] as const;

export default function SettingsDialogManager() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setOpen(window.location.hash === '#settings');
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) history.back();
        setOpen(o);
      }}
    >
      <DialogContent className="w-[90vw] sm:w-[80vw] md:!max-w-2xl lg:!max-w-2/5">
        <DialogHeader>
          <DialogTitle>실험실</DialogTitle>
          <DialogDescription>다양한 기능을 체험해보세요. 클릭하면 활성화됩니다.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
          {labItems.map((item) => (
            <SettingsCard key={item.key} item={item} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SettingsCard({ item }: { item: (typeof labItems)[number] }) {
  const { icon: Icon, title, description, key } = item;
  // Explicitly cast key to keyof Omit<SettingsState, 'toggle'> to satisfy TS
  const isActive = useSettingsStore(
    (s) => s[key as keyof Omit<SettingsState, 'toggle'>] as boolean
  );
  const toggle = useSettingsStore((s) => s.toggle);

  return (
    <RainbowFrame active={isActive} blur={3}>
      <Card
        className="w-full h-full hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => toggle(key as keyof Omit<SettingsState, 'toggle'>)}
      >
        <CardHeader className="flex flex-col items-center">
          <Icon className="mb-3 text-primary" />
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-center text-sm mt-1 whitespace-pre-line">
            {description}
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
      </Card>
    </RainbowFrame>
  );
}
