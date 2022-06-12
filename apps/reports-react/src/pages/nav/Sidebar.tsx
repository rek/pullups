import * as React from "react";

import { GraphIcon, MenuBookIcon, PeopleIcon } from "../../common";
import { NavBar } from "../../common";
import { Profile } from "./Profile";

interface Props {
  logout: () => void;
}
export const Sidebar: React.FC<React.PropsWithChildren<Props>> = ({
  logout,
  children,
}) => {
  const renderTopBarRight = ({ handleClick }: { handleClick: () => void }) => {
    return (
      <Profile
        handleClick={() => {
          logout();
          handleClick();
        }}
      />
    );
  };

  return (
    <NavBar
      title="Pullup tracking system v1"
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
