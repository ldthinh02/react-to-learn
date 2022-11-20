import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface HeaderLink {
  children: string;
  active: string;
  onChangeActive: (value: string) => void;
}

const HeaderLink = ({ children, active, onChangeActive }: HeaderLink) => {
  const {
    query: { category },
  } = useRouter();
  const [lower] = useState(children.toLowerCase());
  const [check, setCheck] = useState<boolean>(false);

  const [link] = useState(
    lower.includes("all") ? lower : `${lower}?categories=${lower}`
  );

  useEffect(() => {
    if (check) onChangeActive(active);
    else onChangeActive("");
  }, [check]);

  return (
    <div className="lg:flex lg:justify-center lg:items-center w-full h-full">
      <p
        className={`font-helveticaNeue500 block lg:hidden cursor-pointer uppercase text-[20px] transition-all relative text-lg xl:text-xl py-2 lg:pt-5 lg:pb-3 lg:before:hidden before:w-[12px] before:h-[7px] before:absolute before:bg-no-repeat before:bg-center before:top-2/4 before:right-0 before:-mt-[3px] before:transition-all before:bg-100% before:rotate-180 ${
          active !== lower ? "before:bg-collapse-title" : "before:bg-dropdown"
        }`}
        onClick={() => setCheck(!check)}
      >
        {children === "new-in" ? "new in" : children}
      </p>
      <Link href={`/section/${link}`}>
        <a
          className={`font-helveticaNeue500 hidden h-[18px] lg:block uppercase text-[20px] -leading-[20px] transition-all relative hover:text-pink text-lg lg:text-[20px] py-2 lg:py-0 lg:px-0 ${
            category === lower && "text-pink"
          }`}
        >
          {children === "new-in" ? "new in" : children}
        </a>
      </Link>
    </div>
  );
};

export default HeaderLink;
