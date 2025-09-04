import React from "react";
import PageTransitionWrapper, {
  type WithPageTransitionOptions,
} from "./page-transition-wrapper";

export const withPageTransition = <P extends object>(
  Component: React.ComponentType<P>,
  options: WithPageTransitionOptions = {}
): React.FC<P> => {
  const Wrapped: React.FC<P> = (props) => (
    <PageTransitionWrapper {...options}>
      <Component {...props} />
    </PageTransitionWrapper>
  );

  Wrapped.displayName = `withPageTransition(${
    Component.displayName || Component.name
  })`;
  return Wrapped;
};
