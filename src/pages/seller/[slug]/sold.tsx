import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetProductsBySeller } from "@/hooks/useGetProductsBySeller";
import CardProduct from "@/components/Card/product";
import Pagination from "@/components/Pagination";
import { PROCESS_STATUS } from "@/utils/constants";
import SellerComponent from "@/components/SellerComponent";
import { getId } from "@/utils/file";

const MyProfile = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const [id, setId] = useState<string>();
  const [products, setProducts] = useState<GetProductBySellerApiData[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const { mutate: getProductsBySeller } = useGetProductsBySeller();
  const [profile, setProfile] = useState<CheckProfile>();

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
          process_status: PROCESS_STATUS.SOLD,
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
          title="Sold"
        >
          <div className="w-full">
            {products.length > 0 ? (
              <div className="w-full">
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {products.map((product: GetProductBySellerApiData) => (
                    <>
                      <CardProduct {...product} />
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
                  have any sold items at the moment
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
