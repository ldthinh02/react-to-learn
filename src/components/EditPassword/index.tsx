import ErrorMessage from "@/components/ErrorMessage";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { updatePasswordSchema } from "@/utils/validations";
import { useFormik } from "formik";
import InputPassword from "@/components/InputPassword";

interface EditPassword {
  setIsEditingProfile: (value: boolean) => void;
}

const EditPassword = ({ setIsEditingProfile }: EditPassword) => {
  const {
    mutate: updatePassword,
    isLoading: isUpdatePasswordLoading,
    isError: isUpdatePasswordError,
    error: updatePasswordError,
  } = useUpdatePassword();

  const updatePasswordFormik = useFormik({
    initialValues: {
      new_password: "",
      re_new_password: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      updatePassword(values, {
        onSuccess: () => {
          setIsEditingProfile(false);
        },
      });
    },
  });

  return (
    <div>
      <h3 className="font-helveticaNeue400 text-lg mb-4">Change password</h3>
      <form onSubmit={updatePasswordFormik.handleSubmit}>
        <div className="mb-6">
          <InputPassword
            name="new_password"
            label="New Password"
            onChange={updatePasswordFormik.handleChange}
            value={updatePasswordFormik.values.new_password}
            errorMessage={
              updatePasswordFormik.errors.new_password &&
              updatePasswordFormik.touched.new_password
                ? updatePasswordFormik.errors.new_password
                : ""
            }
          />
        </div>
        <div className="mb-6">
          <InputPassword
            name="re_new_password"
            label="Confirm new password"
            onChange={updatePasswordFormik.handleChange}
            value={updatePasswordFormik.values.re_new_password}
            errorMessage={
              updatePasswordFormik.errors.re_new_password &&
              updatePasswordFormik.touched.re_new_password
                ? updatePasswordFormik.errors.re_new_password
                : ""
            }
          />
        </div>
        {isUpdatePasswordError && (
          <ErrorMessage
            message={(updatePasswordError as Error).message}
          ></ErrorMessage>
        )}
        <div className="mb-6">
          <button
            type="submit"
            className="font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-sm uppercase w-full py-4 tracking-widest"
            disabled={isUpdatePasswordLoading}
          >
            {isUpdatePasswordLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
