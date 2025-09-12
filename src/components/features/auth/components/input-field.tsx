import CustomLabel from "@/components/custom-ui/custom-label";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

// Input Field Component
const InputField: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  register: any;
  error?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}> = ({
  label,
  type,
  placeholder,
  icon,
  register,
  error,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CustomLabel label={label} />
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Input
          {...register}
          type={
            showPasswordToggle ? (showPassword ? "text" : "password") : type
          }
          className={`block w-full ${icon ? "pl-10" : "pl-3"} ${
            showPasswordToggle ? "pr-10" : "pr-3"
          }`}
          placeholder={placeholder}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        {showPasswordToggle && (
          <motion.button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            )}
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InputField;
