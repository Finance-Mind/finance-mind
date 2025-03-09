'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi';

import { cn } from '@/lib/utils';

type ThemeOption = 'light' | 'dark' | 'system';

interface ThemeButtonProps {
  theme: string | undefined;
  value: ThemeOption;
  icon: React.ElementType;
  label: string;
  onClick: (theme: ThemeOption) => void;
}

function ThemeButton({ theme, value, icon: Icon, label, onClick }: ThemeButtonProps) {
  const isActive = theme === value;

  return (
    <button
      onClick={() => onClick(value)}
      className="text-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded-none"
      aria-label={label}
      aria-pressed={isActive}
      data-state={isActive ? 'active' : 'inactive'}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme toggle on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
  };

  const themeOptions: Array<{
    value: ThemeOption;
    icon: React.ElementType;
    label: string;
  }> = [
    { value: 'light', icon: FiSun, label: 'Light mode' },
    { value: 'dark', icon: FiMoon, label: 'Dark mode' },
    { value: 'system', icon: FiMonitor, label: 'System preference' },
  ];

  // Avoid rendering toggle until client-side to prevent hydration mismatch
  if (!mounted) {
    return <div className="h-[38px] w-[138px]" />; // Placeholder with same size
  }

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <div
        className="border-border bg-background flex items-center border"
        role="group"
        aria-label="Theme selection"
      >
        {themeOptions.map(option => (
          <ThemeButton
            key={option.value}
            theme={theme}
            value={option.value}
            icon={option.icon}
            label={option.label}
            onClick={handleThemeChange}
          />
        ))}
      </div>
    </div>
  );
}
