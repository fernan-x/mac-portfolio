import React, { useState } from "react";
import Skeleton from "./Skeleton/Skeleton";

type ImageProps = Pick<
  React.ComponentProps<"img">,
  "src" | "ref" | "alt" | "style"
>;

const Image = (props: ImageProps) => {
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
