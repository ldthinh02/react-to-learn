import { useRouter } from "next/router";
import Head from "next/head";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { useEffect, useState } from "react";
import EmailVerifiedModal from "@/components/Modals/EmailVerifiedModal";

const VerifyEmail = () => {
  const [showEmailVerifiedModal, setShowEmailVerifiedModal] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      const token_string = token as string;
      verifyEmail(
        { token: token_string },
        {
          onSuccess: () => {
            setShowEmailVerifiedModal(true);
          },
        }
      );
    }
  }, [token]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </Head>
      <EmailVerifiedModal showEmailVerifiedModal={showEmailVerifiedModal} />
    </>
  );
};

export default VerifyEmail;
