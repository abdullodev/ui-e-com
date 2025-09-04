import { PageTransitionWrapper } from "@/components";
import Checkout from "./checkout";

const CheckoutWrapper = () => {
  return (
    <PageTransitionWrapper>
      <Checkout />
    </PageTransitionWrapper>
  );
};

export default CheckoutWrapper;
