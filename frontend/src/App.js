import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imagelink" element={<ImageLink />} />
            <Route path="/imagelink/:id" element={<ImageLink />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
