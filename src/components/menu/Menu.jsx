import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const PATHS = {
  home: "/home",
  explore: "/explore",
  bookmarks: "/bookmarks",
  profile: "/profile",
};

export const Menu = () => {
  const route = useLocation();
  const path = `/${route.pathname.split("/")[1]}`;

  return (
    <div className="menu_nav">
      <nav className="nav__list">
        <ul className="nav__list__ul">
          <li className="item__li">
            <NavLink
              to="/home"
              className="nav_item"
              activeClassName="selected"
            >
              <span className={`material-icons ${
                path === PATHS.home ? "selected" : ""
              }`}>home</span>
            </NavLink>

            <div
              className={`underline__nav ${
                path === PATHS.home || path === PATHS.profile ? "active" : ""
              }`}
            ></div>
          </li>

          <li className="item__li">
            <NavLink
              to="/explore"
              className="nav_item"
              activeClassName="selected"
            >
              <span className={`material-icons ${
                path === PATHS.explore ? "selected" : ""
              }`}>explore</span>
            </NavLink>
            <div
              className={`underline__nav ${
                path === PATHS.explore ? "active" : ""
              }`}
            ></div>
          </li>

          <li className="item__li">
            <NavLink
              to="/bookmarks"
              className="nav_item"
              activeClassName="selected"
            >
              <span className={`material-icons ${
                path === PATHS.bookmarks ? "selected" : ""
              }`}>bookmarks</span>
            </NavLink>
            <div
              className={`underline__nav ${
                path === PATHS.bookmarks ? "active" : ""
              }`}
            ></div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
