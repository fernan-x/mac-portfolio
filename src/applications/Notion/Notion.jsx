import React from "react";

import "./Notion.scss";
import { emojis } from "../../constants/images";
import fabien from "../../assets/images/fabien.png";

const Notion = () => {
  return (
    <div className="notion">
      <div className="notion__header">
        {/* <div className="notion__header-navigation"></div> */}
        <div className="notion__header-banner"></div>
        <div className="notion__header-picture">
          <img src={fabien} alt="fabien" />
        </div>
      </div>
      <div className="notion__content">
        <h1>Fabien Fernandes Alves</h1>
        <p className="notion-quote">
          I'm a french fullstack developer 🇫🇷. Tech lover & passionnate, I spend
          lot of time developping all kind of applications. Gratuated at Epitech
          Nantes, I've spend 1 year studying in Bahrein 🎓.
        </p>
        <br />
        <h2>☎️ Personal informations</h2>
        <div className="notion-bloc">
          <div>📧 fernandesalvesfabien@gmail.com</div>
          <div>
            <img
              className="notion-emoji"
              src={emojis.linkedinEmoji}
              alt="linkedin"
            />{" "}
            <a
              href="https://www.linkedin.com/in/fabien-fernandes-alves/"
              target="_blank"
              rel="noreferrer"
              className="notion-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="notion-bloc">
          <div>📍Nantes, France</div>
          <div>
            <img
              className="notion-emoji"
              src={emojis.githubEmoji}
              alt="github"
            />
            <a
              href="https://github.com/fernan-x"
              target="_blank"
              rel="noreferrer"
              className="notion-link"
            >
              Github
            </a>
          </div>
        </div>
        <div className="notion-divider"></div>
        <h2>🗒️ In details</h2>
      </div>
    </div>
  );
};

export default Notion;
