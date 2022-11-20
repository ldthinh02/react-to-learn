import { useAddToCart, useCart } from "@/hooks/useCart";
import { useGetMyOffers, useUpdateOffer } from "@/hooks/useOffer";
import { getExpired } from "@/utils/index";
import Image from "next/image";
import { useRouter } from "next/router";
import ErrorMessage from "../ErrorMessage";

interface OfferType {
  offer: Offer;
  toggleMakeAnOfferModal?: () => void;
  openChatBox?: () => void;
}

export const BuyerOfferAccepted = ({ product_id }: { product_id: number }) => {
  const router = useRouter();
  const { mutate: addProductToCart } = useAddToCart();

  const myCart = useCart((state) => state.cart);

  const addToCartAndGoToBag = () => {
    const productInCart =
      !myCart ||
      (myCart.products &&
        myCart.products.data.find((product) => product.id === product_id) !==
          undefined);
    if (productInCart) {
      router.push("/checkout/shopping-bag");
      return;
    }
    addProductToCart(
      { product_id: product_id },
      {
        onSuccess: () => {
          router.push("/checkout/shopping-bag");
        },
      }
    );
  };

  return (
    <>
      <p className="mb-6">
        Please click below to purchase the item at the agreed price.
      </p>
      {/* Info block */}
      <div className="border border-pink p-4 flex items-center mb-8 lg:mb-12">
        <div className="w-6">
          <Image src="/assets/images/Info.svg" alt="" width={24} height={24} />
        </div>
        <div className="pl-4 text-sm flex-1">
          <span>
            Other buyers will still be able to purchase the item until you
            complete the order. Please checkout promptly to avoid missing out.
          </span>
        </div>
      </div>
      {/* ./Info block */}
      <div className="flex flex-wrap md:-mx-2">
        <div className="w-full md:px-2 mb-4">
          <button
            onClick={addToCartAndGoToBag}
            className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all   border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white uppercase tracking-widest w-full"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export const BuyerOfferCountered = ({
  offer,
  toggleMakeAnOfferModal,
}: OfferType) => {
  const { mutate: updateOffer, error: updateOfferError } = useUpdateOffer();
  const { refetch: refetchMyOffers } = useGetMyOffers();

  const acceptOffer = () => {
    updateOffer(
      { offer_id: offer.id, status: "ACCEPTED" },
      { onSuccess: () => refetchMyOffers() }
    );
  };

  return (
    <>
      {getExpired(offer.created_at) < 2 && (
        <>
          <p className="mb-6">
            The offer will expire in {2 - getExpired(offer.created_at)} days so
            please respond at your earliest convenience.
          </p>
          <div className="flex flex-wrap md:-mx-2">
            <div className="w-full md:px-2 mb-4">
              <button
                onClick={acceptOffer}
                className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all  border border-dark inline-block text-white bg-dark hover:border-dark hover:text-dark hover:bg-white uppercase tracking-widest w-full"
              >
                Accept
              </button>
            </div>
            {offer.buyer_counteroffer_count < 3 && (
              <div className="w-full md:px-2 mb-4">
                <button
                  onClick={toggleMakeAnOfferModal}
                  className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all border border-dark inline-block text-dark hover:border-dark hover:text-white hover:bg-dark uppercase tracking-widest w-full"
                >
                  Counteroffer
                </button>
              </div>
            )}
            {updateOfferError && (
              <div className="pl-2">
                <ErrorMessage
                  message={(updateOfferError as Error).message}
                ></ErrorMessage>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export const BuyerOfferSent = ({ offer, openChatBox }: OfferType) => {
  return (
    <>
      {getExpired(offer.created_at) < 2 && (
        <>
          <p className="mb-6">
            The seller has {2 - getExpired(offer.created_at)} days to respond to
            your offer before it expires.
          </p>
          <div className="flex flex-wrap md:-mx-2">
            <div className="w-full md:px-2 mb-4">
              <button
                onClick={openChatBox}
                className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all   border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark uppercase tracking-widest w-full"
              >
                Message seller
              </button>
            </div>
          </div>
          <p className="mb-6">
            You can make up to 3 counteroffers to the seller. You have currently
            sent {offer.buyer_counteroffer_count}{" "}
            {offer.buyer_counteroffer_count === 1
              ? "counteroffer."
              : "counteroffers."}
          </p>
        </>
      )}
    </>
  );
};
