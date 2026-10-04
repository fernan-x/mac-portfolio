import type { IconType } from "react-icons";
import {
  FiMonitor,
  FiGrid,
  FiMove,
  FiSliders,
  FiUser,
  FiMousePointer,
} from "react-icons/fi";
import { appImages } from "../constants/images";

/**
 * Onboarding content, as data. Copy lives in src/locales/<lng>/onboarding.json:
 *   steps.<stepId>.title
 *   steps.<stepId>.features.<featureId>.title / .description
 * Phones can override any of these with a `_mobile` suffix (e.g. `title_mobile`).
 * To add, remove or reorder a feature, edit this file and both locale files.
 */
export type FeatureIcon =
  | { kind: "image"; src: string }
  | { kind: "glyph"; Icon: IconType; color: string };

export interface OnboardingFeature {
  id: string;
  icon: FeatureIcon;
}

export interface OnboardingStep {
  id: string;
  features: OnboardingFeature[];
  /** Show the looping mini animation (desktop only) */
  demo?: boolean;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "concept",
    features: [
      { id: "mac", icon: { kind: "glyph", Icon: FiMonitor, color: "#007aff" } },
      { id: "apps", icon: { kind: "glyph", Icon: FiGrid, color: "#ff9500" } },
      {
        id: "explore",
        icon: { kind: "glyph", Icon: FiMousePointer, color: "#34c759" },
      },
    ],
  },
  {
    id: "portfolio",
    features: [
      { id: "about", icon: { kind: "glyph", Icon: FiUser, color: "#af52de" } },
      { id: "pokedex", icon: { kind: "image", src: appImages.pokedex } },
      { id: "notion", icon: { kind: "image", src: appImages.notion } },
    ],
  },
  {
    id: "usage",
    demo: true,
    features: [
      { id: "dock", icon: { kind: "glyph", Icon: FiGrid, color: "#007aff" } },
      { id: "windows", icon: { kind: "glyph", Icon: FiMove, color: "#ff9500" } },
      {
        id: "settings",
        icon: { kind: "glyph", Icon: FiSliders, color: "#8e8e93" },
      },
    ],
  },
];

/** Languages cycled by the "Hello" intro, then it settles on a localized "Welcome" */
export const greetings: { text: string; lang: string }[] = [
  { text: "Hello", lang: "en" },
  { text: "Bonjour", lang: "fr" },
  { text: "Hola", lang: "es" },
  { text: "Ciao", lang: "it" },
  { text: "Hallo", lang: "de" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕하세요", lang: "ko" },
  { text: "Olá", lang: "pt" },
];

/** Time each greeting stays on screen, in ms */
export const GREETING_DURATION = 700;
/** Time "Welcome" stays before auto-advancing, in ms */
export const WELCOME_DURATION = 1800;

/** Intro + content pages */
export const TOTAL_STEPS = 1 + onboardingSteps.length;
