import MyAccountSideSection from "@/components/MyAccountSideSection";
import { useEffect, useState } from "react";
import { useGetCountries } from "@/hooks/useGetCountries";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useRouter } from "next/router";
import { useUpdateAddress } from "@/hooks/useUpdateAddress";
import { useShowAddress } from "@/hooks/useShowAddress";
import AllAddresses from "@/components/AllAddresses";
import AddressForm from "@/components/AddressForm";
import HeaderSeo from "@/components/HeaderSeo";

const MyAccountProfileAddressEdit = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: addressDetail, isError: fetchAddressDetailError } =
    useShowAddress(id);
  const [editAddress, setEditAddress] = useState<UpdateOrCreateAddress>();
  const [nextStep, setNexStep] = useState(false);
  const { data: profileApiData } = useGetMyProfile();
  const { data: countriesData } = useGetCountries();
  const { isLoggedIn } = useAuthentication();
  const [allAddresses, setAllAddresses] = useState<AddressApiData[]>([]);

  useEffect(() => {
    if (profileApiData) {
      setAllAddresses(profileApiData.customer.data.addresses.data);
    }
  }, [profileApiData]);
  const { mutate: updateAddress } = useUpdateAddress();

  useEffect(() => {
    if (nextStep) router.push("/my-account/address");
  }, [nextStep]);

  useEffect(() => {
    if (addressDetail) {
      const newAddress: UpdateOrCreateAddress = {
        id: Number(addressDetail.id),
        address_1: addressDetail.address_1,
        first_name: addressDetail.first_name,
        last_name: addressDetail.last_name,
        city: addressDetail.city,
        zipcode: addressDetail.zipcode,
        country: addressDetail.country,
        phone_code: `+${addressDetail.phone_code}`,
        phone: addressDetail.phone,
        default_address: addressDetail.default_address,
      };
      setEditAddress(newAddress);
    }
  }, [addressDetail]);

  const setDefaultAddress = (address: AddressApiData) => {
    updateAddress({
      ...address,
      default_address: true,
    } as UpdateOrCreateAddress);
  };

  if (!isLoggedIn || fetchAddressDetailError) {
    return null;
  }

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - My Address - Add New Address"
        description="GanniRepeat - My Account - My Address - Add New Address"
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
            {/* Line */}
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            <AddressForm
              data={editAddress}
              onChangeStatus={(value) => setNexStep(value)}
              showButton
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountProfileAddressEdit;
