import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import {
  useAddAndSetShippingAddress,
  useCreateGuestAddress,
  useGetCheckoutCart,
  useSetShippingAddress,
} from "@/hooks/useCheckout";
import { CheckoutOrderInfoCheckoutOrderInfo } from "@/components/CheckoutOrderInfo";
import { RadioFormik } from "@/components/RadioFormik";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useRouter } from "next/router";
import { useCart, useListingData } from "@/hooks/useCart";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import AddressForm from "@/components/AddressForm";
import HeaderSeo from "@/components/HeaderSeo";

export default function CheckoutDelivery() {
  const [editAddress, setEditAddress] = useState<UpdateOrCreateAddress>();
  const [showMobileViewOrder, setShowMobileViewOrder] = useState(false);
  const [radioSelect, setRadioSelect] = useState("");
  const [defaultAddress, setDefaultAddress] =
    useState<UpdateOrCreateAddress | null>(null);
  const [otherAddresses, setOtherAddresses] = useState<UpdateOrCreateAddress[]>(
    []
  );
  const [activeAddressID, setActiveAddressID] = useState<string>();
  const [firstRender, setFirstRender] = useState(false);

  const router = useRouter();

  const {
    data: myAddresses,
    isSuccess,
    refetch: refetchAddresses,
  } = useGetAddresses();

  const { mutate: createAndSetNewAddress, isLoading: createAndSetLoading } =
    useAddAndSetShippingAddress();
  const {
    mutate: setShippingAddress,
    isLoading: setShippingLoading,
    isSuccess: setShippingSuccess,
  } = useSetShippingAddress();

  const { mutate: createGuestAddress, isLoading: createGuestLoading } =
    useCreateGuestAddress();

  const { refetch: refetchCart } = useGetCheckoutCart();

  const { isLoggedIn } = useAuthentication();
  const { data: myProfile } = useGetMyProfile();
  const myCart = useCart((state) => state.cart);
  const listingData = useListingData((state) => state.listing_data);
  const setListingData = useListingData((state) => state.setListingData);

  const createNewAddress = (values: UpdateOrCreateAddress) => {
    if (values) {
      if (!isLoggedIn) {
        const body = { ...values, email: myCart?.email };
        body.phone_code = body.phone_code ? body.phone_code.toString() : "";
        createGuestAddress(
          {
            guest_id: listingData.guest_id,
            state: { shipping_address: body },
          },
          {
            onSuccess: (data: { address: { id: number } }) => {
              setListingData({ ...listingData, ...data });
              setShippingAddress(
                { address_id: data.address.id },
                {
                  onSuccess: () => {
                    refetchCart();
                    router.push("/checkout/payment");
                  },
                }
              );
            },
          }
        );
      } else {
        createAndSetNewAddress(
          { ...values, customer_id: myProfile?.customer.data.id },
          {
            onSuccess: () => {
              refetchCart();
              router.push("/checkout/payment");
            },
          }
        );
      }
    }
  };

  useMemo(() => {
    if (!isSuccess) return;
    if (myAddresses && myAddresses.length > 0) {
      const clone = [...myAddresses];
      const index = clone.findIndex(
        (address: UpdateOrCreateAddress) => address.default_address === true
      );
      if (index !== -1) {
        setDefaultAddress(myAddresses[index]);
        if (!firstRender) {
          setFirstRender(true);
          setRadioSelect("default_address");
        }
      }
      clone.splice(index, 1);
      setOtherAddresses(clone);
      if (index === -1 && !radioSelect && !firstRender) {
        setRadioSelect("other_address");
        setFirstRender(true);
      }
    } else {
      setRadioSelect("new_address");
      setFirstRender(true);
    }
  }, [myAddresses]);

  const toggleMobileViewOrder = () => {
    setShowMobileViewOrder(!showMobileViewOrder);
  };

  const onChangeRadio = (value: RadioInput) => {
    setEditAddress(undefined);
    setRadioSelect(value.target.value);
  };

  const onChangeActiveAddress = (value: RadioInput) => {
    setEditAddress(undefined);
    setActiveAddressID(value.target.value);
  };

  const next = () => {
    if (radioSelect === "new_address" || !isLoggedIn) {
      document.getElementById("createAddressForm")?.click();
    } else {
      let address_id;
      if (radioSelect === "default_address" && defaultAddress)
        address_id = defaultAddress.id;
      else if (activeAddressID) address_id = Number(activeAddressID);
      if (address_id) {
        setShippingAddress(
          { address_id },
          {
            onSuccess: () => {
              refetchCart();
              router.push("/checkout/payment");
            },
          }
        );
      }
    }
  };

  const onChangeStatus = (value: boolean) => {
    if (value) {
      refetchAddresses();
      setEditAddress(undefined);
    }
  };

  const showDetailAddress = (value: UpdateOrCreateAddress) => {
    return (
      <React.Fragment>
        <address className="font-helveticaNeue400 text-sm not-italic mb-4">
          {value.first_name} {value.last_name} <br />
          {value.address_1}
          <br />
          {value.city}
          <br />
          {value.zipcode}
          <br />
          {value.country}
          <br />+{value.phone_code} {value.phone}
          <br />
        </address>
        <div
          className="mb-8 md:mb-0 cursor-pointer font-helveticaNeue500 uppercase text-sm underline"
          onClick={() => {
            if (
              activeAddressID ||
              (defaultAddress?.id && radioSelect === "default_address")
            )
              setEditAddress(value);
          }}
        >
          Edit
        </div>
      </React.Fragment>
    );
  };

  return (
    <div>
      <HeaderSeo
        title="Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | Delivery"
        description="Extend the life of your wardrobe with GANNIREPEAT: The Quickest and Cheapest Delivery of your Order of Pre-loved GANNI Clothes, Shoes and Accessories"
      />

      {/*Checkout*/}
      <div className="flex flex-wrap lg:bg-lightGrey flex-row-reverse mt-2">
        <CheckoutOrderInfoCheckoutOrderInfo
          showMobileViewOrder={showMobileViewOrder}
          toggleMobileViewOrder={toggleMobileViewOrder}
        />
        <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1">
          {/*Tabs*/}
          <div className="flex flex-wrap tabs" id="tabs-id">
            <div className="w-full">
              <ul className="flex mb-0 list-none pt-3 pb-4 flex-row tabs-nav">
                <li className="-mb-px mr-2 last:mr-0 w-3/4 text-center">
                  <div className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-green">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-green">
                      &nbsp;
                    </span>
                    1. Login
                  </div>
                </li>
                <li className="-mb-px mr-2 last:mr-0 w-3/4 text-center">
                  <div className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-green">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-green">
                      &nbsp;
                    </span>
                    2. Delivery
                  </div>
                </li>
                <li className="-mb-px mr-2 last:mr-0 w-3/4 text-center">
                  <div className="text-xs font-helveticaNeue400 px-5 py-3 rounded block leading-normal text-mgrey">
                    <span className="icon w-[18px] h-[21px] block m-auto bg-no-repeat bg-center bg-100% mb-[5px] bg-gannirepeat-grey">
                      &nbsp;
                    </span>
                    3. Payment
                  </div>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                <div className="py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className="block" id="tab-delivery">
                      <h2 className="font-helveticaNeue500 uppercase text-dark text-2xl mb-6">
                        Delivery address
                      </h2>
                      {/*Info block*/}
                      <div className="border border-pink p-4 flex items-center mb-8 lg:mb-12">
                        <div className="w-6">
                          <Image
                            src="/assets/images/Info.svg"
                            alt=""
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <div className="pl-4 text-sm flex-1">
                          <span>
                            The final shipping costs are calculated based on
                            your delivery location and local sales taxes.
                            However, the shipping costs exclude all relevant
                            import duties and customs fees. As the recipient,
                            you will need to pay for these duties and fees upon
                            request by your Local Customs.
                          </span>
                        </div>
                      </div>
                      {/*./Info block*/}
                      {/*Address accordion*/}
                      {defaultAddress && (
                        <div className="address-accordion py-6 border-b border-b-grey open">
                          <RadioFormik
                            label="Use default address"
                            value="default_address"
                            name="address"
                            onChange={onChangeRadio}
                            active={radioSelect === "default_address"}
                          />
                          <div
                            className={`address-collapse py-6  ${
                              radioSelect !== "default_address"
                                ? "hidden"
                                : "block"
                            }`}
                          >
                            <div className="flex flex-wrap">
                              <div className="w-full">
                                {editAddress?.id === defaultAddress.id ? (
                                  <AddressForm
                                    data={defaultAddress}
                                    onChangeStatus={onChangeStatus}
                                    isSave
                                  />
                                ) : (
                                  <div>{showDetailAddress(defaultAddress)}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/*./Address accordion*/}
                      {/*Address accordion*/}
                      {otherAddresses && otherAddresses.length > 0 && (
                        <div className="address-accordion py-6 border-b border-b-grey">
                          <RadioFormik
                            label="Use other saved address"
                            value="other_address"
                            name="address"
                            onChange={onChangeRadio}
                            active={radioSelect === "other_address"}
                          />
                          <div
                            className={`address-collapse py-6  ${
                              radioSelect === "other_address"
                                ? "block"
                                : "hidden"
                            }`}
                          >
                            <div className="flex flex-wrap">
                              {otherAddresses.map((address, index) => {
                                return (
                                  <div
                                    className="w-full md:w-2/4 mb-6"
                                    key={index}
                                  >
                                    <RadioFormik
                                      label="Use this address"
                                      value={address.id?.toString()}
                                      name="other_address"
                                      onChange={onChangeActiveAddress}
                                      active={activeAddressID == address.id}
                                      labelClasses="mb-4"
                                    />
                                    {showDetailAddress(address)}
                                  </div>
                                );
                              })}
                            </div>
                            {editAddress && (
                              <AddressForm
                                data={editAddress}
                                onChangeStatus={onChangeStatus}
                                isSave
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {/*./Address accordion*/}
                      <div className="address-accordion py-6 border-b border-b-grey">
                        {isLoggedIn && defaultAddress && (
                          <RadioFormik
                            label="Add new address"
                            value="new_address"
                            name="address"
                            onChange={onChangeRadio}
                            active={radioSelect === "new_address"}
                          />
                        )}
                        <div
                          className={`address-collapse py-6  ${
                            radioSelect === "new_address" || !isLoggedIn
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          <AddressForm onChangeValue={createNewAddress} />
                        </div>
                      </div>
                      <button
                        onClick={next}
                        className="font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-xs uppercase w-full py-4 tracking-widest"
                        disabled={
                          createAndSetLoading ||
                          setShippingLoading ||
                          createGuestLoading
                        }
                      >
                        {createAndSetLoading ||
                        setShippingLoading ||
                        createGuestLoading ||
                        setShippingSuccess
                          ? "Processing..."
                          : "next step"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*./Tabs*/}
        </div>
      </div>
      {/*./Checkout*/}
    </div>
  );
}
