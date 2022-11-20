import {
  ORDER_PACKAGE_STATUS,
  ORDER_PRODUCT_PROCESS_STATUS,
  ORDER_STATUS,
} from "./constants";
import { api } from "@/utils/api";
import sumBy from "lodash/sumBy";

export const getCountryName = (
  countryCode: string,
  listCoutries: CountryApiData[]
) => {
  const find = listCoutries.find((e) => e.alpha2Code === countryCode);
  return find?.name;
};

export const round = (price: number, selectedCurrency: Currency) => {
  if (
    selectedCurrency &&
    (selectedCurrency.code === "DKK" ||
      selectedCurrency.code === "SEK" ||
      selectedCurrency.code === "NOK")
  ) {
    return Math.round(price);
  } else {
    return Math.ceil(Number(price.toFixed(1)) * 2) / 2;
  }
};

export const getStaticAllAttributes = async () => {
  const categoryData = await api<Attribute[]>("categories/all");
  const conditions = await api<Attribute[]>("conditions");
  const sizes = await api<Attribute[]>("sizes");
  const locationsData = await api<{ id: number; country_name: string }[]>(
    "provider"
  );
  const colors = await api<Attribute[]>("colors");
  const locations: Attribute[] = locationsData
    .map((location) => ({
      id: location.id,
      name: location.country_name,
    }))
    .filter((l) => l.name);
  const categories = categoryData.filter((item) => Number(item.parent_id) < 1);
  const subCategories = categoryData.filter(
    (item) => Number(item.parent_id) > 0
  );
  return {
    props: { categories, subCategories, conditions, sizes, locations, colors },
  };
};

export const getOrderProductStatus = (status: string) => {
  switch (status) {
    case ORDER_PRODUCT_PROCESS_STATUS.SOLD:
      return "sold";
    case ORDER_PRODUCT_PROCESS_STATUS.CANCELLED:
      return "cancelled";
    case ORDER_PRODUCT_PROCESS_STATUS.RETURNED:
      return "returned";
    default:
      return "sold confirmed";
  }
};

export const getOrderStatus = (orderProducts: OrderProduct[]) => {
  const allItemComplete = orderProducts.filter((orderProduct) =>
    ["SOLD_CONFIRMED", "CANCELLED", "RETURNED", "PAYMENT_SENT"].includes(
      orderProduct.status
    )
  );
  if (allItemComplete.length === orderProducts.length) {
    return ORDER_STATUS.COMPLETED;
  } else {
    return ORDER_STATUS.PROCESSING;
  }
};

export const getOrderPackageStatus = (orderPackage: OrderPackage) => {
  if (!orderPackage.tracking_number) {
    return ORDER_PACKAGE_STATUS.PENDING;
  } else {
    if (orderPackage.status === ORDER_PACKAGE_STATUS.PENDING) {
      return ORDER_PACKAGE_STATUS.TRACKED;
    } else if (orderPackage.status === ORDER_PACKAGE_STATUS.DELIVERED) {
      return ORDER_PACKAGE_STATUS.DELIVERED;
    } else if (orderPackage.status === ORDER_PACKAGE_STATUS.MANUAL_CREATED) {
      return ORDER_PACKAGE_STATUS.DELIVERED;
    } else {
      return ORDER_PACKAGE_STATUS.SHIPPED;
    }
  }
};

export const getPriceInEuro = (
  price: number,
  fromCurrency: string,
  currencyData: BrowserCurrency
) => {
  const selectedCurrency = currencyData.currencies?.find(
    (currency) =>
      currency.code === fromCurrency ||
      currency.symbol === fromCurrency ||
      currency.id === Number(fromCurrency)
  );
  const defaultCurrency = currencyData.currencies?.find(
    (currency) => currency.code === "EUR"
  );
  if (!selectedCurrency || !defaultCurrency) {
    return Number(price.toFixed(2));
  }
  if (selectedCurrency.code === defaultCurrency.code) {
    return Number(price.toFixed(2));
  }
  return Number((price / (selectedCurrency.rate || 1)).toFixed(2));
};

export const getConvertedPriceEuroToSelectedCurrency = (
  price: number,
  toCurrency: string,
  currencyData: BrowserCurrency
) => {
  const selectedCurrency = currencyData.currencies?.find(
    (currency) =>
      currency.code === toCurrency ||
      currency.symbol === toCurrency ||
      currency.id === Number(toCurrency)
  );
  const defaultCurrency = currencyData.currencies?.find(
    (currency) => currency.code === "EUR"
  );
  if (!selectedCurrency || !defaultCurrency) {
    return Number(price.toFixed(2));
  }
  if (selectedCurrency.code === defaultCurrency.code) {
    return Number(price.toFixed(2));
  }
  return Number((price * (selectedCurrency.rate || 1)).toFixed(2));
};

export const getConvertedPrice = (
  price: number,
  fromCurrency: string,
  toCurrency: string,
  currencyData: BrowserCurrency
) => {
  const from = currencyData.currencies?.find(
    (currency) =>
      currency.code === fromCurrency ||
      currency.symbol === fromCurrency ||
      currency.id === Number(fromCurrency)
  );
  const to = currencyData.currencies?.find(
    (currency) =>
      currency.code === toCurrency ||
      currency.symbol === toCurrency ||
      currency.id === Number(toCurrency)
  );
  if (!from || !to) {
    return Number(price.toFixed(2));
  }
  if (from.code === to.code) {
    return Number(price.toFixed(2));
  }

  return Number((price * ((to.rate || 1) / (from.rate || 1))).toFixed(2));
};

export const getHeader = (
  number: number,
  value: string,
  option?: string | "default"
) => {
  const items = [];
  for (let i = 0; i < number; i++) items.push(value);
  return items.join(option === "default" ? "" : option ? option : " / ");
};

export const getOrderTaxTotal = (orderProducts: OrderProduct[]) => {
  return sumBy(orderProducts, (o) => o.tax_fee);
};

export const validateFile = (file: { size: number; type: string }) => {
  if (!file) {
    return { isValid: false, message: "" };
  }
  if (file.size < 1024) {
    return { isValid: false, message: "Minimum supported file size is 1kb" };
  }
  if (file.size > 10000000) {
    return { isValid: false, message: "Maximum supported file size is 10mb" };
  }
  const file_type = file.type.split("/");
  const accept_types = ["jpeg", "jpg", "png", "pdf"];
  if (!file_type[1] || !accept_types.includes(file_type[1])) {
    return {
      isValid: false,
      message: `Supported file types are ${accept_types.join(", ")}`,
    };
  }
  return { isValid: true, message: "" };
};

export const getExpired = (endDate: string) => {
  const start = new Date();
  const end = new Date(endDate);
  let dayCount = -1;
  while (end < start) {
    dayCount++;
    end.setDate(end.getDate() + 1);
  }
  return dayCount;
};
