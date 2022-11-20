import Link from "next/link";
import Image from "next/image";
import Rating from "@/components/Rating";
import { Button } from "@/components/Button";
import { useFollowSeller } from "@/hooks/useFollowSeller";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { reflauntLoader } from "@/utils/imageLoader";
import { useGetFollowingByID } from "@/hooks/useGetMyFollowingByID";
import { useUnfollowSeller } from "@/hooks/useUnfollowSeller";
import { useGetSellerInfo } from "@/hooks/useGetSellerInfo";
import { useAuthentication } from "@/hooks/useAuthentication";
import LoginAndRegisterModal from "@/components/Modals/LoginAndRegisterModal";
import { getId, getSlug } from "@/utils/file";

interface SellerPageSideSectionType {
  seller_id: string;
  userProfile: ProfileApiData | undefined;
  onChange: (seller: SellerProfile) => void;
}

const SellerPageSideSection = ({
  seller_id,
  userProfile,
  onChange,
}: SellerPageSideSectionType) => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const page = router.asPath.split("/");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { mutate: followSeller } = useFollowSeller();
  const { mutate: unFollowSeller } = useUnfollowSeller();
  const [didIFollow, setDidIFollow] = useState<boolean | undefined>(false);
  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const [profile, setProfile] = useState<SellerProfile>();
  const [isReload, setIsReload] = useState<boolean>(false);
  const [id, setId] = useState<string>();

  const { isLoggedIn } = useAuthentication();

  const { data: getFollowingByID, isSuccess: getFollowingByIDSuccess } =
    useGetFollowingByID({ seller_id: seller_id });
  const { mutate: getSellerInfo } = useGetSellerInfo();
  const [numSold, setNumSold] = useState<number>(0);

  const toggleLoginModal = () => {
    setActiveLoginModal(!activeLoginModal);
  };

  useEffect(() => {
    if (slug) {
      setId(getId(slug as string));
    }
  }, [slug]);

  useEffect(() => {
    if (getFollowingByIDSuccess) setDidIFollow(getFollowingByID);
  }, [getFollowingByIDSuccess]);

  useEffect(() => {
    if ((!profile && id) || isReload)
      getSellerInfo(Number(id), {
        onSuccess: (data) => {
          setProfile(data);
          onChange(data);
          setNumSold(Number(data.product_sold));
        },
      });
  }, [profile, id]);

  const refetchSellerInfo = () => {
    setIsReload(true);
    setTimeout(() => {
      setIsReload(false);
    }, 1000);
  };

  const followSellerFn = () => {
    if (!isLoggedIn) {
      toggleLoginModal();
      return;
    }
    setIsFollowing(true);
    if (profile) {
      if (didIFollow) {
        unFollowSeller(
          { seller_id: String(profile.id) },
          {
            onSuccess: () => {
              setIsFollowing(false);
              setDidIFollow(false);
              refetchSellerInfo();
            },
          }
        );
      } else {
        followSeller(
          { follow_id: Number(seller_id) },
          {
            onSuccess: () => {
              setIsFollowing(false);
              setDidIFollow(true);
              refetchSellerInfo();
            },
          }
        );
      }
    }
  };
  return (
    <aside className="order-1 w-full lg:w-1/4 lg:order-2 pl-6 pr-4 lg:pr-0 lg:pl-12 lg:-mt-24  relative z-10 mb-8">
      <div className="user-profile-block">
        <div className="thumb mb-8">
          <Image
            loader={reflauntLoader}
            className="w-full h-full lg:w-[314px] lg:h-[314px]"
            src={
              profile?.profile_picture || "/assets/images/Default_Profile.svg"
            }
            alt="Image product"
            width={327}
            height={327}
            objectFit="cover"
          />
        </div>

        <div className="info mb-8 lg:mb-12">
          <h3 className="font-helveticaNeue500 text-dark uppercase text-3xl mb-1">
            {profile && `${profile.first_name}`}
          </h3>
          <p className="font-helveticaNeue500 text-dark uppercase text-2xl mb-1">
            {profile && `@${profile.nickname}`}
          </p>
          {profile && (
            <Rating
              rate={profile.rate > 0 ? profile.rate : 5}
              values={profile.number_rate}
              size={20}
            />
          )}
        </div>

        <div className="stat mb-8 lg:mb-12">
          <ul>
            <Link
              href={`/seller/${getSlug(
                String(profile?.first_name),
                seller_id
              )}/sold`}
              passHref
            >
              <li
                className={`flex text-dark uppercase text-lg xl:text-2xl mb-2 hover:text-[#2E9A60] transition-all cursor-pointer  ${
                  page[page.length - 1] === "sold"
                    ? `text-[#2E9A60]`
                    : "text-dark"
                }`}
              >
                <span className="w-[32px] relative">
                  <Image
                    src="/assets/icons/bag.svg"
                    alt="bag icon"
                    width={32}
                    height={23}
                  />
                  <span
                    className={`absolute left-1/2 transform -translate-x-1/2 top-[7px] text-[#2E9A60] text-[14px] leading-none font-sans ${
                      numSold > 99 && "!text-[10px] !leading-[13px]"
                    }`}
                  >
                    {numSold <= 99 ? numSold : "99+"}
                  </span>
                </span>
                <span className="flex-1 pt-2 pl-[38px] text-[24px] font-helveticaNeue500">
                  Sold
                </span>
              </li>
            </Link>
            <Link
              href={`/seller/${getSlug(
                String(profile?.first_name),
                seller_id
              )}/selling`}
              passHref
            >
              <li
                className={`flex uppercase text-lg xl:text-2xl mb-[10px] hover:text-[#2E9A60] transition-all cursor-pointer ${
                  page[page.length - 1] === "selling"
                    ? `text-[#2E9A60]`
                    : "text-dark"
                }`}
              >
                <span className="w-16 pl-[4px] text-[24px] font-helveticaNeue500">
                  {profile?.product_listing || 0}
                </span>
                <span className="flex-1 pl-4 text-[24px] font-helveticaNeue500">
                  Selling
                </span>
              </li>
            </Link>
            <Link
              href={`/seller/${getSlug(
                String(profile?.first_name),
                seller_id
              )}/followers`}
              passHref
            >
              <li
                className={`flex uppercase text-lg xl:text-2xl mb-[10px] hover:text-[#2E9A60] transition-all cursor-pointer ${
                  page[page.length - 1] === "followers"
                    ? `text-[#2E9A60]`
                    : "text-dark"
                }`}
              >
                <span className="w-16 pl-[4px] text-[24px] font-helveticaNeue500">
                  {profile?.followers || 0}
                </span>
                <span className="flex-1 text-[24px] font-helveticaNeue500 pl-4">
                  {profile?.followers && profile.followers === 1
                    ? "Follower"
                    : "Followers"}
                </span>
              </li>
            </Link>
            <Link
              href={`/seller/${getSlug(
                String(profile?.first_name),
                seller_id
              )}/following`}
              passHref
            >
              <li
                className={`flex uppercase text-lg xl:text-2xl hover:text-[#2E9A60] transition-all cursor-pointer ${
                  page[page.length - 1] === "following"
                    ? `text-[#2E9A60]`
                    : "text-dark"
                }`}
              >
                <span className="w-16 pl-[4px] text-[24px] font-helveticaNeue500">
                  {profile?.following || 0}
                </span>
                <span className="flex-1 pl-4 text-[24px] font-helveticaNeue500">
                  Following
                </span>
              </li>
            </Link>
          </ul>
        </div>

        {userProfile && profile && profile.id == userProfile.id ? (
          <>
            <div className="follow-btn-wrap">
              <Link href="/my-account">
                <a className="font-helveticaNeue500 text-xs text-center leading-none pt-[16px] pb-[13px] px-4 transition-all w-full  border border-dark text-dark hover:border-dark hover:text-white hover:bg-dark uppercase block tracking-widest">
                  {`Edit Profile`}
                </a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Button
              onClick={followSellerFn}
              disabled={isFollowing}
              classes="font-helveticaNeue500 text-2xl text-center leading-none pt-[16px] pb-[13px] px-3 transition-all border border-dark inline-block text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase mb-4"
            >
              {didIFollow
                ? isFollowing
                  ? "UnFollowing..."
                  : "UnFollow"
                : isFollowing
                ? "Following..."
                : "Follow"}
            </Button>
          </>
        )}
      </div>
      <LoginAndRegisterModal
        active={activeLoginModal}
        toggleLoginModal={toggleLoginModal}
      />
    </aside>
  );
};

export default SellerPageSideSection;
