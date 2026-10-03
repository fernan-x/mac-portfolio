import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotificationCard from "./NotificationCard";

describe("NotificationCard", () => {
  it("renders its content", () => {
    render(
      <NotificationCard
        img="i.png"
        name="Mail"
        title="Hello"
        desc="World"
        date="now"
      />
    );
    expect(screen.getByText("Mail")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
    expect(screen.getByText("now")).toBeInTheDocument();
    expect(screen.getByAltText("notification")).toHaveAttribute("src", "i.png");
  });
});
