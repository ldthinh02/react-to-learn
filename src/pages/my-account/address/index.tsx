import MyAccountSideSection from "@/components/MyAccountSideSection";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useEffect, useState } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetAllCountries } from "@/hooks/useGetCountries";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUpdateAddress } from "@/hooks/useUpdateAddress";
import AllAddresses from "@/components/AllAddresses";
import HeaderSeo from "@/components/HeaderSeo";

const MyAccountProfileAddress = () => {
  const router = useRouter();
  const { data: profileApiData } = useGetMyProfile();
  const { isLoggedIn } = useAuthentication();
  const [allAddresses, setAllAddresses] = useState<AddressApiData[]>([]);
  const { data: countriesData } = useGetAllCountries();

  useEffect(() => {
    if (profileApiData) {
      setAllAddresses(profileApiData.customer.data.addresses.data);
      if (profileApiData.customer.data.addresses.data.length === 0) {
        router.push("/my-account/address/new");
      }
    }
  }, [profileApiData]);

  const { mutate: updateAddress } = useUpdateAddress();
  const setDefaultAddress = (address: AddressApiData) => {
    updateAddress({
      ...address,
      default_address: true,
    } as UpdateOrCreateAddress);
  };
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - My Address"
        description="GanniRepeat - My Account - My Address"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={2} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Address book
            </h2>
            {/* Line */}
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            <AllAddresses
              allAddresses={allAddresses}
              countriesData={countriesData}
              setDefaultAddress={setDefaultAddress}
            />
            {/* line */}
            <hr className="border-t-grey my-8" />
            <div className="mb-6">
              <Link href="/my-account/address/new">
                <a className="font-helveticaNeue500 uppercase text-sm underline">
                  Add new address
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountProfileAddress;
