import { Outlet, redirect } from "react-router-dom";
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
export async function action({ request, params }) {
  const data = await request.formData();
  const id = data.get("code");

  return redirect(`imagelink/${id}`);
}
