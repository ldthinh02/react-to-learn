import React, { useEffect, useState } from "react";
import CardFollow from "@/components/Card/follow";
import { useGetFollowersBySeller } from "@/hooks/useGetFollowersBySeller";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import SellerComponent from "@/components/SellerComponent";
import { getId } from "@/utils/file";

const MyProfile = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const [id, setId] = useState<string>();
  const { mutate: getFollowerBySeller } = useGetFollowersBySeller();
  const [pagination, setPagination] = useState<PaginationType>();
  const [profile, setProfile] = useState<CheckProfile>();

  const [followersBySeller, setfollowersBySeller] = useState<FollowApiData[]>(
    []
  );

  useEffect(() => {
    if (slug) {
      setId(getId(slug as string));
    }
  }, [slug]);

  useEffect(() => {
    if (id) {
      getFollowerBySeller(
        {
          constraints: {
            seller_id: Number(id),
          },
        },
        {
          onSuccess: (data) => {
            setfollowersBySeller(data.data);
            setPagination(data.meta.pagination);
          },
        }
      );
    }
  }, [id]);

  return (
    <>
      {id && (
        <SellerComponent
          id={id}
          onChangeProfile={(value) => setProfile(value)}
          title="Followers"
        >
          <div className="w-full">
            {followersBySeller.length > 0 ? (
              <div>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {followersBySeller.map((data) => (
                    <>
                      <CardFollow
                        name={`${data.user.data.customer.data.first_name} ${data.user.data.customer.data.last_name}`}
                        tag={`${data.user.data.customer.data.nickname}`}
                        image={`${
                          data.user.data.customer.data.profile_picture ||
                          "/assets/images/Default_Profile.svg"
                        }`}
                        rate={4.5}
                        totalRate={20}
                      />
                    </>
                  ))}
                </div>
                {pagination && (
                  <div className="pagination w-full flex justify-end">
                    <Pagination pageNumber={pagination.total_pages} />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="uppercase font-helveticaNeue500 text-[18px]">
                  {profile && !profile.is_myself
                    ? profile.first_name + " does not"
                    : "you don't"}{" "}
                  have a follower at the moment
                </p>
              </div>
            )}
          </div>
        </SellerComponent>
      )}
    </>
  );
};

export default MyProfile;
