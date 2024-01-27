import React from "react";
import Navbar from "./navbar";

function Home() {

  const backgroundImageUrl = "https://wallpapercave.com/dwp1x/wp3537541.jpg";

  return (
    <div
      style={{
        backgroundImage: "url(" + backgroundImageUrl + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Navbar />

      

     
    </div>
  );
}

export default Home;
