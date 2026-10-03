import React from "react";
import { useTranslation } from "react-i18next";
import type { NotionPageProps } from "./types";

const NotionProjectPage: React.FC<NotionPageProps> = () => {
  const { t } = useTranslation(["app"]);
  return (
    <>
      <h1>{t("app:notion-project-title")}</h1>
    </>
  );
};

export default NotionProjectPage;
