import { motion } from "framer-motion";
import { Lock, Mail, Phone } from "lucide-react";
import React from "react";
import type { RegisterFormData } from "../auth";
import InputField from "./input-field";
import SubmitButton from "./submit-button";

// Register Form Component
const RegisterForm: React.FC<{
  onSubmit: (data: RegisterFormData) => void;
  form: any;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}> = ({
  onSubmit,
  form,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  return (
    <motion.form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="First name"
          type="text"
          placeholder="John"
          register={form.register("firstName", {
            required: "First name is required",
          })}
          error={form.formState.errors.firstName?.message}
        />
        <InputField
          label="Last name"
          type="text"
          placeholder="Doe"
          register={form.register("lastName", {
            required: "Last name is required",
          })}
          error={form.formState.errors.lastName?.message}
        />
      </div>

      <InputField
        label="Email address"
        type="email"
        placeholder="john@example.com"
        icon={<Mail className="h-5 w-5 text-gray-400" />}
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
        label="Phone number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        icon={<Phone className="h-5 w-5 text-gray-400" />}
        register={form.register("phone", {
          required: "Phone number is required",
        })}
        error={form.formState.errors.phone?.message}
      />

      {/* Password Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5 text-gray-400" />}
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
        <InputField
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          register={form.register("confirmPassword", {
            required: "Please confirm your password",
          })}
          error={form.formState.errors.confirmPassword?.message}
          showPasswordToggle
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </div>

      {/* Terms and Conditions */}
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          required
        />
        <label
          htmlFor="terms"
          className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
        >
          I agree to the{" "}
          <motion.button
            type="button"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Terms and Conditions
          </motion.button>{" "}
          and{" "}
          <motion.button
            type="button"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Privacy Policy
          </motion.button>
        </label>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <SubmitButton
          isSubmitting={form.formState.isSubmitting}
          isLogin={false}
        />
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;
