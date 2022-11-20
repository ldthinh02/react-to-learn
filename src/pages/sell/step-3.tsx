import Select from "@/components/Select";
import SellComponent from "@/components/Sell";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetCurrencies } from "@/hooks/useGetCurrencies";
import { useAddProduct } from "@/hooks/useProductHooks";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetRfAttributes } from "@/hooks/useGetRfAttributes";
import { useSmartPricer } from "@/hooks/useSmartPricer";
import {
  getConvertedPrice,
  getConvertedPriceEuroToSelectedCurrency,
  getPriceInEuro,
} from "@/utils/index";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import { CheckCurrencyModal } from "@/components/Modals/CheckCurrencyModal";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import Authenticate from "@/components/Authenticate";

export default function SellStep3() {
  const { product, setProduct, setStep, record_price, setRecordPrice } =
    useAddProduct();
  const { isLoggedIn } = useAuthentication();
  const [sellPrice, setSellPrice] = useState<string>("0");
  const [bankPrice, setBankPrice] = useState<string>("0");
  const [giftPrice, setGiftPrice] = useState<string>("0");
  const [error, setError] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const router = useRouter();
  const [currencyUnit, setCurrencyUnit] = useState<Option[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const { rfBrand, rfCategory, rfCondition } = useGetRfAttributes(product);
  const { mutate: estimatePrice } = useSmartPricer();
  const { browserCurrency } = useBrowserCurrency();
  const [errorCurrency, setErrorCurrency] = useState<ErrorCurrency>();

  useEffect(() => {
    if (rfBrand && rfCategory && rfCondition && !product.price) {
      estimatePrice(
        {
          category: rfCategory
            ? rfCategory.name
            : `${product.category.name}/${product.sub_category.name}`,
          brand: rfBrand ? rfBrand.name : "ganni",
          price: product.original_price_eur,
          marketplace: "styletribute",
          marketplace_group: "all",
          website: window.location.origin,
          condition: rfCondition ? rfCondition.name : product.condition.name,
          product_in_cluster_count_threshold: 5,
          original_price_to_predict: product.original_price_eur,
          mode: "standard",
          model_product_in_cluster_count_threshold: 2,
          currency: "EUR",
        },
        {
          onSuccess: ({
            recommended_price,
            recommended_price_highest,
            recommended_price_high,
            recommended_price_lowest,
            recommended_price_low,
          }) => {
            const finalPrice = getConvertedPriceEuroToSelectedCurrency(
              recommended_price,
              selectedCurrency,
              browserCurrency
            );
            onChangPrice(`${finalPrice}`);
            setRecordPrice({
              ...record_price,
              name_of_partner_integrated: { S: "Reflaunt" },
              recommended_price: {
                S: finalPrice.toString(),
              },
              recommended_price_highest: {
                S: recommended_price_highest.toString(),
              },
              recommended_price_high: { S: recommended_price_high.toString() },
              recommended_price_lowest: {
                S: recommended_price_lowest.toString(),
              },
              recommended_price_low: { S: recommended_price_low.toString() },
              marketplace: { S: "Ganni" },
              marketplace_group: { S: "all" },
              category: {
                S: rfCategory
                  ? rfCategory.name
                  : `${product.category.name}/${product.sub_category.name}`,
              },
              brand: { S: rfBrand ? rfBrand.name : "ganni" },
              condition: {
                S: rfCondition ? rfCondition.name : product.condition.name,
              },
              original_price_to_predict: {
                S:
                  product && product.original_price
                    ? product.original_price.toString()
                    : "0",
              },

              product_in_cluster_count_threshold: { S: "5" },
            });
          },
        }
      );
    }
  }, [rfBrand, rfCategory, rfCondition, selectedCurrency]);

  const { data: dataCurrencies } = useGetCurrencies();
  const { data: myProfile } = useGetMyProfile();

  useEffect(() => {
    if (product) {
      onChangPrice(String(product.price));
      if (product.shipping && product.shipping === "reflaunt") {
        formik.setFieldValue("your-pay", false);
        formik.setFieldValue("buyer-pay", true);
      }
    }
  }, [product]);

  useEffect(() => {
    if (dataCurrencies) {
      const result = dataCurrencies
        .filter((item: CurrencyData) => !item.base)
        .map((item: CurrencyData) => ({
          id: item.id,
          name: item.code,
          value: String(item.id),
        }));
      if (product.currency) formik.setFieldValue("currency", product.currency);
      setCurrencyUnit(result);
    }
  }, [dataCurrencies, product]);

  useEffect(() => {
    if (!selectedCurrency) {
      const defaultCurrency = browserCurrency.currencies?.find(
        (currency) => currency.code === product.original_currency?.name
      );
      if (product.currency) onChangeSelect(product.currency);
      else {
        setSelectedCurrency(`${defaultCurrency?.id}`);
        formik.setFieldValue("currency", {
          id: defaultCurrency?.id,
          name: defaultCurrency?.code,
          value: String(defaultCurrency?.id),
        });
      }
      if (myProfile) {
        const paymentAccount =
          myProfile.customer.data.payment_details.data?.find(
            (item) => item.is_primary
          ) || myProfile.customer.data.payment_details.data[0];
        if (paymentAccount && paymentAccount.data) {
          const paymentDetail = paymentAccount.data;
          if (currencyUnit) {
            const findId = currencyUnit.find(
              (item) => item.name === paymentDetail.currency_code
            );
            if (findId) setSelectedCurrency(String(findId.id));
            if (currencyUnit[0])
              setSelectedCurrency(String(currencyUnit[0].id));
          }
        }
      }
    }
  }, [product]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currency: { name: "" },
      "your-pay": false,
      "buyer-pay": true,
    },
    onSubmit: (values) => {
      if (!sellPrice || Number(sellPrice) < 1) {
        setError(true);
        return;
      }
      if (myProfile) {
        const paymentAccount =
          myProfile.customer.data.payment_details.data?.find(
            (item) => item.is_primary
          );

        if (paymentAccount) {
          let paymentDetail = paymentAccount.data;
          if (typeof paymentDetail === "string") {
            paymentDetail = JSON.parse(String(paymentDetail));
          }
          if (paymentDetail.currency_code !== values.currency.name) {
            setErrorCurrency({
              currency_1: values.currency.name,
              currency_2: `${paymentDetail.currency_code}`,
            });
            setShowPopup(true);
            return;
          }
        }
      }
      setProduct({
        ...product,
        ...{
          currency: values.currency,
          price: Number(sellPrice),
          original_price_eur: getPriceInEuro(
            Number(sellPrice),
            selectedCurrency,
            browserCurrency
          ),
          shipping: values["buyer-pay"] ? "reflaunt" : "free",
        },
      });
      if (!product.id) setStep(3);
      if (values) router.push("/sell/step-4");
    },
  });

  const onChangPrice = (value: string) => {
    if (isNumeric(value) || !value) {
      let price = value;
      if (!value.split("0")[0]) {
        price = value.split("0")[1];
      }
      setError(false);
      setSellPrice(price);
      if (!price) {
        setBankPrice("0");
        setGiftPrice("0");
      } else {
        const sell = Number(price);
        const bank = sell * 0.85;
        setBankPrice(formatMoney(bank));
        setGiftPrice(formatMoney(bank * 1.2));
      }
    }
  };

  const formatMoney = (value: number) => {
    const price = String(value.toFixed(2)).split(".");
    if (price[1] === "00") return price[0];
    return String(value.toFixed(2));
  };

  function isNumeric(n: string) {
    return !isNaN(parseFloat(n)) && isFinite(Number(n));
  }

  const onChangeSelect = (value: Option) => {
    setSelectedCurrency(String(value.id));
    const finalPrice = getConvertedPrice(
      Number(sellPrice),
      String(value.id),
      value.name,
      browserCurrency
    );
    if (!product) {
      onChangPrice(`${finalPrice}`);
    }
    formik.setFieldValue(`${value.field}`, value);
  };

  if (!isLoggedIn) return <Authenticate />;

  return (
    <div>
      <SellComponent title="List your item">
        <p className="text-[14px]">Please specify the price of your item</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="w-full md:flex my-[30px]">
            <div className="w-full md:w-[33.33%]">
              <p className="text-[14px] uppercase">Selling price*</p>
              <div className="w-full flex">
                <div className="w-[30%]">
                  <Select
                    label=""
                    name="currency"
                    value={selectedCurrency || currencyUnit[0]?.value}
                    data={currencyUnit}
                    onChange={(value) => onChangeSelect(value)}
                    classes="mt-[12px]"
                  />
                </div>
                <div className="w-[70%] mt-[4px] ml-[8px]">
                  <div className="w-full">
                    <div
                      className={`w-full h-min-[44px] mt-[8px] relative p-[9px] border ${
                        !sellPrice || error
                          ? "border-[#DA0714]"
                          : "border-mgrey"
                      }`}
                    >
                      <input
                        className="w-[90%] sm:w-[97%] h-[24px] p-[0px] text-[14px] focus:outline-none"
                        type="string"
                        name="sell-price"
                        value={sellPrice}
                        placeholder="Enter price"
                        maxLength={10}
                        spellCheck={false}
                        onChange={(e) => onChangPrice(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      {(!sellPrice || error) && (
                        <p className="text-[14px] text-red">Required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex md:w-[66.67%] mt-[20px] md:mt-[0px]">
              <div className="w-[50%] pt-[1px] pr-[5px] md:pr-[0px] md:pl-[24px]">
                <div className="w-full">
                  <label className="w-full text-[14px] uppercase">
                    Payment in bank transfer
                  </label>
                  <div className="pointer-events-none text-[14px] bg-[#EFEFEF] w-full h-[44px] mt-[10px] relative p-[12px] border border-gray">
                    {bankPrice}
                  </div>
                </div>
              </div>
              <div className="w-[50%] pt-[1px] pl-[5px] md:pl-[24px]">
                <div className="w-full">
                  <label className="w-full text-[14px] uppercase">
                    Payment in Ganni gift card
                  </label>
                  <div className="pointer-events-none text-[14px] bg-[#EFEFEF] w-full h-[44px] mt-[10px] relative p-[12px] border border-gray">
                    {giftPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border border-[#E25B8B] h-[110px] sm:h-[68px] flex">
            <div className="w-[48px] h-[48px] pt-[30px] sm:pt-[8px] sm:w-[24px] sm:h-[24px] m-[12px]">
              <Image
                src="/assets/icons/info.svg"
                alt=""
                width={24}
                height={24}
              />
            </div>
            <span className="text-[14px] pt-[12px]">
              <p>
                *Please note that 15% of your selling price will be deducted as
                commission.
              </p>
              <p>
                We will issue your payment or gift card in your chosen currency.
              </p>
            </span>
          </div>

          <div className="w-full my-[48px]">
            <hr className="w-full border border-b-[#111111]" />
          </div>

          <div className="text-[14px]">
            <p className="text-[18px] mb-[36px]">Shipping fees</p>

            <div className="w-full flex my-[24px]">
              <input
                className="form-check-input appearance-none rounded-full h-[14px] w-[14px] border border-gray-300 bg-white checked:bg-[#111111] checked:border-[#111111] relative checked:before:absolute checked:before:content-[''] checked:before:w-[8px] checked:before:h-[8px] checked:before:top-[2px] checked:before:left-[2px] checked:before:bg-white checked:before:rounded-[50%] focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="bank"
                checked={formik.values["buyer-pay"]}
                onChange={() => {
                  formik.setFieldValue("buyer-pay", true);
                  formik.setFieldValue("your-pay", false);
                }}
              />
              <p className="uppercase">Buyer pays</p>
            </div>

            <p>
              You will receive a free shipping label via email when the item has
              been sold to use when shipping the item.
            </p>
          </div>
        </form>

        <div className="flex flex-wrap -mx-2 mt-[48px] mb-[40px]">
          <div className="w-2/4 px-2">
            <div className="mb-6">
              <button
                className="text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark w-full uppercase text-xs tracking-widest py-4"
                onClick={() => router.push("/sell/step-2")}
              >
                Back
              </button>
            </div>
          </div>
          <div className="w-2/4 px-2">
            <div className="mb-6">
              <button
                type="submit"
                className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                onClick={() => formik.handleSubmit()}
              >
                next step
              </button>
            </div>
          </div>
        </div>
      </SellComponent>
      <CheckCurrencyModal
        error={errorCurrency}
        toggleCheckCurrencyModal={() => setShowPopup(!showPopup)}
        active={showPopup}
        editListing={false}
        from={router.asPath}
      />
    </div>
  );
}
