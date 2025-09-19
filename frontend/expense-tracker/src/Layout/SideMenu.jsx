import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../utils/data";
import { UserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
// After (The Fix)
export function SideMenu({ activeMenu }) {
  const { user, clearUser } = useContext(UserContext);

  const naviage = useNaviage();
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigator(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    naviage("/login");
  };
  return (
    <>
      <div>SideBar!</div>
    </>
  );
}
