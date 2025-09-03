import { MainSection } from "@/components";
import { Heart, ShoppingCart, Star } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$199.99",
    originalPrice: "$249.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$299.99",
    originalPrice: "$399.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 3,
    name: "Premium Backpack",
    price: "$89.99",
    originalPrice: "$129.99",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: "$159.99",
    originalPrice: "$199.99",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 5,
    name: "Premium Backpack",
    price: "$89.99",
    originalPrice: "$129.99",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 6,
    name: "Coffee Maker",
    price: "$159.99",
    originalPrice: "$199.99",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 7,
    name: "Wireless Headphones",
    price: "$199.99",
    originalPrice: "$249.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 8,
    name: "Smart Watch",
    price: "$299.99",
    originalPrice: "$399.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 156,
  },
];

const Products = () => {
  return (
    <MainSection title="Products">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                Sale
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {product.name}
              </h3>
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({product.reviews})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {product.originalPrice}
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainSection>
  );
};

export default Products;
