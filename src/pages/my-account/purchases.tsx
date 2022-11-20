import MyAccountSideSection from "@/components/MyAccountSideSection";
import Pagination from "@/components/Pagination";
import Purchase from "@/components/Purchase";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetOrders } from "@/hooks/useGetOrders";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import orderBy from "lodash/orderBy";
import ListingEmpty from "@/components/ListingEmpty";
import Authenticate from "@/components/Authenticate";
import HeaderSeo from "@/components/HeaderSeo";

const MyAccountPurchases = () => {
  const { isLoggedIn } = useAuthentication();
  const [orders, setOrders] = useState<OrderApiData[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const router = useRouter();

  const { mutate: getOrders } = useGetOrders();

  const getAndSetOrders = () => {
    getOrders(
      { page: router.query.page as string },
      {
        onSuccess: (res) => {
          let ordersData = res.data;
          const paginationData = res.meta.pagination;
          if (ordersData.length > 0) {
            ordersData = orderBy(ordersData, ["id"], ["asc"]);
            ordersData = ordersData.map((order, index) => ({
              ...order,
              order_index:
                (paginationData?.total -
                  paginationData?.per_page * paginationData?.current_page >=
                0
                  ? paginationData?.total -
                    paginationData?.per_page * paginationData?.current_page
                  : paginationData?.total -
                    paginationData?.per_page * paginationData?.current_page -
                    (paginationData?.total -
                      paginationData?.per_page *
                        paginationData?.current_page)) +
                index +
                1,
            }));
            ordersData = orderBy(ordersData, ["order_index"], ["desc"]);
          }
          setOrders(ordersData);
          setPagination(paginationData);
        },
      }
    );
  };

  useEffect(() => {
    getAndSetOrders();
  }, [router.query]);

  if (!isLoggedIn) return <Authenticate />;

  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - Purchases"
        description="GanniRepeat - My Account - Purchases"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={8} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              Purchases
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            {orders.length > 0 ? (
              <div>
                {orders.map((order) => {
                  return (
                    <Purchase
                      order={order}
                      orderPackages={order.order_packages.data}
                      key={order.id}
                      refetchOrders={getAndSetOrders}
                    />
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
                title="You haven't made any purchases yet!"
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

export default MyAccountPurchases;
