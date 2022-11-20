import Image from "next/image";
import { ChangeEvent, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useUpdateProfilePicture } from "@/hooks/useUpdateProfilePicture";
import { useUploadImageS3 } from "@/hooks/useUploadImageS3";
import { reflauntLoader } from "@/utils/imageLoader";
import { validateFile } from "@/utils/index";

interface UploadProfilePicture {
  profilePicture?: string;
  onChangePhoto: (value: string) => void;
  userId: number;
}

const UploadProfilePicture = ({
  profilePicture,
  onChangePhoto,
  userId,
}: UploadProfilePicture) => {
  const {
    mutate: uploadImage,
    isLoading: isUploadImageLoading,
    isError: isUploadImageError,
    error: uploadImageError,
  } = useUploadImageS3();
  const {
    mutate: updateProfilePicture,
    isLoading: isUpdateProfilePictureLoading,
    isError: isUpdateProfilePictureError,
    error: updateProfilePictureError,
  } = useUpdateProfilePicture({ userId });
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
              updateProfilePicture(
                { full_path: path },
                {
                  onSuccess: () => {
                    onChangePhoto(path);
                  },
                }
              );
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
        <Image
          loader={reflauntLoader}
          className="w-full block mb-2"
          src={profilePicture || "/assets/images/Default_Profile.svg"}
          alt=""
          width={250}
          height={250}
          objectFit="cover"
        />
        {isUpdateProfilePictureError && (
          <ErrorMessage
            message={(updateProfilePictureError as Error).message}
          ></ErrorMessage>
        )}
        {isUploadImageError && (
          <ErrorMessage
            message={(uploadImageError as Error).message}
          ></ErrorMessage>
        )}
        {validationMessage && (
          <ErrorMessage message={validationMessage}></ErrorMessage>
        )}
        <a className="font-helveticaNeue500 text-sm uppercase underline block">
          {profilePicture ? "Replace photo" : "Upload photo"}
        </a>
        <span>
          {(isUpdateProfilePictureLoading || isUploadImageLoading) &&
            "Uploading..."}
        </span>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
