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
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Addresses</h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage your shipping and billing addresses
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add New Address
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        address.type === "shipping"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {address.type}
                    </span>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-900">
                  <p className="font-semibold">{address.name}</p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
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
