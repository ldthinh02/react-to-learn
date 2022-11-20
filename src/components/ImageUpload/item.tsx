import React, { useEffect, useState } from "react";
import Image from "next/image";
import { reflauntLoader } from "@/utils/imageLoader";
import { validateFile } from "@/utils/index";
import ErrorMessage from "@/components/ErrorMessage";

interface ImageUploadItem {
  item: ImageItem;
  onUploadImage: (value: ImageItem, option: OptionImage) => void;
  isItemAdd?: boolean;
}

const ImageUploadItem = ({
  item,
  onUploadImage,
  isItemAdd,
}: ImageUploadItem) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState("");
  useEffect(() => {
    if (item.url) setLoading(false);
  }, [item.url]);
  return (
    <div className="w-full">
      <input
        id={item.label}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setLoading(true);
            const file = e.target.files[0];
            const { isValid, message } = validateFile(file);
            if (!isValid) {
              setValidationMessage(message);
              setLoading(false);
              return;
            }
            setValidationMessage("");
            item.file = file;
            onUploadImage(item, "create");
          }
        }}
        hidden
      />
      <div className="relative">
        <div
          className="bg-brand-gray-300 w-full h-full relative cursor-pointer"
          onClick={() => document.getElementById(`${item.label}`)?.click()}
        >
          <div className="block align-top">
            <Image
              className="w-full h-full static self-stretch left-[calc(50% - 250px/2)] top-[calc(50% - 250px/2 - 16.5px)]"
              src={
                item.url
                  ? item.url
                  : !loading
                  ? item.image
                  : "/assets/icons/loading.gif"
              }
              background-position="center"
              width={250}
              height={250}
              layout="responsive"
              alt="Product image"
              objectFit="cover"
              loader={reflauntLoader}
            />
            {isItemAdd && !loading && (
              <div className="w-full flex items-center justify-center absolute inset-0">
                <Image
                  src="/assets/icons/bg-default.svg"
                  alt="Button image"
                  width={62}
                  height={68}
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full pt-6">
          <div className="text-xs float-left uppercase">
            {!isItemAdd ? item.label : "Add more"}
          </div>
          <div
            className={`float-right cursor-pointer transition-all mr-[4px] -mt-[4px] w-[16px] h-[16px] ${
              item.url && !isItemAdd ? "rotate-90" : "rotate-45"
            }`}
            onClick={() =>
              item.url && !isItemAdd
                ? onUploadImage(item, "delete")
                : document.getElementById(`${item.label}`)?.click()
            }
          >
            <Image
              className="w-full h-full"
              src="/assets/images/close.svg"
              alt=""
              width={12}
              height={12}
              objectFit="cover"
            />
          </div>
        </div>
        <p className="mt-5 flex">
          {validationMessage && (
            <ErrorMessage message={validationMessage}></ErrorMessage>
          )}
        </p>
      </div>
    </div>
  );
};

export default ImageUploadItem;
