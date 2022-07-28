import React from "react";
import { useSwipeable } from "react-swipeable";

import "./AppTest.scss";

const AppTest = () => {
  const handleSwipe = (e) => {
    switch (e.dir) {
      case "Up":
        console.log(e);
        console.log("Swiped up");
        document.querySelector("#appTest").classList.add("animate-slide");
        setTimeout(() => {
          document.querySelector("#appTest").remove();
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
    <div id="appTest" className="appTest" {...handlers}>
      <h1>AppTest</h1>
    </div>
  );
};

export default AppTest;
