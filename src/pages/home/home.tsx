import FeatureProducts from "./components/feature-products";
import HomeCategories from "./components/home-categories";
import HomeSlider from "./components/home-slider";

const Home = () => {
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      itemCount: "2,341 items",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
      itemCount: "5,678 items",
    },
    {
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      itemCount: "1,234 items",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      itemCount: "987 items",
    },
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      itemCount: "3,456 items",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
      itemCount: "2,109 items",
    },
  ];

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
  ];

  return (
    <>
      {/* Hero Banner */}
      <HomeSlider />

      {/* Categories Section */}
      <HomeCategories categories={categories} />

      {/* Featured Products */}
      <FeatureProducts featuredProducts={featuredProducts} />
    </>
  );
};

export default Home;
