import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("renders the image with an accessible name", () => {
    render(<Logo />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("links to the home page", () => {
    render(<Logo />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
