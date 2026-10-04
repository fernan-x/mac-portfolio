import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import constants from "../../constants/constants";
import { useLaunchpadStore } from "../../store/launchpadStore";
import "./Launchpad.scss";

interface LaunchpadProps {
  openApplication: (id: string) => void;
}

const Launchpad = ({ openApplication }: LaunchpadProps) => {
  const { t } = useTranslation(["desktop"]);
  const isOpen = useLaunchpadStore((state) => state.isOpen);
  const close = useLaunchpadStore((state) => state.close);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    searchRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const needle = query.trim().toLowerCase();
  const apps = constants.applications.filter(
    (app) =>
      app.id !== "launchpad" &&
      app.img &&
      app.name.toLowerCase().includes(needle)
  );

  const launch = (id: string) => {
    close();
    openApplication(id);
  };

  return (
    <div
      className="launchpad"
      role="dialog"
      aria-label={t("desktop:launchpad-title")}
      onClick={close}
    >
      <input
        ref={searchRef}
        className="launchpad__search"
        type="search"
        placeholder={t("desktop:launchpad-search")}
        aria-label={t("desktop:launchpad-search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />
      <ul className="launchpad__grid">
        {apps.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              className="launchpad__app"
              onClick={(e) => {
                e.stopPropagation();
                launch(app.id);
              }}
            >
              <img src={app.img} alt="" draggable={false} />
              <span>{app.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Launchpad;
