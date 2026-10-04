import { useTranslation } from "react-i18next";
import type { OnboardingFeature, OnboardingStep } from "../../onboarding/steps";

export type OnboardingVariant = "desktop" | "smartphone";

const FeatureIconView = ({ icon }: { icon: OnboardingFeature["icon"] }) => {
  if (icon.kind === "image") {
    return <img className="onboarding-feature__img" src={icon.src} alt="" />;
  }
  const { Icon, color } = icon;
  return (
    <span
      className="onboarding-feature__glyph"
      style={{ color, backgroundColor: `${color}26` }}
      aria-hidden="true"
    >
      <Icon />
    </span>
  );
};

interface StepContentProps {
  step: OnboardingStep;
  variant: OnboardingVariant;
  titleId: string;
}

/** Title + feature rows of one step, shared by the desktop and phone layouts. */
const StepContent = ({ step, variant, titleId }: StepContentProps) => {
  const { t } = useTranslation("onboarding");
  // `context` makes i18next prefer `<key>_mobile` and fall back to `<key>`
  const context = variant === "smartphone" ? "mobile" : undefined;
  const base = `steps.${step.id}`;

  return (
    <>
      <h2 id={titleId} className="onboarding-title">
        {t(`${base}.title`)}
      </h2>
      <ul className="onboarding-features">
        {step.features.map((feature) => (
          <li className="onboarding-feature" key={feature.id}>
            <FeatureIconView icon={feature.icon} />
            <div className="onboarding-feature__text">
              <strong>
                {t(`${base}.features.${feature.id}.title`, { context })}
              </strong>
              <span>
                {t(`${base}.features.${feature.id}.description`, { context })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StepContent;
