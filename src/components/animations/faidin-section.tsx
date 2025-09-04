import React from "react";
import { motion } from "framer-motion";

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
  className = "",
  threshold = 0.3,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: threshold }}
    transition={{
      duration: 0.6,
      delay,
      type: "spring",
      stiffness: 100,
      damping: 12,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInSection;
