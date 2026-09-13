import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkboxes from "./Checkboxes";
import type { FilterItem } from "../../types";

const TITLE = "Test title";

const CONFIG = [
  { label: "Option A", value: "option-a" },
  { label: "Option B", value: "option-b" },
] as unknown as FilterItem[];

const [FIRST, SECOND] = CONFIG;

describe("Checkboxes", () => {
  it("renders the title", () => {
    render(<Checkboxes title={TITLE} config={CONFIG} value={[]} />);

    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it("renders a checkbox for every config item", () => {
    render(<Checkboxes title={TITLE} config={CONFIG} value={[]} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(CONFIG.length);
    CONFIG.forEach((item) => {
      expect(screen.getByRole("checkbox", { name: item.label })).toBeInTheDocument();
    });
  });

  it("checks exactly the items present in `value`", () => {
    render(<Checkboxes title={TITLE} config={CONFIG} value={[FIRST.value]} />);

    expect(screen.getByRole("checkbox", { name: FIRST.label })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: SECOND.label })).not.toBeChecked();
  });

  it("leaves every checkbox unchecked for an empty `value`", () => {
    render(<Checkboxes title={TITLE} config={CONFIG} value={[]} />);

    screen.getAllByRole("checkbox").forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("calls onChange with the toggled item's value", () => {
    const onChange = jest.fn();
    render(<Checkboxes title={TITLE} config={CONFIG} value={[]} onChange={onChange} />);

    userEvent.click(screen.getByRole("checkbox", { name: SECOND.label }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(SECOND.value);
  });

  it("calls onChange when an already checked item is toggled off", () => {
    const onChange = jest.fn();
    render(<Checkboxes title={TITLE} config={CONFIG} value={[FIRST.value]} onChange={onChange} />);

    userEvent.click(screen.getByRole("checkbox", { name: FIRST.label }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(FIRST.value);
  });

  it("does not throw when toggled without an onChange handler", () => {
    render(<Checkboxes title={TITLE} config={CONFIG} value={[]} />);

    expect(() =>
      userEvent.click(screen.getByRole("checkbox", { name: FIRST.label })),
    ).not.toThrow();
  });

  it("renders no checkboxes for an empty config", () => {
    render(<Checkboxes title={TITLE} config={[]} value={[]} />);

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
