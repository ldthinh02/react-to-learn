import InputFormik from "@/components/InputFormik";
import Select from "@/components/Select";
import { useGenerateShippingLabel } from "@/hooks/useGenerateShippingLabel";
import { useGetCountries } from "@/hooks/useGetCountries";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useInvalidateToken } from "@/hooks/useInvalidateToken";
import { useSaveAddressViaToken } from "@/hooks/useSaveAddressViaToken";
import { useShipmentLandingPage } from "@/hooks/useShipmentLandingPage";
import { useShipmentProducts } from "@/hooks/useShipmentProducts";
import { useUpdatePartnerShipment } from "@/hooks/useUpdatePartnerShipment";
import { validateZipcode } from "@/hooks/useValidateZipcode";
import { editAddressInfoSchema } from "@/utils/validations";
import { useFormik } from "formik";
import ErrorMessage from "@/components/ErrorMessage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { reflauntLoader } from "@/utils/imageLoader";
import HeaderSeo from "@/components/HeaderSeo";

export default function GenerateLabelConfirmation() {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const [shipment, setShipment] = useState<Shipment>();
  const { data: myProfile } = useGetMyProfile();
  const [allAddresses, setAllAddresses] = useState<AddressApiData[]>([]);
  const [addressSelected, setAddressSelected] = useState<AddressApiData | null>(
    null
  );
  const [countries, setCountries] = useState<{ name: string; value: string }[]>(
    []
  );
  const [phoneCodes, setPhoneCodes] = useState<
    { name: string; value: string }[]
  >([]);
  const { data: countriesData } = useGetCountries();
  const { mutate: saveAddress, isLoading: isSaveAddressLoading } =
    useSaveAddressViaToken();
  const { mutate: generateLabel, isLoading: isGenerateLabelLoading } =
    useGenerateShippingLabel();
  const { mutate: updateShipment } = useUpdatePartnerShipment();
  const { mutate: invalidateToken } = useInvalidateToken();

  const createLabel = () => {
    generateLabel(
      {
        height: router.query.height as string,
        length: router.query.length as string,
        shipmentId: router.query.shipment as string,
        token: router.query.token as string,
        transaction_id: router.query.transaction as string,
        weight: Number(router.query.weight),
        width: router.query.width as string,
        productData,
        dropOffLocationLink,
      },
      {
        onSuccess: (shipment) => {
          setConfirm(true);
          setShipment(shipment as Shipment);
        },
        onError: () => {
          setConfirm(true);
          updateShipment(
            {
              shipmentId: router.query.shipment as string,
              courier_name: "manual",
              type: "manual",
            },
            {
              onSuccess: (data) => {
                setShipment(data as Shipment);
                invalidateToken({
                  height: router.query.height as string,
                  length: router.query.length as string,
                  shipmentId: router.query.shipment as string,
                  token: router.query.token as string,
                  transaction_id: router.query.transaction as string,
                  weight: Number(router.query.weight),
                  width: router.query.width as string,
                });
              },
            }
          );
        },
      }
    );
  };

  const submit = () => {
    if (!addressSelected) {
      return false;
    }
    const data = {
      address_1: addressSelected.address_1,
      address_2: "",
      city: addressSelected.city,
      country: addressSelected.country,
      country_alpha2_code: addressSelected.country,
      first_name: addressSelected.first_name,
      last_name: addressSelected.last_name,
      phone: `+${addressSelected.phone_code}-${addressSelected.phone}`,
      phone_code: addressSelected.phone_code,
      postal_code: addressSelected.zipcode,
      state: addressSelected.state,
      title: addressSelected.title,
      token: (router.query.token as string).split(",")[0] as string,
      zipcode: addressSelected.zipcode,
      transaction_id: (router.query.transaction as string).split(
        ","
      )[0] as string,
      type: "label-url",
    } as AddressRfReuest;
    saveAddress(data, {
      onSuccess: () => {
        createLabel();
      },
    });
  };
  useEffect(() => {
    if (countriesData) {
      setCountries(
        countriesData.map((e: CountryApiData) => ({
          name: e.name,
          value: e.alpha2Code,
        }))
      );
      setPhoneCodes(
        countriesData.map((e: CountryApiData) => ({
          name: `+${e.callingCodes[0]}`,
          value: e.callingCodes[0],
        }))
      );
    }
  }, [countriesData]);
  const [invalidZipCode, setInvalidZipcode] = useState("");
  const [submitted] = useState(false);
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
      default_address: false,
    },
    validationSchema: editAddressInfoSchema,
    onSubmit: async (values: UpdateOrCreateAddress) => {
      const valid_zipcode = validateZipcode({
        country: values.country,
        zipcode: values.zipcode,
      });
      if (!valid_zipcode) {
        setInvalidZipcode("Invalid Postal Code");
        return;
      }
      const data = {
        address_1: values.address_1,
        address_2: "",
        city: values.city,
        country: values.country,
        country_alpha2_code: values.country,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: `+${values.phone_code}-${values.phone}`,
        phone_code: values.phone_code,
        postal_code: values.zipcode,
        state: values.city,
        title: "",
        token: (router.query.token as string).split(",")[0] as string,
        zipcode: values.zipcode,
        transaction_id: (router.query.transaction as string).split(
          ","
        )[0] as string,
        type: "label-url",
      } as AddressRfReuest;
      saveAddress(data, {
        onSuccess: () => {
          createLabel();
        },
      });
    },
  });
  const onChangeSelect = (value: Option) => {
    createAddressFormik.setFieldValue(`${value.field}`, value.value);
  };
  const [isNew, setIsNew] = useState<boolean>(false);
  const addNewAddress = () => {
    setIsNew(true);
    setAddressSelected(null);
  };

  useEffect(() => {
    if (myProfile) {
      if (myProfile.customer.data.addresses.data.length > 0) {
        setAllAddresses(myProfile.customer.data.addresses.data);
        setAddressSelected(
          myProfile.customer.data.addresses.data.find(
            (i: AddressApiData) => i.is_home
          ) || myProfile.customer.data.addresses.data[0]
        );
      } else {
        setIsNew(true);
      }
    }
  }, [myProfile]);
  const addressChanged = (address: AddressApiData) => {
    setAddressSelected(address);
    setIsNew(false);
  };
  const { data: productData } = useShipmentProducts(
    router.query.product as string
  );
  const { data: shipmentData } = useShipmentLandingPage(
    router.query.shipment as string
  );

  useEffect(() => {
    if (shipmentData) {
      setShipment(shipmentData);
    }
  }, [shipmentData?.status]);

  const dropOffLocationLink = useMemo(() => {
    switch (addressSelected?.country) {
      case "GB":
        return "https://www.dpdlocal-online.co.uk/products-and-services/dpd-drop-off";
        break;
      case "DE":
        return "https://www.dpd.com/de/en/pickup-paketshops/paketshop-finden/";
        break;
      case "FR":
        return "https://www.chronopost.fr/en#/step-home";
        break;
      case "SE":
      case "DK":
        return "https://www.postnord.se/en/our-tools/find-service-point";
        break;
      default:
        return "https://google.com";
    }
  }, [addressSelected]);
  if (!myProfile || !productData || !shipmentData) return "Loading...";

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Generate Shipping Label Confirmation"
        description="GanniRepeat - Generate Shipping Label Confirmation"
      />

      {shipment &&
        shipment.type !== "manual" &&
        !shipment.shipping_label_url &&
        !confirm && (
          <div className="flex flex-wrap bg-grey">
            <div className="py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-480">
              <div className="w-full md:w-300 m-auto">
                <h2 className="font-helveticaNeue500 text-xl uppercase mb-6">
                  Your products
                </h2>
                <div className="bg-white">
                  {/*Product*/}
                  {productData &&
                    productData.length > 0 &&
                    productData.map((item: ProductReflaunt, index: number) => (
                      <div
                        key={index}
                        className="product-popup flex w-full text-left py-4 px-4"
                      >
                        <div className="thumb w-100">
                          <Image
                            className="w-full"
                            src={item.image?.data[0].original_url as string}
                            alt=""
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            loader={reflauntLoader}
                          />
                        </div>
                        <div className="info flex-1 text-sm pl-4">
                          <h3 className="font-helveticaNeue500 uppercase mb-1">
                            {item.name}
                          </h3>
                          {item && item.price && (
                            <p>
                              {item?.price.price} {item.currency?.data?.symbol}
                            </p>
                          )}
                          <br />
                          <p>SIZE: {item?.size?.data?.name}</p>
                        </div>
                      </div>
                    ))}

                  {/*./Product*/}
                </div>
              </div>
            </div>
            <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1">
              <h2 className="font-helveticaNeue500 text-2xl uppercase mb-6 md:mb-12">
                Confirm your address
              </h2>
              <div className="text-sm">
                <p>Please confirm the address your item will be shipped from</p>
              </div>
              {/*line*/}
              <hr className="border-t-grey my-8" />
              <div className="flex flex-wrap">
                {allAddresses &&
                  allAddresses.length > 0 &&
                  allAddresses.map((item: AddressApiData, index: number) => (
                    <div className="w-full md:w-2/4" key={index}>
                      {/*Radio button*/}
                      <div className="mb-6">
                        <label className="custom-radio cursor-pointer block">
                          <input
                            type="radio"
                            className="hidden"
                            name="address"
                            checked={!!(item.id === addressSelected?.id)}
                            onChange={() => addressChanged(item)}
                          />
                          <span className="relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[20px] before:h-[20px] before:rounded-full after:absolute after:top-[7px] after:left-[6px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white">
                            Use this address
                          </span>
                        </label>
                      </div>
                      {/*./Radio button*/}
                      <address className="font-helveticaNeue400 text-sm not-italic mb-4">
                        {item.first_name} {item.last_name} <br />
                        {item.address_1}
                        <br />
                        {item.city}
                        <br />
                        {item.zipcode}
                        <br />
                        {item.country}
                        <br />+{item.phone_code} {item.phone}
                        <br />
                      </address>
                    </div>
                  ))}
              </div>
              {/*line*/}
              <hr className="border-t-grey my-8" />

              {/*Add new adddress*/}
              <a
                className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                onClick={addNewAddress}
              >
                Add new address
              </a>
              {isNew && (
                <>
                  <div className="mt-12">
                    <hr className="border-t-grey my-8" />
                  </div>
                  <form action="#" onSubmit={createAddressFormik.handleSubmit}>
                    <div className="mb-6">
                      <label className="label font-helveticaNeue500 text-sm uppercase block mb-2">
                        Country
                      </label>
                      {countries && (
                        <Select
                          data={countries}
                          name="country"
                          error={createAddressFormik.errors.country}
                          touched={createAddressFormik.touched.country}
                          errorMessage={
                            createAddressFormik.errors.country &&
                            createAddressFormik.touched.country
                              ? createAddressFormik.errors.country
                              : ""
                          }
                          onChange={onChangeSelect}
                          classesCustomSelect="font-helveticaNeue400 border !border-mgrey h-[48px] outline-0 w-full text-sm px-4 text-dark rounded-none"
                        />
                      )}
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
                        <label className="label font-helveticaNeue500 text-sm uppercase block mb-2">
                          Phone number
                        </label>
                      </div>
                      <div className="px-1 w-20">
                        <div className="mb-6">
                          {phoneCodes && (
                            <Select
                              data={phoneCodes}
                              name="phone_code"
                              error={createAddressFormik.errors.phone_code}
                              touched={createAddressFormik.touched.phone_code}
                              errorMessage={
                                createAddressFormik.errors.phone_code &&
                                createAddressFormik.touched.phone_code
                                  ? createAddressFormik.errors.phone_code
                                  : ""
                              }
                              onChange={onChangeSelect}
                              classesCustomSelect="font-helveticaNeue400 border !border-mgrey h-[48px] outline-0 w-full text-sm px-4 text-dark rounded-none"
                            />
                          )}
                        </div>
                      </div>
                      <div className="px-1 flex-1">
                        <div className="mb-6">
                          <InputFormik
                            name="phone"
                            onChange={createAddressFormik.handleChange}
                            value={createAddressFormik.values.phone}
                            errorMessage={
                              createAddressFormik.errors.phone &&
                              createAddressFormik.touched.phone
                                ? createAddressFormik.errors.phone
                                : ""
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* {isCreateAddressError && !submitted && (
                    <ErrorMessage
                      message={(createAddressError as Error).message}
                    ></ErrorMessage>
                  )} */}
                    {invalidZipCode && !submitted && (
                      <ErrorMessage message={invalidZipCode}></ErrorMessage>
                    )}
                    <div className="mb-6">
                      <button
                        disabled={
                          isGenerateLabelLoading || isSaveAddressLoading
                        }
                        className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                        type="submit"
                      >
                        {isGenerateLabelLoading || isSaveAddressLoading
                          ? "loading..."
                          : "Confirm"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/*Button*/}
              {!isNew && (
                <div className="mt-12">
                  <button
                    disabled={isGenerateLabelLoading || isSaveAddressLoading}
                    onClick={submit}
                    className="font-helveticaNeue500 text-center px-6 transition-all border border-dark  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                  >
                    {isGenerateLabelLoading || isSaveAddressLoading
                      ? "loading..."
                      : "Confirm"}
                  </button>
                </div>
              )}

              {/*./Button*/}
            </div>
          </div>
        )}

      {shipment && shipment.shipping_label_url && (
        <div className="pb-20 pt-20">
          <div className="container text-center m-auto px-4">
            <div className="text-center mb-8">
              <Image
                className="inline-block w-24"
                src="/assets/images/Package.svg"
                alt=""
                width="100%"
                height="100%"
              />
            </div>
            <h2 className="font-helveticaNeue500 text-pink uppercase text-4xl mb-6">
              IT&apos;S TIME TO SHIP YOUR ITEM!
            </h2>
            <p className="text-sm mb-8">
              Your free shipping label is now ready. Simply click the button
              below to download the label.{" "}
            </p>
            <p className="text-sm mb-8">
              Please ship your item as soon as possible, within 5 days.
            </p>

            <div className="w-full lg:w-240 m-auto">
              {/* <!--Product--> */}
              {productData &&
                productData.length > 0 &&
                productData.map((item: ProductReflaunt, index: number) => (
                  <div
                    className="product-popup mt-8 mb-8 flex w-full text-left"
                    key={index}
                  >
                    <div className="thumb w-100">
                      <Image
                        className="w-full"
                        src={item.images.data[0].original_url}
                        alt=""
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        loader={reflauntLoader}
                      />
                    </div>
                    <div className="info flex-1 text-sm pl-4">
                      <h3 className="font-helveticaNeue500 uppercase mb-1">
                        {item.name}
                      </h3>
                      {item && item.price && (
                        <p>
                          {item?.price.price} {item.currency?.data?.symbol}
                        </p>
                      )}
                      <br />
                      <p>SIZE: {item?.size?.data?.name}</p>
                    </div>
                  </div>
                ))}

              {/* <!--./Product--> */}
            </div>
            <div className="w-full lg:w-420 m-auto">
              <Link href={shipment.shipping_label_url} passHref>
                <a
                  target="_blank"
                  className="font-helveticaNeue500 text-center px-6 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white uppercase text-xs py-4 tracking-widest"
                >
                  download free shipping label
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
      {shipment &&
        shipment.type === "manual" &&
        !shipment.shipping_label_url &&
        shipment.status !== "completed" && (
          <div className="sec-404 pb-20 pt-20">
            <div className="container text-center m-auto px-4">
              <div className="text-center mb-8">
                <Image
                  className="inline-block w-24"
                  src="/assets/images/GanniRepeat_2.svg"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
              <h2 className="font-helveticaNeue500 text-pink uppercase text-4xl mb-6">
                THANK YOUR FOR CONFIRMING!
              </h2>
              <p className="text-sm mb-8">
                We will now generate your free shipping label and email you when
                it&apos;s ready. This can take up to a few hours.{" "}
              </p>
              <p className="text-sm mb-12">
                In the meantime, find your nearest drop-off point by clicking
                the button below.
              </p>

              <div className="w-full lg:w-420 m-auto">
                <Link href={dropOffLocationLink} passHref>
                  <a
                    target="_blank"
                    className="font-helveticaNeue500 text-center px-6 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white uppercase text-xs py-4 tracking-widest"
                  >
                    FIND nearest DROP-OFF POINT
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
