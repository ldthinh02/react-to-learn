import { useRouter } from "next/router";

interface ResetPasswordConfirmedModal {
  toggleLoginModal: () => void;
}

const ResetPasswordConfirmedModal = ({
  toggleLoginModal,
}: ResetPasswordConfirmedModal) => {
  const router = useRouter();
  const onClick = () => {
    toggleLoginModal();
    router.push("/my-account");
  };
  return (
    <div id="resetPassword-step" className="px-9">
      <div id="beforeSubmission-fpw">
        <div className="text-center mb-8">
          <h3 className="font-helveticaNeue500 text-2xl text-dark uppercase mb-4">
            Your password has been reset
          </h3>
          <p className="text-sm">
            You can also change your password any time in the My Profile section
            of your account.
          </p>
        </div>
        <div className="">
          <a
            className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase cursor-pointer"
            onClick={onClick}
          >
            Go to my account
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmedModal;
