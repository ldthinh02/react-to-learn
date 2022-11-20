import * as Yup from "yup";

export const registerInfoSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .email("Email is invalid")
    .oneOf([Yup.ref("confirm_email"), null], "Email addresses do not match"),
  confirm_email: Yup.string()
    .required("Required")
    .email("Email is invalid")
    .oneOf([Yup.ref("email"), null], "Email addresses do not match"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short, should be 8 characters minimum")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#=?\$%\^&\*])/,
      "Use 8 or more characters with a mix of uppercase, lowercase, numbers & symbols."
    )
    .oneOf([Yup.ref("re_password"), null], "Passwords do not match"),
  re_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  first_name: Yup.string().required("Required"),
  user_name: Yup.string().required("Required"),
  checkbox_2: Yup.boolean().isTrue("Required"),
});

export const loginInfoSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Email is invalid"),
  password: Yup.string().required("Required"),
});

export const myProfileInfoSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Email is invalid"),
  nickname: Yup.string().required("Required"),
  birth_day: Yup.string()
    .matches(
      /^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      "Invalid"
    )
    .required("Required"),
});

export const forgotPasswordInfoSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Email is invalid"),
});

export const checkoutAsGuestInfoSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Email is invalid"),
  terms: Yup.bool().oneOf([true], "Required"),
});

export const addressSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  address_1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required"),
});

export const paymentMethodSchema = Yup.object().shape({
  stripe_name: Yup.string().required("Required"),
});

export const editAddressInfoSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  address_1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required"),
  phone_code: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone is invalid")
    .required("Required"),
});

export const updatePasswordSchema = Yup.object().shape({
  new_password: Yup.string()
    .required("Required")
    .min(8, "Password is too short, should be 8 characters minimum")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#=?\$%\^&\*])/,
      "Use 8 or more characters with a mix of uppercase, lowercase, numbers & symbols."
    ),
  re_new_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("new_password"), null], "Passwords do not match"),
});

export const messageFormSchema = Yup.object().shape({
  message: Yup.string().required("Required"),
});

export const bankDetailsSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  bank_name: Yup.string().required("Required"),
  first_name: Yup.string().required("Required"),
  account_number: Yup.string().required("Required"),
  sort_code: Yup.string().required("Required"),
});

export const addTrackingNumberInfoSchema = Yup.object().shape({
  courier_id: Yup.string().required("Required"),
  tracking_number: Yup.string().required("Required"),
});

export const addbankAccountInfoSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  bank_name: Yup.string().required("Required"),
  account_number: Yup.string().required("Required"),
});
export const stepOneSchema = Yup.object().shape({
  category: Yup.string().required("Required"),
  condition: Yup.string().required("Required"),
  sub_category: Yup.string().required("Required"),
  color: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  material: Yup.string().required("Required"),
  original_price_currency_id: Yup.string().required("Required"),
  original_price: Yup.string()
    .matches(/^[0-9]*$/, "Invalid")
    .required("Required"),
});
export const verfiyIdSchema = Yup.object().shape({
  option: Yup.string().required("Required"),
  birthday: Yup.string()
    .matches(
      /^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      "Invalid"
    )
    .required("Required"),
});

export const reportIssuePackageSchema = Yup.object().shape({
  problem: Yup.string().required("Required"),
});
