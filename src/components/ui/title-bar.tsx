import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Button } from './button';

// Define the electronAPI type
declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;
    }
  }
}

// Extend CSSProperties to include WebkitAppRegion
interface ExtendedCSSProperties extends CSSProperties {
  WebkitAppRegion?: 'drag' | 'no-drag';
}

export function CustomTitleBar({ title }: { title: string }) {
  const [isMacOS] = useState(() => navigator.platform.toLowerCase().includes('mac'));

  // Window control handlers
  const handleMinimize = () => window.electronAPI.minimizeWindow();
  const handleMaximize = () => window.electronAPI.maximizeWindow();
  const handleClose = () => window.electronAPI.closeWindow();

  // Add CSS for proper traffic light spacing on macOS
  useEffect(() => {
    if (isMacOS) {
      // Add padding for native traffic lights
      document.body.style.paddingTop = '28px';
    }
    return () => {
      document.body.style.paddingTop = '';
    };
  }, [isMacOS]);

  // On macOS, we don't need to render custom controls as they're handled natively
  if (isMacOS) {
    return (
      <div
        className="h-8 text-sm font-bold text-foreground flex items-center justify-center fixed top-0 left-0 right-0 z-50"
        style={{ WebkitAppRegion: 'drag' } as ExtendedCSSProperties}
      >
        <div className="text-sm font-bold text-foreground">{title}</div>
      </div>
    );
  }

  // Custom controls for Windows/Linux
  return (
    <div
      className="h-8 bg-neutral-800 text-white flex items-center justify-between fixed top-0 left-0 right-0 z-50"
      style={{ WebkitAppRegion: 'drag' } as ExtendedCSSProperties}
    >
      <div style={{ WebkitAppRegion: 'no-drag' } as ExtendedCSSProperties} className="flex items-center">
        <Button
          onClick={handleMinimize}
          aria-label="Minimize"
          variant="secondary"
          size="icon"
          className='cursor-pointer'
        >
          <svg width="10" height="1" viewBox="0 0 10 1">
            <path fill="currentColor" d="M0 0h10v1H0z"/>
          </svg>
        </Button>
        <Button
          onClick={handleMaximize}
          aria-label="Maximize"
          variant="secondary"
          size="icon"
          className='cursor-pointer'
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path fill="currentColor" d="M0 0v10h10V0H0zm1 1h8v8H1V1z"/>
          </svg>
        </Button>
        <Button
          onClick={handleClose}
          aria-label="Close"
          variant="destructive"
          size="icon"
          className='cursor-pointer'
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path fill="currentColor" d="M1 0L0 1l4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4-1-1-4 4-4-4z"/>
          </svg>
        </Button>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 text-sm">
        {title}
      </div>
    </div>
  );
}
