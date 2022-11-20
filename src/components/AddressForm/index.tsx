import { useEffect, useState } from "react";
import InputFormik from "@/components/InputFormik";
import CheckboxFormik from "@/components/CheckboxFormik";
import ErrorMessage from "@/components/ErrorMessage";
import { useFormik } from "formik";
import { editAddressInfoSchema } from "@/utils/validations";
import { useCreateAddress } from "@/hooks/useCreateAddress";
import { validateZipcode } from "@/hooks/useValidateZipcode";
import { useGetListCountries } from "@/hooks/useGetContact";
import SelectSearch from "@/components/Select/search";
import { useUpdateAddress } from "@/hooks/useUpdateAddress";
import { DIGITS_PHONE_COUNTRY } from "@/utils/constants";

interface AddressForm {
  data?: UpdateOrCreateAddress;
  onChangeStatus?: (value: boolean) => void;
  onChangeValue?: (value: UpdateOrCreateAddress) => void;
  setDefault?: boolean;
  showButton?: boolean;
  isSave?: boolean;
}

const AddressForm = ({
  data,
  onChangeValue,
  onChangeStatus,
  setDefault,
  showButton,
  isSave,
}: AddressForm) => {
  const [invalidZipCode, setInvalidZipcode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [digitPhone, setDigitPhone] = useState<number>(10);
  const [errorDigitPhone, setErrorDigitPhone] = useState<boolean>(false);

  const {
    mutate: createAddress,
    isLoading: isCreateAddressLoading,
    error: createAddressError,
    isError: isCreateAddressError,
  } = useCreateAddress();

  const { mutate: updateAddress } = useUpdateAddress();

  const { countries, prefixes } = useGetListCountries();
  const [country, setCountry] = useState<string | undefined>();
  const [prefixPhone, setPrefixPhone] = useState<string | undefined>();

  useEffect(() => {
    if (data) {
      setCountry(data.country);
      const prefix = String(data?.phone_code).split("+")[1];
      setPrefixPhone(prefix ? data.phone_code : `+${data.phone_code}`);
      createAddressFormik.setFieldValue("country", data.country);
      createAddressFormik.setFieldValue("first_name", data.first_name);
      createAddressFormik.setFieldValue("last_name", data.last_name);
      createAddressFormik.setFieldValue("address_1", data.address_1);
      createAddressFormik.setFieldValue("city", data.city);
      createAddressFormik.setFieldValue("zipcode", data.zipcode);
      createAddressFormik.setFieldValue("phone", data.phone);
      createAddressFormik.setFieldValue("phone_code", data.phone_code);
      createAddressFormik.setFieldValue(
        "default_address",
        data.default_address
      );
    }
  }, [data, countries, prefixes]);

  const createAddressFormik = useFormik({
    initialValues: {
      country: "",
      first_name: "",
      last_name: "",
      address_1: "",
      city: "",
      zipcode: "",
      phone: "",
      phone_code: "",
      default_address: setDefault ? false : true,
    },
    validate: (values) => {
      if (values.phone.length < digitPhone - 1) {
        setErrorDigitPhone(true);
      } else {
        setErrorDigitPhone(false);
      }
    },
    validationSchema: editAddressInfoSchema,
    onSubmit: (values: UpdateOrCreateAddress) => {
      if (errorDigitPhone) return;
      setSubmitted(true);
      const valid_zipcode = validateZipcode({
        country: values.country,
        zipcode: values.zipcode,
      });
      if (!valid_zipcode) {
        setInvalidZipcode("Invalid Postal Code");
        setSubmitted(false);
        return;
      }
      const newValue: UpdateOrCreateAddress = {
        ...values,
        id: data?.id,
        country: countries.find((item) => item.name === country)
          ?.value as string,
        phone_code: getPhoneCode(String(values.phone_code)),
        phone: values.phone ? values.phone : "",
        default_address: values.default_address,
        is_default: false,
      };
      if (data) {
        updateAddress(newValue, {
          onSuccess: () => {
            setSubmitted(false);
            onChangeValue?.(newValue);
            onChangeStatus?.(true);
          },
        });
        return;
      }
      if (onChangeValue) {
        onChangeValue(newValue);
        return;
      }
      createAddress(newValue, {
        onSuccess: () => {
          setSubmitted(false);
          onChangeStatus?.(true);
        },
      });
    },
  });

  const getPhoneCode = (value?: string) => {
    if (value) {
      const check = value.split("+");
      return check[1] ? check[1] : value ? value : prefixPhone?.split("+")[1];
    }
    return "";
  };

  const onChangeCountry = (value: Option) => {
    createAddressFormik.setFieldValue(`${value.field}`, value.value);
    setCountry(value.name);
    const checkDigit = DIGITS_PHONE_COUNTRY.find((item) =>
      item.country.includes(String(value.value))
    );
    if (checkDigit) setDigitPhone(checkDigit.digit - 1);
    const prefix = prefixes.find((item) => item.value === value.value);
    if (prefix) {
      createAddressFormik.setFieldValue(
        `phone_code`,
        prefix.name.split("+")[1]
      );
      setPrefixPhone(prefix.name);
    }
  };

  const onChangePrefixPhone = (value: Option) => {
    createAddressFormik.setFieldValue(`${value.field}`, value.name);
  };

  return (
    <form onSubmit={createAddressFormik.handleSubmit}>
      <div className="mb-6">
        <label className="label font-helveticaNeue500 text-sm uppercase block mb-2">
          Country
        </label>
        <SelectSearch
          data={countries || []}
          name="country"
          value={country}
          error={createAddressFormik.errors.country}
          touched={createAddressFormik.touched.country}
          errorMessage={
            createAddressFormik.errors.country &&
            createAddressFormik.touched.country
              ? createAddressFormik.errors.country
              : ""
          }
          onChange={onChangeCountry}
        />
      </div>
      <div className="flex lg:-mx-2 flex-wrap">
        <div className="lg:px-2 w-full lg:w-2/4">
          <div className="mb-6">
            <InputFormik
              name="first_name"
              label="First Name"
              onChange={createAddressFormik.handleChange}
              value={createAddressFormik.values.first_name}
              errorMessage={
                createAddressFormik.errors.first_name &&
                createAddressFormik.touched.first_name
                  ? createAddressFormik.errors.first_name
                  : ""
              }
            />
          </div>
        </div>
        <div className="lg:px-2 w-full lg:w-2/4">
          <div className="mb-6">
            <InputFormik
              name="last_name"
              label="Last Name"
              onChange={createAddressFormik.handleChange}
              value={createAddressFormik.values.last_name}
              errorMessage={
                createAddressFormik.errors.last_name &&
                createAddressFormik.touched.last_name
                  ? createAddressFormik.errors.last_name
                  : ""
              }
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <InputFormik
          name="address_1"
          label="Address"
          onChange={createAddressFormik.handleChange}
          value={createAddressFormik.values.address_1}
          errorMessage={
            createAddressFormik.errors.address_1 &&
            createAddressFormik.touched.address_1
              ? createAddressFormik.errors.address_1
              : ""
          }
        />
      </div>
      <div className="flex lg:-mx-2 flex-wrap">
        <div className="lg:px-2 w-full lg:w-2/4">
          <div className="mb-6">
            <InputFormik
              name="city"
              label="Town or City"
              onChange={createAddressFormik.handleChange}
              value={createAddressFormik.values.city}
              errorMessage={
                createAddressFormik.errors.city &&
                createAddressFormik.touched.city
                  ? createAddressFormik.errors.city
                  : ""
              }
            />
          </div>
        </div>
        <div className="lg:px-2 w-full lg:w-2/4">
          <div className="mb-6">
            <InputFormik
              name="zipcode"
              label="Postal code"
              onChange={createAddressFormik.handleChange}
              value={createAddressFormik.values.zipcode}
              errorMessage={
                createAddressFormik.errors.zipcode &&
                createAddressFormik.touched.zipcode
                  ? createAddressFormik.errors.zipcode
                  : ""
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-1">
        <div className="w-full">
          <label className="label font-helveticaNeue500 text-sm uppercase block mb-2 pl-1">
            Phone number
          </label>
        </div>
        <div className="px-1 w-[110px]">
          <div className="mb-6 z-9999">
            <SelectSearch
              data={prefixes || []}
              name="phone_code"
              value={prefixPhone}
              error={createAddressFormik.errors.phone_code}
              touched={createAddressFormik.touched.phone_code}
              errorMessage={
                createAddressFormik.errors.phone_code &&
                createAddressFormik.touched.phone_code
                  ? createAddressFormik.errors.phone_code
                  : ""
              }
              onChange={onChangePrefixPhone}
            />
          </div>
        </div>
        <div className="px-1 flex-1">
          <div className="mb-6">
            <InputFormik
              name="phone"
              onChange={createAddressFormik.handleChange}
              value={createAddressFormik.values.phone}
              maxValue={digitPhone}
              errorMessage={
                createAddressFormik.errors.phone &&
                createAddressFormik.touched.phone
                  ? createAddressFormik.errors.phone
                  : ""
              }
              isError={errorDigitPhone && createAddressFormik.touched.phone}
            />
            {errorDigitPhone && createAddressFormik.touched.phone && (
              <div className="text-[14px] text-red mt-1">
                Phone number wrong format
              </div>
            )}
          </div>
        </div>
      </div>
      {setDefault && (
        <div className="mb-6">
          <CheckboxFormik
            name="default_address"
            onChange={createAddressFormik.handleChange}
            checked={createAddressFormik.values.default_address || false}
            content="Make default address"
          />
        </div>
      )}
      {isSave && (
        <p
          id="createAddressForm"
          className={`text-[14px] uppercase cursor-pointer underline`}
          onClick={createAddressFormik.submitForm}
        >
          Save
        </p>
      )}
      <p
        id="createAddressForm"
        onClick={() => createAddressFormik.handleSubmit()}
      ></p>

      {isCreateAddressError && !submitted && (
        <ErrorMessage
          message={(createAddressError as Error).message}
        ></ErrorMessage>
      )}
      {invalidZipCode && !submitted && (
        <ErrorMessage message={invalidZipCode}></ErrorMessage>
      )}
      {showButton && (
        <div className="mb-6">
          <button
            className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
            type="submit"
            disabled={isCreateAddressLoading}
          >
            {isCreateAddressLoading ? "Loading..." : "save address"}
          </button>
        </div>
      )}
    </form>
  );
};

export default AddressForm;
