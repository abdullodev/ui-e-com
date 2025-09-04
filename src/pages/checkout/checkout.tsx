import { useState } from "react";
import {
  CreditCard,
  Lock,
  Shield,
  Edit3,
  Plus,
  Check,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MainSection } from "@/components";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  isDefault: boolean;
  cardNumber?: string;
  expiryDate?: string;
  cardType?: string;
  email?: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("card_1");
  const [selectedAddress, setSelectedAddress] = useState("addr_1");

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card_1",
      type: "card",
      isDefault: true,
      cardNumber: "**** **** **** 4532",
      expiryDate: "12/25",
      cardType: "Visa",
    },
    {
      id: "card_2",
      type: "card",
      isDefault: false,
      cardNumber: "**** **** **** 8901",
      expiryDate: "08/26",
      cardType: "Mastercard",
    },
    {
      id: "paypal_1",
      type: "paypal",
      isDefault: false,
      email: "john.doe@email.com",
    },
  ];

  const addresses = [
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

  const orderItems: OrderItem[] = [
    {
      id: "item_1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "🎧",
    },
    {
      id: "item_2",
      name: "Bluetooth Speaker",
      price: 89.99,
      quantity: 2,
      image: "🔊",
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <MainSection>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Secure Checkout
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Your information is protected with 256-bit SSL encryption</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Payment & Shipping */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Contact Information
                  </h3>
                </div>
                <Link
                  to="/profile"
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <Edit3 className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2">
                    <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <input
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2">
                    <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <input
                      disabled
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Shipping Address
                  </h3>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors">
                  <Plus className="h-4 w-4 inline mr-1" />
                  Add New
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                            selectedAddress === address.id
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300 dark:border-gray-500"
                          }`}
                        >
                          {selectedAddress === address.id && (
                            <Check className="h-2.5 w-2.5 text-white m-0.5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                address.type === "shipping"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                              }`}
                            >
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs font-semibold">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            <p className="font-semibold">{address.name}</p>
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p>{address.country}</p>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Payment Method
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Lock className="h-4 w-4" />
                  <span>Secured</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPayment === method.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPayment === method.id
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300 dark:border-gray-500"
                          }`}
                        >
                          {selectedPayment === method.id && (
                            <Check className="h-2.5 w-2.5 text-white m-0.5" />
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          {method.type === "card" ? (
                            <CreditCard className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                              P
                            </div>
                          )}
                          <div>
                            {method.type === "card" ? (
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {method.cardType} {method.cardNumber}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Expires {method.expiryDate}
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  PayPal
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {method.email}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs font-semibold">
                            Default
                          </span>
                        )}
                        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                  <Plus className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">
                    Add New Payment Method
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 sticky top-25 transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Order Summary
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="text-2xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-gray-100">
                      Total
                    </span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors mt-6">
                Complete Order
              </button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                  <Lock className="h-3 w-3" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainSection>
  );
};

export default Checkout;
