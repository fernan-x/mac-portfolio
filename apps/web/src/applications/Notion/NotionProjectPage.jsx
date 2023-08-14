import React from "react";
import { useTranslation } from "react-i18next";

const NotionProjectPage = () => {
  const { t } = useTranslation(["app"]);
  return (
    <>
      <h1>{t("app:notion-project-title")}</h1>
    </>
  );
};

export default NotionProjectPage;
