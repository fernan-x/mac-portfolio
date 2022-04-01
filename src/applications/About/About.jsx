import React from "react";

import fabien from "../../assets/images/fabien.png";
import "./About.scss";

const About = () => {
  const age = new Date().getFullYear() - 1997;

  return (
    <div className="about">
      <div className="about__picture">
        <img src={fabien} alt="fabien" />
      </div>
      <div className="about__description">
        <div className="about__description-header">
          <p className="about__description-header_name">
            <span className="bold">Fabien</span> Fernandes Alves
          </p>
          <p className="about__description-header_version">
            <span>Fullstack PHP / React developer</span>
          </p>
        </div>
        <div className="about__description-content">
          <p>
            <span>Age</span> {age}
          </p>
          <p>
            <span>Mail address</span> fernandesalvesfabien@gmail.com
          </p>
          <p>
            <span>Location</span> 2 impasse des biches, 44470 Carquefou
          </p>
          <p>
            <span>Country</span> France
          </p>
          <p>
            <span>Speaking</span> French, English
          </p>
          <p>
            <span>Creed</span> Every person you meet has a lesson to teach
          </p>
        </div>
        <div className="about__description-footer"></div>
      </div>
    </div>
  );
};

export default About;
