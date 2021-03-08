import React from "react";

import { NavBar } from "../../common";

export const Sidebar: React.FC = ({ children }) => {
  return (
    <NavBar
      title="Another Damn Awesome Measurer"
      leftPagesPrimary={["Home", "Users"]}
    >
      {children}
    </NavBar>
  );
};
