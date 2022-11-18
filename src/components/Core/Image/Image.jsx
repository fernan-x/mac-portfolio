import React, { useState } from "react";
import { useEffect } from "react";
import Skeleton from "../Skeleton/Skeleton";
import "./Image.scss";

const Image = (props) => {
  const { src, ref, alt, className, style = {}, variant } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [imageVariant, setImageVariant] = useState("");

  useEffect(() => {
    switch (variant) {
      case "rounded":
        setImageVariant("rounded");
        break;
      default:
        break;
    }
  }, [variant]);

  return (
    <>
      {isLoading ? (
        <Skeleton className={`${variant ? "variant-" + imageVariant : ""}`} />
      ) : null}
      <img
        src={src}
        ref={ref}
        alt={alt}
        className={`image-component ${className}${
          variant ? " variant-" + imageVariant : ""
        }`}
        onLoad={() => setIsLoading(false)}
        style={isLoading ? { display: "none" } : style}
      />
    </>
  );
};

export default Image;
