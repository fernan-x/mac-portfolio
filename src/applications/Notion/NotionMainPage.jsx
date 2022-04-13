import React from "react";

import { emojis } from "../../constants/images";

const NotionMainPage = () => {
  return (
    <>
      <h1>Fabien Fernandes Alves</h1>
      <p className="notion-quote">
        I'm a french fullstack developer 🇫🇷. Tech lover & passionnate, I spend
        lot of time developping all kind of applications. Gratuated at Epitech
        Nantes, I've spend 1 year studying in Bahrein 🎓.
      </p>
      <br />
      <h2>☎️ Personal informations</h2>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">📧</span>
          fernandesalvesfabien@gmail.com
        </div>
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
        <div>
          <span className="notion-emoji">📍</span>Nantes, France
        </div>
        <div>
          <img className="notion-emoji" src={emojis.githubEmoji} alt="github" />
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
      <h2>🛠 Skills</h2>
      <div className="notion-divider"></div>
      <h2>👩🏻‍💻 Work Experience</h2>
      <div className="notion-divider"></div>
      <h2>🗣 Languages</h2>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">🇫🇷</span> French (native)
        </div>
        <div>
          <span className="notion-emoji">🇬🇧</span> English (profesional)
        </div>
      </div>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">🇦🇪</span> Arabic (Beginer)
        </div>
        <div>
          <span className="notion-emoji">👌</span> LSF (Beginer)
        </div>
      </div>
    </>
  );
};

export default NotionMainPage;
