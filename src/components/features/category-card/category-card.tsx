import { motion } from "framer-motion";
import { cardVariants, imageVariants } from "./common/constants";

export type ICategory = {
  id: string;
  name: string;
  image: string;
  itemCount: string;
};

interface CategoryCardProps {
  category: ICategory;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-800 dark:hover:shadow-gray-700 transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-w-16 aspect-h-10">
        <motion.img
          src={category.image}
          alt={category.name}
          className="w-full h-48 object-cover"
          variants={imageVariants}
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent dark:from-black/80 dark:to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <motion.h3
          className="text-xl font-bold mb-1 text-white dark:text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {category.name}
        </motion.h3>
        <motion.p
          className="text-sm opacity-90 text-white/90 dark:text-gray-200/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {category.itemCount}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
