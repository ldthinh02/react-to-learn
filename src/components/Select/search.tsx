import React, { useEffect, useState } from "react";
import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon";

interface SelectSearch {
  label?: string;
  data: Option[];
  name?: string;
  value?: string | boolean | number;
  onChange?: (value: Option) => void;
  classes?: string;
  classesCustomSelect?: string;
  error?: string;
  touched?: boolean;
  require?: boolean;
  errorMessage?: string;
}

const SelectSearch = ({
  name,
  label,
  data,
  onChange,
  classes = "",
  value,
  error,
  touched,
  require,
  classesCustomSelect,
}: SelectSearch) => {
  const [resultSearch, setResultSearch] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option>();
  const [show, setShow] = useState(false);
  const [key, setKey] = useState<string>();

  useEffect(() => {
    if (data) setResultSearch(data);
  }, [data]);

  useEffect(() => {
    if (value && data) {
      data.forEach((item: Option, index: number) => {
        if (item.name === value || item.value?.toString() === value) {
          setSelected(data[index]);
        }
      });
    }
  }, [data, value]);

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const listName = data.map((item) => item.name);
    const value = event.target.value;
    setKey(value);
    const result = listName.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    const newValues = data.filter((item) => result.includes(item.name));
    if (!value && value === "+") setResultSearch(data);
    else setResultSearch(newValues);
  };

  return (
    <div className="z-9999">
      <label className="block text-[14px] uppercase">
        {label} {require ? "*" : ""}
      </label>
      <div className={`relative ${classes}`}>
        <div
          className={`h-[44px] w-full bg-white text-[14px] text-left border px-3 pt-[11px] pb-[6px] cursor-pointer ${
            selected ? "capitalize" : "text-[#ccc]"
          } ${
            error && touched ? "!border-[#DA0714]" : "border-mgrey"
          } ${classesCustomSelect}`}
          onClick={() => {
            setShow(!show);
            setSelected(undefined);
          }}
        >
          <input
            type="text"
            name="search"
            value={key}
            className={`w-[80%] h-[20px] pt-1 focus:outline-none text-black bg-white ${
              show ? "pointer-events-none" : ""
            } ${selected ? "placeholder:text-black" : ""} ${
              error && touched ? "placeholder:text-red" : ""
            }`}
            placeholder={
              error && touched
                ? "Required"
                : selected
                ? selected.name
                : "Select"
            }
            autoComplete="off"
            onChange={onChangeSearch}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none cursor-pointer">
            <ChevronDownIcon
              className={`h-5 w-5 transition-transform duration-300 ${
                show ? "-rotate-180" : "0"
              }`}
              aria-hidden="true"
            />
          </span>
        </div>
        <div
          className={`${show ? "block" : "hidden"} ${
            resultSearch.length > 5
              ? "h-[170px]"
              : resultSearch.length > 0
              ? "h-[34px]"
              : ""
          } absolute top-[100%] bottom-0 left-0 transition ease-in duration-100 w-full border border-mgrey border-t-0 p-0 bg-white z-9999 overflow-auto scrollbar-thin`}
        >
          {resultSearch.map(
            (item, index) =>
              item.name !== "Select" && (
                <p
                  className="cursor-pointer select-none relative hover:bg-[#111111] hover:text-white py-2 px-3 block truncate capitalize"
                  onClick={() => {
                    const value = {
                      id: item.id ? item.id : index,
                      name: item.name,
                      value: item.value,
                      field: name,
                    };
                    setSelected(value);
                    setKey("");
                    onChange?.(value as Option);
                    setShow(!show);
                  }}
                >
                  {item.name}
                </p>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectSearch;
