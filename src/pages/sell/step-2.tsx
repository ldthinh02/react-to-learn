import ImageUpload from "@/components/ImageUpload";
import SellComponent from "@/components/Sell";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DATA_SKETCHES, DETAIL_IMAGE } from "@/utils/constants";
import { PhotoGuideModal } from "@/components/Modals/PhotoGuideModal";
import { useAddProduct } from "@/hooks/useProductHooks";
import { useAuthentication } from "@/hooks/useAuthentication";
import Authenticate from "@/components/Authenticate";

export default function SellStep2() {
  const { product, setProduct, setStep } = useAddProduct();
  const { isLoggedIn } = useAuthentication();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const changeImageList = () => {
    if (product.images) {
      const newImages = product.images
        .filter((item) => item.url)
        .map((item) => ({
          ...item,
          file: undefined,
          url: item.url,
        }));
      setImages(addNewImage(newImages));
    } else {
      if (product.images && images.length < 4) {
        setImages(addNewImage(images));
      } else setImages(changeUploadSketches());
    }
  };

  const addNewImage = (data: ImageItem[]) => {
    return [
      ...data,
      {
        id: undefined,
        label: "additional-1",
        image: getImageAdd(),
        file: undefined,
        url: undefined,
      },
    ];
  };

  const getImageAdd = (check?: boolean) => {
    if (check) {
      const category = product.category?.name;
      const subCategory = product.sub_category?.name;
      if (category || subCategory) {
        const folder = DATA_SKETCHES.find(
          (item) =>
            item.title.includes(category) || item.title.includes(subCategory)
        );
        if (folder) {
          return `/assets/sketches/${folder.image}/additional.jpg`;
        }
      }
      return "/assets/sketches/dresses/additional.jpg";
    }
    return "/assets/images/additional.jpg";
  };

  const changeUploadSketches = () => {
    const category = product.category?.name;
    const subCategory = product.sub_category?.name;
    if (category || subCategory) {
      const folder = DATA_SKETCHES.find(
        (item) =>
          item.title.includes(category) || item.title.includes(subCategory)
      );
      if (folder) {
        return DETAIL_IMAGE.map((item) => ({
          ...item,
          image:
            item.label !== "additional"
              ? `/assets/sketches/${folder.image}/${item.label}.jpg`
              : "/assets/images/additional.jpg",
        }));
      }
    }
    return DETAIL_IMAGE;
  };

  useEffect(() => {
    if (product) changeImageList();
  }, [product]);

  const handleUploadImage = () => {
    const checkImages = images.filter((item) => item.url);
    if (checkImages.length < 4) {
      setError(
        "We need at least 4 photos of your item to list it on GANNI REPEAT."
      );
      return;
    }
    setProduct({ ...product, images });
    if (!product.id) setStep(2);
    router.push("/sell/step-3");
  };

  if (!isLoggedIn) return <Authenticate />;

  return (
    <div className="w-full">
      <SellComponent title="List your item">
        <p className="text-[14px]">
          We need at least 4 photos of your item to list it on GANNI REPEAT.
        </p>
        <p className="text-[14px] my-[20px]">
          Please note: we are unable to accept images taken from the internet.
        </p>

        <div className="w-full border border-[#E25B8B] h-[48px] sm:h-[48px] flex">
          <div className="w-[24px] h-[24px] pt-[2px] sm:pt-[0px] m-[8px] sm:m-[12px]">
            <Image src="/assets/icons/info.svg" alt="" width={24} height={24} />
          </div>
          <span className="text-[14px] pt-[14px]">
            See our{" "}
            <u className="cursor-pointer" onClick={() => setShowModal(true)}>
              photo guide
            </u>{" "}
            for more information.
          </span>
        </div>

        <div className="max-w-base mx-auto py-9">
          <ImageUpload
            data={images}
            onChangeData={(value) => setImages(value)}
            urlImageAdd={getImageAdd()}
          />
        </div>

        <div className="w-full">
          {error && (
            <p className="text-[14px] text-red text-center">
              <i>{error}</i>
            </p>
          )}
        </div>

        <div className="flex flex-wrap -mx-2 mt-[48px] mb-[40px]">
          <div className="w-2/4 px-2">
            <div className="mb-6">
              <button
                className="text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark w-full uppercase text-xs tracking-widest py-4"
                onClick={() => router.push("/sell/step-1")}
              >
                Back
              </button>
            </div>
          </div>
          <div className="w-2/4 px-2">
            <div className="mb-6">
              <button
                type="submit"
                className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                onClick={handleUploadImage}
              >
                next step
              </button>
            </div>
          </div>
        </div>
      </SellComponent>
      <PhotoGuideModal
        active={showModal}
        togglePhotoGuideModal={() => setShowModal(false)}
      />
    </div>
  );
}
