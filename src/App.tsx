import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";

const Home = lazy(() => import("./pages/home"));
const Categories = lazy(() => import("./pages/categories"));
const Products = lazy(() => import("./pages/products"));
const Profile = lazy(() => import("./pages/profile"));

const Basket = lazy(() => import("./pages/basket"));
const Checkout = lazy(() => import("./pages/checkout"));

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
