import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

const ScrollAnimation: React.FC<Props> = ({
  children,
  direction = "up",
  distance = 30,
  duration = 0.6,
  delay = 0,
  className = "",
}) => {
  const initial = (() => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
