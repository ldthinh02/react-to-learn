import HeaderSeo from "@/components/HeaderSeo";
import ListedItem from "@/components/ListedItem";
import ListingEmpty from "@/components/ListingEmpty";
import { CheckRemoveProductListingModal } from "@/components/Modals/CheckRemoveProductListingModal";
import MyAccountSideSection from "@/components/MyAccountSideSection";
import Pagination from "@/components/Pagination";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useGetProductsBySeller } from "@/hooks/useGetProductsBySeller";
import { useAddProduct } from "@/hooks/useProductHooks";
import { STATUS_EDIT, SOLD_STATUS } from "@/utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ListedItems = () => {
  const router = useRouter();
  const [products, setProducts] = useState<GetProductBySellerApiData[]>();
  const [pagination, setPagination] = useState<PaginationType>();
  const { resetProduct } = useAddProduct();
  const { data: profileApiData } = useGetMyProfile();
  const { mutate: getProductsBySeller } = useGetProductsBySeller();
  const [open, setOpen] = useState<boolean>(false);
  const [sku, setSku] = useState<string>("a");

  useEffect(() => {
    if (profileApiData) {
      getNewListProduct(profileApiData);
    }
  }, [profileApiData]);

  const getNewListProduct = (profileApiData: ProfileApiData) => {
    getProductsBySeller(
      {
        seller_id: `${profileApiData?.id}`,
        constraints: "",
        page: router.query.page as string,
        per_page: 10,
      },
      {
        onSuccess: (data) => {
          setPagination(data.meta.pagination);
          setProducts(data.data);
          resetProduct();
        },
      }
    );
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - Listed Items"
        description="GanniRepeat - My Account - Listed Items"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={5} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              listed items
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            {products && products.length > 0 ? (
              <div>
                {products.map((item) => {
                  return (
                    <div key={`${item.name.toString()}${item.id}`}>
                      <ListedItem
                        data={item}
                        edit={STATUS_EDIT.includes(
                          item.process_status?.data?.name
                        )}
                        sold={SOLD_STATUS.includes(
                          item.process_status?.data?.name
                        )}
                        onChangeRemove={(value) => {
                          setSku(value);
                          toggleModal();
                        }}
                      />
                    </div>
                  );
                })}
                {pagination && (
                  <div className="pagination w-full flex justify-end mt-40">
                    <Pagination pageNumber={pagination.total_pages} />
                  </div>
                )}
              </div>
            ) : (
              <ListingEmpty
                title="You don't have anything for sale yet!"
                sub_title="Repeat your wardrobe by clickling below."
                isSell
              />
            )}
          </div>
        </div>
      </main>
      {profileApiData && (
        <CheckRemoveProductListingModal
          toggleChangeStatus={toggleModal}
          active={open}
          sku={sku}
          onRefetchData={() => getNewListProduct(profileApiData)}
        />
      )}
    </div>
  );
};

export default ListedItems;
