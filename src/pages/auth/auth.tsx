import { MainSection } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";
import AuthToggle from "./components/auth-toggle";

// Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Main Auth Component
const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  const onLoginSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    // Handle login logic here
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    console.log("Register data:", data);
    // Handle registration logic here
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Reset forms when switching
    loginForm.reset();
    registerForm.reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <MainSection className="py-0 pb-0 min-h-auto">
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <User className="h-8 w-8 text-white" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={isLogin ? "login-title" : "register-title"}
                className="text-3xl font-bold text-gray-900 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? "Welcome back" : "Create your account"}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={isLogin ? "login-subtitle" : "register-subtitle"}
                className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {isLogin
                  ? "Sign in to your account"
                  : "Join us and start shopping"}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            layout
          >
            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm
                  key="login-form"
                  onSubmit={onLoginSubmit}
                  form={loginForm}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              ) : (
                <RegisterForm
                  key="register-form"
                  onSubmit={onRegisterSubmit}
                  form={registerForm}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                />
              )}
            </AnimatePresence>

            <AuthToggle isLogin={isLogin} onToggle={toggleAuthMode} />
          </motion.div>
        </motion.div>
      </div>
    </MainSection>
  );
};

export default Auth;
