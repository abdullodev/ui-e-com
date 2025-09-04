import { Camera, CreditCard, ShoppingBag, Star } from "lucide-react";
import EditProfile from "./edit-profile";
import { useState } from "react";
import { PageTransitionWrapper } from "@/components";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  dateJoined: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
}

const Overview = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "user_123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    dateJoined: "2023-01-15",
    totalOrders: 24,
    totalSpent: 2847.5,
    loyaltyPoints: 1250,
  });

  return (
    <PageTransitionWrapper>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 transition-colors">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {userProfile.firstName} {userProfile.lastName}
                </h2>
                <p className="text-gray-600">{userProfile.email}</p>
                <p className="text-sm text-gray-500">
                  Member since{" "}
                  {new Date(userProfile.dateJoined).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                    }
                  )}
                </p>
              </div>
            </div>
            <EditProfile
              userProfile={userProfile}
              setUserProfile={setUserProfile}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-semibold">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {userProfile.totalOrders}
                  </p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-semibold">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    ${userProfile.totalSpent.toFixed(2)}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-semibold">
                    Loyalty Points
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {userProfile.loyaltyPoints}
                  </p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Overview;
