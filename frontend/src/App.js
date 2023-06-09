import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./scenes/homePage";
import ImageLinkPage from "./scenes/imageLinkPage";
import LoginPage from "./scenes/loginPage";
import Navbar, { action as FormHandler } from "./scenes/navbar";
import Error from "./scenes/errorPage";

const router = createBrowserRouter([
  {
    name: "Home",
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
    action: FormHandler,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <LoginPage /> },
      { path: "imagelink/:id", element: <ImageLinkPage /> },
      { path: "imagelink/new", element: <ImageLinkPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
