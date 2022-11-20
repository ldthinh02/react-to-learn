import React, { useState } from "react";
import XIcon from "@heroicons/react/outline/XIcon";
import { useCreateStyle } from "@/hooks/useGetStyles";

interface TagData {
  label: string;
  options: Option[];
  onChange: (value: Option[]) => void;
  selectedValues: Option[];
  isAdd?: boolean;
}

const Tag = ({ label, options, onChange, selectedValues, isAdd }: TagData) => {
  const [initialOptions, setInitialOptions] = useState<Option[]>(options);
  const [active, setActive] = useState<Option[]>(selectedValues);
  const [addTag, setAddTag] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>();

  const { mutate: createStyle } = useCreateStyle();

  const onClickActive = (value: Option) => {
    const check = active.find((item) => item.value === value.value);
    let newActive: Option[] = [];
    if (check) {
      newActive = active.filter((item) => item.value !== value.value);
    } else {
      newActive = [...active, value];
    }
    onChange(newActive);
    setActive(newActive);
  };

  const formatValue = (value: string) => {
    const values = value.toLowerCase().split(" ");
    return values.length > 0 ? values.join("-") : values.join("");
  };

  const toggleClickAdd = () => {
    document.getElementById("add")?.focus();
    setAddTag(true);
  };

  const onCloseAdd = () => {
    setValueInput(undefined);
    setAddTag(false);
  };

  const createNewTag = () => {
    if (addTag && valueInput) {
      const data: Style = {
        name: valueInput,
        sort_order: initialOptions.length + 1,
        style_type: "WEARS",
      };
      createStyle(data, {
        onSuccess: (result: Style) => {
          const newData: Option = {
            id: result.id,
            name: result.name,
            value: String(result.id),
          };
          setInitialOptions([...initialOptions, newData]);
          setActive([...active, newData]);
          setValueInput(undefined);
        },
      });
    }
    setAddTag(!addTag);
  };

  return (
    <div className="w-full h-min-[40px]">
      <label className="uppercase text-[14px]">{label}</label>
      <div className="w-full h-auto mt-[10px]">
        {initialOptions.map((option) => {
          return (
            <div
              key={formatValue(option.name).toString()}
              className={`w-min-[44px] ${
                active.find((item) => item.value === option.value)
                  ? "bg-dark text-white border border-dark"
                  : "border border-[#111111]"
              } inline float-left text-[12px] font-helveticaNeue500 mr-[12px] mb-[20px] uppercase cursor-pointer h-44px p-[12px] m-[20px 20px 20px 0px]`}
              onClick={() => onClickActive(option)}
            >
              {option.name}
            </div>
          );
        })}
        {isAdd && (
          <>
            <div
              className={`w-min-[44px] relative border border-[#111111] inline float-left text-[12px] font-helveticaNeue500 mr-[12px] mb-[20px] uppercase cursor-pointer h-44px p-[12px] m-[20px 20px 20px 0px]`}
              onClick={() => (!addTag ? toggleClickAdd() : "")}
            >
              {addTag ? (
                <div onClick={onCloseAdd}>
                  <input
                    type="text"
                    id="add"
                    name="add"
                    value={valueInput}
                    className={`w-[80%] h-[16px] pt-1 focus:outline-none text-black bg-white`}
                    placeholder="New tag"
                    autoComplete="off"
                    spellCheck={false}
                    onChange={(e) => {
                      e.preventDefault();
                      setValueInput(e.target.value);
                    }}
                    autoFocus
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none cursor-pointer">
                    <XIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              ) : (
                <p className="text-[12px] font-helveticaNeue500">
                  + ADD YOUR OWN
                </p>
              )}
            </div>
            {addTag && (
              <div
                className={`w-min-[44px] bg-black text-white relative border border-[#111111] inline float-left text-[12px] font-helveticaNeue500 mr-[12px] mb-[20px] uppercase cursor-pointer h-44px p-[12px] m-[20px 20px 20px 0px]`}
                onClick={createNewTag}
              >
                Save
              </div>
            )}
          </>
        )}
      </div>
      <div className="clear-both"></div>
    </div>
  );
};

export default Tag;
