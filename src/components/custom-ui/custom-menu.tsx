import { AnimatePresence, motion } from "framer-motion";
import React, { type ReactNode } from "react";

// Types for menu system
interface MenuItem {
  key: string;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  action: () => void;
  variant?: "default" | "danger" | "success";
  rightElement?: ReactNode;
  disabled?: boolean;
}

export interface MenuSection {
  title?: string;
  description?: string;
  items: MenuItem[];
}

interface MenuProps {
  trigger: ReactNode;
  sections: MenuSection[];
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  align?: "left" | "right";
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
  headerIcon?: React.ComponentType<{ className?: string }>;
  customHeader?: ReactNode;
}

// Custom Menu Component
const CustomMenu: React.FC<MenuProps> = ({
  trigger,
  sections,
  isOpen,
  onClose,
  width = "w-64",
  align = "right",
  showHeader = true,
  headerTitle,
  headerDescription,
  headerIcon: HeaderIcon,
  customHeader,
}) => {
  const getVariantStyles = (
    variant: MenuItem["variant"] = "default",
    isActive = false
  ) => {
    const baseStyles =
      "w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors group";

    if (isActive) {
      return `${baseStyles} bg-blue-50 dark:bg-blue-900/20`;
    }

    switch (variant) {
      case "danger":
        return `${baseStyles} hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400`;
      case "success":
        return `${baseStyles} hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400`;
      default:
        return baseStyles;
    }
  };

  const getIconStyles = (
    variant: MenuItem["variant"] = "default",
    isActive = false
  ) => {
    const baseStyles = "p-1.5 rounded-lg transition-colors";

    if (isActive) {
      return `${baseStyles} bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400`;
    }

    switch (variant) {
      case "danger":
        return `${baseStyles} bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-700`;
      case "success":
        return `${baseStyles} bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-700`;
      default:
        return `${baseStyles} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600`;
    }
  };

  return (
    <div className="relative">
      {trigger}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${
              align === "right" ? "right-0" : "left-0"
            } top-full mt-2 ${width} bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 max-h-100 overflow-y-auto`}
          >
            {/* Custom Header */}
            {customHeader && (
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                {customHeader}
              </div>
            )}

            {/* Standard Header */}
            {!customHeader && showHeader && (headerTitle || HeaderIcon) && (
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  {HeaderIcon && (
                    <HeaderIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                  {headerTitle && (
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {headerTitle}
                    </h3>
                  )}
                </div>
                {headerDescription && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {headerDescription}
                  </p>
                )}
              </div>
            )}

            {/* Menu Sections */}
            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={
                  sectionIndex > 0
                    ? "border-t border-gray-200 dark:border-gray-700"
                    : ""
                }
              >
                {/* Section Title */}
                {section.title && (
                  <div className="px-4 py-2">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {section.title}
                    </h4>
                    {section.description && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {section.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Section Items */}
                <div className="py-1">
                  {section.items.map((item) => {
                    const isActive =
                      item.rightElement &&
                      React.isValidElement(item.rightElement);

                    return (
                      <motion.button
                        key={item.key}
                        onClick={() => {
                          if (!item.disabled) {
                            item.action();
                            onClose();
                          }
                        }}
                        disabled={item.disabled}
                        className={`${getVariantStyles(
                          item.variant,
                          !!isActive
                        )} ${
                          item.disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        transition={{ duration: 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon && (
                            <div
                              className={getIconStyles(
                                item.variant,
                                !!isActive
                              )}
                            >
                              <item.icon className="w-4 h-4" />
                            </div>
                          )}
                          <div>
                            <div
                              className={`text-sm font-medium ${
                                isActive
                                  ? "text-blue-600 dark:text-blue-400"
                                  : item.variant === "danger"
                                  ? "text-red-600 dark:text-red-400"
                                  : item.variant === "success"
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-900 dark:text-gray-100"
                              }`}
                            >
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Element */}
                        {item.rightElement && (
                          <div className="flex-shrink-0">
                            {item.rightElement}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}
    </div>
  );
};

export default CustomMenu;
