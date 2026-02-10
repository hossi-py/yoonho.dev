import { useEffect, useState } from 'react';

import { useMediaQuery } from './use-media-query';

export function useIsMobile(mobileBreakpoint = 768) {
  return useMediaQuery(`(max-width: ${mobileBreakpoint - 1}px)`);
}
