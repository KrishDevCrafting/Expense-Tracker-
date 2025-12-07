//  src/Layout/DashboardLayout.jsx

import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import { Navbar } from "./Navbar";
import { SideMenu } from "./SideMenu";

export const DashboardLayout = ({ children, activeMenu }) => {
  // We get the user from context HERE
  const { user } = useContext(UserContext);

  // So we need to log it immediately after, right HERE
  console.log("Current user from Layout:", user);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};
