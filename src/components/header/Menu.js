/************************
 * Author: [MR FERRY™]  *
 * September 2020       *
 ************************/

import React from "react";
import { Link } from "gatsby";
import { FaArchive, FaHome, FaSearchengin } from "react-icons/fa";
import { DEFAULT_ICON_SIZE } from "../../utils/GatsbyanUtils";

const Menu = () => {
  return <div className="social-links float-right mr-4">{menus}</div>;
};

export const menus = Array.of(
  {
    link: "/",
    icon: <FaHome title={"Homepage"} size={DEFAULT_ICON_SIZE} />,
    text: "Home",
  },
  {
    link: "/archive",
    icon: <FaArchive title={"Archive page"} size={DEFAULT_ICON_SIZE} />,
    text: "Archive",
  },
  {
    link: "/search",
    icon: <FaSearchengin title={"Search page"} size={DEFAULT_ICON_SIZE} />,
    text: "Search",
  }
).map(menu => {
  return (
    <Link key={menu.link} to={menu.link}>
      <span className="text-white d-block ml-2 mr-2">
        {menu.icon} {menu.text}
      </span>
    </Link>
  );
});

export default Menu;
