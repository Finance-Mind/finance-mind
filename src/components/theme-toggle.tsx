"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useEffect, useState } from "react";

type ThemeOption = "light" | "dark" | "system";

interface ThemeButtonProps {
  theme: string | undefined;
  value: ThemeOption;
  icon: React.ElementType;
  label: string;
  onClick: (theme: ThemeOption) => void;
}

function ThemeButton({
  theme,
  value,
  icon: Icon,
  label,
  onClick,
}: ThemeButtonProps) {
  const isActive = theme === value;

  return (
    <button
      onClick={() => onClick(value)}
      className="p-1.5 rounded-none cursor-pointer text-foreground"
      aria-label={label}
      aria-pressed={isActive}
      data-state={isActive ? "active" : "inactive"}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function ThemeToggle() {
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
    { value: "light", icon: FiSun, label: "Light mode" },
    { value: "dark", icon: FiMoon, label: "Dark mode" },
    { value: "system", icon: FiMonitor, label: "System preference" },
  ];

  // Avoid rendering toggle until client-side to prevent hydration mismatch
  if (!mounted) {
    return <div className="w-[138px] h-[38px]" />; // Placeholder with same size
  }

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center space-x-1 rounded-none border border-border bg-background px-2 py-1"
        role="group"
        aria-label="Theme selection"
      >
        {themeOptions.map((option) => (
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
