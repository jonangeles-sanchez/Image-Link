import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";

function Navbar() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
