'use client';

import { useIsMobile } from '@/hooks/use-mobile';

import GNB from './gnb';
import GNBMobile from './gnb-mobile';

export default function GNBWrapper() {
  const isMobile = useIsMobile();

  return isMobile ? <GNBMobile /> : <GNB />;
}
