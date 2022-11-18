import React from "react";
import { useTranslation } from "react-i18next";
import animatedBackground from "../../assets/videos/animated-background.mp4";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import "./OnBoarding.scss";
import Image from "../../components/Core/Image/Image";
import backgroundImage from "../../assets/images/fabien.png";

const OnBoarding = () => {
  const { t } = useTranslation(["app"]);

  return (
    <div className="onboarding">
      <div className="onboarding-background">
        <video loop muted autoPlay>
          <source src={animatedBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="onboarding-content">
        <h4>{t("app:onboarding-welcome")}</h4>
        <h3>{t("app:onboarding-discover")}</h3>
        <Image
          className="onboarding-content__welcomeimg"
          src={backgroundImage}
          alt="Welcome"
          variant="rounded"
        />
        <div className="onboarding-actions">
          <span className="left-arrow">
            <BsChevronCompactLeft />
          </span>
          <span className="right-arrow">
            <BsChevronCompactRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
