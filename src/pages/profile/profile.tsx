import {
  CreditCard,
  Heart,
  MapPin,
  Settings,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Addresses from "./components/addresses";
import Orders from "./components/orders";
import Overview from "./components/overview";
import Wishlist from "./components/wishlist";
import { MainSection } from "@/components";

type ActiveTab =
  | "overview"
  | "orders"
  | "wishlist"
  | "addresses"
  | "payment"
  | "settings"
  | "security";

const tabItems: Array<{
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
  {
    id: "orders",
    label: "Orders",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  { id: "wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" /> },
  {
    id: "addresses",
    label: "Addresses",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: "payment",
    label: "Payment",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
  },
  { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
];

const Profile: React.FC = () => {
  const { state } = useLocation();

  const [activeTab, setActiveTab] = useState<ActiveTab>(state || "overview");

  const renderOverview = (): React.ReactNode => <Overview />;

  const renderOrders = (): React.ReactNode => <Orders />;

  const renderWishlist = (): React.ReactNode => <Wishlist />;

  const renderAddresses = (): React.ReactNode => <Addresses />;

  const renderContent = (): React.ReactNode => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "orders":
        return renderOrders();
      case "wishlist":
        return renderWishlist();
      case "addresses":
        return renderAddresses();
      case "payment":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <p className="text-gray-900 dark:text-gray-100">
              Payment methods coming soon...
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <p className="text-gray-900 dark:text-gray-100">
              Settings coming soon...
            </p>
          </div>
        );
      case "security":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <p className="text-gray-900 dark:text-gray-100">
              Security settings coming soon...
            </p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <MainSection title="Profile">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64">
          <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-4 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <ul className="space-y-2">
              {tabItems.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-600 dark:bg-blue-500 text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </MainSection>
  );
};

export default Profile;
