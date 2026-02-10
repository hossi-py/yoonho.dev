'use client';

import { useIsMobile } from '@/hooks/use-mobile';

import LNB from './lnb';
import LNBMobile from './lnb-mobile';

export default function LNBWrapper() {
  const isMobile = useIsMobile();

  return isMobile ? <LNBMobile /> : <LNB />;
}
