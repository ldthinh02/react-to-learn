import React, { useEffect, useState } from "react";
import Image from "next/image";
import Select from "@/components/Select";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useGetProductByOrderProduct } from "@/hooks/useGetProductByOrderProduct";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useGetCountries } from "@/hooks/useGetCountries";
import { validateZipcode } from "@/hooks/useValidateZipcode";
import { addbankAccountInfoSchema } from "@/utils/validations";
import InputFormik from "@/components/InputFormik";
import ErrorMessage from "@/components/ErrorMessage";
import { useAddOrUpdateBankAccount } from "@/hooks/useAddOrUpdateBankAccount";
import { useCreateBankTransfer } from "@/hooks/useCreateBankTransfer";
import CheckCurrencyPaymentModal from "@/components/Modals/CheckCurrencyPaymentModal";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import { reflauntLoader } from "@/utils/imageLoader";
import { DATA_ACCOUNT_SHOW } from "@/utils/constants";
import { getHeader } from "@/utils/index";
import HeaderSeo from "@/components/HeaderSeo";

const BankTransfer = () => {
  const router = useRouter();
  const { order_product, token, seller_email } = router.query;
  const [bankAccounts, setBankAccounts] = useState<PaymentDetail[]>([]);
  const [bankAccountSelected, setBankAccountSelected] =
    useState<PaymentDetail | null>(null);
  const [countries, setCountries] = useState<{ name: string; value: string }[]>(
    []
  );
  const { browserCurrency } = useBrowserCurrency();
  const [isAddNew, setIsAddNew] = useState<boolean>(true);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [errorCurrency, setErrorCurrency] = useState<ErrorCurrency>();
  const { data: countriesData } = useGetCountries();
  const [showInput, setShowInput] = useState<CheckPaymentAccount>();
  useEffect(() => {
    if (countriesData) {
      setCountries(
        countriesData.map((e: CountryApiData) => ({
          name: e.name,
          value: e.alpha2Code,
        }))
      );
    }
  }, [countriesData]);
  const [invalidZipCode, setInvalidZipcode] = useState("");
  const {
    mutateAsync: addOrUpdateBankAccount,
    error: addOrUpdateBankAccountError,
    isError: isAddOrUpdateBankAccountError,
    isLoading: isAddOrUpdateBankAccountLoading,
  } = useAddOrUpdateBankAccount();
  const {
    mutate: createBankTransfer,
    error: createBankTransferError,
    isError: isCreateBankTransfer,
    isLoading: isCreateBankTransfertLoading,
  } = useCreateBankTransfer();
  const addBankAccountFormik = useFormik({
    initialValues: {
      name: "",
      address: "",
      city: "",
      zipcode: "",
      country: "",
      bank_name: "",
      account_number: "",
      sort_code: "",
    },
    validationSchema: addbankAccountInfoSchema,
    onSubmit: async (values) => {
      setIsSubmited(true);
      const valid_zipcode = validateZipcode({
        country: values.country,
        zipcode: values.zipcode,
      });
      if (!valid_zipcode) {
        setInvalidZipcode("Invalid Postal Code");
        setIsSubmited(false);
        return;
      }
      if (!order_product) return;
      const countrySelected = browserCurrency.currencies?.find(
        (currency) => currency.country === values.country
      );
      if ((data?.data.currency as Currency).code !== countrySelected?.code) {
        setErrorCurrency({
          currency_1: (data?.data.currency as Currency).code,
          currency_2: countrySelected?.code || "",
        });
        setShowPopup(true);
        return;
      }
      await addOrUpdateBankAccount({
        data: {
          ...values,
          account_number: values.account_number.replace(/\s/g, ""),
          sort_code: !["GB"].includes(values.country) ? "" : values.sort_code,
        },
        id: String(myProfile?.id),
        not_save_as_default: null,
        payment_method_id: 1,
      });
      await transfer(false);
    },
  });

  const continuePayment = async () => {
    setShowPopup(false);
    setIsSubmited(true);
    if (!order_product) return;
    !bankAccountSelected &&
      (await addOrUpdateBankAccount({
        data: addBankAccountFormik.values,
        id: String(myProfile?.id),
        not_save_as_default: null,
        payment_method_id: 1,
      }));
    await transfer(false);
  };

  const transfer = async (needCheck: boolean) => {
    setIsSubmited(true);
    if (
      needCheck &&
      (data?.data.currency as Currency).code !==
        bankAccountSelected?.data.currency_code
    ) {
      setErrorCurrency({
        currency_1: (data?.data.currency as Currency).code,
        currency_2: bankAccountSelected?.data.currency_code || "",
      });
      setShowPopup(true);
      return;
    }

    createBankTransfer(
      {
        order_product_id: String(order_product),
      },
      {
        onSuccess: () => {
          router.push("/receive-payment/bank-confirmed");
        },
        onError: (e) => {
          setIsSubmited(false);
          if (e instanceof Error) {
            if (
              [
                "Exception: Verification document is required.",
                "Exception: Verification document is not verified.",
                "Exception: Verification document is pending.",
              ].includes((e as Error).message)
            ) {
              e.message =
                "You need verify ID to receive money. Redirecting to verify ID page...";
              setTimeout(() => {
                router.push("/verify-id?from=bank-transfer");
              }, 2000);
            }
            if ((e as Error).message === "Exception: Not found!") {
              // payment already processed
              router.push("/receive-payment/bank-confirmed");
            }
          }
        },
      }
    );
  };

  const onChangeSelect = (value: Option) => {
    if (value.field === "country") {
      setShowInput(
        DATA_ACCOUNT_SHOW.find((c) => c.country === String(value.value))
      );
    }
    addBankAccountFormik.setFieldValue(`${value.field}`, value.value);
  };
  const { data: data } = useGetProductByOrderProduct(
    order_product ? Number(order_product) : 0,
    ""
  );
  const { data: myProfile } = useGetMyProfile();
  useEffect(() => {
    if (myProfile) {
      const bank_details = myProfile.customer.data.payment_details
        .data as PaymentDetail[];
      if (bank_details.length > 0) {
        setBankAccounts(bank_details);
        setIsAddNew(false);
        const defaultBankAccount: PaymentDetail =
          bank_details.find((i: { is_primary: boolean }) => i.is_primary) ||
          bank_details[0];
        setBankAccountSelected(defaultBankAccount);
      } else {
        setIsAddNew(true);
      }
    }
  }, [myProfile]);

  const goBack = () => {
    router.push({
      pathname: "/receive-payment",
      query: {
        token: token,
        order_product: order_product,
        seller_email: seller_email,
      },
    });
  };

  const addNewBankAccount = () => {
    setIsAddNew(true);
    setBankAccountSelected(null);
  };

  const bankChanged = (item: PaymentDetail) => {
    setBankAccountSelected(item);
    setIsAddNew(false);
  };

  const calculateBankAmount = (currencyCode: string) => {
    if (!data) {
      return null;
    }
    return ["DKK", "NOK", "SEK"].includes(currencyCode)
      ? Math.round(data.data.calculated_payout_amount)
      : Math.ceil(data.data.calculated_payout_amount * 2) / 2;
  };

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Bank Transfer"
        description="GanniRepeat - Bank Transfer"
      />

      {/* Receive_Payment_D */}
      {data && data.data && (
        <div className="flex flex-wrap bg-grey">
          <div className="py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-480">
            <div className="w-full md:w-300 m-auto">
              <h2 className="font-helveticaNeue500 text-xl uppercase mb-6">
                Your payout
              </h2>
              <div className="bg-white">
                {/* <!--Product--> */}
                <div className="product-popup flex w-full text-left py-4 px-2">
                  <div className="thumb w-100">
                    <Image
                      loader={reflauntLoader}
                      className="w-full"
                      src={data.data.main_image.relative_path as string}
                      alt=""
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </div>
                  <div className="info flex-1 text-sm pl-4">
                    <h3 className="font-helveticaNeue500 uppercase mb-1">
                      {data.data.name}
                    </h3>
                    {data.data?.size && (
                      <p className="mb-2">
                        SIZE: {(data.data.size as Size).name}
                      </p>
                    )}
                    <p className="text-green">
                      Cash payment value:{" "}
                      {(data.data.currency as Currency).symbol}
                      {calculateBankAmount(
                        (data.data.currency as Currency).code
                      )}{" "}
                    </p>
                  </div>
                </div>
                {/* <!--./Product--> */}
              </div>
            </div>
          </div>
          <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h2 className="font-helveticaNeue500 text-2xl uppercase mb-6 md:mb-8">
              Confirm your bank account
            </h2>
            <div className="text-sm">
              <p>
                You have chosen to be paid in cash. Please confirm your bank
                details below.
              </p>
            </div>
            {bankAccounts.length > 0 && (
              <>
                <hr className="border-t-grey my-8" />
                <div className="flex flex-wrap">
                  {bankAccounts &&
                    bankAccounts.length > 0 &&
                    bankAccounts.map((item: PaymentDetail, index: number) => (
                      <div key={index} className="w-full md:w-2/4">
                        {/* <!--Radio button--> */}
                        <div className="mb-6">
                          <label className="custom-radio cursor-pointer block">
                            <input
                              type="radio"
                              className="hidden"
                              name="bank"
                              checked={!!(item.id === bankAccountSelected?.id)}
                              onChange={() => bankChanged(item)}
                            />
                            <span className="relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[20px] before:h-[20px] before:rounded-full after:absolute after:top-[7px] after:left-[6px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white">
                              Use this bank account
                            </span>
                          </label>
                        </div>
                        {/* <!--./Radio button--> */}
                        <address className="font-helveticaNeue400 text-sm not-italic mb-4">
                          {item.data.beneficiary_name} <br />
                          {item.data.bank_name} <br />
                          {item.data.account_number}
                        </address>
                      </div>
                    ))}
                </div>
              </>
            )}

            {/* <!--line--> */}

            {/* <!--Add new adddress--> */}

            {bankAccounts.length > 0 && !isAddNew && (
              <>
                <hr className="border-t-grey my-8" />
                <a
                  onClick={addNewBankAccount}
                  className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer mb-6 inline-block"
                >
                  Add new bank account
                </a>
                {invalidZipCode && !isSubmited && (
                  <ErrorMessage message={invalidZipCode}></ErrorMessage>
                )}
                {isAddOrUpdateBankAccountError && (
                  <ErrorMessage
                    message={(addOrUpdateBankAccountError as Error).message}
                  ></ErrorMessage>
                )}
                {isCreateBankTransfer && (
                  <ErrorMessage
                    message={(createBankTransferError as Error).message}
                  ></ErrorMessage>
                )}
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-2/4 px-2">
                    <div className="mb-6">
                      <button
                        disabled={
                          isAddOrUpdateBankAccountLoading ||
                          isCreateBankTransfertLoading
                        }
                        onClick={goBack}
                        className="font-helveticaNeue500 text-center px-3 transition-all -tracking-widerborder border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark py-4 text-xs block w-full uppercase tracking-widest"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-2/4 px-2">
                    <div className="mb-6">
                      <button
                        disabled={
                          isAddOrUpdateBankAccountLoading ||
                          isCreateBankTransfertLoading
                        }
                        onClick={() => transfer(true)}
                        className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                      >
                        {isAddOrUpdateBankAccountLoading ||
                        isCreateBankTransfertLoading
                          ? "loading..."
                          : "Confirm"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {isAddNew && (
              <form onSubmit={addBankAccountFormik.handleSubmit}>
                <hr className="border-t-grey my-8" />
                <div className="mb-6">
                  <InputFormik
                    name="name"
                    label="Account holder name"
                    onChange={addBankAccountFormik.handleChange}
                    value={addBankAccountFormik.values.name}
                    errorMessage={
                      addBankAccountFormik.errors.name &&
                      addBankAccountFormik.touched.name
                        ? addBankAccountFormik.errors.name
                        : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <InputFormik
                    name="address"
                    label="Address"
                    onChange={addBankAccountFormik.handleChange}
                    value={addBankAccountFormik.values.address}
                    errorMessage={
                      addBankAccountFormik.errors.address &&
                      addBankAccountFormik.touched.address
                        ? addBankAccountFormik.errors.address
                        : ""
                    }
                  />
                </div>

                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-2/4 px-2">
                    <div className="mb-6">
                      <InputFormik
                        name="city"
                        label="town or city"
                        onChange={addBankAccountFormik.handleChange}
                        value={addBankAccountFormik.values.city}
                        errorMessage={
                          addBankAccountFormik.errors.city &&
                          addBankAccountFormik.touched.city
                            ? addBankAccountFormik.errors.city
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/4 px-2">
                    <div className="mb-6">
                      <InputFormik
                        name="zipcode"
                        label="Postal Code"
                        onChange={addBankAccountFormik.handleChange}
                        value={addBankAccountFormik.values.zipcode}
                        errorMessage={
                          addBankAccountFormik.errors.zipcode &&
                          addBankAccountFormik.touched.zipcode
                            ? addBankAccountFormik.errors.zipcode
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="label font-helveticaNeue500 text-xs text-dark mb-1 block uppercase">
                    Country
                  </label>
                  {countries && (
                    <Select
                      data={countries}
                      name="country"
                      error={addBankAccountFormik.errors.country}
                      touched={addBankAccountFormik.touched.country}
                      errorMessage={
                        addBankAccountFormik.errors.country &&
                        addBankAccountFormik.touched.country
                          ? addBankAccountFormik.errors.country
                          : ""
                      }
                      onChange={onChangeSelect}
                      classesCustomSelect="font-helveticaNeue400 border !border-mgrey h-[48px] outline-0 w-full text-sm px-4 text-dark rounded-none"
                    />
                  )}
                </div>

                {showInput && (
                  <div className="flex flex-wrap -mx-2">
                    {showInput.title_2 && (
                      <div className="w-full md:w-2/4 px-2">
                        <div className="mb-6">
                          <InputFormik
                            name="bank_name"
                            label={showInput.title_2.label}
                            placeholder={getHeader(
                              showInput.title_2.digit,
                              "x",
                              "default"
                            )}
                            onChange={addBankAccountFormik.handleChange}
                            value={addBankAccountFormik.values.bank_name}
                            errorMessage={
                              addBankAccountFormik.errors.bank_name &&
                              addBankAccountFormik.touched.bank_name
                                ? addBankAccountFormik.errors.bank_name
                                : ""
                            }
                            maxValue={showInput.title_2.digit}
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className={`w-full px-2 ${
                        showInput.title_2 ? "md:w-2/4" : ""
                      }`}
                    >
                      <div className="mb-6">
                        <InputFormik
                          name="account_number"
                          label={showInput.title_1.label}
                          onChange={addBankAccountFormik.handleChange}
                          value={addBankAccountFormik.values.account_number}
                          placeholder={getHeader(
                            showInput.title_1.digit,
                            "x",
                            "default"
                          )}
                          errorMessage={
                            addBankAccountFormik.errors.account_number &&
                            addBankAccountFormik.touched.account_number
                              ? addBankAccountFormik.errors.account_number
                              : ""
                          }
                          maxValue={showInput.title_1.digit}
                        />
                      </div>
                    </div>
                    {showInput.country === "GB" && (
                      <div className="w-full md:w-2/4 px-2">
                        <div className="mb-6">
                          <InputFormik
                            name="sort_code"
                            label="Sort code"
                            onChange={addBankAccountFormik.handleChange}
                            value={addBankAccountFormik.values.sort_code}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {invalidZipCode && !isSubmited && (
                  <ErrorMessage message={invalidZipCode}></ErrorMessage>
                )}
                {isAddOrUpdateBankAccountError && (
                  <ErrorMessage
                    message={(addOrUpdateBankAccountError as Error).message}
                  ></ErrorMessage>
                )}
                {isCreateBankTransfer && (
                  <ErrorMessage
                    message={(createBankTransferError as Error).message}
                  ></ErrorMessage>
                )}
                <div className="flex flex-wrap -mx-2 mb-6">
                  <div className="w-full md:w-2/4 px-2">
                    <div className="mb-6">
                      <button
                        disabled={
                          isAddOrUpdateBankAccountLoading ||
                          isCreateBankTransfertLoading
                        }
                        onClick={goBack}
                        className="font-helveticaNeue500 text-center px-3 transition-all -tracking-widerborder border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark py-4 text-xs block w-full uppercase tracking-widest"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-2/4 px-2">
                    <div className="mb-6">
                      <button
                        disabled={
                          isAddOrUpdateBankAccountLoading ||
                          isCreateBankTransfertLoading
                        }
                        type="submit"
                        className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                      >
                        {isAddOrUpdateBankAccountLoading ||
                        isCreateBankTransfertLoading
                          ? "loading..."
                          : "Confirm"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {/* <!--line--> */}
          </div>
        </div>
      )}

      {/* ./Receive_Payment_D */}
      <CheckCurrencyPaymentModal
        error={errorCurrency}
        toggleCheckCurrencyPaymentModal={() => setShowPopup(!showPopup)}
        active={showPopup}
        continuePayment={continuePayment}
      />
    </div>
  );
};

export default BankTransfer;
