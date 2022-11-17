import React from "react";
import { useTranslation } from "react-i18next";
import animatedBackground from "../../assets/videos/animated-background.mp4";

import "./OnBoarding.scss";
// import OnBoardingBackground from "./OnBoardingBackground";

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
      <div style={{ zIndex: 2 }}>
        <h4>{t("app:onboarding-welcome")}</h4>
        <h3>{t("app:onboarding-discover")}</h3>
      </div>
    </div>
  );
};

export default OnBoarding;
