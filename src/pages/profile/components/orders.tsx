import { CheckCircle, Clock, Eye, Package, Truck, X } from "lucide-react";
import React from "react";

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  total: number;
  items: number;
  trackingNumber?: string;
}

export const getStatusColor = (status: Order["status"]): string => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusIcon = (status: Order["status"]): React.ReactNode => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4" />;
    case "shipped":
      return <Truck className="h-4 w-4" />;
    case "processing":
      return <Clock className="h-4 w-4" />;
    case "cancelled":
      return <X className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const orders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-08-25",
    status: "delivered",
    total: 299.99,
    items: 3,
    trackingNumber: "TN123456789",
  },
  {
    id: "ORD-2024-002",
    date: "2024-08-20",
    status: "shipped",
    total: 189.5,
    items: 2,
    trackingNumber: "TN987654321",
  },
  {
    id: "ORD-2024-003",
    date: "2024-08-15",
    status: "processing",
    total: 459.99,
    items: 5,
  },
  {
    id: "ORD-2024-004",
    date: "2024-08-10",
    status: "cancelled",
    total: 89.99,
    items: 1,
  },
];

const Orders = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
        <p className="text-sm text-gray-600 mt-1">
          Track and manage your orders
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{order.id}</h4>
                    <p className="text-sm text-gray-600">
                      Ordered on {order.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{order.items} items</span>
                  {order.trackingNumber && (
                    <span>Tracking: {order.trackingNumber}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </span>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
