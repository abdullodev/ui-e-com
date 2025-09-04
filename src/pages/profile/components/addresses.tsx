import { PageTransitionWrapper } from "@/components";
import { Edit3 } from "lucide-react";

interface Address {
  id: string;
  type: "shipping" | "billing";
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const addresses: Address[] = [
  {
    id: "addr_1",
    type: "shipping",
    isDefault: true,
    name: "John Doe",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  {
    id: "addr_2",
    type: "billing",
    isDefault: false,
    name: "John Doe",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "United States",
  },
];

const Addresses = () => {
  return (
    <PageTransitionWrapper>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                Addresses
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-200">
                Manage your shipping and billing addresses
              </p>
            </div>
            <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
              Add New Address
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700/50 transition-colors duration-200 hover:border-gray-300 dark:hover:border-gray-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold transition-colors duration-200 ${
                        address.type === "shipping"
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300"
                          : "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                      }`}
                    >
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-xs font-semibold transition-colors duration-200">
                        Default
                      </span>
                    )}
                  </div>
                  <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 transition-colors duration-200">
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {address.street}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {address.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Addresses;
