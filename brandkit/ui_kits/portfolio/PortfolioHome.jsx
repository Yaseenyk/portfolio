import React from "react";
import { HomeNavbar } from "./HomeNavbar.jsx";
import { HomeHero } from "./HomeHero.jsx";
import { HomeProjects } from "./HomeProjects.jsx";
import { HomePosts } from "./HomePosts.jsx";
import { HomeFooter } from "./HomeFooter.jsx";

/** Full homepage recreation: grid bg, pill nav, hero, mission-control projects, field notes, footer. */
export function PortfolioHome() {
  return (
    <>
      <div className="sk-grid-bg"></div>
      <HomeNavbar></HomeNavbar>
      <div style={{ margin: "0 auto", width: "100%", maxWidth: 1400, padding: "0 6rem", boxSizing: "border-box" }}>
        <main style={{ paddingTop: "5rem" }}>
          <HomeHero></HomeHero>
          <HomeProjects></HomeProjects>
          <HomePosts></HomePosts>
        </main>
        <HomeFooter></HomeFooter>
      </div>
    </>
  );
}
