import React from "react";
import { useTranslation } from "react-i18next";

import './OnBoarding.scss';
// import OnBoardingBackground from "./OnBoardingBackground";

const OnBoarding = () => {
    const { t } = useTranslation(['app'])
    
    return <div className="onboarding">
        {/* <OnBoardingBackground /> */}
        {/* <h4>{t('app:onboarding-welcome')}</h4>
        <h3>{t('app:onboarding-discover')}</h3> */}
    </div>
}

export default OnBoarding;