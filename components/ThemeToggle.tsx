"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="w-12 h-6" />;
  }

  const isDark = theme === "dark";

  return (
    <Switch
      isSelected={isDark}
      onValueChange={(selected) => setTheme(selected ? "dark" : "light")}
      size="sm"
      aria-label="Toggle dark mode"
      startContent={<Moon size={14} />}
      endContent={<Sun size={14} />}
    />
  );
}
