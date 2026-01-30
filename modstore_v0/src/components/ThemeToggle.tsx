import { useTheme } from './ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-dark-400 dark:hover:bg-dark-400 hover:bg-opacity-50 transition-colors ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <FiSun className="text-yellow-300" aria-hidden="true" />
      ) : (
        <FiMoon className="text-gray-700" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
