import InputFormik from "@/components/InputFormik";
import MyAccountSideSection from "@/components/MyAccountSideSection";
import Select from "@/components/Select";
import { bankDetailsSchema } from "@/utils/validations";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useAddOrUpdateBankAccount } from "@/hooks/useBankDetails";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useGetCountries } from "@/hooks/useGetCountries";
import Link from "next/link";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import Image from "next/image";
import ErrorMessage from "@/components/ErrorMessage";
import { useAddProduct } from "@/hooks/useProductHooks";
import { CheckCurrencyModal } from "@/components/Modals/CheckCurrencyModal";
import { useRouter } from "next/router";
import { DATA_ACCOUNT_SHOW } from "@/utils/constants";
import { getHeader } from "@/utils/index";
import HeaderSeo from "@/components/HeaderSeo";

const MyAccountBankDetails = () => {
  const { product } = useAddProduct();
  const [showNewBankDetails, setShowNewBankDetails] = useState(false);
  const [countries, setCountries] = useState<{ name: string; value: string }[]>(
    []
  );
  const [myBankAccounts, setMyBankAccounts] = useState<PaymentDetail[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [errorCurrency, setErrorCurrency] = useState<ErrorCurrency>();
  const [showInput, setShowInput] = useState<CheckPaymentAccount>();
  const [errorIban, setErrorIban] = useState<string>();

  const { data: myAddresses, isSuccess: getMyAddressSuccess } =
    useGetAddresses();

  const toggleShowNewBankDetails = () => {
    setShowNewBankDetails(!showNewBankDetails);
  };

  const router = useRouter();

  const {
    mutate: addBankAccount,
    error: isAddBankError,
    isLoading: isAddBankLoading,
  } = useAddOrUpdateBankAccount();

  const { data: myProfile, refetch: refetchProfile } = useGetMyProfile();

  useMemo(() => {
    if (
      myProfile &&
      myProfile.customer &&
      myProfile.customer.data.payment_details &&
      myProfile.customer.data.payment_details.data.length > 0
    ) {
      const bank_accounts = myProfile.customer.data.payment_details.data.filter(
        (bank_account) =>
          bank_account.payment_method_id === 1 && bank_account.is_primary
      );
      setMyBankAccounts(bank_accounts);
    }
  }, [myProfile]);

  const { data: countriesData } = useGetCountries();

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

  useEffect(() => {
    if (myBankAccounts && myBankAccounts.length < 1)
      setShowNewBankDetails(true);
  }, [myBankAccounts]);

  const formikHandleSelectChange = (data: Option) => {
    setShowInput(
      DATA_ACCOUNT_SHOW.find((c) => c.country === String(data.value))
    );
    formik.setFieldValue("country", data.value);
    if (data.value !== "GB") {
      formik.setFieldValue("sort_code", "000");
    } else {
      formik.setFieldValue("sort_code", "");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      account_number: "",
      country: "",
      sort_code: "",
      bank_name: "",
      default_bank: false,
    },
    validationSchema: bankDetailsSchema,
    onSubmit: (values) => {
      if (
        !["GB"].includes(values.country) &&
        values.account_number.slice(0, 2) !== values.country
      ) {
        setErrorIban("Incorrect IBAN");
        setTimeout(() => {
          setErrorIban("");
        }, 3000);
        return;
      }
      const findCurrency = countriesData?.find(
        (item: CountryApiData) => item.alpha2Code === values.country
      );
      if (
        product &&
        product.currency &&
        findCurrency?.currencies[0].code !== product.currency?.name
      ) {
        setErrorCurrency({
          currency_1: product.currency?.name as string,
          currency_2: findCurrency?.currencies[0].code as string,
        });
        setShowPopup(true);
        return;
      }
      addBankAccount(
        {
          data: {
            ...values,
            account_number: values.account_number.replace(/\s/g, ""),
            sort_code: !["GB"].includes(values.country) ? "" : values.sort_code,
          },
          id: myProfile ? myProfile.id.toString() : "",
          not_save_as_default: null,
          payment_method_id: 1,
        },
        {
          onSuccess: () => {
            refetchProfile();
            if (product.images) {
              router.push("/sell/step-3");
            }
            if (router.query.from) {
              router.push(`${router.query.from}`);
            }
          },
        }
      );
    },
  });

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - Bank Details"
        description="GanniRepeat - My Account - Bank Details"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={3} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Bank details
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            {getMyAddressSuccess && (
              <>
                {myAddresses && myAddresses.length > 0 ? (
                  <>
                    {myBankAccounts && myBankAccounts.length > 0 && (
                      <div>
                        <div className="flex flex-wrap">
                          {myBankAccounts.map((bank_account, index) => {
                            return (
                              <div className="w-full md:w-2/4" key={index}>
                                <div className="mb-6">
                                  <label className="custom-radio cursor-pointer block">
                                    <input
                                      type="radio"
                                      className="hidden"
                                      name="bank"
                                      checked
                                    />
                                    <span className="relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[20px] before:h-[20px] before:rounded-full after:absolute after:top-[7px] after:left-[6px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white">
                                      Default bank account
                                    </span>
                                  </label>
                                </div>
                                <address className="font-helveticaNeue400 text-sm not-italic mb-4">
                                  {bank_account.data?.first_name} <br />
                                  {bank_account.data?.bank_name} <br />
                                  ****
                                  {bank_account.data?.account_number?.slice(-4)}
                                </address>
                              </div>
                            );
                          })}
                        </div>
                        <hr className="border-t-grey my-8" />
                      </div>
                    )}

                    <a
                      onClick={toggleShowNewBankDetails}
                      className={`font-helveticaNeue500 uppercase text-sm underline cursor-pointer ${
                        showNewBankDetails ? "hidden" : ""
                      }`}
                    >
                      {myBankAccounts && myBankAccounts.length > 0
                        ? "Edit"
                        : "Add new bank account"}
                    </a>

                    <form
                      onSubmit={formik.handleSubmit}
                      className={`${showNewBankDetails ? "" : "hidden"}`}
                    >
                      <div className="mb-6">
                        <InputFormik
                          label="Account holder's name"
                          name="first_name"
                          onChange={formik.handleChange}
                          labelClasses="text-sm"
                          value={formik.values.first_name}
                          errorMessage={
                            formik.errors.first_name &&
                            formik.touched.first_name
                              ? formik.errors.first_name
                              : ""
                          }
                        />
                      </div>
                      <div className="flex flex-wrap">
                        <div className="w-full">
                          <div className="mb-6">
                            <label className="label font-helveticaNeue500 text-sm uppercase block mb-1">
                              Country
                            </label>
                            <Select
                              data={countries}
                              onChange={formikHandleSelectChange}
                              classesCustomSelect="font-helveticaNeue400 border !border-mgrey h-[48px] outline-0 w-full text-sm px-4 text-dark rounded-none"
                            />
                          </div>
                        </div>
                      </div>
                      {showInput && (
                        <div className="flex flex-wrap">
                          {showInput.title_2 && (
                            <div className="w-full md:w-2/4">
                              <div className="mb-6">
                                <InputFormik
                                  label={showInput.title_2.label}
                                  name="bank_name"
                                  onChange={formik.handleChange}
                                  labelClasses="text-sm"
                                  value={formik.values.bank_name}
                                  errorMessage={
                                    formik.errors.bank_name &&
                                    formik.touched.bank_name
                                      ? formik.errors.bank_name
                                      : ""
                                  }
                                  maxValue={showInput.title_2.digit}
                                />
                              </div>
                            </div>
                          )}
                          <div
                            className={`w-full ${
                              showInput.title_2 ? "md:w-2/4 pl-2" : ""
                            }`}
                          >
                            <div className="mb-6">
                              <InputFormik
                                label={showInput.title_1.label}
                                name="account_number"
                                onChange={formik.handleChange}
                                labelClasses="text-sm"
                                value={formik.values.account_number}
                                errorMessage={
                                  formik.errors.account_number &&
                                  formik.touched.account_number
                                    ? formik.errors.account_number
                                    : ""
                                }
                                errorIban={
                                  formik.touched.account_number && errorIban
                                    ? errorIban
                                    : ""
                                }
                                placeholder={getHeader(
                                  showInput.title_1.digit,
                                  "x",
                                  "default"
                                )}
                                maxValue={showInput.title_1.digit}
                              />
                            </div>
                          </div>
                          {showInput.country === "GB" && (
                            <div className="w-full md:w-2/4">
                              <div className="mb-6">
                                <InputFormik
                                  label="Sort Code"
                                  name="sort_code"
                                  onChange={formik.handleChange}
                                  labelClasses="text-sm"
                                  value={formik.values.sort_code}
                                  errorMessage={
                                    formik.errors.sort_code &&
                                    formik.touched.sort_code
                                      ? formik.errors.sort_code
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {/* TODO: confirm with business if 1 or multiple accounts required */}
                      {/* <div className="mb-6">
                        <label className="custom-checkbox type-lg cursor-pointer mb-px inline-block">
                          <input type="checkbox" className="hidden" />
                          <span className="relative block pl-8 text-sm before:absolute before:top-[0px] before:left-0 before:w-[20px] before:h-[20px] before:border before:border-dark after:content-[url('/assets/icons/close.svg')] after:absolute after:top-[1px] after:left-[4px] after:text-white after:font-helveticaNeueLTCom85Heavy after:font-extrabold after:text-base after:hidden">
                            Make default bank account
                          </span>
                        </label>
                      </div> */}
                      <div className="mb-6">
                        <button
                          type="submit"
                          disabled={isAddBankLoading}
                          className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                        >
                          {isAddBankLoading
                            ? "Processing"
                            : "save bank details"}
                        </button>
                      </div>
                      {isAddBankError &&
                        !isAddBankLoading &&
                        (isAddBankError as Error).message !== "" && (
                          <ErrorMessage
                            message={(isAddBankError as Error).message}
                          ></ErrorMessage>
                        )}
                    </form>
                  </>
                ) : (
                  <div className="border border-pink p-4 flex items-center mb-6 lg:mb-8">
                    <div className="w-6">
                      <Image
                        src="/assets/images/Info.svg"
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="pl-4 text-sm flex-1">
                      <p>
                        Please note that you should add a valid address before
                        your bank details. Click{" "}
                        <Link href="/my-account/address">
                          <a className="cursor-pointer underline">here</a>
                        </Link>{" "}
                        to add an address
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <CheckCurrencyModal
        error={errorCurrency}
        toggleCheckCurrencyModal={() => setShowPopup(!showPopup)}
        active={showPopup}
      />
    </div>
  );
};

export default MyAccountBankDetails;
