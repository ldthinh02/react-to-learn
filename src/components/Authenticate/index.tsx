import { useAuthentication } from "@/hooks/useAuthentication";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoginAndRegisterModal from "../Modals/LoginAndRegisterModal";

const Authenticate = () => {
  const router = useRouter();
  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const { isLoggedIn } = useAuthentication();

  const resetPasswordActive = router.query.resetPassword;

  useEffect(() => {
    if (resetPasswordActive) {
      setActiveLoginModal(true);
      setOpenResetPassword(true);
    } else {
      setOpenResetPassword(false);
    }
  }, [resetPasswordActive]);

  useEffect(() => {
    if (!isLoggedIn) {
      setActiveLoginModal(true);
    }
  }, [isLoggedIn]);

  const toggleLoginModal = () => {
    setActiveLoginModal(!activeLoginModal);
  };

  const onCloseModal = () => {
    setActiveLoginModal(!activeLoginModal);
    if (!isLoggedIn) router.back();
  };

  return (
    <div className="w-full">
      <LoginAndRegisterModal
        active={activeLoginModal}
        toggleLoginModal={toggleLoginModal}
        openResetPassword={openResetPassword}
        onCloseModal={onCloseModal}
        isCheck
      />
    </div>
  );
};

export default Authenticate;
