import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";

const Home = lazy(() => import("./pages/home"));
const Basket = lazy(() => import("./pages/basket"));
const Categories = lazy(() => import("./pages/categories"));
const Products = lazy(() => import("./pages/products"));
const Profile = lazy(() => import("./pages/profile"));

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
