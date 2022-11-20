import React from "react";
import Link from "next/link";

interface ButtonLink {
  children: string;
  path: string;
}

export const ButtonLink = ({ children, path }: ButtonLink) => (
  <Link href={path} passHref>
    <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      {children}
    </button>
  </Link>
);

export default ButtonLink;
