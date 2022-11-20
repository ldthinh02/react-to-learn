import { api } from "@/utils/api";
import { useMutation } from "react-query";

interface UpdateProfilePictureType {
  userId: number;
}

export const useUpdateProfilePicture = ({
  userId,
}: UpdateProfilePictureType) => {
  return useMutation(async (values: UpdateProfilePictureData) => {
    api(`users/${userId}/update_profile_picture`, {
      method: "put",
      body: JSON.stringify({
        full_path: values.full_path,
      }),
    });
  });
};
