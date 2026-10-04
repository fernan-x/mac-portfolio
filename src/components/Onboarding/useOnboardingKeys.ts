import { useEffect } from "react";

interface Handlers {
  onNext: () => void;
  onPrev: () => void;
  onEscape?: () => void;
}

/** Arrow keys move between steps, Escape dismisses (when a handler is given). */
export const useOnboardingKeys = ({ onNext, onPrev, onEscape }: Handlers) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onNext();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "Escape" && onEscape) onEscape();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onNext, onPrev, onEscape]);
};
