import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./features/home"));
const Basket = lazy(() => import("./features/basket"));

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </>
  );
}

export default App;
