export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // stagger category cards
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05 },
};

export const imageVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};
