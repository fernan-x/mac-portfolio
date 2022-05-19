import React, { useState } from "react";
import Skeleton from "./Skeleton/Skeleton";

const Image = (props) => {
  const { src, ref, alt, style = {} } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? <Skeleton /> : null}
      <img
        src={src}
        ref={ref}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        style={isLoading ? { display: "none" } : style}
      />
    </>
  );
};

export default Image;
