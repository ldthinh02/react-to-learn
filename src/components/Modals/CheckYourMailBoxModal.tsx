interface CheckYourMailBoxModal {
  setModalStatus: (value: string) => void;
  emailToCheck: string;
}

const CheckYourMailBoxModal = ({
  setModalStatus,
  emailToCheck,
}: CheckYourMailBoxModal) => {
  const openForgotPasswordModal = () => {
    setModalStatus("forgot-password");
  };
  return (
    <div id="afterSubmission-fpw" className="px-9">
      <div className="text-center mb-8">
        <h3 className="font-helveticaNeue500 text-2xl text-dark uppercase mb-4">
          Check your inbox
        </h3>
        <p className="text-sm">
          An email has been sent to {emailToCheck} to reset your password
        </p>
      </div>
      <div className="text-center">
        <a
          onClick={openForgotPasswordModal}
          className="font-helveticaNeue500 text-sm uppercase underline cursor-pointer"
        >
          {"Didn't receive an email?"}
        </a>
      </div>
    </div>
  );
};

export default CheckYourMailBoxModal;
