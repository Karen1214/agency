import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun size={18} className="text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
