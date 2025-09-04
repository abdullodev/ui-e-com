import { CategoryCard, MainSection } from "@/components";
import type { ICategory } from "@/components/features/category-card/category-card";
import { motion } from "framer-motion";

interface Props {
  categories: ICategory[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const HomeCategories = ({ categories }: Props) => {
  return (
    <MainSection>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shop by Category
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore our wide range of products
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category, index) => (
            <CategoryCard category={category} index={index} key={category.id} />
          ))}
        </motion.div>
      </div>
    </MainSection>
  );
};

export default HomeCategories;
