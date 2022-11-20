import { useFormik } from "formik";
import ErrorMessage from "@/components/ErrorMessage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import InputFormik from "@/components/InputFormik";
import { registerInfoSchema } from "@/utils/validations";
import CheckboxFormik from "@/components/CheckboxFormik";
import InputPassword from "@/components/InputPassword";
import { useConvertGuestToUser, useRegister } from "@/hooks/useRegister";
import { onEvent } from "@/utils/gtag";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { useCart, useListingData } from "@/hooks/useCart";
import Link from "next/link";
import CheckoutOrderConfirmedInfo from "@/components/CheckoutOrderConfirmedInfo";
import { useForceOrders } from "@/hooks/useForceOrders";
import Cookies from "js-cookie";
import { useCartConfirmed } from "@/hooks/useCartConfirmed";
import HeaderSeo from "@/components/HeaderSeo";

export default function CheckoutOrderConfirmed() {
  const [showMobileViewOrder, setShowMobileViewOrder] = useState(false);
  const { isLoggedIn } = useAuthentication();
  const setCart = useCart((state) => state.setCart);
  const { setCartConfirmed } = useCartConfirmed();
  const router = useRouter();
  const query = router.query;

  const toggleMobileViewOrder = () => {
    setShowMobileViewOrder(!showMobileViewOrder);
  };

  const {
    mutate: register,
    isLoading: isRegisterLoading,
    isError: isRegisterError,
    error: registerError,
  } = useRegister();

  const { mutate: forceOrders, error, isError } = useForceOrders();

  useEffect(() => {
    if (query.checkout && query.payment_intent) {
      forceOrders(
        {
          checkout_id: query.checkout.toString(),
          payment_intent: query.payment_intent.toString(),
        },
        {
          onSuccess: (data) => {
            if (!isLoggedIn) Cookies.remove("token");
            const prod_ids: number[] = [];
            const convertToGAItems = data.products.data.map((prod) => {
              prod_ids.push(prod.id);
              return {
                product_id: prod.id,
                product_name: prod.name,
                product_category: prod.categories[0].name,
                product_brand: prod.designer_name,
                product_price: prod.base_currency_price,
                product_condition: prod.condition_name,
                product_size: prod.size_name,
                product_color: prod.color_name,
                product_quantity: 1,
                list_position: 1,
              };
            });
            setCart(null);
            const checkoutData = data;
            if (
              checkoutData &&
              checkoutData.checkout_packages &&
              checkoutData.checkout_packages.data &&
              checkoutData.checkout_packages.data.length > 0 &&
              checkoutData.products &&
              checkoutData.products.data &&
              checkoutData.products.data.length > 0
            ) {
              checkoutData.checkout_packages.data =
                checkoutData.checkout_packages.data.map((e) => {
                  const products = checkoutData.products.data.filter(
                    (i) => i.seller_id === e.seller_id
                  );
                  return { ...e, products } as CheckoutPackage;
                });
              setCartConfirmed(checkoutData);
            }
            if (data.order) {
              onEvent("purchase", {
                purchase: {
                  transaction_id: data.order.data.order_id,
                  value: data.order.data.total,
                  currency: data.order.data.currency.data.code,
                  shipping: data.order.data.shipping_fee,
                  content_type: "product",
                  product_ids: prod_ids,
                  items: convertToGAItems,
                },
              });
            }
          },
        }
      );
    }
  }, [query]);

  const { mutate: convertGuestToUser } = useConvertGuestToUser();

  const listingData = useListingData((state) => state.listing_data);

  const registerFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      re_password: "",
      user_name: "",
      email: "",
      confirm_email: "",
      password: "",
      ganni_emails: false,
      sellers_activity: false,
    },
    validationSchema: registerInfoSchema,
    onSubmit: (values) => {
      register(values, {
        onSuccess: (data) => {
          cookies.set("token", data.access_token);
          // onEvent("complete_registration", null);
          onEvent("complete_registration", {});
          convertGuestToUser(listingData.id, {
            onSuccess: () => {
              router.push("/my-account");
            },
          });
        },
      });
    },
  });

  useEffect(() => {
    registerFormik.setFieldValue("email", listingData.email);
  }, [listingData]);

  return (
    <div>
      <HeaderSeo
        title="Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | Confirmation"
        description="Thank you for joining the GANNIREPEATCommunity : A space to Buy and Sell Pre-loved GANNI Clothes, Shoes and Accessories."
      />

      {/*Checkout*/}
      <div className="flex flex-wrap lg:bg-lightGrey flex-row-reverse">
        <CheckoutOrderConfirmedInfo
          showMobileViewOrder={showMobileViewOrder}
          toggleMobileViewOrder={toggleMobileViewOrder}
        />
        <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1">
          <div className="text-center lg:pt-6">
            <Image
              className="w-100 inline-block mb-4"
              src="/assets/images/Repeat.svg"
              alt=""
              width="100%"
              height="100%"
            />
            <h2 className="font-helveticaNeue500 text-4xl text-pink uppercase mb-6">
              YOUR ORDER HAS BEEN CONFIRMED!{" "}
            </h2>
            <p className="mb-6">
              You will receive an email confirmation with your order details
              shortly.
            </p>
            <p className="mb-6">Thank you for repeating. </p>
            {isError && (error as Error).message !== "" ? (
              <ErrorMessage message={(error as Error).message}></ErrorMessage>
            ) : null}
          </div>

          {isLoggedIn ? (
            // REGISTERED USER
            <div className="text-center lg:pt-6">
              <div className="w-full lg:w-420 m-auto">
                <Link href="/section/new-in">
                  <a className="font-helveticaNeue500 text-2xl group text-center px-3 py-4 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark flex items-center justify-center mb-4 uppercase">
                    <svg
                      className="mr-2"
                      width="24"
                      height="15"
                      viewBox="0 0 24 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="group-hover:fill-white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.1219 0.299988V3.77563H4.17069C4.24381 8.20245 6.80482 11.0196 11.4878 10.9463C17.0853 10.9463 19.4268 6.00725 19.4268 0.995038C19.4268 0.762986 19.42 0.53129 19.4099 0.299988H23.9864C23.9955 0.530382 24 0.762118 24 0.995077C24 8.45861 19.3171 14.6781 11.4878 14.6781C8.30481 14.6781 6.07304 13.7634 3.62188 10.983L2.92683 14.0561H0V0.299988H11.1219Z"
                        fill="#111111"
                      />
                    </svg>
                    Shop new in
                  </a>
                </Link>
                <Link href="/sell/step-1">
                  <a className="font-helveticaNeue500 text-2xl group text-center px-3 py-4 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark flex items-center justify-center uppercase">
                    <svg
                      className="mr-2"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="group-hover:fill-white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.3781 19.678V16.2024H20.3293C20.2562 11.7756 17.6952 8.95847 13.0123 9.03178C7.41472 9.03178 5.07327 13.9708 5.07327 18.983C5.07327 19.2151 5.08003 19.4468 5.09012 19.678H0.513632C0.504544 19.4476 0.5 19.2159 0.5 18.983C0.5 11.5195 5.18293 5.3 13.0123 5.3C16.1952 5.3 18.427 6.21461 20.8781 8.99502L21.5732 5.92194H24.5V19.678H13.3781Z"
                        fill="#111111"
                      />
                    </svg>
                    Sell an item
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            // GUEST
            <>
              <div className="mt-12">
                <hr className="my-7 border-t-dark" />
              </div>
              <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4">
                COMPLETE YOUR ACCOUNT AND CHECKOUT FASTER NEXT TIME
              </h3>
              <form onSubmit={registerFormik.handleSubmit}>
                <div className="mb-6">
                  <InputFormik
                    name="first_name"
                    label="First Name"
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.first_name}
                    errorMessage={
                      registerFormik.errors.first_name &&
                      registerFormik.touched.first_name
                        ? registerFormik.errors.first_name
                        : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <InputFormik
                    name="last_name"
                    label="Last Name"
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.last_name}
                    errorMessage={
                      registerFormik.errors.last_name &&
                      registerFormik.touched.last_name
                        ? registerFormik.errors.last_name
                        : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <InputFormik
                    name="email"
                    label="Email"
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.email}
                    errorMessage={
                      registerFormik.errors.email &&
                      registerFormik.touched.email
                        ? registerFormik.errors.email
                        : ""
                    }
                    is_active
                  />
                </div>
                <div className="mb-6">
                  <InputFormik
                    name="confirm_email"
                    label="Confirm Email"
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.confirm_email}
                    errorMessage={
                      registerFormik.errors.confirm_email &&
                      registerFormik.touched.confirm_email
                        ? registerFormik.errors.confirm_email
                        : ""
                    }
                    is_active
                  />
                </div>
                <div className="mb-6">
                  <InputFormik
                    name="user_name"
                    label="Username"
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.user_name}
                    errorMessage={
                      registerFormik.errors.user_name &&
                      registerFormik.touched.user_name
                        ? registerFormik.errors.user_name
                        : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <InputPassword
                    name="password"
                    label="Password"
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.password}
                    errorMessage={
                      registerFormik.errors.password &&
                      registerFormik.touched.password
                        ? registerFormik.errors.password
                        : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <InputPassword
                    name="re_password"
                    label="Confirm password"
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.re_password}
                    errorMessage={
                      registerFormik.errors.re_password &&
                      registerFormik.touched.re_password
                        ? registerFormik.errors.re_password
                        : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <CheckboxFormik
                    name="checkbox_1"
                    onChange={registerFormik.handleChange}
                    checked={registerFormik.values.ganni_emails}
                    content={"Sign up to receive emails from GANNI REPEAT."}
                  />
                </div>
                <div className="mb-6">
                  <CheckboxFormik
                    name="checkbox_2"
                    errorMessage={
                      registerFormik.errors.sellers_activity &&
                      registerFormik.touched.sellers_activity
                        ? registerFormik.errors.sellers_activity
                        : ""
                    }
                    onChange={registerFormik.handleChange}
                    checked={registerFormik.values.sellers_activity}
                    content={
                      <>
                        I hereby agree to the{" "}
                        <a href="#" className="underline">
                          terms and conditions
                        </a>{" "}
                        set out by GANNI REPEAT.
                      </>
                    }
                  />
                </div>
                {isRegisterError && (
                  <ErrorMessage
                    message={(registerError as Error).message}
                  ></ErrorMessage>
                )}
                <div className="mb-6 pb-6">
                  <button
                    type="submit"
                    disabled={isRegisterLoading}
                    className="font-helveticaNeue500 text-2xl text-center px-3 py-4 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase block"
                  >
                    {isRegisterLoading ? "Loading..." : "Create account"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      {/*./Checkout*/}
    </div>
  );
}
