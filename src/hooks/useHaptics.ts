import { useCallback } from 'react';

export function useHaptics(enabled: boolean) {
  const triggerHaptic = useCallback(
    (pattern: number | number[]) => {
      if (!enabled || typeof window === 'undefined') return;
      try {
        if (navigator.vibrate) {
          navigator.vibrate(pattern);
        }
      } catch {
        // ignore
      }
    },
    [enabled]
  );

  return triggerHaptic;
}
