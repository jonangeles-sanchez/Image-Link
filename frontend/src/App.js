import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/imagelink" element={<ImageLink />} />
            <Route path="/imagelink/:id" element={<ImageLink />} />
            <Route path="/auth" element={<Auth />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
