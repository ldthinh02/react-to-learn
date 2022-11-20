import Authenticate from "@/components/Authenticate";
import CheckOtherCountryModal from "@/components/Modals/CheckOtherCountryModal";
import SellComponent from "@/components/Sell";
import ShippingDetail from "@/components/Sell/shipping-detail";
import ShippingForm from "@/components/Sell/shipping-form";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetReloadAddress } from "@/hooks/useGetAddresses";
import { useAddProduct } from "@/hooks/useProductHooks";
import { useUpdateAddress } from "@/hooks/useUpdateAddress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SellStep4() {
  const { isLoggedIn } = useAuthentication();
  const [initialState, setInitialState] = useState<UpdateOrCreateAddress[]>();
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<UpdateOrCreateAddress>();
  const [chooseItem, setChooseItem] = useState<number>(0);
  const [reload, setReload] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const { product, setProduct } = useAddProduct();

  const router = useRouter();

  const { mutate: getAddress } = useGetReloadAddress();
  const { mutate: updateAddress } = useUpdateAddress();

  useEffect(() => {
    if (!initialState || reload) {
      getAddress({ setAddress: setInitialState });
      setReload(false);
    }
  }, [initialState, reload]);

  const onClickNext = () => {
    if (initialState) {
      const accessCountries = ["GB", "SE", "DK", "NO"];
      const address = initialState[chooseItem];
      if (!accessCountries.includes(address.country)) {
        setShow(true);
        return;
      }
      if (!address.default_address) {
        updateAddress({
          ...address,
          default_address: true,
        } as UpdateOrCreateAddress);
      }
      setProduct({ ...product, location_code: address.country });
      router.push("/sell/confirmation");
    }
  };

  if (!isLoggedIn) return <Authenticate />;

  return (
    <div>
      <SellComponent title="List your item">
        <p className="w-full text-[14px]">
          Please confirm the address your item will be shipped from
        </p>
        <hr className="w-full border border-bottom-gray my-[36px]" />
        <p className="w-full text-[14px]">Your address</p>
        {add || (initialState && initialState.length < 1) ? (
          <ShippingForm
            onChangeStatus={(status) => {
              setAdd(status);
              setReload(!status);
              setEdit(undefined);
            }}
          />
        ) : edit ? (
          <ShippingForm
            data={edit}
            onChangeStatus={(status) => {
              setAdd(status);
              setReload(!status);
              setEdit(undefined);
            }}
          />
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-cols-2 gap-4">
            {initialState &&
              initialState.map((item, index) => {
                return (
                  <div
                    className="w-full"
                    key={`${item.country.toString()}${index + 1}`}
                  >
                    <ShippingDetail
                      id={index}
                      label="Use this address"
                      data={item}
                      checked={chooseItem}
                      onChooseRadio={(value) => setChooseItem(value)}
                      onClickEdit={(value) => setEdit(value)}
                    />
                  </div>
                );
              })}
          </div>
        )}
        {!add && !edit && initialState && initialState.length > 0 && (
          <div className="w-full">
            <hr className="w-full border border-bottom-gray my-[36px]" />
            <p
              className="text-[14px] uppercase underline cursor-pointer"
              onClick={() => setAdd(true)}
            >
              Add new address
            </p>

            <div className="flex flex-wrap -mx-2 mt-[48px] mb-[40px]">
              <div className="w-2/4 px-2">
                <div className="mb-6">
                  <button
                    className="text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark w-full uppercase text-xs tracking-widest py-4"
                    onClick={() => router.push("/sell/step-3")}
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
                    onClick={onClickNext}
                  >
                    next step
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SellComponent>
      <CheckOtherCountryModal
        toggleCheckCurrencyModal={() => setShow(!show)}
        active={show}
      />
    </div>
  );
}
