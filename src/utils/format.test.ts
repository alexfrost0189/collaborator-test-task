import { formatDuration, formatPrice, formatStops, formatTickets, formatTime } from "./format";

const normalizeSpaces = (value: string) => value.replace(/\s/g, " ");

describe("formatPrice", () => {
  it("formats amount with a currency symbol", () => {
    expect(normalizeSpaces(formatPrice(13300, "USD"))).toBe("13 300 $");
  });

  it("falls back to the currency code for unknown currencies", () => {
    expect(normalizeSpaces(formatPrice(500, "GBP"))).toBe("500 GBP");
  });
});

describe("formatTime", () => {
  it("formats time in UTC", () => {
    expect(formatTime("2026-09-15T10:45:00Z")).toBe("10:45");
  });
});

describe("formatDuration", () => {
  it("formats minutes as hours and zero-padded minutes", () => {
    expect(formatDuration(320)).toBe("5г 20хв");
    expect(formatDuration(65)).toBe("1г 05хв");
  });
});

describe("formatStops", () => {
  it.each([
    [0, "Без пересадок"],
    [1, "1 пересадка"],
    [2, "2 пересадки"],
    [5, "5 пересадок"],
  ])("formats %i stops", (stops, expected) => {
    expect(formatStops(stops)).toBe(expected);
  });
});

describe("formatTickets", () => {
  it.each([
    [1, "1 квиток"],
    [3, "3 квитки"],
    [5, "5 квитків"],
  ])("formats %i tickets", (count, expected) => {
    expect(formatTickets(count)).toBe(expected);
  });
});
