import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <section className="biography">
        <div className="biography-container">
          <div className="banner">
            <img src={imageUrl} alt="whoweare" />
          </div>
          <div className="banner">
            <p>Biography</p>
            <h3>Who We Are</h3>
            <p>
              ZeeCare Medical Institute is a state-of-the-art facility dedicated
              to providing comprehensive healthcare services with compassion and
              expertise. Our team of skilled professionals is committed to
              delivering personalized care tailored to each patient's needs. At
              ZeeCare, we prioritize your well-being, ensuring a harmonious
              journey towards optimal health and wellness.
            </p>
            <p>We are all in 2024!</p>
            <p>We are working on a MERN STACK PROJECT.</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              assumenda exercitationem accusamus sit repellendus quo optio dolorum
              corporis corrupti. Quas similique vel minima veniam tenetur
              obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil
              cupiditate natus provident. Ex illum quasi pariatur odit nisi
              voluptas illo qui ipsum mollitia. Libero, assumenda?
            </p>
            <p>Lorem ipsum dolor sit amet!</p>
            <p>Coding is fun!</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Biography;
