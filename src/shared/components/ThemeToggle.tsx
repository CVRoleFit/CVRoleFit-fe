import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { setTheme } from "@/features/theme/themeSlice";
import type { Theme } from "@/features/theme/themeSlice";

const themes: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "system", label: "System", icon: "💻" },
];

export function ThemeToggle() {
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
      {themes.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => dispatch(setTheme(t.value))}
          title={t.label}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
            theme === t.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-gray-100"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <span className="mr-1.5">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
