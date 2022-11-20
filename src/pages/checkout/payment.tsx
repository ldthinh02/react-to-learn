import { CheckoutOrderInfoCheckoutOrderInfo } from "@/components/CheckoutOrderInfo";
import InputFormik from "@/components/InputFormik";
import { RadioFormik } from "@/components/RadioFormik";
import { useCart, useListingData } from "@/hooks/useCart";
import {
  useCheckoutPay,
  useSetBillingAddress,
  useSetDefaultPaymentMethod,
  useSetDefaultCheckoutShipment,
  useAddAndSetBillingAddress,
  useGetCheckoutCart,
  useUpdateGuestPaymentMethod,
} from "@/hooks/useCheckout";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import {
  useAddPaymentMethod,
  useGetPaymentMethods,
  useSetCardAsDefault,
} from "@/hooks/usePaymentMethod";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { loadStripe, StripeCardNumberElement } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import ErrorMessage from "@/components/ErrorMessage";
import { paymentMethodSchema } from "@/utils/validations";
import { useFormik } from "formik";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useCartConfirmed } from "@/hooks/useCartConfirmed";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import AddressForm from "@/components/AddressForm";
import HeaderSeo from "@/components/HeaderSeo";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";

const invalidStyleStripe = {
  base: {
    fontSize: "14px",
    lineHeight: "48px",
    color: "black",
    "::placeholder": {
      color: "#B4B4B4",
    },
  },
  invalid: {
    color: "red",
  },
};

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

