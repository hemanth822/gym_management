import {
  Routes,
  Route
} from "react-router-dom";

import Home from "../pages/Home";
import Members from "../pages/Members";
import MemberDetails
  from "../pages/MemberDetails";
import AddMember
  from "../pages/AddMember";
import EditMember
 from "../pages/EditMember";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/members"
        element={<Members />}
      />

      <Route
        path="/members/:id"
        element={<MemberDetails />}
      />
      <Route
        path="/add-member"
        element={
          <ProtectedRoute adminOnly>
            <AddMember />
          </ProtectedRoute>
        }
      />     
      <Route
        path="/edit-member/:id"
        element={<ProtectedRoute adminOnly>
                  <EditMember />
                  </ProtectedRoute>
                }
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<Logout />}
      />
      <Route
        path="/favorites"
        element={<Favorites />}
      />
    </Routes>

  );
}

export default AppRoutes;
