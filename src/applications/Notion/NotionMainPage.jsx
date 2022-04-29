import React from "react";

import { emojis } from "../../constants/images";
import { useTranslation } from "react-i18next";

const NotionMainPage = ({ changePage }) => {
  const { t } = useTranslation(["app"]);

  return (
    <>
      <h1>Fabien Fernandes Alves</h1>
      <p className="notion-quote">{t("app:notion-description")}</p>
      <br />
      <h2>☎️ {t("app:notion-personal-info")}</h2>
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
      <h2>🚀 {t("app:notion-journey")}</h2>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">👩🏻‍💻</span>
          <span
            className="notion-link"
            onClick={() => changePage("experience")}
          >
            {t("app:notion-experience-title")}
          </span>
        </div>
        <div>
          <span className="notion-emoji">📜</span>
          <span className="notion-link" onClick={() => changePage("project")}>
            {t("app:notion-project-title")}
          </span>
        </div>
      </div>

      <div className="notion-divider"></div>
      <h2>🗣 {t("app:notion-languages")}</h2>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">🇫🇷</span> {t("app:notion-french")}
        </div>
        <div>
          <span className="notion-emoji">🇬🇧</span> {t("app:notion-english")}
        </div>
      </div>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">🇦🇪</span> {t("app:notion-arabic")}
        </div>
        <div>
          <span className="notion-emoji">👌</span> {t("app:notion-lsf")}
        </div>
      </div>
    </>
  );
};

export default NotionMainPage;
