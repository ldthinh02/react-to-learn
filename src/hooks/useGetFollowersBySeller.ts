import queryString from "query-string";
import { api } from "@/utils/api";
import { useMutation } from "react-query";
interface FollowQuery {
  constraints: {
    seller_id?: number;
    user_id?: number;
  };
  per_page?: number;
  page?: string;
}

export const useGetFollowersBySeller = () => {
  return useMutation(async ({ constraints, page }: FollowQuery) => {
    const params = {
      per_page: 20,
      page: page || "1",
      constraints: JSON.stringify(constraints),
    };
    return api<{ data: FollowApiData[]; meta: { pagination: PaginationType } }>(
      `follows?${queryString.stringify(params)}`,
      undefined,
      "raw"
    );
  });
};
