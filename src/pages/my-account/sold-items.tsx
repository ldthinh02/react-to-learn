import MyAccountSideSection from "@/components/MyAccountSideSection";
import Pagination from "@/components/Pagination";
import SoldItem from "@/components/SoldItem";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetPackagesBySeller } from "@/hooks/useGetPackagesBySeller";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import orderBy from "lodash/orderBy";
import ListingEmpty from "@/components/ListingEmpty";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import HeaderSeo from "@/components/HeaderSeo";

const MyAccountSoldItems = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthentication();
  const [packages, setPackages] = useState<OrderPackage[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const { browserCurrency } = useBrowserCurrency();

  const { mutate: getPackagesBySeller } = useGetPackagesBySeller();
  useEffect(() => {
    getPackagesBySeller(
      { page: router.query.page as string },
      {
        onSuccess: (res) => {
          let packagesData = res.data;
          const paginationData = res.meta.pagination;
          if (packagesData.length > 0) {
            packagesData = packagesData.map((d: OrderPackage) => ({
              ...d,
              products: d.order_products.data.map(
                (op) => op.product.data as ProductApiData
              ),
              order_product_status: d.order_products.data.map((op) => {
                let status = String(op.product.data.process_status?.data.name);
                if (status === "ARCHIVED") status = "CANCELLED";
                return status;
              }),
            }));
            packagesData = orderBy(packagesData, ["id"], ["asc"]);
            packagesData = packagesData.map((order, index) => ({
              ...order,
              package_index:
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
            packagesData = orderBy(packagesData, ["package_index"], ["desc"]);
          }
          setPagination(paginationData);
          setPackages(packagesData);
        },
      }
    );
  }, [router.query]);

  if (!isLoggedIn) {
    return null;
  }
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - My Account - Sold Items"
        description="GanniRepeat - My Account - Sold Items"
      />

      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={6} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              sold items
            </h2>
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            {packages && packages.length > 0 ? (
              <div>
                {packages.map((packageData) => {
                  return (
                    <SoldItem
                      packageData={packageData}
                      key={packageData.id}
                      browserCurrency={browserCurrency}
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
                title="You haven't sold anything yet."
                sub_title="Put your wardrobe on repeat by clicking below."
                isSell
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountSoldItems;
