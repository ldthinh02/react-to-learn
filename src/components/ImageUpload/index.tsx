import { getChangeImages } from "@/utils/file";
import React from "react";
import ImageUploadItem from "./item";

interface ImageUpload {
  data: ImageItem[];
  onChangeData: (value: ImageItem[]) => void;
  urlImageAdd: string;
  maxItem?: number;
}

const ImageUpload = ({
  data,
  maxItem,
  urlImageAdd,
  onChangeData,
}: ImageUpload) => {
  const max = maxItem || 10;

  const handleUploadImage = async (value: ImageItem, option: OptionImage) => {
    const newData = await getChangeImages(data, value, option, urlImageAdd);
    onChangeData(newData);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-y-5">
      {data.map((item, index) => (
        <div key={item.label.toString()}>
          {index < data.length - 1 ? (
            <div className="pb-2">
              <ImageUploadItem
                item={item}
                onUploadImage={(value, option) =>
                  handleUploadImage(value, option)
                }
              />
            </div>
          ) : index + 1 < max ? (
            <ImageUploadItem
              item={item}
              onUploadImage={(value) => handleUploadImage(value, "add")}
              isItemAdd
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
