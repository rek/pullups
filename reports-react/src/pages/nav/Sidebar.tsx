import React from "react";

import { MenuBookIcon, PeopleIcon, GraphIcon } from "../../common";

import { NavBar } from "../../common";
import { Profile } from "./Profile";

export const Sidebar: React.FC = ({ children }) => {
  const renderTopBarRight = ({ handleClick }: { handleClick: () => void }) => {
    return <Profile handleClick={handleClick} />;
  };
  return (
    <NavBar
      title="Another Damn Awesome Measurer"
      leftPages={[
        { name: "Home", icon: GraphIcon },
        { name: "Users", icon: PeopleIcon },
        // { name: "Reports", icon: MenuBookIcon },
      ]}
      renderTopBarRight={renderTopBarRight}
    >
      {children}
    </NavBar>
  );
};
