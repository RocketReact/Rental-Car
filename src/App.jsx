import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import Catalog from "./components/Catalog/Catalog.jsx";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cars/:id" element={<ProductCard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
