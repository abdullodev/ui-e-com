import { usePageTransition } from "@/components/animations/page-transition-context";
import type { TransitionType } from "@/components/animations/page-transition-wrapper";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigationTransition = () => {
  const navigate = useNavigate();
  const { setTransitionType, setDirection } = usePageTransition();

  const navigateWithTransition = useCallback(
    (
      path: string,
      transitionType: TransitionType = "default",
      direction: 1 | -1 = 1
    ) => {
      setTransitionType(transitionType);
      setDirection(direction);
      navigate(path);
    },
    [navigate, setTransitionType, setDirection]
  );

  return { navigateWithTransition };
};
