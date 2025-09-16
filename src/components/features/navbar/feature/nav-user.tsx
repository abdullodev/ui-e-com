import type { MenuSection } from "@/components/custom-ui/custom-menu";
import CustomMenu from "@/components/custom-ui/custom-menu";
import CustomModal from "@/components/custom-ui/custom-modal";
import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import { motion } from "framer-motion";
import { ChevronDown, Heart, LogOut, ShoppingBag, User } from "lucide-react";
import React, { useState } from "react";
import Auth from "../../auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/useAuthStore";

// Main NavUser Component using CustomMenu
const NavUser: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { openModal, closeModal, isOpenModal, setUser, user } = useAuth();

  const navigate = useNavigate();
  const { navigateWithTransition } = useNavigationTransition();

  const handleLogout = () => {
    setUser({
      isAuth: false,
      firstName: "",
      phone: "",
      lastName: "",
    });
    setShowUserMenu(false);
  };

  const handleUserClick = () => {
    if (user?.isAuth) {
      setShowUserMenu(!showUserMenu);
    } else {
      openModal();
    }
  };

  // User menu sections using CustomMenu structure
  const userMenuSections: MenuSection[] = [
    {
      title: "Account",
      items: [
        {
          key: "profile",
          icon: User,
          label: "Profile",
          description: "View and edit your profile",
          action: () => navigateWithTransition("/profile"),
        },
        {
          key: "orders",
          icon: ShoppingBag,
          label: "Orders",
          description: "Track your order history",
          action: () => navigate("/profile", { state: "orders" }),
        },
        {
          key: "wishlist",
          icon: Heart,
          label: "Wishlist",
          description: "Your saved items",
          action: () => navigate("/profile", { state: "wishlist" }),
        },
      ],
    },
    {
      items: [
        {
          key: "logout",
          icon: LogOut,
          label: "Sign Out",
          description: "Sign out of your account",
          action: handleLogout,
          variant: "danger" as const,
        },
      ],
    },
  ];

  // Custom header for user menu
  const userMenuHeader = (
    <div className="flex items-center space-x-3">
      <motion.div
        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.firstName}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </motion.div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user?.firstName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user?.phone}
        </p>
      </div>
    </div>
  );

  // Trigger button
  const userTrigger = (
    <motion.button
      onClick={handleUserClick}
      className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {user?.isAuth ? (
        <>
          <motion.div
            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.firstName}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </motion.div>
          <motion.div
            animate={{ rotate: showUserMenu ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </>
      ) : (
        <User className="h-6 w-6" />
      )}
    </motion.button>
  );

  return (
    <>
      {/* User Menu using CustomMenu */}
      {user?.isAuth ? (
        <CustomMenu
          trigger={userTrigger}
          sections={userMenuSections}
          isOpen={showUserMenu}
          onClose={() => setShowUserMenu(false)}
          width="w-72"
          customHeader={userMenuHeader}
          showHeader={false}
        />
      ) : (
        <div className="relative">{userTrigger}</div>
      )}
      <CustomModal
        isOpen={isOpenModal}
        children={<Auth />}
        onClose={() => closeModal()}
      />
    </>
  );
};

export default NavUser;
