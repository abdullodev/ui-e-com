import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar, PageTransitionWrapper } from "./components";
import { PageTransitionProvider } from "./components/animations/page-transition-context";
import { useScrollToTop } from "./hooks/useScrollToTop";

const Home = lazy(() => import("./pages/home"));
const Categories = lazy(() => import("./pages/categories"));
const Products = lazy(() => import("./pages/products"));
const Product = lazy(() => import("./pages/product"));
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
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Suspense>

      <Footer />
    </PageTransitionProvider>
  );
}

export default App;
