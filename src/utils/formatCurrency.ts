export function formatCurrencyAuto(amount: number) {
  const locale = navigator.language || "en-US"; // e.g. "en-FI", "fi-FI", "en-US"

  const currencyMap: Record<string, string> = {
    "en-FI": "EUR",
    "fi-FI": "EUR",
    fi: "EUR",
    "en-GB": "GBP",
    "en-US": "USD",
    ja: "JPY",
    fr: "EUR",
    de: "EUR",
    zh: "CNY",
  };

  const currency =
    currencyMap[locale] ||
    currencyMap[locale.slice(0, 2)] || // fallback to "en" or "fi"
    "EUR"; // default fallback

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
