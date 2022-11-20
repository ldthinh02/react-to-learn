import XIcon from "@heroicons/react/outline/XIcon";

interface FilterTag {
  children: string;
  onClick: (value: string) => void;
}

const FilterTag = ({ children, onClick }: FilterTag) => {
  const click = () => onClick(children);

  return (
    <button
      className="border border-black p-[12px] mr-3 flex items-center justify-center cursor-pointer my-1"
      onClick={click}
    >
      <h4 className="text-sm font-helveticaNeue500 uppercase mt-1">
        {children}
      </h4>
      <XIcon className="ml-2 h-[20px] w-[20px]" aria-hidden="true" />
    </button>
  );
};

export default FilterTag;
