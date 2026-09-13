const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  UAH: "₴",
};

export function formatPrice(amount: number, currency: string = "USD"): string {
  const formattedNumber = new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 0,
  }).format(amount);

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${formattedNumber} ${symbol}`;
}

export function formatTime(isoTimestamp: string): string {
  return new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(isoTimestamp));
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}г ${mins.toString().padStart(2, "0")}хв`;
}

const pluralRules = new Intl.PluralRules("uk-UA");

const STOPS_FORMS: Record<Intl.LDMLPluralRule, string> = {
  zero: "пересадок",
  one: "пересадка",
  two: "пересадки",
  few: "пересадки",
  many: "пересадок",
  other: "пересадки",
};

const TICKETS_FORMS: Record<Intl.LDMLPluralRule, string> = {
  zero: "квитків",
  one: "квиток",
  two: "квитки",
  few: "квитки",
  many: "квитків",
  other: "квитка",
};

export function formatStops(stops: number): string {
  if (stops === 0) return "Без пересадок";

  const form = pluralRules.select(stops);
  return `${stops} ${STOPS_FORMS[form]}`;
}

export function formatTickets(count: number): string {
  const form = pluralRules.select(count);
  return `${count} ${TICKETS_FORMS[form]}`;
}
