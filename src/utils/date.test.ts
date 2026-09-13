import { getDurationMinutes } from "./date";

describe("getDurationMinutes", () => {
  it("returns the difference between timestamps in minutes", () => {
    expect(getDurationMinutes("2026-09-15T10:45:00Z", "2026-09-15T16:05:00Z")).toBe(320);
  });
});
