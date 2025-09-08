import CustomMenu, {
  type MenuSection,
} from "@/components/custom-ui/custom-menu";
import { motion } from "framer-motion";
import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useState } from "react";

const ThemeMode: React.FC<{
  theme: string;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setSystemTheme: () => void;
}> = ({ theme, setLightTheme, setDarkTheme, setSystemTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return Sun;
      case "dark":
        return Moon;
      case "system":
        return Monitor;
      default:
        return Monitor;
    }
  };

  const ThemeIcon = getThemeIcon();

  const themeMenuSections: MenuSection[] = [
    {
      items: [
        {
          key: "light",
          icon: Sun,
          label: "Light",
          description: "Bright and clean interface",
          action: setLightTheme,
          rightElement:
            theme === "light" ? (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : undefined,
        },
        {
          key: "dark",
          icon: Moon,
          label: "Dark",
          description: "Easy on the eyes",
          action: setDarkTheme,
          rightElement:
            theme === "dark" ? (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : undefined,
        },
        {
          key: "system",
          icon: Monitor,
          label: "System",
          description: "Follow system preference",
          action: setSystemTheme,
          rightElement:
            theme === "system" ? (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : undefined,
        },
      ],
    },
  ];

  const trigger = (
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Current theme: ${theme}`}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ThemeIcon className="h-6 w-6" />
      </motion.div>

      {/* Active indicator */}
      <motion.div
        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
        initial={{ scale: 0, x: "-50%" }}
        animate={{ scale: theme !== "system" ? 1 : 0, x: "-50%" }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );

  return (
    <CustomMenu
      trigger={trigger}
      sections={themeMenuSections}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      headerTitle="Theme Preference"
      headerDescription="Choose your preferred theme"
      headerIcon={Palette}
    />
  );
};

export default ThemeMode;
