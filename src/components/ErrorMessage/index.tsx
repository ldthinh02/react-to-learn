interface ErrorMessage {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessage) => {
  return (
    <p className="text-sm text-center font-helveticaNeue400 pb-6 text-[#DA0714]">
      {message}
    </p>
  );
};

export default ErrorMessage;
