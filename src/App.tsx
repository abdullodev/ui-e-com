import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Footer,
  LoadingSpinner,
  Navbar,
  PageTransitionWrapper,
} from "./components";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { PageTransitionProvider } from "./components/animations/page-transition-context";

const Home = lazy(() => import("./pages/home"));
const Categories = lazy(() => import("./pages/categories"));
const Products = lazy(() => import("./pages/products"));
const Profile = lazy(() => import("./pages/profile"));

const Basket = lazy(() => import("./pages/basket"));
const Checkout = lazy(() => import("./pages/checkout"));

function App() {
  useScrollToTop();
  return (
    <PageTransitionProvider>
      <Navbar />

      <Suspense
        fallback={
          <PageTransitionWrapper isLoading>
            <></>
          </PageTransitionWrapper>
        }
      >
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>

      <Footer />
    </PageTransitionProvider>
  );
}

export default App;
