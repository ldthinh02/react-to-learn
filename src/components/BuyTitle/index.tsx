interface BuyTitle {
  children: string;
  description: string;
  wardrobeData?: WardrobeDataApi;
}

const BuyTitle = ({ children, description, wardrobeData }: BuyTitle) => {
  return (
    <div
      className={`page-title bg-grey py-8 md:py-10 px-4 ${
        wardrobeData && "!bg-green"
      }`}
    >
      <div className="container m-auto px-4 xl2:max-w-screen-xl2">
        <div className="text-center">
          <h1
            className={`font-helveticaNeueLTCom85Heavy uppercase text-dark text-3xl mb-1 ${
              wardrobeData && "!text-white"
            }`}
          >
            {children}
          </h1>
          <div
            className={`text-lg font-helveticaNeue400 text-dark ${
              wardrobeData && "!text-white"
            }`}
          >
            <p>
              {wardrobeData
                ? "Favourite styles hand-picked by our creative director Ditte Reffstrup"
                : description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTitle;
