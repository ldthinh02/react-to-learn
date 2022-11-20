import create from "zustand";
import { persist } from "zustand/middleware";

type BrowserCurrencyState = {
  browserCurrency: BrowserCurrency;
  setBrowserCurrency: (currentForm: BrowserCurrency) => void;
};

export const useBrowserCurrency = create<BrowserCurrencyState>(
  persist(
    (set) => ({
      browserCurrency: {
        currency: "EUR",
        currencies: [],
        current_country: "",
      } as BrowserCurrency,
      setBrowserCurrency: (browserCurrency: BrowserCurrency) =>
        set((state) => ({
          browserCurrency: { ...state.browserCurrency, ...browserCurrency },
        })),
    }),
    {
      name: "browserCurrency",
    }
  )
);
