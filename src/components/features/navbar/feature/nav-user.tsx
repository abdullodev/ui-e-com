import type { MenuSection } from "@/components/custom-ui/custom-menu";
import CustomMenu from "@/components/custom-ui/custom-menu";
import CustomModal from "@/components/custom-ui/custom-modal";
import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import React, { useState } from "react";
import Auth from "../../auth";

// Main NavUser Component using CustomMenu
const NavUser: React.FC = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState({
    isAuthenticated: true, // Change to false to see unauthenticated state
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
  });

  const { navigateWithTransition } = useNavigationTransition();

  //   const handleLogin = () => {
  //     // Mock login - replace with actual login logic
  //     setUser({
  //       isAuthenticated: true,
  //       name: "John Doe",
  //       email: "john@example.com",
  //       avatar: null,
  //     });
  //     setShowAuthDialog(false);
  //   };

  const handleLogout = () => {
    // Mock logout - replace with actual logout logic
    setUser({
      isAuthenticated: false,
      name: "",
      email: "",
      avatar: null,
    });
    setShowUserMenu(false);
  };

  const handleUserClick = () => {
    if (user.isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowAuthDialog(true);
      // navigateWithTransition("/auth");
    }
  };

  // User menu sections using CustomMenu structure
  const userMenuSections: MenuSection[] = [
    {
      title: "Account",
      description: "Manage your account settings",
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
          action: () => navigateWithTransition("/orders"),
        },
        {
          key: "wishlist",
          icon: Heart,
          label: "Wishlist",
          description: "Your saved items",
          action: () => navigateWithTransition("/wishlist"),
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          key: "payment",
          icon: CreditCard,
          label: "Payment Methods",
          description: "Manage your payment options",
          action: () => navigateWithTransition("/payment"),
        },
        {
          key: "notifications",
          icon: Bell,
          label: "Notifications",
          description: "Notification preferences",
          action: () => navigateWithTransition("/notifications"),
        },
        {
          key: "settings",
          icon: Settings,
          label: "Account Settings",
          description: "Privacy and security",
          action: () => navigateWithTransition("/settings"),
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
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </motion.div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
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
      {user.isAuthenticated ? (
        <>
          <motion.div
            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
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
      {user.isAuthenticated ? (
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
        isOpen={showAuthDialog}
        children={<Auth />}
        onClose={() => setShowAuthDialog(false)}
      />
    </>
  );
};

export default NavUser;
