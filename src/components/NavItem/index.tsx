import Link from "next/link";
import { useCategoryLink } from "@/hooks/useCategory";

interface NavItem {
  children: string;
  category: string;
  onChangeStatus: () => void;
}

const NavItem = ({ children, category, onChangeStatus }: NavItem) => {
  const link = useCategoryLink(children, category);

  return (
    <li className="mb-1" onClick={onChangeStatus}>
      <Link href={`/section${link}`}>
        <a className="font-helveticaNeue400 text-sm text-dark transition-all hover:text-pink">
          {children}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
