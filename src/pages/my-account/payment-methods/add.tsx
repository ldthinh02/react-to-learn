import MyAccountSideSection from "@/components/MyAccountSideSection";
import { loadStripe, StripeCardNumberElement } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useFormik } from "formik";
import { paymentMethodSchema } from "@/utils/validations";
import InputFormik from "@/components/InputFormik";
import {
  useAddPaymentMethod,
  useSetCardAsDefault,
} from "@/hooks/usePaymentMethod";
import { useGetMyProfile } from "@/hooks/useProfile";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/router";
import HeaderSeo from "@/components/HeaderSeo";

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

export const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {
    mutate: addPaymentMethod,
    isLoading: isAddPaymentMethodLoading,
    error: addPaymentMethodError,
    isError: isAddPaymentMethodError,
  } = useAddPaymentMethod();
  const { data: myProfile } = useGetMyProfile();
  const [stripeErrorCreatingSource, setStripeErrorCreatingSource] =
    useState(false);
  const { mutate: setCardAsDefault } = useSetCardAsDefault();

  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      stripe_name: "",
      default_payment: false,
    },
    validationSchema: paymentMethodSchema,
    onSubmit: () => {
      if (isSubmit || isAddPaymentMethodLoading) return;
      addNewPaymentMethod();
    },
  });

  const addNewPaymentMethod = async () => {
    setIsSubmit(true);
    const ownerInfo = {
      owner: {
        name: formik.values.stripe_name,
        email: myProfile?.email,
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
        { source: source?.id },
        {
          onSuccess: () => {
            if (formik.values.default_payment && source) {
              setCardAsDefault(
                { source: source.id },
                {
                  onSuccess: () => router.push("/my-account/payment-methods"),
                }
              );
            } else {
              router.push("/my-account/payment-methods");
            }
          },
          onError: () => {
            setIsSubmit(false);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="mb-6">
        <InputFormik
          name="stripe_name"
          label="Name on card"
          labelClasses="text-sm"
          onChange={formik.handleChange}
          value={formik.values.stripe_name}
          errorMessage={
            formik.errors.stripe_name && formik.touched.stripe_name
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
              options={{ placeholder: "", style: invalidStyleStripe }}
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
              options={{ placeholder: "", style: invalidStyleStripe }}
              className="font-helveticaNeue400 border border-mgrey h-12 block outline-0 w-full text-sm px-4 text-dark rounded-none"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div
          onClick={formik.submitForm}
          className={`font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest ${
            isSubmit || isAddPaymentMethodLoading ? "" : "cursor-pointer"
          }`}
        >
          {isSubmit || isAddPaymentMethodLoading
            ? "saving"
            : "save payment method"}
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
          message={(addPaymentMethodError as Error).message}
        ></ErrorMessage>
      ) : (
        ""
      )}
    </>
  );
};

const MyAccountAddPaymentMethod = () => {
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - Add Payment Methods"
        description="GanniRepeat - My Account - Add Payment Methods"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={4} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Payment methods
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>

            <form>
              <Elements stripe={stripePromise}>
                <StripeForm />
              </Elements>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountAddPaymentMethod;
