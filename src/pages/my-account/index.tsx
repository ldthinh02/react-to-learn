import MyAccountSideSection from "@/components/MyAccountSideSection";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useGetMyProfile } from "@/hooks/useGetMyProfile";
import { useEffect, useMemo, useState } from "react";
import UploadProfilePicture from "@/components/UploadProfilePicture";
import MyProfileEdit from "@/components/MyProfileEdit";
import EditPassword from "@/components/EditPassword";
import Image from "next/image";
import router from "next/router";
import DeleteAccountModal from "@/components/Modals/DeleteAccountModal";
import { useUpdateNotificationCustomer } from "@/hooks/useUpdateNotificationCustomer";
import HeaderSeo from "@/components/HeaderSeo";
import { getSlug } from "@/utils/file";

const MyAccountProfile = () => {
  const { data: profileApiData, refetch: isRefetchProfile } = useGetMyProfile();
  const [profile, setProfile] = useState(profileApiData);
  const { isLoggedIn } = useAuthentication();
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [customer, setCustomer] = useState<CustomerApiData | undefined>();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [acceptReceiveEmailsAboutOffers, setAcceptReceiveEmailsAboutOffers] =
    useState(false);
  const [
    acceptReceiveEmailsAboutActivitySellers,
    setAcceptReceiveEmailsAboutActivitySellers,
  ] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState<string>();

  const { mutate: updateNotificationCustomer } =
    useUpdateNotificationCustomer();

  useEffect(() => {
    if (profileApiData) {
      setProfile(profileApiData);
    }
  }, [profileApiData]);

  useEffect(() => {
    if (profile) {
      const status = getNewStatus(profile);
      setCustomer(profile.customer.data);
      setAcceptReceiveEmailsAboutOffers(status.ganni_emails);
      setAcceptReceiveEmailsAboutActivitySellers(status.sellers_activity);
    }
  }, [profile]);

  useMemo(() => {
    if (customer) {
      setProfilePicture(customer.profile_picture);
    }
  }, [customer]);

  const getNewStatus = (profile: ProfileApiData) => {
    const communication = profile.customer.data.communication.data;
    let result = { ganni_emails: false, sellers_activity: false };
    if (communication) {
      const preference = communication.map((item) => ({
        name: item.preference.data.name,
        status: item.status,
      }));
      result = {
        ganni_emails: getStatus(preference, "ganni_emails"),
        sellers_activity: getStatus(preference, "sellers_activity"),
      };
    }
    return result;
  };

  const getStatus = (
    data: { name: string; status: number }[],
    value: string
  ) => {
    const check = data.find((item) => item.name === value);
    if (check && check.status === 1) {
      return true;
    }
    return false;
  };

  if (!isLoggedIn) {
    return null;
  }

  const openMyProfileDetail = () => {
    setIsEditingProfile(true);
  };

  const redirectSellerPage = () => {
    if (profile) {
      router.push(
        `/seller/${getSlug(
          profile.customer.data.first_name,
          profile.id
        )}/followers`
      );
    }
  };

  const changeStatusNotification = () => {
    if (profile) {
      const status = getNewStatus(profile);
      if (
        status.ganni_emails !== acceptReceiveEmailsAboutOffers ||
        status.sellers_activity !== acceptReceiveEmailsAboutActivitySellers
      ) {
        const communication: CommunicationType[] = [
          {
            name: "ganni_emails",
            status: acceptReceiveEmailsAboutOffers,
          },
          {
            name: "sellers_activity",
            status: acceptReceiveEmailsAboutActivitySellers,
          },
        ];

        const data = {
          id: Number(profile.customer.data.id),
          communication: communication,
          email: profile.email,
        };
        updateNotificationCustomer(data, {
          onSuccess: () => {
            setMessage("Your communications preferences have been saved");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            isRefetchProfile();
          },
          onError: (error) => {
            setMessage(error as string);
          },
        });
      }
    }
  };

  return (
    <div className="">
      <HeaderSeo
        title="GanniRepeat - My Account - My Profile"
        description="GanniRepeat - My Account - My Profile"
      />
      <main className="text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal">
        <div className="flex flex-wrap lg:bg-lightGrey">
          <div className="lg:py-12 lg:px-12 w-full lg:w-480">
            <MyAccountSideSection tab={1} profile_picture={profilePicture} />
          </div>
          <div className="bg-white py-6 lg:py-12 lg:px-20 w-full lg:w-auto lg:flex-1">
            <h3 className="font-helveticaNeue500 uppercase text-2xl mb-2">
              My Account
            </h3>
            <h2 className="font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2">
              My profile
            </h2>
            {/* Line */}
            <div className="mt-12">
              <hr className="border-t-grey my-8" />
            </div>
            {isEditingProfile && profile && customer ? (
              <div>
                <MyProfileEdit
                  profile={profile}
                  customer={customer}
                  setIsEditingProfile={setIsEditingProfile}
                  setProfile={setProfile}
                />
                <div className="mt-12">
                  <hr className="border-t-grey my-8" />
                </div>
                <EditPassword setIsEditingProfile={setIsEditingProfile} />
              </div>
            ) : (
              <div>
                <p className="text-lg mb-6">
                  Here you can edit the information that will appear on your
                  public profile.
                </p>

                <a
                  onClick={redirectSellerPage}
                  className="font-helveticaNeue500 text-center leading-none pt-[16px] pb-[13px] px-3 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark block w-full uppercase text-xs mb-6 tracking-widest cursor-pointer"
                >
                  View my profile
                </a>

                <h3 className="font-helveticaNeue400 text-lg mb-6">
                  Profile details
                </h3>
                {/* Profile-details */}
                <div className="profile-details mb-8">
                  <div className="flex mb-2">
                    <div className="w-2/6 lg:w-28 text-sm">
                      <span>Name</span>
                    </div>
                    <div className="w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm">
                      <span>{`${customer?.first_name} ${customer?.last_name}`}</span>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    <div className="w-2/6 lg:w-28 text-sm">
                      <span>Username</span>
                    </div>
                    <div className="w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm">
                      <span>{customer?.nickname}</span>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    <div className="w-2/6 lg:w-28 text-sm">
                      <span>Email address</span>
                    </div>
                    <div className="w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm break-all">
                      <span>{profile?.email}</span>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    <div className="w-2/6 lg:w-28 text-sm">
                      <span>Password</span>
                    </div>
                    <div className="w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm">
                      <span>********</span>
                    </div>
                  </div>
                </div>
                {/* Profile-details */}
                <a
                  onClick={openMyProfileDetail}
                  className="font-helveticaNeue500 uppercase text-sm underline cursor-pointer"
                >
                  Edit details
                </a>
              </div>
            )}
            {/* Line */}
            <>
              <div className="mt-12">
                <hr className="my-7 border-t-dark" />
              </div>
              <h3 className="font-helveticaNeue400 text-lg mb-6">
                Profile photo
              </h3>
              <p className="mb-6">
                Join our community! Upload a photo of yourself to display on
                your seller profile and product pages.
              </p>
              <div className="mb-6">
                <div className="w-250">
                  <UploadProfilePicture
                    profilePicture={profilePicture}
                    onChangePhoto={setProfilePicture}
                    userId={Number(profile?.id)}
                  />
                </div>
                <div className="border border-pink p-3 flex items-center mb-8 lg:mb-12 mt-6">
                  <div className="w-6">
                    <Image
                      src="/assets/images/Info.svg"
                      alt="info image"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="pl-4 text-sm flex-1">
                    <p>Please ensure your photo is at least 500px x 500px.</p>
                  </div>
                </div>
              </div>
              {/* Line */}
              <div className="mt-12">
                <hr className="my-7 border-t-dark" />
              </div>
              <h3 className="font-helveticaNeue400 text-lg mb-6">
                Notifications
              </h3>
              <p className="mb-6">
                Choose your communication preferences below.
              </p>
              <p className="mb-4">I am happy to receive emails regarding:</p>
              <div className="mb-6">
                <label className="custom-checkbox type-lg cursor-pointer block mb-4">
                  <input
                    id="email_1"
                    type="checkbox"
                    className="hidden"
                    checked={acceptReceiveEmailsAboutOffers}
                  />
                  <span
                    className="relative block select-none pt-1 pl-8 text-[14px] before:absolute before:top-[0px] before:left-0 before:w-[20px] before:h-[20px] before:border before:border-dark after:content-[url('/assets/icons/close.svg')] after:absolute after:top-[3px] after:left-[4px] after:text-white after:font-helveticaNeueLTCom85Heavy after:font-extrabold after:text-base after:hidden"
                    onClick={() =>
                      setAcceptReceiveEmailsAboutOffers(
                        !acceptReceiveEmailsAboutOffers
                      )
                    }
                  >
                    News and Special Offers
                  </span>
                </label>
                <label className="custom-checkbox type-lg cursor-pointer block">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={acceptReceiveEmailsAboutActivitySellers}
                  />
                  <span
                    className="relative block pt-1 pl-8 text-[14px] before:absolute before:top-[0px] before:left-0 before:w-[20px] before:h-[20px] before:border before:border-dark after:content-[url('/assets/icons/close.svg')] after:absolute after:top-[3px] after:left-[4px] after:text-white after:font-helveticaNeueLTCom85Heavy after:font-extrabold after:text-base after:hidden"
                    onClick={() =>
                      setAcceptReceiveEmailsAboutActivitySellers(
                        !acceptReceiveEmailsAboutActivitySellers
                      )
                    }
                  >
                    New activity from sellers I follow
                  </span>
                </label>
                {message && (
                  <p className="text-[14px] pt-[24px] pb-[8px] text-pink">
                    {message}
                  </p>
                )}
                <p
                  className={`${
                    message ? "pt-0" : "pt-[24px]"
                  } text-[14px] select-none uppercase underline cursor-pointer`}
                  onClick={changeStatusNotification}
                >
                  Save changes
                </p>
              </div>
              {/* Line */}
              <div className="mt-12">
                <hr className="my-7 border-t-dark" />
              </div>
              <h3 className="font-helveticaNeue400 text-lg mb-6">
                Delete account
              </h3>
              <p>
                If you would like to delete your account, you can do so by
                clicking{" "}
                <a
                  className="underline cursor-pointer"
                  onClick={() => setShowDeleteModal(!showDeleteModal)}
                >
                  here
                </a>
                .
              </p>
            </>

            {/* FaQ  */}
            <div className="productfaq mt-8">
              <div className="border-2 border-green py-8">
                <div className="container m-auto px-4 xl2:max-w-screen-xl2">
                  <p className="font-helveticaNeue500 text-green uppercase text-xs mb-2">
                    Learn more
                  </p>
                  <h2 className="font-helveticaNeue500 text-green uppercase text-2xl xl:text-3xl">
                    Got a question? <br />
                    read our{" "}
                    <a
                      href="https://ganni-customerservice.zendesk.com/hc/en-us"
                      className="font-helveticaNeue500 text-green uppercase text-2xl xl:text-3xl underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FAQs
                    </a>
                  </h2>
                </div>
              </div>
            </div>
            {/* ./FaQ  */}
          </div>
        </div>
      </main>
      <DeleteAccountModal
        active={showDeleteModal}
        toggleCheckCurrencyModal={() => setShowDeleteModal(!showDeleteModal)}
      />
    </div>
  );
};

export default MyAccountProfile;
