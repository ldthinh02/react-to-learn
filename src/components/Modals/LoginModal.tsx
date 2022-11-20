import React from "react";
import InputPassword from "@/components/InputPassword";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import { useLogin } from "@/hooks/useLogin";
import { loginInfoSchema } from "@/utils/validations";
import InputFormik from "@/components/InputFormik";
import ErrorMessage from "@/components/ErrorMessage";
interface LoginModal {
  setModalStatus: (value: string) => void;
  toggleLoginModal: () => void;
}
const LoginModal = ({ setModalStatus, toggleLoginModal }: LoginModal) => {
  const router = useRouter();

  const {
    mutate: login,
    isLoading: isloginLoading,
    isError: isloginError,
    error: loginError,
  } = useLogin();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginInfoSchema,
    onSubmit: async (values: LoginFormValues) => {
      login(values, {
        onSuccess: (data) => {
          cookies.set("token", data.access_token);
          const redirect_to = router.query.redirect_to;
          toggleLoginModal();
          if (redirect_to) {
            router.push(`${redirect_to}`);
          } else {
            router.push(router.asPath);
          }
        },
      });
    },
  });

  const openForgotPasswordModal = () => {
    setModalStatus("forgot-password");
  };

  const openRegisterModal = () => {
    setModalStatus("register");
  };

  return (
    <div id="login-step" className="px-9">
      <div className="text-center mb-8">
        <h3 className="font-helveticaNeue500 text-2xl text-dark uppercase mb-6">
          Sign into Your GANNI REPEAT account
        </h3>
      </div>
      <form action="#" onSubmit={loginFormik.handleSubmit}>
        <div className="mb-6">
          <InputFormik
            name="email"
            label="Email"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.email}
            errorMessage={
              loginFormik.errors.email && loginFormik.touched.email
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
              loginFormik.errors.password && loginFormik.touched.password
                ? loginFormik.errors.password
                : ""
            }
          />
        </div>
        <div className="mb-6">
          <a
            onClick={openForgotPasswordModal}
            className="font-helveticaNeue500 text-sm text-dark mb-1 block underline cursor-pointer"
          >
            Forgot your password?
          </a>
        </div>
        <div className="mb-6">
          <label className="custom-checkbox type-lg cursor-pointer mb-px inline-block">
            <input type="checkbox" className="hidden" />
            <span className="relative block pl-8 pt-1 text-sm before:absolute before:top-[0px] before:left-0 before:w-[20px] before:h-[20px] before:border before:border-dark after:content-[url('/assets/icons/close.svg')] after:absolute after:top-[3px] after:left-[4px] after:text-white after:font-helveticaNeueLTCom85Heavy after:font-extrabold after:text-base after:hidden">
              Keep me signed in
            </span>
          </label>
        </div>
        {isloginError && (
          <ErrorMessage message={(loginError as Error).message}></ErrorMessage>
        )}
        <div className="mb-6 pb-6">
          <button
            type="submit"
            disabled={isloginLoading}
            className="font-helveticaNeue500 text-xl text-center leading-none pt-[16px] pb-[13px] px-3 transition-all   border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase"
          >
            {isloginLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
      <hr className="my-7 border-t-dark" />
      <div className=" mb-6 text-center">
        <p className="font-helveticaNeue400 text-lg mb-6">
          Don’t have an account?
        </p>
        <a
          onClick={openRegisterModal}
          className="font-helveticaNeue500 text-xl text-center leading-none pt-[16px] pb-[13px] py-4 transition-all border text-green border-green hover:border-green hover:text-white hover:bg-green w-full uppercase block cursor-pointer"
        >
          Create account
        </a>
      </div>
    </div>
  );
};

export default LoginModal;
