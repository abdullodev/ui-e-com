import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import React from "react";
import type { LoginFormData } from "../auth";
import InputField from "./input-field";
import SubmitButton from "./submit-button";
import { Checkbox } from "@/components/ui/checkbox";

// Login Form Component
const LoginForm: React.FC<{
  onSubmit: (data: LoginFormData) => void;
  form: any;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}> = ({ onSubmit, form, showPassword, setShowPassword }) => {
  return (
    <motion.form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <InputField
        label="Email address"
        type="email"
        placeholder="Enter your email"
        icon={<Mail className="h-3 w-3 text-gray-400" />}
        register={form.register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })}
        error={form.formState.errors.email?.message}
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        icon={<Lock className="h-3 w-3 text-gray-400" />}
        register={form.register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        error={form.formState.errors.password?.message}
        showPasswordToggle
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      {/* Remember me & Forgot password */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center">
          <Checkbox id="remember-me" name="remember" />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <motion.button
          type="button"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Forgot password?
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <SubmitButton
          isSubmitting={form.formState.isSubmitting}
          isLogin={true}
        />
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
