import React, { useState } from "react";

import "./Notion.scss";
import fabien from "../../assets/images/fabien.png";
import { useTranslation } from "react-i18next";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import NotionMainPage from "./NotionMainPage";
import NotionProjectPage from "./NotionProjectPage";
import NotionExperiencePage from "./NotionExperiencePage";
import NotionEducationPage from "./NotionEducationPage";
import type { NotionPage } from "./types";

const Notion = () => {
  const { t } = useTranslation(["app"]);

  const [currentPage, setCurrentPage] = useState<NotionPage>("main");
  const [backHistory, setBackHistory] = useState<NotionPage[]>([]);
  const [nextHistory, setNextHistory] = useState<NotionPage[]>([]);

  const pages: Record<
    NotionPage,
    {
      title: string;
      icon: React.ReactElement;
      breadcrumb: NotionPage[];
      headerPicture: React.ReactElement;
    }
  > = {
    main: {
      title: t("app:notion-main-title"),
      icon: <img src={fabien} alt="fabien" className="notion-emoji" />,
      breadcrumb: ["main"],
      headerPicture: <img src={fabien} alt="fabien" />,
    },
    project: {
      title: t("app:notion-project-title"),
      icon: <span className="notion-emoji">📜</span>,
      breadcrumb: ["main", "project"],
      headerPicture: <span>📜</span>,
    },
    experience: {
      title: t("app:notion-experience-title"),
      icon: <span className="notion-emoji">👩🏻‍💻</span>,
      breadcrumb: ["main", "experience"],
      headerPicture: <span>👩🏻‍💻</span>,
    },
    education: {
      title: t("app:notion-education-title"),
      icon: <span className="notion-emoji">📚</span>,
      breadcrumb: ["main", "education"],
      headerPicture: <span>📚</span>,
    },
  };

  const changePage = (page: NotionPage) => {
    if (page !== currentPage) {
      addHistory(currentPage);
      setCurrentPage(page);
    }
  };

  const displayContent = () => {
    switch (currentPage) {
      case "experience":
        return <NotionExperiencePage changePage={changePage} />;
      case "project":
        return <NotionProjectPage changePage={changePage} />;
      case "education":
        return <NotionEducationPage changePage={changePage} />;
      case "main":
      default:
        return <NotionMainPage changePage={changePage} />;
    }
  };

  const displayHeaderPicture = () => {
    return pages[currentPage].headerPicture;
  };

  const addHistory = (page: NotionPage) => {
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
          <span
            className={`arrow__back${
              backHistory.length === 0 ? " disabled" : ""
            }`}
            onClick={goBack}
          >
            <VscArrowLeft />
          </span>
          <span
            className={`arrow__next ${
              nextHistory.length === 0 ? " disabled" : ""
            }`}
            onClick={goNext}
          >
            <VscArrowRight />
          </span>
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
        <div className="notion__header-picture">{displayHeaderPicture()}</div>
      </div>
      <div className="notion__content">{displayContent()}</div>
    </div>
  );
};

export default Notion;
