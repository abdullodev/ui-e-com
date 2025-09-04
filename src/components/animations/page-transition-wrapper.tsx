import React from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import LoadingSpinner from "./loading-spinner";

export interface WithPageTransitionOptions {
  transitionType?: TransitionType;
  direction?: Direction;
  staggerChildren?: boolean;
  className?: string;
}

// Types
export type TransitionType =
  | "default"
  | "slide"
  | "fade"
  | "scale"
  | "rotate"
  | "bounce";
export type Direction = 1 | -1;

export interface PageTransitionWrapperProps {
  children: React.ReactNode;
  transitionType?: TransitionType;
  direction?: Direction;
  isLoading?: boolean;
  className?: string;
  staggerChildren?: boolean;
  customKey?: string;
  duration?: number;
  delay?: number;
}

// Variants
const defaultVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 1.02 },
};
const slideVariants: Variants = {
  initial: (d: Direction) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
  enter: { x: 0, opacity: 1 },
  exit: (d: Direction) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
};
const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};
const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};
const rotateVariants: Variants = {
  initial: { opacity: 0, rotateY: 90 },
  enter: { opacity: 1, rotateY: 0 },
  exit: { opacity: 0, rotateY: -90 },
};
const bounceVariants: Variants = {
  initial: { opacity: 0, y: 100, scale: 0.8 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -100, scale: 0.8 },
};

// Choose variant
const getVariants = (type: TransitionType): Variants => {
  switch (type) {
    case "slide":
      return slideVariants;
    case "fade":
      return fadeVariants;
    case "scale":
      return scaleVariants;
    case "rotate":
      return rotateVariants;
    case "bounce":
      return bounceVariants;
    default:
      return defaultVariants;
  }
};

// Choose transition
const getTransition = (
  type: TransitionType,
  duration: number,
  delay: number
): Transition => {
  const base = { duration, delay };
  switch (type) {
    case "scale":
    case "bounce":
    case "slide":
    case "default":
      return { ...base, type: "spring", stiffness: 100, damping: 20 };
    case "rotate":
      return { ...base, type: "spring", stiffness: 200, damping: 25 };
    case "fade":
      return { ...base, ease: "easeInOut" };
    default:
      return base;
  }
};

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({
  children,
  transitionType = "fade",
  direction = 1,
  isLoading = false,
  className = "",
  customKey,
  duration = 0.6,
  delay = 0,
}) => {
  const variants = getVariants(transitionType);
  const transition = getTransition(transitionType, duration, delay);

  return (
    <>
      <>{isLoading && <LoadingSpinner key="loading" />}</>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={customKey || "page-wrapper"}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={transition}
          className={`min-h-screen ${className}`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransitionWrapper;
