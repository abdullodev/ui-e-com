import { PageTransitionProvider } from "@/components/animations/page-transition-context";
import Auth from "./auth";

const AuthWrapper = () => {
  return (
    <PageTransitionProvider>
      <Auth />
    </PageTransitionProvider>
  );
};

export default AuthWrapper;
