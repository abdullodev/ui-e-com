import { MainSection, ProductCard } from "@/components";
import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  featuredProducts: any[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.03 },
};

const imageVariants = {
  hover: { scale: 1.08, transition: { duration: 0.3 } },
};

const FeatureProducts = ({ featuredProducts }: Props) => {
  const { navigateWithTransition } = useNavigationTransition();

  return (
    <MainSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-700 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Handpicked items just for you
          </motion.p>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            onClick={() => navigateWithTransition("/products")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </MainSection>
  );
};

export default FeatureProducts;
