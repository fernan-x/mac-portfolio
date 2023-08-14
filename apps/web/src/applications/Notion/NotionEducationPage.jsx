import React from "react";
import { useTranslation } from "react-i18next";

const NotionEducationPage = () => {
  const { t } = useTranslation(["app"]);
  return (
    <>
      <h1>{t("app:notion-education-title")}</h1>
      <h2>
        <span className="notion-emoji">🎓</span>
        {t("app:notion-education1-title")}
      </h2>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">⛪️</span>
          {t("app:notion-education1-school")}
        </div>
        <div>
          <span className="notion-emoji">📍</span>
          {t("app:notion-education1-location")}
        </div>
      </div>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">📆</span>2015 - 2020
        </div>
      </div>

      <div className="notion-divider"></div>

      <h2>
        <span className="notion-emoji">🎓</span>
        {t("app:notion-education2-title")}
      </h2>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">⛪️</span>
          {t("app:notion-education2-school")}
        </div>
        <div>
          <span className="notion-emoji">📍</span>
          {t("app:notion-education2-location")}
        </div>
      </div>
      <div className="notion-bloc">
        <div>
          <span className="notion-emoji">📆</span>2018 - 2019
        </div>
      </div>
    </>
  );
};

export default NotionEducationPage;
