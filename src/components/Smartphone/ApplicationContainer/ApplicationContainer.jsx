import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

import "./ApplicationContainer.scss";

const ApplicationContainer = (props) => {
  const [display, setDisplay] = useState(true);
  const [animateUp, setAnimateUp] = useState(false);

  const handleSwipe = (e) => {
    switch (e.dir) {
      case "Up":
        setAnimateUp(true);
        setTimeout(() => {
          setAnimateUp(false);
          setDisplay(false);
        }, 500);
        break;
      default:
        console.log(e.dir);
        break;
    }
  };
  const handlers = useSwipeable({
    onSwipeStart: handleSwipe,
  });

  return (
    display && (
      <div
        className={`appContainer${animateUp ? " animate-slide" : ""}`}
        {...handlers}
      >
        {props.children}
      </div>
    )
  );
};

export default ApplicationContainer;
