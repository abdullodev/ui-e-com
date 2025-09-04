import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  scale?: number;
  rotate?: number;
  className?: string;
}

const HoverAnimation: React.FC<Props> = ({
  children,
  scale = 1.05,
  rotate = 0,
  className = "",
}) => (
  <motion.div
    whileHover={{ scale, rotate }}
    whileTap={{ scale: scale * 0.95 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default HoverAnimation;
