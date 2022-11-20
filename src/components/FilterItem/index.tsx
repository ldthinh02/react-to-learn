import { ChangeEvent } from "react";

interface FilterItem {
  name: string;
  selected: boolean;
  onChange: (e: ChangeEvent) => void;
}

const FilterItem = ({ name, selected, onChange }: FilterItem) => {
  return (
    <label className="custom-checkbox cursor-pointer mb-px inline-block">
      <input
        type="checkbox"
        className="hidden"
        checked={selected}
        onChange={onChange}
      />
      <span className="relative block pl-[22px] text-sm before:absolute before:left-0 before:w-[12px] before:h-[12px] before:border before:border-dark">
        {name}
      </span>
    </label>
  );
};

export default FilterItem;
