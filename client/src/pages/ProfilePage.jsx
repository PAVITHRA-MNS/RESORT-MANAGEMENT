import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

export default function ProfilePage() {
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkStyleToClasses(type = null) {
    let classes = "px-4 py-2 flex gap-1 rounded-full";
    if (type === subpage) {
      classes += " bg-blue-700 text-white ";
    }else{
        classes+=" bg-gray-200"
    }
    return classes;
  }

  const [redirect, setRedirect] = useState(null);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const { user, setUser, ready } = useContext(UserContext);
  if (!ready) return "...Loading";
  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center mx-auto mt-5 max-w-lg">
          <h4>
            <b>
              Logged in as {user.name} and {user.mail}
            </b>
          </h4>
          <button
            className="bg-blue-700 text-white max-w-sm px-20 rounded-full py-1 mt-3"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