function CheckoutPayment() {
  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  const [showMobileViewOrder, setShowMobileViewOrder] = useState(false);
  const [paymentRadioSelect, setPaymentRadioSelect] = useState("");
  const [defaultCard, setDefaultCard] = useState<StripeCardSource | null>(null);
  const [otherCards, setOtherCards] = useState<StripeCardSource[]>([]);
  const [billingAddRadioSelect, setBillingAddRadioSelect] =
    useState("same_as_shipping");
  const [firstRender, setFirstRender] = useState(false);
  const [activePaymentId, setActivePaymentID] = useState<string>("");
  const [activeBillingAddress, setActiveBillingAddress] = useState<string>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { browserCurrency } = useBrowserCurrency();
  const [stripeErrorCreatingSource, setStripeErrorCreatingSource] =
    useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const { isLoggedIn } = useAuthentication();

  const router = useRouter();

  // Query Hooks
  const { data: myCards, isSuccess } = useGetPaymentMethods();
  const { data: myAddresses } = useGetAddresses();
  const { refetch: refetchCart } = useGetCheckoutCart();
  const { data: myProfile } = useGetMyProfile();

  // Mutation Hooks
  const {
    mutate: addPaymentMethod,
    // isLoading: isAddPaymentMethodLoading,
    error: addPaymentMethodError,
    isError: isAddPaymentMethodError,
  } = useAddPaymentMethod();
  const { mutate: setCardAsDefault, isLoading: setCardAsDefaultLoading } =
    useSetCardAsDefault();
  const { mutate: setBillingAddress, isLoading: setBillingLoading } =
    useSetBillingAddress();
  const {
    mutate: pay,
    isLoading: payLoading,
    isSuccess: paySuccess,
  } = useCheckoutPay();
  const {
    mutate: setDefaultPaymentMethod,
    isLoading: setDefaultPaymentLoading,
  } = useSetDefaultPaymentMethod();
  const { mutate: setDefaultShipmentMethod } = useSetDefaultCheckoutShipment();
  const { mutate: createAndSetNewBillingAddress } =
    useAddAndSetBillingAddress();
  const {
    mutate: updateGuestPaymentMethod,
    isLoading: updateGuestPaymentLoading,
  } = useUpdateGuestPaymentMethod();

  // Persistent States
  const myCart = useCart((state) => state.cart);
  const listingData = useListingData((state) => state.listing_data);
  const setCart = useCart((state) => state.setCart);
  const { setCartConfirmed } = useCartConfirmed();

  useMemo(() => {
    if (!isSuccess) return;
    if (myCards && myCards.card_source.data.length > 0) {
      const clone = [...myCards.card_source.data];
      const index = clone.findIndex((card) => card.id === myCards.default);
      if (index !== -1) {
        setDefaultCard(myCards.card_source.data[index]);
        if (!firstRender) {
          setFirstRender(true);
          setPaymentRadioSelect("default_payment");
        }
        clone.splice(index, 1);
      }
      setOtherCards(clone);
      if (index === -1 && !paymentRadioSelect && !firstRender) {
        setPaymentRadioSelect("other_payment");
        setFirstRender(true);
      }
    } else {
      setPaymentRadioSelect("new_payment");
      setFirstRender(true);
    }
  }, [myCards]);

  // Forms
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      stripe_name: "",
    },
    validationSchema: paymentMethodSchema,
    onSubmit: () => {
      addNewPaymentMethod();
    },
  });

  const onChangeNewAddress = (values: UpdateOrCreateAddress) => {
    createAndSetNewBillingAddress(
      { ...values, customer_id: myProfile?.customer.data.id },
      {
        onSuccess: (data) => {
          const new_billing_address_id = data.billing_address.data.id;
          if (paymentRadioSelect === "new_payment" || !isLoggedIn) {
            formik.submitForm();
          } else if (paymentRadioSelect === "default_payment" && defaultCard) {
            checkoutPay(defaultCard.id, new_billing_address_id);
          } else if (paymentRadioSelect === "other_payment") {
            checkoutPay(activePaymentId, new_billing_address_id);
          }
        },
        onError: (err) => {
          setApiErrorMessage((err as Error).message);
          setIsSubmit(false);
        },
      }
    );
  };

  // Toggle Component State Functions
  const onChangeRadioPayment = (values: RadioInput) => {
    setPaymentRadioSelect(values.target.value);
  };

  const onChangeActiveAddress = (value: RadioInput) => {
    setActiveBillingAddress(value.target.value);
  };

  const onChangeRadioBilling = (values: RadioInput) => {
    if (values.target.value === "same_as_shipping") {
      setActiveBillingAddress(myCart?.shipping_address?.data.id.toString());
    } else if (values.target.value === "different_from_shipping") {
      setActiveBillingAddress("");
    }
    setBillingAddRadioSelect(values.target.value);
  };

  const onChangeActiveCard = (value: RadioInput) => {
    setCardAsDefault(
      {
        source: value.target.value,
      },
      { onSuccess: () => setActivePaymentID(value.target.value) }
    );
  };

  const toggleMobileViewOrder = () => {
    setShowMobileViewOrder(!showMobileViewOrder);
  };

  // Submit Functions
  const addNewPaymentMethod = async () => {
    setStripeErrorCreatingSource(false);
    const ownerInfo = {
      owner: {
        name: formik.values.stripe_name,
        email: myCart?.email,
      },
    };

    if (elements == null) {
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const expiryDate = elements.getElement(CardExpiryElement);
    const cvc = elements.getElement(CardCvcElement);

    if (stripe && elements && card && expiryDate && cvc) {
      const { error, source } = await stripe.createSource(
        card as StripeCardNumberElement,
        ownerInfo
      );
      if (error || !source) {
        setStripeErrorCreatingSource(true);
        return;
      }

      addPaymentMethod(
        { source: source.id },
        {
          onSuccess: () => {
            checkoutPay(source.id);
          },
          onError: (err) => {
            setApiErrorMessage((err as Error).message);
            setIsSubmit(false);
          },
        }
      );
    }
  };

  const checkoutPay = (
    source_id: string,
    new_billing_address_id: number | null = null
  ) => {
    let billing_address_id = new_billing_address_id
      ? new_billing_address_id
      : activeBillingAddress;
    if (!billing_address_id) {
      if (billingAddRadioSelect === "same_as_shipping")
        billing_address_id = myCart?.shipping_address_id?.toString();
      else return;
    }

    setBillingAddress(
      { address_id: Number(billing_address_id) },
      {
        onSuccess: () => {
          setDefaultShipmentMethod(
            { fallback_language: "en" },
            {
              onSuccess: () => {
                setDefaultPaymentMethod(
                  { fallback_language: "en" },
                  {
                    onSuccess: () => {
                      if (
                        myCart &&
                        myCart.shipping_address_id &&
                        myCart.products
                      ) {
                        pay(
                          {
                            billing_adddress_id: Number(billing_address_id),
                            fallback_language: "en",
                            shipping_address_id: myCart.shipping_address_id,
                            source_id: source_id,
                            product_ids: myCart.products.data.map((i) => i.id),
                            selectedCurrency: browserCurrency.currency,
                          },
                          {
                            onSuccess: () => {
                              refetchCart();
                              setCartConfirmed(myCart as Checkout);
                              setCart(null);
                              router.push("/checkout/order-confirmed");
                            },
                            onError: (err) => {
                              setIsSubmit(false);

                              if (err instanceof Error) {
                                const error = JSON.parse(err.message);
                                if (error.message === "requires_action") {
                                  router.replace(
                                    error.next_action.redirect_to_url.url
                                  );
                                }
                              }
                              setApiErrorMessage((err as Error).message);
                            },
                          }
                        );
                      }
                    },
                    onError: (err) => {
                      setIsSubmit(false);
                      setApiErrorMessage((err as Error).message);
                    },
                  }
                );
              },
              onError: (err) => {
                setIsSubmit(false);
                setApiErrorMessage((err as Error).message);
              },
            }
          );
        },
      }
    );
  };

  const checkoutPayAsGuest = async () => {
    setStripeErrorCreatingSource(false);
    const ownerInfo = {
      owner: {
        name: formik.values.stripe_name,
        email: myCart?.email,
      },
    };

    if (elements == null) {
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const expiryDate = elements.getElement(CardExpiryElement);
    const cvc = elements.getElement(CardCvcElement);

    if (stripe && elements && card && expiryDate && cvc) {
      const { error, source } = await stripe.createSource(
        card as StripeCardNumberElement,
        ownerInfo
      );
      if (error || !source) {
        setStripeErrorCreatingSource(true);
        return;
      }
      updateGuestPaymentMethod(
        {
          state: {
            payout: {
              payment_method_name: "CREDIT_CARD",
              card_source: source.id,
            },
          },
          listing_id: listingData.id,
          guest_id: listingData.guest_id,
          first_name: formik.values.stripe_name,
        },
        {
          onSuccess: () => {
            if (myCart && myCart.shipping_address_id) {
              setBillingAddress(
                { address_id: myCart.shipping_address_id },
                {
                  onSuccess: () => {
                    setDefaultPaymentMethod(
                      { fallback_language: "en" },
                      {
                        onSuccess: async () => {
                          if (
                            myCart &&
                            myCart.shipping_address_id &&
                            myCart.products
                          ) {
                            pay(
                              {
                                billing_adddress_id: myCart.shipping_address_id,
                                fallback_language: "en",
                                shipping_address_id: myCart.shipping_address_id,
                                source_id: source.id,
                                product_ids: myCart.products.data.map(
                                  (i) => i.id
                                ),
                                selectedCurrency: browserCurrency.currency,
                              },
                              {
                                onSuccess: () => {
                                  refetchCart();
                                  setCartConfirmed(myCart as Checkout);
                                  setCart(null);
                                  router.push(`/checkout/order-confirmed`);
                                },
                                onError: (err) => {
                                  setIsSubmit(false);

                                  if (err instanceof Error) {
                                    const error = JSON.parse(err.message);
                                    if (error.message === "requires_action") {
                                      router.replace(
                                        error.next_action.redirect_to_url.url
                                      );
                                    }
                                  }
                                  setApiErrorMessage((err as Error).message);
                                },
                              }
                            );
                          }
                        },
                        onError: (err) => {
                          setIsSubmit(false);
                          setApiErrorMessage((err as Error).message);
                        },
                      }
                    );
                  },
                  onError: (err) => {
                    setIsSubmit(false);
                    setApiErrorMessage((err as Error).message);
                  },
                }
              );
            }
          },
        }
      );
    }
  };

  const next = () => {
    setIsSubmit(true);
    if (!isLoggedIn) {
      checkoutPayAsGuest();
      return;
    }

    if (billingAddRadioSelect === "new_address") {
      document.getElementById("createAddressForm")?.click();
      return;
    }

    if (paymentRadioSelect === "new_payment" || !isLoggedIn) {
      formik.submitForm();
    } else if (paymentRadioSelect === "default_payment" && defaultCard) {
      checkoutPay(defaultCard.id);
    } else if (paymentRadioSelect === "other_payment") {
      checkoutPay(activePaymentId);
    }
  };

  return (
    <div>
      <HeaderSeo
        title="Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | Payment"
        description="Extend the life of your wardrobe with GANNIREPEAT: The Easiest and Safest Payment of your Order of Pre-loved GANNI Clothes, Shoes and Accessories."
      />

      {/*Checkout*/}
      <div className="flex flex-wrap lg:bg-lightGrey flex-row-reverse mt-2">
        <CheckoutOrderInfoCheckoutOrderInfo
          showMobileViewOrder={showMobileViewOrder}
          toggleMobileViewOrder={toggleMobileViewOrder}
        />
        <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-form-checkout lg:flex-1">
          {/*Tabs*/}
          <div className="flex flex-wrap tabs" id="tabs-id">
            <div className="w-full">
              <ul className="flex mb-0 list-none pt-3 pb-4 flex-row tabs-nav">
                <li className="-mb-px mr-2 last:mr-0 w-3/4 text-center">
                  <a className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-green">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-green">
                      &nbsp;
                    </span>
                    1.Login
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 w-3/4 text-center">
                  <a className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-green">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-green">
                      &nbsp;
                    </span>
                    2.Delivery
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 w-3/4 text-center">
                  <a className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-green">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-green">
                      &nbsp;
                    </span>
                    3.Payment
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                <div className="py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className="block" id="tab-payment">
                      <h2 className="font-helveticaNeue500 uppercase text-dark text-2xl mb-6">
                        Payment method
                      </h2>
                      <form>
                        {/*Default Card*/}
                        {defaultCard ? (
                          <div className="address-accordion py-6 border-b border-b-grey open">
                            <RadioFormik
                              label="Use default payment method"
                              value="default_payment"
                              name="paymentMethod"
                              onChange={onChangeRadioPayment}
                              active={paymentRadioSelect === "default_payment"}
                            />

                            <div
                              className={`address-collapse py-6 ${
                                paymentRadioSelect === "default_payment"
                                  ? ""
                                  : "hidden"
                              }`}
                            >
                              <div className="flex flex-wrap">
                                <div className="w-full md:w-2/4">
                                  <p className="font-helveticaNeue400 text-sm not-italic mb-4">
                                    {defaultCard.name} <br />
                                    Card ending in •••• {defaultCard.last4}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {/*./Default Card*/}
                        {/*Other Cards*/}
                        {otherCards && otherCards.length > 0 ? (
                          <div className="address-accordion py-6 border-b border-b-grey">
                            <RadioFormik
                              label="Use other saved payment"
                              value="other_payment"
                              name="paymentMethod"
                              onChange={onChangeRadioPayment}
                              active={paymentRadioSelect === "other_payment"}
                              labelClasses={`mb-4 ${
                                paymentRadioSelect === "other_payment"
                                  ? "hidden"
                                  : ""
                              }`}
                            />
                            <div
                              className={`address-collapse py-6 ${
                                paymentRadioSelect === "other_payment"
                                  ? ""
                                  : "hidden"
                              }`}
                            >
                              <div className="flex flex-wrap">
                                {otherCards.map((card, index) => {
                                  return (
                                    <div
                                      className="w-full md:w-2/4 mb-8"
                                      key={index}
                                    >
                                      <RadioFormik
                                        label="Use this card"
                                        value={card.id?.toString()}
                                        name="other_cards"
                                        onChange={onChangeActiveCard}
                                        active={activePaymentId == card.id}
                                        labelClasses="mb-4"
                                        disabled={setCardAsDefaultLoading}
                                      />
                                      <p className="font-helveticaNeue400 text-sm not-italic mb-4">
                                        {card.name} <br />
                                        Card ending in •••• {card.last4}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            {setCardAsDefaultLoading ? (
                              <div className="text-center">Please wait...</div>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="address-accordion py-6 border-b border-b-grey">
                          {!myCards || myCards.card_source.data.length === 0 ? (
                            ""
                          ) : (
                            <RadioFormik
                              label="Add new payment method"
                              value="new_payment"
                              name="paymentMethod"
                              onChange={onChangeRadioPayment}
                              active={paymentRadioSelect === "new_payment"}
                              labelClasses={`mb-4`}
                            />
                          )}
                          <span
                            className={`${
                              paymentRadioSelect === "new_payment" ||
                              !isLoggedIn
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <div className="mb-6">
                              <InputFormik
                                name="stripe_name"
                                label="Name on card"
                                labelClasses="text-sm"
                                onChange={formik.handleChange}
                                value={formik.values.stripe_name}
                                errorMessage={
                                  formik.errors.stripe_name &&
                                  formik.touched.stripe_name
                                    ? formik.errors.stripe_name
                                    : ""
                                }
                              />
                            </div>
                            <div className="mb-6">
                              <label className="label font-helveticaNeue500 text-sm uppercase block mb-2">
                                Card number
                              </label>
                              <CardNumberElement
                                options={{
                                  placeholder: "",
                                  style: invalidStyleStripe,
                                }}
                                className="font-helveticaNeue400 border border-mgrey h-12 block outline-0 w-full text-sm px-4 text-dark rounded-none"
                              />
                            </div>
                            <div className="flex flex-wrap -mx-2">
                              <div className="w-2/4 px-2">
                                <div className="mb-6">
                                  <label className="label font-helveticaNeue500 text-sm uppercase block mb-2">
                                    Expiry date
                                  </label>
                                  <CardExpiryElement
                                    options={{
                                      placeholder: "",
                                      style: invalidStyleStripe,
                                    }}
                                    className="font-helveticaNeue400 border border-mgrey h-12 block outline-0 w-full text-sm px-4 text-dark rounded-none"
                                  />
                                </div>
                              </div>
                              <div className="w-2/4 px-2">
                                <div className="mb-6">
                                  <label className="label font-helveticaNeue500 text-sm uppercase block mb-2">
                                    CVC
                                  </label>
                                  <CardCvcElement
                                    options={{
                                      placeholder: "",
                                      style: invalidStyleStripe,
                                    }}
                                    className="font-helveticaNeue400 border border-mgrey h-12 block outline-0 w-full text-sm px-4 text-dark rounded-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {stripeErrorCreatingSource ? (
                              <ErrorMessage message="Error processing payment"></ErrorMessage>
                            ) : (
                              ""
                            )}

                            {!isSubmit &&
                            isAddPaymentMethodError &&
                            (addPaymentMethodError as Error).message !== "" ? (
                              <ErrorMessage
                                message={
                                  (addPaymentMethodError as Error).message
                                }
                              ></ErrorMessage>
                            ) : (
                              ""
                            )}
                          </span>
                        </div>

                        <h3 className="font-helveticaNeue400 text-lg mt-12">
                          Billing address
                        </h3>
                        {/*Address accordion*/}
                        <div className="address-accordion py-6 border-b border-b-grey open">
                          <RadioFormik
                            label="Billing address is the same as shipping"
                            value="same_as_shipping"
                            name="billingAddress"
                            onChange={onChangeRadioBilling}
                            active={
                              billingAddRadioSelect === "same_as_shipping"
                            }
                          />
                          <div
                            className={`address-collapse py-6 ${
                              billingAddRadioSelect === "same_as_shipping"
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <div className="flex flex-wrap">
                              <div className="w-full md:w-2/4">
                                {myCart && myCart.shipping_address ? (
                                  <address className="font-helveticaNeue400 text-sm not-italic">
                                    {myCart.shipping_address.data.first_name}{" "}
                                    {myCart.shipping_address.data.last_name}{" "}
                                    <br />
                                    {myCart.shipping_address.data.address_1}
                                    <br />
                                    {myCart.shipping_address.data.city}
                                    <br />
                                    {myCart.shipping_address.data.zipcode}
                                    <br />
                                    {myCart.shipping_address.data.country}
                                    <br />+
                                    {
                                      myCart.shipping_address.data.phone_code
                                    }{" "}
                                    {myCart.shipping_address.data.phone}
                                    <br />
                                  </address>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*./Address accordion*/}
                        {/*Address accordion*/}
                        {myCart &&
                        myCart.shipping_address &&
                        myAddresses &&
                        myAddresses.length > 1 ? (
                          <div className="address-accordion py-6 border-b border-b-grey">
                            <RadioFormik
                              label="Use a different billing address"
                              value="different_from_shipping"
                              name="billingAddress"
                              onChange={onChangeRadioBilling}
                              active={
                                billingAddRadioSelect ===
                                "different_from_shipping"
                              }
                              labelClasses={`${
                                billingAddRadioSelect ===
                                "different_from_shipping"
                                  ? "hidden"
                                  : ""
                              }`}
                            />

                            <div
                              className={`address-collapse py-6 ${
                                billingAddRadioSelect ===
                                "different_from_shipping"
                                  ? ""
                                  : "hidden"
                              }`}
                            >
                              <div className="flex flex-wrap">
                                {myAddresses.map(
                                  (
                                    address: UpdateOrCreateAddress,
                                    index: number
                                  ) => {
                                    if (
                                      address.id ===
                                      myCart?.shipping_address?.data.id
                                    )
                                      return "";
                                    return (
                                      <div
                                        className="w-full md:w-2/4"
                                        key={index}
                                      >
                                        <RadioFormik
                                          label="Use this address"
                                          value={address.id?.toString()}
                                          name="billingAddress"
                                          onChange={onChangeActiveAddress}
                                          active={
                                            activeBillingAddress ===
                                            address.id?.toString()
                                          }
                                          labelClasses="mb-4"
                                        />
                                        <address className="font-helveticaNeue400 text-sm not-italic mb-4">
                                          {address.first_name}{" "}
                                          {address.last_name} <br />
                                          {address.address_1}
                                          <br />
                                          {address.city}
                                          <br />
                                          {address.zipcode}
                                          <br />
                                          {address.country}
                                          <br />+{address.phone_code}{" "}
                                          {address.phone}
                                          <br />
                                        </address>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {/*./Address accordion*/}
                        <div className="address-accordion py-6 border-b border-b-grey">
                          <RadioFormik
                            label={
                              isLoggedIn
                                ? "Add new address"
                                : "Other billing address"
                            }
                            value="new_address"
                            name="billingAddress"
                            onChange={onChangeRadioBilling}
                            active={billingAddRadioSelect === "new_address"}
                          />

                          <div
                            className={`address-collapse py-6  ${
                              billingAddRadioSelect === "new_address"
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <AddressForm onChangeValue={onChangeNewAddress} />
                          </div>
                        </div>
                      </form>
                      <div className="mb-6">
                        {apiErrorMessage && !isSubmit && (
                          <ErrorMessage
                            message={apiErrorMessage}
                          ></ErrorMessage>
                        )}
                        <button
                          onClick={next}
                          className="font-helveticaNeue500 text-center px-3 transition-all  border border-dark inline-block text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-xs uppercase w-full py-4 tracking-widest"
                          disabled={
                            setBillingLoading ||
                            payLoading ||
                            paySuccess ||
                            setDefaultPaymentLoading ||
                            updateGuestPaymentLoading
                          }
                        >
                          {isSubmit ? "Processing..." : "place order"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*./Tabs*/}
        </div>
      </div>
      {/*./Checkout*/}
    </div>
  );
}

export default function CheckoutPaymentWrapper() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutPayment />
      </Elements>
    </>
  );
}
