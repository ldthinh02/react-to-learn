import { useGetMyOffers, useUpdateOffer } from "@/hooks/useOffer";
import { getExpired } from "@/utils/index";
import ErrorMessage from "../ErrorMessage";

export const SellerOfferPending = ({
  offer_id,
  toggleMakeAnOfferModal,
  created_at,
}: {
  offer_id: string;
  created_at: string;
  toggleMakeAnOfferModal: () => void;
}) => {
  const { mutate: updateOffer, error: updateOfferError } = useUpdateOffer();
  const { refetch: refetchMyOffers } = useGetMyOffers();

  const acceptOffer = () => {
    updateOffer(
      { offer_id: offer_id, status: "ACCEPTED" },
      { onSuccess: () => refetchMyOffers() }
    );
  };

  const declineOffer = () => {
    updateOffer(
      { offer_id: offer_id, status: "DECLINED" },
      { onSuccess: () => refetchMyOffers() }
    );
  };

  return (
    <>
      {getExpired(created_at) < 2 && (
        <div>
          <p className="mb-6">
            The offer will expire in {2 - getExpired(created_at)} days so please
            respond at your earliest convenience.
          </p>
          <div className="flex flex-wrap md:-mx-2">
            <div className="w-full md:px-2 mb-4">
              <button
                onClick={acceptOffer}
                className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all border border-dark inline-block text-white bg-dark hover:border-dark hover:text-dark hover:bg-white uppercase tracking-widest w-full"
              >
                Accept
              </button>
            </div>
            <div className="w-full md:w-2/4 md:px-2 mb-4">
              <button
                onClick={declineOffer}
                className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all   border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark uppercase tracking-widest w-full"
              >
                Decline
              </button>
            </div>
            <div className="w-full md:w-2/4 md:px-2 mb-4">
              <button
                onClick={toggleMakeAnOfferModal}
                className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all   border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark uppercase tracking-widest w-full"
              >
                Counteroffer
              </button>
            </div>
            {updateOfferError && (
              <div className="pl-2">
                <ErrorMessage
                  message={(updateOfferError as Error).message}
                ></ErrorMessage>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const SellerOfferAccepted = ({
  openChatBox,
}: {
  openChatBox: () => void;
}) => {
  return (
    <>
      <p className="mb-6">
        The buyer will now be able to purchase the item at the agreed price.
      </p>
      <div className="flex flex-wrap md:-mx-2">
        <div className="w-full md:px-2 mb-4">
          <button
            onClick={openChatBox}
            className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all   border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark uppercase tracking-widest w-full"
          >
            Message buyer
          </button>
        </div>
      </div>
    </>
  );
};

export const SellerOfferCountered = ({
  openChatBox,
}: {
  openChatBox: () => void;
}) => {
  return (
    <>
      <p className="mb-6">
        The buyer will have 2 days to respond to your counteroffer.
      </p>
      <div className="flex flex-wrap md:-mx-2">
        <div className="w-full md:px-2 mb-4">
          <button
            onClick={openChatBox}
            className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all   border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark uppercase tracking-widest w-full"
          >
            Message buyer
          </button>
        </div>
      </div>
    </>
  );
};
