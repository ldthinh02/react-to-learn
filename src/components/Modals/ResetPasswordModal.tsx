import { updatePasswordSchema } from "@/utils/validations";
import { useFormik } from "formik";
import ErrorMessage from "@/components/ErrorMessage";
import InputPassword from "@/components/InputPassword";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useRouter } from "next/router";
import { useLogin } from "@/hooks/useLogin";
import jwt from "jwt-decode";
interface ResetPasswordModal {
  setModalStatus: (value: string) => void;
}

const ResetPasswordModal = ({ setModalStatus }: ResetPasswordModal) => {
  const router = useRouter();
  const token = router.query?.token as string;
  const {
    mutate: resetPassword,
    isLoading: isResetPasswordLoading,
    isError: isResetPasswordError,
    error: resetPasswordError,
  } = useResetPassword();
  const { mutate: login } = useLogin();
  const resetPasswordFormik = useFormik({
    initialValues: {
      new_password: "",
      re_new_password: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values: UpdatePassword) => {
      let email = "";
      if (token) {
        const decoded = jwt<{ data: { email: string } }>(token);
        email = decoded.data.email;
      }
      resetPassword(
        { ...values, token: token },
        {
          onSuccess: () => {
            login(
              { email: email, password: values.new_password },
              {
                onSuccess: () => {
                  setModalStatus("reset-password-confirmed");
                  router.replace("/");
                },
              }
            );
          },
        }
      );
    },
  });
  return (
    <div id="resetPassword-step" className="px-9">
      <div id="beforeSubmission-fpw">
        <div className="text-center mb-8">
          <h3 className="font-helveticaNeue500 text-2xl text-dark uppercase mb-4">
            Reset your password
          </h3>
        </div>
        <form action="#" onSubmit={resetPasswordFormik.handleSubmit}>
          <div className="mb-6">
            <InputPassword
              name="new_password"
              label="New Password"
              onChange={resetPasswordFormik.handleChange}
              value={resetPasswordFormik.values.new_password}
              errorMessage={
                resetPasswordFormik.errors.new_password &&
                resetPasswordFormik.touched.new_password
                  ? resetPasswordFormik.errors.new_password
                  : ""
              }
            />
          </div>
          <div className="mb-6">
            <InputPassword
              name="re_new_password"
              label="Confirm new password"
              onChange={resetPasswordFormik.handleChange}
              value={resetPasswordFormik.values.re_new_password}
              errorMessage={
                resetPasswordFormik.errors.re_new_password &&
                resetPasswordFormik.touched.re_new_password
                  ? resetPasswordFormik.errors.re_new_password
                  : ""
              }
            />
          </div>
          {isResetPasswordError && (
            <ErrorMessage
              message={(resetPasswordError as Error).message}
            ></ErrorMessage>
          )}
          <div className="mb-6 pb-2">
            <button
              disabled={isResetPasswordLoading}
              type="submit"
              className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all   border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase"
            >
              {isResetPasswordLoading ? "Loading..." : "Reset password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
