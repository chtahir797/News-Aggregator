import { Routes, Route } from "react-router-dom";
import Category from "./Pages/Category";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/category" element={<Category />}></Route>
      </Routes>
    </>
  );
}

export default App;
