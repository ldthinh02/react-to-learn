import MyAccountSideSection from "@/components/MyAccountSideSection";
import { useAuthentication } from "@/hooks/useAuthentication";
import AddressForm from "@/components/AddressForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeaderSeo from "@/components/HeaderSeo";

const MyAccountProfileAddressAddNew = () => {
  const router = useRouter();
  const [nextStep, setNexStep] = useState(false);

  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (nextStep) router.push("/my-account/address");
  }, [nextStep]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - My Address - Add New Address"
        description="GanniRepeat - My Account - My Address - Add New Address"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-hidden font-normal z-50 mb-[10px]">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={2} />
          </div>
          <div className="bg-white pt-8 pb-12 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Address book
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            <AddressForm
              setDefault={true}
              showButton={true}
              onChangeStatus={(value) => setNexStep(value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountProfileAddressAddNew;
