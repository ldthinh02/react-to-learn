import { useEffect, useState } from "react";
import { useGetAllCountries, useGetCountries } from "@/hooks/useGetCountries";
import { useGetCurrencies } from "./useGetCurrencies";

export const useGetContact = () => {
  const [countries, setCountries] = useState<Option[]>([]);
  const [prefixes, setPrefixes] = useState<Option[]>([]);
  const { data: dataCountries } = useGetCountries();
  const { data: datCurrency } = useGetCurrencies();

  useEffect(() => {
    if (dataCountries && datCurrency) {
      if (countries.length < 1) {
        const listCurrency = datCurrency
          .filter((item: CurrencyData) => !item.base)
          .map((item: CurrencyData) => item.code);

        const newCountries = dataCountries
          .filter((item: CountryApiData) =>
            listCurrency.includes(item.currencies[0].code)
          )
          .map((item: CountryApiData) => ({
            name: item.name,
            value: item.alpha2Code,
          }));
        setCountries(newCountries);
      }
      if (prefixes.length < 1) {
        const newPrefixes = dataCountries.map((item: CountryApiData) => ({
          name: `+${item.callingCodes[0]}`,
          value: item.alpha2Code,
        }));
        setPrefixes(newPrefixes);
      }
    }
  }, [dataCountries, datCurrency, countries, prefixes]);

  return { countries, prefixes };
};

export const useGetListCountries = () => {
  const [countries, setCountries] = useState<Option[]>([]);
  const [prefixes, setPrefixes] = useState<Option[]>([]);
  const { data: dataCountries } = useGetAllCountries();
  const { data: datCurrency } = useGetCurrencies();

  useEffect(() => {
    if (dataCountries && datCurrency) {
      if (countries.length < 1) {
        const newCountries = dataCountries
          .filter((item: CountryApiData) => item.callingCodes[0])
          .map((item: CountryApiData) => ({
            name: item.name,
            value: item.alpha2Code,
          }));
        setCountries(newCountries);
      }
      if (prefixes.length < 1) {
        const newPrefixes = dataCountries
          .filter((item: CountryApiData) => item.callingCodes[0])
          .map((item: CountryApiData) => ({
            name: `+${item.callingCodes[0]}`,
            value: item.alpha2Code,
          }));
        setPrefixes(newPrefixes);
      }
    }
  }, [dataCountries, datCurrency, countries, prefixes]);

  return { countries, prefixes };
};
