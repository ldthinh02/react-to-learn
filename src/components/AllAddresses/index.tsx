import Link from "next/link";
import { getCountryName } from "@/utils/index";

interface AllAddresses {
  allAddresses: AddressApiData[];
  countriesData?: CountryApiData[];
  setDefaultAddress: (value: AddressApiData) => void;
}

const AllAddresses = ({
  allAddresses,
  countriesData,
  setDefaultAddress,
}: AllAddresses) => {
  return (
    <div>
      {
        <div className="flex flex-wrap">
          {allAddresses.length > 0 &&
            allAddresses.map((address: AddressApiData) => (
              <div className="w-full md:w-2/4 md:mb-8" key={address.id}>
                {/* Radio button */}
                <div className="mb-6">
                  <label className="custom-radio cursor-pointer block">
                    <input
                      type="radio"
                      className="hidden"
                      name="address"
                      onClick={() => setDefaultAddress(address)}
                      defaultChecked={address.default_address}
                    />
                    <span className="relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[14px] before:h-[14px] before:rounded-full after:absolute after:top-[4px] after:left-[3px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white">
                      Default address
                    </span>
                  </label>
                </div>
                {/* ./Radio button */}
                <address className="font-helveticaNeue400 text-sm not-italic mb-4">
                  {`${address.first_name} ${address.last_name}`} <br />
                  {address.address_1}
                  <br />
                  {address.city}
                  <br />
                  {address.zipcode}
                  <br />
                  {countriesData && address.country
                    ? getCountryName(address.country, countriesData)
                    : ""}
                  <br />
                  {`+${address.phone_code + address.phone}`}
                  <br />
                </address>
                <div className="mb-8 md:mb-0">
                  <Link href={`/my-account/address/${address.id}/edit`}>
                    <a className="font-helveticaNeue500 uppercase text-sm underline">
                      Edit
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  );
};

export default AllAddresses;
