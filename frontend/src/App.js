import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./scenes/homePage";
import ImageLinkPage from "./scenes/imageLinkPage";
import LoginPage from "./scenes/loginPage";
import Navbar from "./scenes/navbar";
import Error from "./scenes/errorPage";

const router = createBrowserRouter([
  {
    name: "Home",
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
