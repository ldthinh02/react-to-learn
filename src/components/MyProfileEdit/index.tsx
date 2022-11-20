import { useUpdateMyProfile } from "@/hooks/useUpdateMyProfile";
import { myProfileInfoSchema } from "@/utils/validations";
import { useFormik } from "formik";
import InputFormik from "@/components/InputFormik";
import ErrorMessage from "@/components/ErrorMessage";
import dayjs from "dayjs";

interface MyProfileEdit {
  profile: ProfileApiData;
  customer: CustomerApiData;
  setIsEditingProfile: (value: boolean) => void;
  setProfile: (value: ProfileApiData) => void;
}

const MyProfileEdit = ({
  profile,
  customer,
  setIsEditingProfile,
  setProfile,
}: MyProfileEdit) => {
  const {
    mutate: updateProfile,
    isLoading: isUpdateProfileLoading,
    isError: isUpdateProfileError,
    error: updateProfileError,
  } = useUpdateMyProfile();
  const myProfileFormik = useFormik({
    initialValues: {
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: profile.email,
      nickname: customer.nickname,
      birth_day: customer.birth
        ? dayjs(customer.birth).format("MM/DD/YYYY")
        : "",
    },
    validationSchema: myProfileInfoSchema,
    onSubmit: async (values) => {
      updateProfile(
        { ...values, birth: values.birth_day },
        {
          onSuccess: (data) => {
            setProfile(data as ProfileApiData);
            setIsEditingProfile(false);
          },
        }
      );
    },
  });

  return (
    <div>
      <h3 className="font-helveticaNeue400 text-lg mb-4">Profile details</h3>
      <form onSubmit={myProfileFormik.handleSubmit}>
        <div className="mb-6">
          <InputFormik
            name="first_name"
            label="First name"
            onChange={myProfileFormik.handleChange}
            value={myProfileFormik.values.first_name}
            errorMessage={
              myProfileFormik.errors.first_name &&
              myProfileFormik.touched.first_name
                ? myProfileFormik.errors.first_name
                : ""
            }
          />
        </div>
        <div className="mb-6">
          <InputFormik
            name="last_name"
            label="Last name"
            onChange={myProfileFormik.handleChange}
            value={myProfileFormik.values.last_name}
            errorMessage={
              myProfileFormik.errors.last_name &&
              myProfileFormik.touched.last_name
                ? myProfileFormik.errors.last_name
                : ""
            }
          />
        </div>
        <div className="mb-6">
          <InputFormik
            name="email"
            label="Email"
            onChange={myProfileFormik.handleChange}
            value={myProfileFormik.values.email}
            errorMessage={
              myProfileFormik.errors.email && myProfileFormik.touched.email
                ? myProfileFormik.errors.email
                : ""
            }
          />
        </div>
        <div className="mb-6">
          <InputFormik
            name="nickname"
            label="Username"
            onChange={myProfileFormik.handleChange}
            value={myProfileFormik.values.nickname}
            errorMessage={
              myProfileFormik.errors.nickname &&
              myProfileFormik.touched.nickname
                ? myProfileFormik.errors.nickname
                : ""
            }
          />
        </div>
        <div className="mb-6">
          <InputFormik
            name="birth_day"
            label="Date of birth"
            placeholder="DD/MM/YYYY"
            onChange={myProfileFormik.handleChange}
            value={myProfileFormik.values.birth_day}
            errorMessage={
              myProfileFormik.errors.birth_day &&
              myProfileFormik.touched.birth_day
                ? myProfileFormik.errors.birth_day
                : ""
            }
          />
        </div>
        {isUpdateProfileError && (
          <ErrorMessage
            message={(updateProfileError as Error).message}
          ></ErrorMessage>
        )}
        <div className="mb-6">
          <button
            type="submit"
            className="font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-sm uppercase w-full py-4 tracking-widest"
            disabled={isUpdateProfileLoading}
          >
            {isUpdateProfileLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfileEdit;
