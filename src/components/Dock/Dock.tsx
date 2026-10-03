import React from "react";
import "./Dock.scss";
import constants from "../../constants/constants";

// TODO : how to handle remove active
interface DockEntryProps {
  id: string;
  index: number;
  name: string;
  img: string;
  last?: boolean;
  active: boolean;
  openApplication: (id: string) => void;
}

const DockEntry = ({
  id,
  index,
  name,
  img,
  last,
  active,
  openApplication,
}: DockEntryProps) => {
  const resize = (e: React.MouseEvent<HTMLImageElement>, idx: number) => {
    const icons = document.querySelectorAll<HTMLElement>(".ico");
    const elem = e.currentTarget;
    const previous = idx - 1;
    const previous1 = idx - 2;
    const next = idx + 1;
    const next2 = idx + 2;

    if (previous === -1) {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
    } else if (next === icons.length) {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
    } else {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
      if (icons[previous]) {
        icons[previous].style.transform = "scale(1.2) translateY(-6px)";
      }
      if (icons[previous1]) {
        icons[previous1].style.transform = "scale(1.1)";
      }
      if (icons[next]) {
        icons[next].style.transform = "scale(1.2) translateY(-6px)";
      }
      if (icons[next2]) {
        icons[next2].style.transform = "scale(1.1)";
      }
    }
  };

  const reset = () => {
    const icons = document.querySelectorAll<HTMLElement>(".ico");
    icons.forEach((item) => {
      item.style.transform = "scale(1) translateY(0px)";
    });
  };

  const setActive = () => {
    // Launch app
    if (id) {
      openApplication(id);
    }
  };

  return (
    <li
      id={`li-${id}`}
      className={`li-${index} ${last ? "li-bin" : ""} ${
        active ? "active" : ""
      }`}
      onClick={setActive}
    >
      <div className="name">{name}</div>
      <img
        src={img}
        alt={name}
        onMouseOver={(e) => resize(e, index - 1)}
        onMouseLeave={reset}
        className="ico"
      />
    </li>
  );
};

const Dock = ({
  openApplication,
}: {
  openApplication: (id: string) => void;
}) => {
  return (
    <div className="dock">
      <div className="dock-container">
        {constants.applications.map(
          (entry, idx) =>
            entry.docked && (
              <DockEntry
                id={entry.id}
                name={entry.name}
                img={entry.img}
                key={idx + 1}
                index={idx + 1}
                last={entry.last}
                active={entry.active}
                openApplication={openApplication}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Dock;
