import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import React from "react";
import cookies from "js-cookie";
import ErrorMessage from "../ErrorMessage";
import { useRouter } from "next/router";

interface DeleteAccountModal {
  userId?: number;
  toggleCheckCurrencyModal: () => void;
  active: boolean;
}

const DeleteAccountModal = ({
  toggleCheckCurrencyModal,
  active,
}: DeleteAccountModal) => {
  const router = useRouter();
  const {
    mutate: deleteAccount,
    isError: isDeleteAccountError,
    error: deleteAccountError,
  } = useDeleteAccount();

  const onDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        toggleCheckCurrencyModal();
        cookies.remove("token");
        router.push("/");
      },
    });
  };
  return (
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative my-40 md:my-68 mx-auto w-[240px] md:w-420">
        <div className="border-0 p-8 relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="relative flex-auto md:px-6">
            <div className="text-center text-sm">
              <p className="text-[14px] md:text-[16px]">
                Do you wish to delete/close your account?
              </p>
              {isDeleteAccountError && (
                <ErrorMessage
                  message={(deleteAccountError as Error).message}
                ></ErrorMessage>
              )}
              <div className="flex justify-center -mx-2 mt-[24px]">
                <div className="w-2/4 px-2">
                  <button
                    type="submit"
                    className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                    onClick={onDeleteAccount}
                  >
                    Ok
                  </button>
                </div>
                <div className="w-2/4 px-2">
                  <button
                    type="submit"
                    className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                    onClick={toggleCheckCurrencyModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
