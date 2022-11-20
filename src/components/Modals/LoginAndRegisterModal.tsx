import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "@/components/Modals/ForgotPasswordModal";
import CheckYourMailBoxModal from "@/components/Modals/CheckYourMailBoxModal";
import ResetPasswordModal from "./ResetPasswordModal";
import ResetPasswordConfirmedModal from "./ResetPasswordConfirmedModal";

interface LoginAndRegisterModal {
  active: boolean;
  toggleLoginModal: () => void;
  openRegister?: boolean;
  toggleOther?: string;
  openResetPassword?: boolean;
  isCheck?: boolean;
  onCloseModal?: () => void;
}

const LoginAndRegisterModal = ({
  active,
  toggleLoginModal,
  openRegister,
  toggleOther,
  openResetPassword,
  isCheck,
  onCloseModal,
}: LoginAndRegisterModal) => {
  const [modalStatus, setModalStatus] = useState("login");
  const [emailToCheck, setEmailToCheck] = useState("");

  useEffect(() => {
    if (openRegister) {
      setModalStatus("register");
    } else if (openResetPassword) {
      setModalStatus("reset-password");
    } else if (active) {
      if (toggleOther) {
        setModalStatus(toggleOther);
      } else {
        setModalStatus("login");
      }
    }
  }, [active]);

  return (
    <Transition appear show={active} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-9999 overflow-y-auto text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal"
        onClose={() => false}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-dark opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl relative my-6 mx-auto max-w-lg w-auto md:w-540">
              <div className="border-0 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-end px-4 py-4">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={isCheck ? onCloseModal : toggleLoginModal}
                  >
                    <span className="bg-transparent text-black text-2xl flex outline-none focus:outline-none">
                      <Image
                        src="/assets/images/close.svg"
                        alt=""
                        width={15}
                        height={15}
                      />
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto pb-16">
                  {!toggleOther ? (
                    <>
                      {modalStatus === "register" && (
                        <RegisterModal
                          setModalStatus={setModalStatus}
                          toggleLoginModal={toggleLoginModal}
                        />
                      )}
                      {modalStatus === "login" && (
                        <LoginModal
                          setModalStatus={setModalStatus}
                          toggleLoginModal={toggleLoginModal}
                        />
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {modalStatus === "forgot-password" && (
                    <ForgotPasswordModal
                      setModalStatus={setModalStatus}
                      toggleLoginModal={toggleLoginModal}
                      setEmailToCheck={setEmailToCheck}
                      emailToCheck={emailToCheck}
                      backToPage={true}
                    />
                  )}
                  {modalStatus === "check-inbox" && (
                    <CheckYourMailBoxModal
                      setModalStatus={setModalStatus}
                      emailToCheck={emailToCheck}
                    />
                  )}
                  {modalStatus === "reset-password" && (
                    <ResetPasswordModal setModalStatus={setModalStatus} />
                  )}
                  {modalStatus === "reset-password-confirmed" && (
                    <ResetPasswordConfirmedModal
                      toggleLoginModal={toggleLoginModal}
                    />
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginAndRegisterModal;
