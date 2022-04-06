import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useTranslation } from "react-i18next";

import file from "../../assets/lotties/construction.json";

import "./Construction.scss";

const Construction = () => {
  const { t } = useTranslation(["common"]);

  return (
    <div className="construction">
      <Player src={file} autoplay loop className="construction__image"></Player>
      <span className="construction__label">
        {t("common:under-construction")}
      </span>
    </div>
  );
};

export default Construction;
