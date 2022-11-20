import { useForgotPassword } from "@/hooks/useForgotPassword";
import { forgotPasswordInfoSchema } from "@/utils/validations";
import { useFormik } from "formik";
import ErrorMessage from "@/components/ErrorMessage";
import InputFormik from "@/components/InputFormik";

interface ForgotPasswordModal {
  setModalStatus: (value: string) => void;
  setEmailToCheck: (value: string) => void;
  toggleLoginModal?: () => void;
  backToPage: boolean;
  emailToCheck: string;
}

const ForgotPasswordModal = ({
  setModalStatus,
  setEmailToCheck,
  toggleLoginModal,
  emailToCheck,
  backToPage,
}: ForgotPasswordModal) => {
  const {
    mutate: forgot,
    isLoading: isForgotLoading,
    isError: isForgotError,
    error: forgotError,
  } = useForgotPassword();
  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: emailToCheck,
    },
    validationSchema: forgotPasswordInfoSchema,
    onSubmit: async (values: { email: string }) => {
      forgot(
        {
          ...values,
          return_url: window.location.origin,
        },
        {
          onSuccess: () => {
            setModalStatus("check-inbox");
            setEmailToCheck(values.email);
          },
        }
      );
    },
  });
  const openLoginModal = () => {
    setModalStatus("login");
  };

  return (
    <div id="forgotPassword-step" className="px-9">
      <div id="beforeSubmission-fpw">
        <div className="text-center mb-8">
          <h3 className="font-helveticaNeue500 text-2xl text-dark uppercase mb-4">
            Forgot your password?
          </h3>
          <p className="text-sm">
            Enter your email address to reset your password.
          </p>
        </div>
        <form action="#" onSubmit={forgotPasswordFormik.handleSubmit}>
          <div className="mb-6">
            <InputFormik
              name="email"
              label="Email address"
              onChange={forgotPasswordFormik.handleChange}
              value={forgotPasswordFormik.values.email}
              errorMessage={
                forgotPasswordFormik.errors.email &&
                forgotPasswordFormik.touched.email
                  ? forgotPasswordFormik.errors.email
                  : ""
              }
            />
          </div>
          {isForgotError && (
            <ErrorMessage
              message={(forgotError as Error).message}
            ></ErrorMessage>
          )}
          <div className="mb-6 pb-2">
            <button
              disabled={isForgotLoading}
              type="submit"
              className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase"
            >
              {isForgotLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <a
            onClick={backToPage ? toggleLoginModal : openLoginModal}
            className="font-helveticaNeue500 text-sm uppercase underline cursor-pointer"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
