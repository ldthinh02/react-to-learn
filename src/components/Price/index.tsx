import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import { round } from "@/utils/index";
import { useEffect, useState } from "react";

interface Price {
  price: number;
  onChangePrice?: (value: string) => void;
}

const Price = ({ price, onChangePrice }: Price) => {
  const [priceCurrencyData, setPriceCurrencyData] = useState(`${price}`);
  const currentBrowserCurrencyState = useBrowserCurrency(
    (state) => state.browserCurrency
  );

  const concatCurrency = (symbol?: string, price?: number) => {
    return symbol === "£" ? `${symbol}${price}` : `${price} ${symbol}`;
  };

  useEffect(() => {
    let prices: number[];
    let formatPrice = "";
    if (!Array.isArray(price)) {
      if (!price) {
        formatPrice = "FREE";
      }
      prices = [price];
    } else {
      prices = price;
    }
    if (currentBrowserCurrencyState.currencies?.length === 0) {
      formatPrice = String(prices.reduce((acc, cur) => acc + cur, 0));
    }
    if (
      currentBrowserCurrencyState.currency &&
      currentBrowserCurrencyState.currencies &&
      currentBrowserCurrencyState.currencies.length > 0
    ) {
      const selectedCurrency = currentBrowserCurrencyState.currencies.find(
        (i) => i.code === currentBrowserCurrencyState.currency
      );
      if (selectedCurrency) {
        const total = prices.reduce((acc, cur) => {
          return (
            acc + round(cur * (selectedCurrency.rate || 1), selectedCurrency)
          );
        }, 0);
        formatPrice = concatCurrency(
          selectedCurrency?.symbol,
          round(total, selectedCurrency)
        );
      }
    }
    if (onChangePrice) onChangePrice(formatPrice);
    setPriceCurrencyData(formatPrice);
  }, [
    currentBrowserCurrencyState.currency,
    currentBrowserCurrencyState.currencies,
    price,
  ]);
  return (
    <span className="text-[14px] uppercase font-helveticaNeue400">
      {priceCurrencyData}
    </span>
  );
};

export default Price;
