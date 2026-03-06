import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useDarkMode } from '../../CustomHooks/useDarkMode';


export default function ThemeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-full bg-white dark:bg-[#3a3b3c] shadow-md border border-gray-200 dark:border-gray-600 hover:scale-110 transition-all text-gray-700 dark:text-yellow-300"
    >
      {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
    </button>
  );
}