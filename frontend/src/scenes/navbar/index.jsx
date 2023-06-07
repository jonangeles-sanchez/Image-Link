import { Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <p>Test</p>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
