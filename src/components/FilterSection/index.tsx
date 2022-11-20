import FilterItem from "@/components/FilterItem";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

interface FilterSection {
  children: string;
  items: Attribute[];
  selected: (number | "")[];
  attributeName: string;
  listActive: string[];
  onChangeStatus: (value: string) => void;
}

const FilterSection = ({
  children,
  items,
  selected,
  attributeName,
  listActive,
  onChangeStatus,
}: FilterSection) => {
  const router = useRouter();
  const onChange = (name: string) => (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).checked;
    const nameLower = name.toLowerCase();
    let array = router.query[attributeName]
      ? (router?.query[attributeName] as string).split(",")
      : [];

    if (value) {
      array = array.concat(nameLower);
    } else {
      array = array.filter((f) => f !== nameLower);
    }

    if (array.length) {
      router.query[attributeName] = array.join(",");
    } else {
      delete router.query[attributeName];
    }

    router.push(router, {}, { shallow: true });
  };

  return (
    <div className="filter-single mb-4 lg:mb-8">
      <h3
        className={`font-helveticaNeue500 text-dark text-lg uppercase relative mb-2 pr-5 cursor-pointer before:w-3 before:h-2 before:bg-100% before:absolute before:top-2/4 before:right-[3px] before:-m-1 before:transition-all ${
          listActive.includes(attributeName)
            ? "before:bg-collapse-title"
            : "before:bg-dropdown"
        }`}
        onClick={() => onChangeStatus(attributeName)}
      >
        {children}
      </h3>
      <div
        id="catList"
        className={`scrollbar-thin scrollbar-thumb-dark scrollbar-track-gray-300 h-30 overflow-y-scroll mr-[4px] ${
          listActive.includes(attributeName) ? "block" : "hidden"
        }`}
      >
        <ul className="h-[100px]">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <FilterItem
                  name={item.name}
                  selected={selected.includes(item.id)}
                  onChange={onChange(item.name)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;
