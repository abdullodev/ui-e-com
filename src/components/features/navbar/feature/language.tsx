import CustomMenu, {
  type MenuSection,
} from "@/components/custom-ui/custom-menu";
import { useLanguageStore, type TLanguage } from "@/store/useLangugageStore";
import { motion } from "framer-motion";
import { Check, Languages } from "lucide-react";
import { useState } from "react";

// Language flag/icon components (you can replace with actual flag icons)
const UzbekIcon = () => (
  <div className="w-5 h-5 rounded-sm bg-gradient-to-r from-blue-500 via-white to-green-500 flex items-center justify-center text-xs font-bold text-gray-800">
    UZ
  </div>
);

const RussianIcon = () => (
  <div className="w-5 h-5 rounded-sm bg-gradient-to-b from-white via-blue-500 to-red-500 flex items-center justify-center text-xs font-bold text-white">
    RU
  </div>
);

const EnglishIcon = () => (
  <div className="w-5 h-5 rounded-sm bg-gradient-to-r from-blue-600 via-white to-red-500 flex items-center justify-center text-xs font-bold text-blue-800">
    EN
  </div>
);

const Language: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setUzbek, setRussian, setEnglish } = useLanguageStore();

  const getLanguageIcon = () => {
    switch (language) {
      case "uz":
        return UzbekIcon;
      case "ru":
        return RussianIcon;
      case "en":
        return EnglishIcon;
      default:
        return UzbekIcon;
    }
  };

  const getLanguageLabel = (lang: TLanguage) => {
    switch (lang) {
      case "uz":
        return "O'zbekcha";
      case "ru":
        return "Русский";
      case "en":
        return "English";
      default:
        return "O'zbekcha";
    }
  };

  const getLanguageDescription = (lang: TLanguage) => {
    switch (lang) {
      case "uz":
        return "O'zbek tili";
      case "ru":
        return "Русский язык";
      case "en":
        return "English language";
      default:
        return "O'zbek tili";
    }
  };

  const LanguageIcon = getLanguageIcon();

  const languageMenuSections: MenuSection[] = [
    {
      items: [
        {
          key: "uz",
          icon: UzbekIcon,
          label: getLanguageLabel("uz"),
          description: getLanguageDescription("uz"),
          action: setUzbek,
          rightElement:
            language === "uz" ? (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : undefined,
        },
        {
          key: "ru",
          icon: RussianIcon,
          label: getLanguageLabel("ru"),
          description: getLanguageDescription("ru"),
          action: setRussian,
          rightElement:
            language === "ru" ? (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : undefined,
        },
        {
          key: "en",
          icon: EnglishIcon,
          label: getLanguageLabel("en"),
          description: getLanguageDescription("en"),
          action: setEnglish,
          rightElement:
            language === "en" ? (
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
      title={`Current language: ${getLanguageLabel(language)}`}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <LanguageIcon />
      </motion.div>

      {/* Active indicator */}
      <motion.div
        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
        initial={{ scale: 0, x: "-50%" }}
        animate={{ scale: 1, x: "-50%" }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );

  return (
    <CustomMenu
      trigger={trigger}
      sections={languageMenuSections}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      headerTitle="Language Preference"
      headerDescription="Choose your preferred language"
      headerIcon={Languages}
    />
  );
};

export default Language;
