import HeaderSeo from "@/components/HeaderSeo";
import ListingEmpty from "@/components/ListingEmpty";
import MyAccountSideSection from "@/components/MyAccountSideSection";
import Wishlist from "@/components/Wishlist";
import { useGetMyWishlist } from "@/hooks/useWishlist";
import { useEffect, useState } from "react";

const MyAccountWishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Wishlist[]>([]);

  const { data: myWishlist, isSuccess } = useGetMyWishlist();

  useEffect(() => {
    if (myWishlist && myWishlist !== undefined && myWishlist.length > 0) {
      setWishlistProducts(myWishlist);
    }
  }, [myWishlist]);

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - Wishlist"
        description="GanniRepeat - My Account - Wishlist"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={7} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Wishlist
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            {isSuccess && wishlistProducts && wishlistProducts.length > 0 ? (
              wishlistProducts.map((wishlist) => {
                return (
                  <>
                    <Wishlist
                      product={wishlist.product.data}
                      count={wishlist.likes_count}
                    />
                  </>
                );
              })
            ) : (
              <ListingEmpty
                title="You don't have any items in your wishlist yet!"
                sub_title="Shop pre-loved pieces by clicking below."
                isNewIn
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountWishlist;
