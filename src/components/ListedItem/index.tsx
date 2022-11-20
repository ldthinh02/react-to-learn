import Image from "next/image";
import dayjs from "dayjs";
import { useAddProduct, useGetProductByIds } from "@/hooks/useProductHooks";
import { useRouter } from "next/router";
import { reflauntLoader } from "@/utils/imageLoader";
import { DETAIL_IMAGE } from "@/utils/constants";
import Link from "next/link";
import { getSlug } from "@/utils/file";

interface ListedItem {
  data: GetProductBySellerApiData;
  edit?: boolean;
  sold?: boolean;
  onChangeRemove: (value: string) => void;
}
const ListedItem = ({ data, edit, sold, onChangeRemove }: ListedItem) => {
  const { setProduct, setStep } = useAddProduct();
  const { mutate: getProductById } = useGetProductByIds();
  const router = useRouter();

  const onClickEdit = () => {
    getProductById(data.id, {
      onSuccess: (result: ProductApiData) => {
        const newProduct: ProductData = {
          id: result.id,
          category: formatData(result.categories.data[0]),
          designer: formatData(result.designer?.data),
          condition: formatData(result.condition?.data),
          color_id: formatData(result.color?.data),
          size: formatData(result.size?.data),
          material: formatData(result.material?.data),
          sub_category: formatData(result.categories.data[1]),
          composition: result.additional_material,
          name: result.name,
          description: result.description || "",
          currency: formatData({
            id: result.currency?.data.id,
            name: result.currency?.data.code,
          }),
          images: formatImages(
            result.media.data.map((item) => ({
              id: item.id,
              original_image_path: item.original_image_path,
            }))
          ),
          price: result.price,
          original_price: result.original_price,
          original_price_currency_id: result.original_price_currency_id,
          tag_signs: formatStyle("WEARS", result.styles.data),
          styles: formatStyle("STYLES", result.styles.data),
          original_price_eur: result.price_in_euro,
          shipping: result.shipping_type,
        };
        setProduct(newProduct);
        setStep(4);
        router.push("/sell/step-1");
      },
    });
  };

  const formatStyle = (value: StyleData, data?: Style[]) => {
    const result = data && data.filter((item) => item.style_type === value);
    return (
      result &&
      result.map((item) => ({
        id: item.id,
        name: item.name,
        value: String(item.id),
      }))
    );
  };

  const formatImages = (data: MediaUrl[]) => {
    const listImage: ImageItem[] = data.map((item, index) => ({
      id: item.id,
      label: index < 4 ? DETAIL_IMAGE[index].label : `additional-${index - 4}`,
      image:
        index < 4
          ? DETAIL_IMAGE[index].image
          : "/assets/sketches/dresses/additional.jpg",
      url: item.original_image_path,
    }));
    return listImage;
  };

  const formatData = (data?: { id: number; name: string }) => {
    const option: Option = {
      id: data?.id,
      name: data ? data.name : "",
      value: String(data?.id),
    };
    return option;
  };
  return (
    <div className="bg-white mb-4 border-b border-b-grey">
      <div className="product-popup flex w-full text-left py-4 px-2">
        <div className="thumb w-100">
          <Link href={`/product/${getSlug(data.name, data.id)}`}>
            <a>
              <Image
                loader={reflauntLoader}
                className="w-full"
                src={
                  data.media.data[0]?.original_image ||
                  "/assets/images/Product_Image_thumb.jpg"
                }
                alt=""
                width={100}
                height={120}
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
        <div className="info flex-1 text-sm pl-4">
          <div className="flex flex-wrap justify-between px-2">
            <div className="w-full md:w-auto">
              <h3 className="font-helveticaNeue500 uppercase mb-1">
                {data.name}
              </h3>
              <p className="mb-2">
                {data.currency?.data?.symbol}
                {data.price}
              </p>
              <p className="mb-2">SIZE: {data.size?.data?.name}</p>
            </div>
            {edit && (
              <div className="md:text-right flex-1 w-full md:w-auto">
                <p className="text-green mb-2">
                  Listed on {dayjs(data.created_at).format("DD/MM/YY")}
                </p>
                <p
                  className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                  onClick={onClickEdit}
                >
                  Edit listing
                </p>
                <p
                  className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                  onClick={() => onChangeRemove(data.sku)}
                >
                  Remove listing
                </p>
              </div>
            )}
            {sold && (
              <div className="md:text-right flex-1 w-full md:w-auto">
                <p className="text-green mb-2">
                  Sold on {dayjs(data.updated_at).format("DD/MM/YY")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedItem;
