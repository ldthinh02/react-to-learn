import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useAuthentication } from "@/hooks/useAuthentication";
import InputFormik from "@/components/InputFormik";
import CheckboxFormik from "@/components/CheckboxFormik";
import InputPassword from "@/components/InputPassword";
import { useState } from "react";
import Link from "next/link";
import {
  checkoutAsGuestInfoSchema,
  loginInfoSchema,
} from "@/utils/validations";
import { useLogin } from "@/hooks/useLogin";
import ErrorMessage from "@/components/ErrorMessage";
import { useSubscribeNewsletter } from "@/hooks/useNewsletter";
import { CheckoutOrderInfoCheckoutOrderInfo } from "@/components/CheckoutOrderInfo";
import LoginAndRegisterModal from "@/components/Modals/LoginAndRegisterModal";
import { useCheckoutAsGuest } from "@/hooks/useCheckout";
import { useListingData } from "@/hooks/useCart";
import { useCheckIfUserExist } from "@/hooks/useCheckIfUserEmailExist";
import HeaderSeo from "@/components/HeaderSeo";

export default function CheckoutLogin() {
  // Component States
  const [showMobileViewOrder, setShowMobileViewOrder] = useState(false);
  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const [guestEmailExist, setGuestEmailExist] = useState(false);

  const router = useRouter();

  const { isLoggedIn, guest_id } = useAuthentication();

  const setListingData = useListingData((state) => state.setListingData);

  if (isLoggedIn) {
    router.push("/checkout/delivery");
  }

  const toggleMobileViewOrder = () => {
    setShowMobileViewOrder(!showMobileViewOrder);
  };

  const toggleLoginModal = () => {
    setActiveLoginModal(!activeLoginModal);
  };

  // Hooks

  const {
    mutate: login,
    isLoading: isLoginLoading,
    isError: isLoginError,
    error: loginError,
  } = useLogin();

  const {
    mutate: subscribeNewsletter,
    isError: isNewsLetterError,
    error: newsletterError,
  } = useSubscribeNewsletter();

  const {
    mutate: checkoutAsGuest,
    isLoading: checkoutAsGuestLoading,
    isSuccess: checkoutAsGuestSuccess,
  } = useCheckoutAsGuest();
  const { mutate: checkIfUserEmailExist } = useCheckIfUserExist();

  // Forms
  const loginFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      keep_signed_in: false,
    },
    validationSchema: loginInfoSchema,
    onSubmit: (values) => {
      login(values, {
        onSuccess: () => {
          router.push("/checkout/delivery");
        },
      });
    },
  });

  const checkoutAsGuestFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      receive_emails: false,
      terms: false,
    },
    validationSchema: checkoutAsGuestInfoSchema,
    onSubmit: (values) => {
      checkIfUserEmailExist(
        { email: values.email },
        {
          onSuccess: (data) => {
            if (!data.email_found) {
              // Call subscribe api only if checkbox ticked
              if (values.receive_emails) {
                subscribeNewsletter(values.email, {
                  // Continue only if subscribed successfully
                  onError: () => {
                    return;
                  },
                  onSuccess: () => {
                    checkoutAsGuest(values, {
                      onSuccess: () => {
                        setListingData({
                          guest_id: `${guest_id}`,
                          email: checkoutAsGuestFormik.values.email,
                        });
                        router.push("/checkout/delivery");
                      },
                    });
                  },
                });
                // Skip subscribe
              } else {
                checkoutAsGuest(values, {
                  onSuccess: () => {
                    setListingData({
                      guest_id: `${guest_id}`,
                      email: checkoutAsGuestFormik.values.email,
                    });
                    router.push("/checkout/delivery");
                  },
                });
              }
            } else {
              setGuestEmailExist(true);
              return;
            }
          },
        }
      );
    },
  });

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Checkout Login"
        description="GanniRepeat - Checkout Login"
      />

      {/*Checkout*/}
      <div className="flex flex-wrap lg:bg-lightGrey flex-row-reverse">
        <CheckoutOrderInfoCheckoutOrderInfo
          showMobileViewOrder={showMobileViewOrder}
          toggleMobileViewOrder={toggleMobileViewOrder}
        />
        <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1">
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
                  <a className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-mgrey">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-grey">
                      &nbsp;
                    </span>
                    2.Delivery
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 w-3/4 text-center">
                  <a className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-mgrey">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-grey">
                      &nbsp;
                    </span>
                    3.Payment
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                <div className="py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className="block" id="tab-login">
                      <h2 className="font-helveticaNeue500 uppercase text-dark text-2xl lg:text-5xl mb-2">
                        Sign in or checkout as a guest
                      </h2>
                      {/*Line*/}
                      <div className="mt-12">
                        <hr className="border-t-grey my-8" />
                      </div>
                      {/*./Line*/}
                      <p className="text-lg mb-6">Sign in to your account </p>
                      <form onSubmit={loginFormik.handleSubmit}>
                        <div className="mb-6">
                          <InputFormik
                            name="email"
                            label="Email"
                            onChange={loginFormik.handleChange}
                            value={loginFormik.values.email}
                            errorMessage={
                              loginFormik.errors.email &&
                              loginFormik.touched.email
                                ? loginFormik.errors.email
                                : ""
                            }
                          />
                        </div>
                        <div className="mb-6">
                          <InputPassword
                            name="password"
                            label="Password"
                            onChange={loginFormik.handleChange}
                            value={loginFormik.values.password}
                            errorMessage={
                              loginFormik.errors.password &&
                              loginFormik.touched.password
                                ? loginFormik.errors.password
                                : ""
                            }
                          />
                        </div>
                        <div className="mb-6">
                          <a
                            onClick={toggleLoginModal}
                            className="font-helveticaNeue500 text-sm uppercase underline cursor-pointer"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <div
                          className="mb-6"
                          aria-labelledby="checkbox-group"
                          role="group"
                        >
                          <CheckboxFormik
                            name="keep_signed_in"
                            onChange={loginFormik.handleChange}
                            checked={loginFormik.values.keep_signed_in}
                            content={"Keep me signed in"}
                          />
                        </div>
                        {isLoginError && (
                          <ErrorMessage
                            message={(loginError as Error).message}
                          ></ErrorMessage>
                        )}
                        <div className="mb-6">
                          <button
                            disabled={isLoginLoading}
                            className="font-helveticaNeue500 text-center px-3 transition-all  border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                            type="submit"
                          >
                            {isLoginLoading ? "Loading..." : "Sign In"}
                          </button>
                        </div>
                      </form>

                      {/*Line*/}
                      <div className="mt-12">
                        <hr className="border-t-grey my-8" />
                      </div>
                      {/*./Line*/}
                      <p className="text-lg mb-4">Checkout as a guest </p>
                      <p className="mb-6">
                        You can create an account after you checkout
                      </p>

                      <form onSubmit={checkoutAsGuestFormik.handleSubmit}>
                        <div className="mb-6">
                          <InputFormik
                            name="email"
                            label="Email"
                            onChange={checkoutAsGuestFormik.handleChange}
                            value={checkoutAsGuestFormik.values.email}
                            errorMessage={
                              checkoutAsGuestFormik.errors.email &&
                              checkoutAsGuestFormik.touched.email
                                ? checkoutAsGuestFormik.errors.email
                                : ""
                            }
                          />
                        </div>
                        <div className="mb-6">
                          <CheckboxFormik
                            name="receive_emails"
                            onChange={checkoutAsGuestFormik.handleChange}
                            checked={
                              checkoutAsGuestFormik.values.receive_emails
                            }
                            content={
                              "Sign up to receive emails from GANNI REPEAT."
                            }
                          />
                        </div>
                        <div className="mb-6">
                          <CheckboxFormik
                            name="terms"
                            onChange={checkoutAsGuestFormik.handleChange}
                            checked={checkoutAsGuestFormik.values.terms}
                            content={
                              <>
                                I hereby agree to the{" "}
                                <Link href="/terms">
                                  <a className="underline">
                                    terms and conditions
                                  </a>
                                </Link>{" "}
                                set out by GANNI REPEAT.
                              </>
                            }
                            errorMessage={
                              checkoutAsGuestFormik.errors.terms &&
                              checkoutAsGuestFormik.touched.terms
                                ? checkoutAsGuestFormik.errors.terms
                                : ""
                            }
                          />
                        </div>
                        {guestEmailExist &&
                        !checkoutAsGuestLoading &&
                        !checkoutAsGuestSuccess ? (
                          <ErrorMessage message="This email address is already linked to an account"></ErrorMessage>
                        ) : (
                          ""
                        )}
                        {isNewsLetterError && (
                          <ErrorMessage
                            message={(newsletterError as Error).message}
                          ></ErrorMessage>
                        )}
                        <div className="mb-6">
                          <button
                            className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                            type="submit"
                          >
                            Checkout as a guest
                          </button>
                        </div>
                      </form>
                    </div>
                    <LoginAndRegisterModal
                      active={activeLoginModal}
                      toggleLoginModal={toggleLoginModal}
                      toggleOther="forgot-password"
                    />
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
