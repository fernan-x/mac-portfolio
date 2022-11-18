import React from "react";
import { useTranslation } from "react-i18next";

import fabien from "../../assets/images/fabien.png";
import Image from "../../components/Core/Image/Image";
import "./About.scss";

const About = () => {
  const { t } = useTranslation(["app"]);
  const age = new Date().getFullYear() - 1997;

  return (
    <div className="about">
      <div className="about__picture">
        <Image src={fabien} alt="fabien" variant="rounded" />
      </div>
      <div className="about__description">
        <div className="about__description-header">
          <p className="about__description-header_name">
            <span className="bold">Fabien</span> Fernandes Alves
          </p>
          <p className="about__description-header_version">
            <span>{t("app:about-job")}</span>
          </p>
        </div>
        <div className="about__description-content">
          <p>
            <span>{t("app:about-age")}</span> {age}
          </p>
          <p>
            <span>{t("app:about-mail")}</span> fernandesalvesfabien@gmail.com
          </p>
          <p>
            <span>{t("app:about-location")}</span> 2 impasse des biches, 44470
            Carquefou
          </p>
          <p>
            <span>{t("app:about-country")}</span> {t("app:about-france")}
          </p>
          <p>
            <span>{t("app:about-speaking")}</span> {t("app:about-french")},{" "}
            {t("app:about-english")}
          </p>
          <p>
            <span>{t("app:about-creed")}</span> {t("app:about-everyperson")}
          </p>
        </div>
        <div className="about__description-footer"></div>
      </div>
    </div>
  );
};

export default About;
