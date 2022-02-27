import * as React from "../../../_snowpack/pkg/react.js";
import {Navbar, Img, Link} from "../../../_snowpack/pkg/rendition.js";
export const NavBar = () => {
  return /* @__PURE__ */ React.createElement(Navbar, {
    brand: /* @__PURE__ */ React.createElement(Link, {
      color: "white",
      href: "/"
    }, /* @__PURE__ */ React.createElement(Img, {
      src: "logo.png",
      style: {height: "20px"}
    })),
    color: "white"
  }, /* @__PURE__ */ React.createElement(Link, {
    color: "white",
    href: "/docs/"
  }, "Users"));
};
