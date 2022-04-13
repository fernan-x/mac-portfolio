import React, { useState } from "react";

import "./Notion.scss";
import { emojis } from "../../constants/images";
import fabien from "../../assets/images/fabien.png";
import { useTranslation } from "react-i18next";

const Notion = () => {
  const { t } = useTranslation(["app"]);

  const pages = {
    main: {
      title: t("app:notion-main-title"),
      icon: <img src={fabien} alt="fabien" className="notion-emoji" />,
      breadcrumb: ["main"],
    },
    project: {
      title: t("app:notion-project-title"),
      icon: <span className="notion-emoji">📜</span>,
      breadcrumb: ["main", "project"],
    },
  };

  const [currentPage, setCurrentPage] = useState("project");
  const [backHistory, setBackHistory] = useState([]);
  const [nextHistory, setNextHistory] = useState([]);

  const changePage = (page) => {
    if (page !== currentPage) {
      addHistory(currentPage);
      setCurrentPage(page);
    }
  };

  const addHistory = (page) => {
    if (backHistory.length > 0) {
      // Avoid duplicate in history
      if (backHistory[backHistory.length - 1] !== page) {
        setBackHistory([...backHistory, page]);
      }
    } else {
      setBackHistory([...backHistory, page]);
    }
  };

  const goBack = () => {
    if (backHistory.length > 0) {
      setCurrentPage(backHistory[backHistory.length - 1]);
      setBackHistory(backHistory.slice(0, backHistory.length - 1));
      setNextHistory([...nextHistory, currentPage]);
    }
  };

  const goNext = () => {
    if (nextHistory.length > 0) {
      setCurrentPage(nextHistory[nextHistory.length - 1]);
      setNextHistory(nextHistory.slice(0, nextHistory.length - 1));
      setBackHistory([...backHistory, currentPage]);
    }
  };

  const displayHeader = () => {
    const page = pages[currentPage];
    const breadcrumb = page.breadcrumb;

    return (
      <div className="notion__header-navigation">
        <div className="arrow">
          <span className="arrow__back">⬅️</span>
          <span className="arrow_next">➡️</span>
        </div>
        <div className="breadcrumb">
          {breadcrumb.map((item, index) => {
            const entry = pages[item];
            const last = index + 1 === breadcrumb.length;
            return (
              <React.Fragment key={item}>
                <div
                  className="breadcrumb__item"
                  onClick={() => changePage(item)}
                >
                  {entry.icon}
                  {entry.title}
                </div>
                {!last && <span className="breadcrumb__separator">/</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="notion">
      <div className="notion__header">
        {displayHeader()}
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
      </div>
    </div>
  );
};

export default Notion;
