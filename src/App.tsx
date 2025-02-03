import AppLayout from "./components/layout/AppLayout";
import Blog from "./pages/Blogs/[slug]/Blog";
import Blogs from "./pages/Blogs/Blogs";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import ScrollTop from "./ScrollTop";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <ScrollTop />

        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;

