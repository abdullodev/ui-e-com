import { PageTransitionWrapper } from "@/components";
import Home from "./home";

const HomeWrapper = () => {
  return (
    <PageTransitionWrapper>
      <Home />
    </PageTransitionWrapper>
  );
};

export default HomeWrapper;
