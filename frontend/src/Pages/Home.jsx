import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import WebsiteStats from "../components/WebsiteStats";
import DoctorRole from "../components/DoctorRole";
import AarogyaModules from "../components/AarogyaModules"; 

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <AarogyaModules />
      <WebsiteStats />
      <Biography imageUrl={"/about.png"} />
      <DoctorRole />
    </>
  );
};

export default Home;
