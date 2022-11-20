import Image from "next/image";
import { ChangeEvent, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useUploadImageS3 } from "@/hooks/useUploadImageS3";
import { validateFile } from "@/utils/index";
interface UploadClaimPicture {
  claimPictures: string[];
  onChangePhoto: (value: string[]) => void;
}

const UploadClaimPicture = ({
  claimPictures,
  onChangePhoto,
}: UploadClaimPicture) => {
  const {
    mutate: uploadImage,
    isLoading: isUploadImageLoading,
    isError: isUploadImageError,
    error: uploadImageError,
  } = useUploadImageS3();
  const [validationMessage, setValidationMessage] = useState("");
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
            if (path) {
              claimPictures.push(`${path}`);
              onChangePhoto(claimPictures);
            }
          },
        }
      );
    }
  };

  return (
    <div>
      <input
        id="profile-picture-input"
        type="file"
        accept="image/*"
        onChange={(e) => onUploadPhoto(e)}
        hidden
      />
      <div
        onClick={() =>
          document.getElementById("profile-picture-input")?.click()
        }
        className="cursor-pointer"
      >
        {claimPictures.length > 0 &&
          claimPictures.map((claimPicture, index) => {
            return (
              <Image
                className="w-full block mb-2"
                src={claimPicture}
                alt=""
                width={250}
                height={250}
                key={index}
                objectFit="cover"
              />
            );
          })}
        {isUploadImageError && (
          <ErrorMessage
            message={(uploadImageError as Error).message}
          ></ErrorMessage>
        )}
        {validationMessage && (
          <ErrorMessage message={validationMessage}></ErrorMessage>
        )}
        <a className="font-helveticaNeue500 text-sm uppercase underline block mt-5">
          Upload attachment
        </a>
        <span>{isUploadImageLoading && "Uploading..."}</span>
      </div>
    </div>
  );
};

export default UploadClaimPicture;
