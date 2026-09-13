import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./Tabs";
import type { SortItem } from "../../types";

const ACTIVE_CLASS = "tabs__item--active";

const CONFIG = [
  { label: "Tab A", value: "tab-a" },
  { label: "Tab B", value: "tab-b" },
] as unknown as SortItem[];

const [FIRST, SECOND] = CONFIG;

describe("Tabs", () => {
  it("renders a button for every config item", () => {
    render(<Tabs config={CONFIG} />);

    expect(screen.getAllByRole("button")).toHaveLength(CONFIG.length);
    CONFIG.forEach((item) => {
      expect(screen.getByRole("button", { name: item.label })).toBeInTheDocument();
    });
  });

  it("marks only the item matching `value` as active", () => {
    render(<Tabs config={CONFIG} value={FIRST.value} />);

    expect(screen.getByRole("button", { name: FIRST.label })).toHaveClass(ACTIVE_CLASS);
    expect(screen.getByRole("button", { name: SECOND.label })).not.toHaveClass(ACTIVE_CLASS);
  });

  it("marks nothing as active when `value` is omitted", () => {
    render(<Tabs config={CONFIG} />);

    screen.getAllByRole("button").forEach((button) => {
      expect(button).not.toHaveClass(ACTIVE_CLASS);
    });
  });

  it("calls onChange with the clicked item's value", () => {
    const onChange = jest.fn();
    render(<Tabs config={CONFIG} value={FIRST.value} onChange={onChange} />);

    userEvent.click(screen.getByRole("button", { name: SECOND.label }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(SECOND.value);
  });

  it("does not throw when clicked without an onChange handler", () => {
    render(<Tabs config={CONFIG} value={FIRST.value} />);

    expect(() => userEvent.click(screen.getByRole("button", { name: FIRST.label }))).not.toThrow();
  });

  it("renders nothing but the wrapper for an empty config", () => {
    render(<Tabs config={[]} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
