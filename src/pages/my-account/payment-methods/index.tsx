import MyAccountSideSection from "@/components/MyAccountSideSection";
import { RadioFormik } from "@/components/RadioFormik";
import { useGetAddresses } from "@/hooks/useGetAddresses";
import {
  useDeleteCard,
  useGetPaymentMethods,
  useSetCardAsDefault,
} from "@/hooks/usePaymentMethod";
import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import HeaderSeo from "@/components/HeaderSeo";

const MyAccountPaymentMethods = () => {
  const router = useRouter();
  const [myCards, setMyCards] = useState<StripeCardSource[] | null>(null);
  const [defaultCard, setDefaultCard] = useState<string | null>(null);
  const {
    data: myPaymentMethods,
    isSuccess,
    refetch: refetchCards,
  } = useGetPaymentMethods();
  const { data: myAddresses, isSuccess: getMyAddressSuccess } =
    useGetAddresses();

  const { mutate: setCardAsDefault, isLoading } = useSetCardAsDefault();
  const { mutate: deleteCard } = useDeleteCard();

  useMemo(() => {
    if (!isSuccess) return;
    if (myPaymentMethods && myPaymentMethods.card_source.data.length > 0) {
      setMyCards(myPaymentMethods.card_source.data);
      setDefaultCard(myPaymentMethods.default);
    } else {
      setMyCards(null);
      setDefaultCard(null);
      router.push("/my-account/payment-methods/add");
    }
  }, [myPaymentMethods]);

  const onChangeRadio = (values: RadioInput) => {
    if (defaultCard !== values.target.value) {
      setCardAsDefault(
        { source: values.target.value },
        { onSuccess: () => setDefaultCard(values.target.value) }
      );
    }
  };

  const deleteCardAndRefresh = (id: string) => {
    deleteCard(
      { source: { id: id } },
      {
        onSuccess: () => {
          refetchCards();
        },
      }
    );
  };

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - Payment Methods"
        description="GanniRepeat - My Account - Payment Methods"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={4} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Payment methods
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>

            {getMyAddressSuccess && (
              <>
                {myAddresses && myAddresses.length > 0 ? (
                  <>
                    {myCards && myCards.length > 0 && (
                      <div className="flex flex-wrap">
                        {myCards.map((card, index) => {
                          return (
                            <div className="w-full md:w-2/4 mb-8" key={index}>
                              <div className="mb-6">
                                <RadioFormik
                                  label={
                                    card.id === defaultCard
                                      ? "Default payment account"
                                      : "Make default payment method"
                                  }
                                  disabled={
                                    card.id === defaultCard || isLoading
                                  }
                                  value={card.id}
                                  name="default_payment"
                                  active={card.id === defaultCard}
                                  onChange={onChangeRadio}
                                />
                              </div>
                              <address className="font-helveticaNeue400 text-sm not-italic mb-4">
                                {card.name} <br />
                                {card.brand} <br />
                                **** {card.last4}
                              </address>

                              <div className="mb-8 md:mb-0">
                                <a
                                  onClick={() => deleteCardAndRefresh(card.id)}
                                  className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <hr className="border-t-grey my-8" />
                    <Link href="/my-account/payment-methods/add">
                      <a className="font-helveticaNeue500 uppercase text-sm underline">
                        Add new payment method
                      </a>
                    </Link>
                  </>
                ) : (
                  <div className="border border-pink p-4 flex items-center mb-6 lg:mb-8">
                    <div className="w-6">
                      <Image
                        src="/assets/images/Info.svg"
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="pl-4 text-sm flex-1">
                      <p>
                        Please note that you should add a valid address before
                        your payment method. Click{" "}
                        <Link href="/my-account/address">
                          <a className="cursor-pointer underline">here</a>
                        </Link>{" "}
                        to add an address
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountPaymentMethods;
