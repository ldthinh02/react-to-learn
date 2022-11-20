import { useRouter } from "next/router";

interface EmailVerifiedModal {
  showEmailVerifiedModal: boolean;
}

const EmailVerifiedModal = ({ showEmailVerifiedModal }: EmailVerifiedModal) => {
  const router = useRouter();
  return (
    <div
      className={` overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
        showEmailVerifiedModal ? "" : "hidden"
      }`}
      id="addedToBag-modal"
    >
      <div className="relative my-6 mx-auto w-11/12 md:w-420">
        {/*content*/}
        <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div
            className={`px-9 py-12 ${showEmailVerifiedModal ? "" : "hidden"}`}
          >
            <div>
              <div className="text-center mb-8">
                <h3 className="font-helveticaNeue500 text-2xl text-dark uppercase mb-4">
                  Thank you for verifying your email
                </h3>
                <p className="text-sm">Congratulations!</p>
                <p className="text-sm">
                  You can now access all the features within your account
                </p>
              </div>
              <div className="">
                <a
                  className="font-helveticaNeue500 text-sm text-center px-3 py-4 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase cursor-pointer"
                  onClick={() => {
                    router.push("/my-account");
                  }}
                >
                  Go to my account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifiedModal;
