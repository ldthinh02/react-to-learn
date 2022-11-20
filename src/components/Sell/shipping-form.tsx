import { useCreateAddress } from "@/hooks/useCreateAddress";
import { useGetContact } from "@/hooks/useGetContact";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useUpdateAddress } from "@/hooks/useUpdateAddress";
import { validateZipcode } from "@/hooks/useValidateZipcode";
import ErrorMessage from "@/components/ErrorMessage";

interface ShippingForm {
  data?: UpdateOrCreateAddress;
  onChangeStatus: (status: boolean) => void;
}

const ShippingForm = ({ data, onChangeStatus }: ShippingForm) => {
  const { countries, prefixes } = useGetContact();
  const [country, setCountry] = useState<string | undefined>();
  const [prefixPhone, setPrefixPhone] = useState<string | undefined>();
  const [submit, setSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { data: dataProfile } = useGetMyProfile();
  const [message, setMessage] = useState<string>();
  const [invalidZipCode, setInvalidZipcode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate: createAddress } = useCreateAddress();
  const { mutate: updateAddress } = useUpdateAddress();

  useEffect(() => {
    if (data) {
      setCountry(data.country);
      setPrefixPhone(`+${data.phone_code}`);
    } else {
      if (countries) setCountry(countries[0]?.name);
      if (prefixes) setPrefixPhone(prefixes[0]?.name);
    }
  }, [data, countries, prefixes]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name:
        dataProfile?.customer.data.first_name || data?.first_name || "",
      last_name: dataProfile?.customer.data.last_name || data?.last_name || "",
      address_1: data?.address_1 || "",
      city: data?.city || "",
      zipcode: data?.zipcode || "",
      phone: data?.phone,
      active: true,
    },
    onSubmit: (values) => {
      if (errors.length < 1 && values && dataProfile) {
        setSubmitted(true);
        const newValue: UpdateOrCreateAddress = {
          ...values,
          id: data?.id,
          country: countries.find((item) => item.name === country)
            ?.value as string,
          phone_code: prefixPhone?.split("+")[1],
          phone: values.phone ? values.phone : "",
          default_address: values.active,
          is_default: false,
        };

        const valid_zipcode = validateZipcode({
          country: newValue.country,
          zipcode: newValue.zipcode,
        });
        if (!valid_zipcode) {
          setInvalidZipcode("Invalid Postal Code");
          setSubmitted(false);
          return;
        }

        if (data) {
          updateAddress(newValue, {
            onSuccess: (data) => {
              setSubmitted(false);
              if (data) onChangeStatus(false);
            },
          });
          return;
        }

        createAddress(newValue, {
          onSuccess: (data) => {
            setSubmitted(false);
            if (data) onChangeStatus(false);
          },
          onError: (error) => {
            setSubmitted(false);
            setMessage(String(error));
          },
        });
      }
    },
  });

  const changeErrors = (value: string, remove?: boolean) => {
    if (!remove && !errors.includes(value)) setErrors([...errors, value]);
    else {
      const newErrors = errors.filter((item) => item !== value);
      setErrors([...newErrors]);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <div className="w-full pt-[24px]">
            <Select
              label="Country"
              name="country"
              value={country}
              onChange={(value) => {
                setCountry(value.name);
                setPrefixPhone(
                  prefixes.find((item) => item.value === value.value)?.name
                );
              }}
              data={countries || []}
              classes="mt-[12px]"
              require
            />
          </div>
          <div className="w-full pt-[24px] grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4">
            <Input
              title="First name"
              name="first_name"
              valueInput={formik.values.first_name}
              placeholder=""
              onChange={formik.handleChange}
              onError={(value, option) => {
                if (value) changeErrors(value, option);
              }}
              click={submit}
              require
            />
            <Input
              title="Last name"
              name="last_name"
              valueInput={formik.values.last_name}
              placeholder=""
              onChange={formik.handleChange}
              onError={(value, option) => {
                if (value) changeErrors(value, option);
              }}
              click={submit}
              require
            />
          </div>

          <div className="w-full pt-[24px]">
            <Input
              title="Address"
              name="address_1"
              valueInput={formik.values.address_1}
              placeholder=""
              onChange={formik.handleChange}
              onError={(value, option) => {
                if (value) changeErrors(value, option);
              }}
              click={submit}
              require
            />
          </div>

          <div className="w-full pt-[24px] grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4">
            <Input
              title="Town or City"
              name="city"
              valueInput={formik.values.city}
              placeholder=""
              onChange={formik.handleChange}
              onError={(value, option) => {
                if (value) changeErrors(value, option);
              }}
              click={submit}
              require
            />
            <Input
              title="Postal code"
              name="zipcode"
              valueInput={formik.values.zipcode}
              placeholder=""
              onChange={formik.handleChange}
              onError={(value, option) => {
                if (value) changeErrors(value, option);
              }}
              click={submit}
              require
            />
          </div>

          <div className="w-full pt-[24px]">
            <p className="text-[14px] uppercase font-helveticaNeue500">
              Phone number
            </p>
            <div className="w-full flex">
              <div className="w-[30%] sm:w-[15%] md:w-[10%]">
                <Select
                  data={prefixes}
                  value={prefixPhone}
                  onChange={(value) => {
                    setPrefixPhone(value.name);
                    setCountry(
                      countries.find((item) => item.value === value.value)?.name
                    );
                  }}
                  classes="mt-[12px]"
                />
              </div>
              <div className="w-[70%] sm:w-[85%]  md:w-[90%] mt-[4px] ml-[8px]">
                <div className="w-full">
                  <div
                    className={`w-full h-min-[44px] mt-[8px] relative p-[9px] border ${
                      !formik.values.phone && formik.touched.phone
                        ? "border-[#DA0714]"
                        : "border-mgrey"
                    }`}
                  >
                    <input
                      className="w-[90%] sm:w-[97%] h-[24px] p-[0px] text-[14px] focus:outline-none"
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      placeholder=""
                      maxLength={10}
                      spellCheck={false}
                      onChange={(e) =>
                        formik.setFieldValue(`${e.target.name}`, e.target.value)
                      }
                    />
                  </div>
                  <div className="w-full">
                    {!formik.values.phone && formik.touched.phone && (
                      <p className="text-[14px] text-red">Required</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full pt-[24px]">
            <div className="form-check">
              <input
                className="form-check-input appearance-none h-[18px] w-[18px] border border-gray-300 rounded-sm bg-white checked:bg-black checked:border-black checked:before:content-[url('/assets/icons/close.svg')] checked:before:text-white relative checked:before:absolute checked:before:top-[1px] checked:before:left-[2px] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                name="active"
                checked={formik.values.active}
                onChange={formik.handleChange}
              />
              <label className="form-check-label inline-block mt-[5px] text-gray-800">
                Save address for future use
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="text-center text-[14px] text-red mt-[48px]">
        {message}
      </div>
      {invalidZipCode && !submitted && (
        <ErrorMessage message={invalidZipCode}></ErrorMessage>
      )}
      <div
        className={`flex flex-wrap -mx-2 ${
          message ? "mt-[8px]" : "mt-[48px]"
        } mb-[40px]`}
      >
        <div className="w-2/4 px-2">
          <div className="mb-6">
            <button
              className="text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark w-full uppercase text-xs tracking-widest py-4"
              onClick={() => {
                onChangeStatus(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
        <div className="w-2/4 px-2">
          <div className="mb-6">
            <button
              type="submit"
              className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
              onClick={() => {
                setSubmit(true);
                formik.handleSubmit();
              }}
            >
              next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
