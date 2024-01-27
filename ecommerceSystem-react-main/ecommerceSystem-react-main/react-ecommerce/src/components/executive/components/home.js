import React from "react";
import ENavbar from "./navbar";

function ExecutiveHome() {
  const backgroundImageUrl =
    "https://themefisher.com/_next/image?url=%2Fblog%2Fe-commerce-website-admin-panel-templates.png&w=1200&q=75";

  return (
    <div
      style={{
        backgroundImage: "url(" + backgroundImageUrl + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div>
        <ENavbar />
      </div>
    </div>
  );
}

export default ExecutiveHome;
