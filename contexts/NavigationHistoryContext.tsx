'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationHistoryContextType {
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  pushHistory: (path: string) => void;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType | undefined>(undefined);

export function NavigationHistoryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [history, setHistory] = useState<string[]>([pathname]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const pushHistory = useCallback((path: string) => {
    // Skip if we're currently navigating (prevents duplicate entries)
    if (isNavigating) {
      setIsNavigating(false);
      return;
    }

    // Don't add duplicate if it's the same as current
    if (history[currentIndex] === path) return;

    // Remove any forward history when pushing new path
    const newHistory = [...history.slice(0, currentIndex + 1), path];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex, isNavigating]);

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    setIsNavigating(true);
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    router.push(history[newIndex]);
  }, [canGoBack, currentIndex, history, router]);

  const goForward = useCallback(() => {
    if (!canGoForward) return;
    setIsNavigating(true);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    router.push(history[newIndex]);
  }, [canGoForward, currentIndex, history, router]);

  // Keyboard shortcuts: Cmd/Ctrl + [ for back, Cmd/Ctrl + ] for forward
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '[') {
        e.preventDefault();
        goBack();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ']') {
        e.preventDefault();
        goForward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goBack, goForward]);

  return (
    <NavigationHistoryContext.Provider value={{ canGoBack, canGoForward, goBack, goForward, pushHistory }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  const context = useContext(NavigationHistoryContext);
  if (!context) {
    throw new Error('useNavigationHistory must be used within NavigationHistoryProvider');
  }
  return context;
}
