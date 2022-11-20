import Image from "next/image";
import { ChangeEvent, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useUploadImageS3 } from "@/hooks/useUploadImageS3";
import { validateFile } from "@/utils/index";

interface UploadVerifyIdPicture {
  image?: string;
  children?: string;
  onChangePhoto: (value: string) => void;
  id: string;
  required?: boolean;
}

const UploadVerifyIdPicture = ({
  image,
  children,
  onChangePhoto,
  id,
  required,
}: UploadVerifyIdPicture) => {
  const {
    mutate: uploadImage,
    isLoading: isUploadImageLoading,
    isError: isUploadImageError,
    error: uploadImageError,
  } = useUploadImageS3();
  const [validationMessage, setValidationMessage] = useState("");
  const [isPdf, setIsPdf] = useState(false);
  const onUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const { isValid, message } = validateFile(file);
      if (!isValid) {
        setValidationMessage(message);
        return;
      }
      const formData: FormData = new FormData();
      formData.append("files", file, file.name);
      uploadImage(
        { formData },
        {
          onSuccess: (data) => {
            const path = data[0].full_path;
            setIsPdf(data[0].mimetype === "application/pdf");
            if (path) {
              onChangePhoto(path);
            }
          },
        }
      );
    }
  };

  return (
    <div>
      <input id={id} type="file" onChange={(e) => onUploadPhoto(e)} hidden />
      <div
        onClick={() => document.getElementById(id)?.click()}
        className="cursor-pointer"
      >
        <Image
          className="w-full block mb-2"
          src={
            isPdf
              ? "/assets/images/pdf.jpg"
              : image || "/assets/images/input-bg.jpg"
          }
          alt=""
          width={250}
          height={250}
          objectFit="cover"
        />
        {isUploadImageError && (
          <ErrorMessage
            message={(uploadImageError as Error).message}
          ></ErrorMessage>
        )}
        {validationMessage && (
          <ErrorMessage message={validationMessage}></ErrorMessage>
        )}
        <a
          className={`font-helveticaNeue500 text-xs uppercase mt-2 block ${
            required && "text-pink"
          }`}
        >
          {children}
        </a>
        <span className="text-xs">
          {isUploadImageLoading && "Uploading..."}
        </span>
      </div>
    </div>
  );
};

export default UploadVerifyIdPicture;
