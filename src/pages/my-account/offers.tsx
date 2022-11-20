import Offer from "@/components/Offer";
import MyAccountSideSection from "@/components/MyAccountSideSection";
import { useGetMyOffers } from "@/hooks/useOffer";
import ListingEmpty from "@/components/ListingEmpty";

const MyAccountOffers = () => {
  const { data: myOffers } = useGetMyOffers();

  return (
    <div>
      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={9} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Offers
            </h2>
            {/* Line */}
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>

            {myOffers && myOffers.length > 0 ? (
              myOffers.map((offer) => {
                return (
                  <>
                    <Offer offer={offer} />
                  </>
                );
              })
            ) : (
              <ListingEmpty
                title="You haven't made or received offers on any items yet!"
                sub_title=""
                isNewIn
                isSell
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountOffers;
