import React from "react";
import type { TransitionType, Direction } from "./page-transition-wrapper";

interface PageTransitionContextType {
  setTransitionType: (type: TransitionType) => void;
  setDirection: (direction: Direction) => void;
  transitionType: TransitionType;
  direction: Direction;
}

const PageTransitionContext =
  React.createContext<PageTransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = React.useContext(PageTransitionContext);
  if (!context)
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  return context;
};

export const PageTransitionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [transitionType, setTransitionType] =
    React.useState<TransitionType>("default");
  const [direction, setDirection] = React.useState<Direction>(1);

  return (
    <PageTransitionContext.Provider
      value={{ transitionType, direction, setTransitionType, setDirection }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
