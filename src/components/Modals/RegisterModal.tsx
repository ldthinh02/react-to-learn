import InputPassword from "@/components/InputPassword";
import { useFormik } from "formik";
import CheckboxFormik from "@/components/CheckboxFormik";
import { registerInfoSchema } from "@/utils/validations";
import { useRegister } from "@/hooks/useRegister";
import InputFormik from "@/components/InputFormik";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import { onEvent } from "@/utils/gtag";
interface RegisterModal {
  setModalStatus: (value: string) => void;
  toggleLoginModal: () => void;
}
const RegisterModal = ({ setModalStatus, toggleLoginModal }: RegisterModal) => {
  const router = useRouter();
  const {
    mutate: register,
    isLoading: isRegisterLoading,
    isError: isRegisterError,
    error: registerError,
  } = useRegister();

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      confirm_email: "",
      password: "",
      re_password: "",
      first_name: "",
      last_name: "",
      user_name: "",
      ganni_emails: false,
      sellers_activity: false,
    },
    validationSchema: registerInfoSchema,
    onSubmit: async (values: RegisterFormValues) => {
      register(values, {
        onSuccess: (data) => {
          cookies.set("token", data.access_token);
          const redirect_to = router.query.redirect_to;
          onEvent("complete_registration", { complete_registration: {} });
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

  const openLoginModal = () => {
    setModalStatus("login");
  };
  return (
    <div id="register-step" className="px-9">
      <div className="text-center mb-8">
        <h3 className="font-helveticaNeue500 text-2xl text-dark uppercase mb-4">
          Create Your GANNI REPEAT account
        </h3>
      </div>
      <form action="#" onSubmit={registerFormik.handleSubmit}>
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
          />
        </div>
        <div className="mb-6">
          <InputFormik
            name="email"
            label="Email"
            onChange={registerFormik.handleChange}
            value={registerFormik.values.email}
            errorMessage={
              registerFormik.errors.email && registerFormik.touched.email
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
            isError={isRegisterError}
          />
          {registerFormik.errors.user_name &&
          registerFormik.touched.user_name ? (
            ""
          ) : isRegisterError ? (
            <p className="text-red text-[14px]">
              {(registerError as Error).message}
            </p>
          ) : (
            <p className="pt-2 text-grey2">
              This will be displayed on your seller profile
            </p>
          )}
        </div>
        <div className="mb-6">
          <InputPassword
            name="password"
            label="Password"
            onChange={registerFormik.handleChange}
            value={registerFormik.values.password}
            errorMessage={
              registerFormik.errors.password && registerFormik.touched.password
                ? registerFormik.errors.password
                : ""
            }
          />
          {!registerFormik.errors.password && !registerFormik.touched.password && (
            <p className="pt-2 text-grey2">
              {`Use 8 or more characters with a mix of uppercase, lowercase,
                numbers & symbols.`}
            </p>
          )}
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
            name="ganni_emails"
            onChange={registerFormik.handleChange}
            checked={registerFormik.values.ganni_emails}
            content={"Sign up to receive emails from GANNI REPEAT."}
          />
        </div>
        <div className="mb-6">
          <CheckboxFormik
            name="sellers_activity"
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
      <hr className="my-7 border-t-dark" />
      <div className=" mb-6 text-center">
        <p className="font-helveticaNeue400 text-lg mb-6">
          Already have an account?
        </p>
        <a
          onClick={openLoginModal}
          className="font-helveticaNeue500 text-2xl text-center px-3 py-4 transition-all text-green border border-green hover:border-green hover:text-white hover:bg-green w-full uppercase block cursor-pointer"
        >
          Sign In
        </a>
      </div>
    </div>
  );
};

export default RegisterModal;
