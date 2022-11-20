import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetProductsBySeller } from "@/hooks/useGetProductsBySeller";
import Pagination from "@/components/Pagination";
import { PROCESS_STATUS } from "@/utils/constants";
import ProductItem from "@/components/ProductItem";
import SellerComponent from "@/components/SellerComponent";
import { getId } from "@/utils/file";

const MyProfile = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const [id, setId] = useState<string>();
  const [pagination, setPagination] = useState<PaginationType>();
  const [products, setProducts] = useState<GetProductBySellerApiData[]>([]);
  const [profile, setProfile] = useState<CheckProfile>();
  const { mutate: getProductsBySeller } = useGetProductsBySeller();

  useEffect(() => {
    if (slug) {
      setId(getId(slug as string));
    }
  }, [slug]);

  useEffect(() => {
    if (id) {
      getProductsBySeller(
        {
          seller_id: id,
          page: router.query.page as string,
          process_status: PROCESS_STATUS.SELLING,
        },
        {
          onSuccess: (data) => {
            setProducts(data.data);
            setPagination(data.meta.pagination);
          },
        }
      );
    }
  }, [id]);

  return (
    <>
      {id && (
        <SellerComponent
          id={id}
          onChangeProfile={(value) => setProfile(value)}
          title="Selling"
        >
          <div className="w-full">
            {products.length > 0 ? (
              <div className="w-full">
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {products.map((product: GetProductBySellerApiData) => (
                    <>
                      <ProductItem
                        classes="w-full"
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.base_currency_price}
                        image={
                          product.media.data[0].original_image ||
                          "/assets/images/product.png"
                        }
                        size={product.size?.data.name}
                      />
                    </>
                  ))}
                </div>
                {pagination && (
                  <div className="pagination w-full flex justify-end">
                    <Pagination pageNumber={pagination.total_pages} />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="uppercase font-helveticaNeue500 text-[18px]">
                  {profile && !profile.is_myself
                    ? profile.first_name + " does not"
                    : "you don't"}{" "}
                  have any items for sale at the moment
                </p>
              </div>
            )}
          </div>
        </SellerComponent>
      )}
    </>
  );
};

export default MyProfile;
