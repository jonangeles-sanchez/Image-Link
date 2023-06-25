import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
import NewImageLink from "./pages/NewImageLink";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ImageLinkPage from "./pages/ImageLinks";
import ImageLink from "./pages/ImageLink";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newimagelink" element={<NewImageLink />} />
            <Route path="/imagelinks/" element={<ImageLinkPage />} />
            <Route path="/imagelink/:id" element={<ImageLink />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
