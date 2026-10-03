import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Divider from "./Divider";

describe("Divider", () => {
  it("defaults to 90% width", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector(".divider__line").style.width).toBe("90%");
  });

  it("uses the variant as width", () => {
    const { container } = render(<Divider variant={50} />);
    expect(container.querySelector(".divider__line").style.width).toBe("50%");
  });
});
