import React, { useState } from "react";

const Image = (props) => {
  const { src, ref, alt, style = {} } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? <>loading</> : null}
      <img
        src={src}
        ref={ref}
        alt={alt}
        //onLoad={() => setIsLoading(false)}
        style={isLoading ? { display: "none" } : style}
      />
    </>
  );
};

export default Image;
