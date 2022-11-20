import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useGetCourier } from "@/hooks/useGetCourier";
import { useGetOrderPackage } from "@/hooks/useGetOrderPackage";
import { useAddTrackingNumber } from "@/hooks/useAddTrackingNumber";
import { useFormik } from "formik";
import { addTrackingNumberInfoSchema } from "@/utils/validations";
import Select from "@/components/Select";
import InputFormik from "@/components/InputFormik";
import { reflauntLoader } from "@/utils/imageLoader";
import ErrorMessage from "@/components/ErrorMessage";
import HeaderSeo from "@/components/HeaderSeo";
import { getSlug } from "@/utils/file";

export default function AddTrackingNumber() {
  const router = useRouter();
  const [couriers, setCouriers] = useState<Option[]>([]);
  const [readonly, setReadonly] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const orderPackageId = useMemo(
    () => router.query.order_package_id as string,
    [router]
  );
  const { data: courierData } = useGetCourier();
  useEffect(() => {
    if (courierData) {
      setCouriers(
        courierData.map((courier: { id: number; name: string }) => ({
          name: courier.name,
          value: `${courier.id}`,
        }))
      );
    }
  }, [courierData]);
  const { data: orderPackageData } = useGetOrderPackage(Number(orderPackageId));

  useEffect(() => {
    if (
      orderPackageData &&
      orderPackageData.courier_id &&
      orderPackageData.tracking_number
    ) {
      formik.setFieldValue("courier_id", orderPackageData.courier_id);
      formik.setFieldValue("tracking_number", orderPackageData.tracking_number);
      setReadonly(true);
    }
  }, [orderPackageData]);
  const { mutate: addTrackingNumber, isLoading: isAddTrackingNumberLoading } =
    useAddTrackingNumber();

  const initialValues = {
    courier_id: "",
    tracking_number: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addTrackingNumberInfoSchema,
    onSubmit: (values) => {
      setError(undefined);
      const data = {
        courier_id: String(values.courier_id),
        tracking_number: values.tracking_number,
        order_id: Number(orderPackageData?.order.data.id),
        order_package_id: Number(orderPackageData?.id),
      };
      addTrackingNumber(data, {
        onSuccess: () => {
          router.push("/shipping/tracking-confirmed");
        },
        onError: (error) => {
          setError(String(error));
        },
      });
    },
  });
  return (
    <div>
      <HeaderSeo
        title="GanniRepeat - Add Tracking Number"
        description="GanniRepeat - Add Tracking Number"
      />

      <div className="flex flex-wrap bg-grey">
        <div className="py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-480">
          <div className="w-full md:w-300 m-auto">
            <h2 className="font-helveticaNeue500 text-xl uppercase mb-6">
              Your products
            </h2>
            <div className="bg-white">
              {/* <!--Product--> */}
              {orderPackageData?.order_products?.data &&
                orderPackageData?.order_products?.data.length > 0 &&
                orderPackageData?.order_products.data.map(
                  (item: OrderProduct, index: number) => (
                    <div
                      className="product-popup flex w-full text-left py-4 px-4"
                      key={index}
                    >
                      <div className="thumb w-100">
                        <a
                          href={`/product/${getSlug(
                            String(item.product.data.name),
                            Number(item.product.data.id)
                          )}`}
                        >
                          <Image
                            className="w-full"
                            src={
                              item.product.data.media?.data[0]
                                .original_image as string
                            }
                            alt=""
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            loader={reflauntLoader}
                          />
                        </a>
                      </div>
                      <div className="info flex-1 text-sm pl-4">
                        <h3 className="font-helveticaNeue500 uppercase mb-1">
                          {item.product?.data.name}
                        </h3>
                        <p>
                          {item.product?.data.currency?.data?.symbol}
                          {item.product?.data.price}
                        </p>
                        <br />
                        {item.product.data.size?.data?.name && (
                          <p>SIZE: {item.product.data.size?.data?.name}</p>
                        )}
                      </div>
                    </div>
                  )
                )}

              {/* <!--./Product--> */}
            </div>
          </div>
        </div>
        <div className="bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1">
          <h2 className="font-helveticaNeue500 text-2xl uppercase mb-6 md:mb-12">
            Add tracking number
          </h2>
          <div className="text-sm">
            <p>Please add the tracking number for your package</p>
          </div>
          {/* <!--line--> */}
          <hr className="border-t-grey my-8" />

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-12">
              <label className="label font-helveticaNeue500 text-sm uppercase block mb-2"></label>
              {couriers.length > 0 && (
                <Select
                  label="courier"
                  name="courier_id"
                  value={`${formik.values.courier_id}`}
                  classes="mt-[12px]"
                  onChange={(value) => {
                    if (!readonly) {
                      formik.setFieldValue(`${value.field}`, value.value);
                    }
                  }}
                  data={couriers}
                  error={formik.errors.courier_id}
                  touched={formik.touched.courier_id}
                  errorMessage={
                    formik.errors.courier_id && formik.touched.courier_id
                      ? formik.errors.courier_id
                      : ""
                  }
                />
              )}
            </div>
            <div className="mb-12">
              <label className="label font-helveticaNeue500 text-sm uppercase block mb-2">
                tracking number
              </label>
              <InputFormik
                id="tracking_number"
                name="tracking_number"
                type="text"
                disabled={readonly}
                onChange={formik.handleChange}
                value={formik.values.tracking_number}
                placeholder="tracking number"
                errorMessage={
                  formik.errors.tracking_number &&
                  formik.touched.tracking_number
                    ? formik.errors.tracking_number
                    : ""
                }
                classes="h-11"
              />
            </div>
            {error && <ErrorMessage message={error} />}
            <div className="mb-6">
              {!readonly ? (
                <button
                  disabled={isAddTrackingNumberLoading}
                  type="submit"
                  className="font-helveticaNeue500 text-center px-3 transition-all border border-dark  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white py-4 text-xs block w-full uppercase tracking-widest"
                >
                  {isAddTrackingNumberLoading ? "loading..." : "Submit"}
                </button>
              ) : (
                <button
                  disabled={true}
                  type="submit"
                  className="font-helveticaNeue500 text-center px-3 transition-all border border-dark text-white bg-dark py-4 text-xs block w-full uppercase tracking-widest cursor-not-allowed opacity-70"
                >
                  Submitted
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
