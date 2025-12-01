import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import DoctorRole from "../components/DoctorRole";


const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <DoctorRole />
    </>
  );
};

export default Home;
