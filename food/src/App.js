import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Brand from "./pages/Brand";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/"; // hide for login page

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/brand/:brandName" element={<Brand />} /> 
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
