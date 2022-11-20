import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

interface Select {
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
  typeChar?: "uppercase" | "capitalize" | "normal-case";
}

const classNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(" ");
};

const Select = ({
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
  typeChar,
}: Select) => {
  const [selected, setSelected] = useState<Option>();

  useEffect(() => {
    if (value && data) {
      const find = data.find(
        (item) => item.name === value || item.value?.toString() === value
      );
      setSelected(find);
    }
  }, [data, value]);

  return (
    <div>
      <Listbox
        value={selected}
        onChange={(data) => {
          setSelected(data);
          onChange?.(data as Option);
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-[14px] uppercase">
              {label} {require ? "*" : ""}
            </Listbox.Label>

            <div className={`relative ${classes}`}>
              <Listbox.Button
                className={`h-[44px] w-full bg-white text-[14px] focus-none text-left border pt-[8px] pb-[6px] px-3 ${
                  selected ? (typeChar ? typeChar : "capitalize") : "text-mgrey"
                } ${
                  error && touched ? "!border-[#DA0714]" : "border-mgrey"
                } ${classesCustomSelect}`}
              >
                <span
                  className={`block truncate pl-[1px] leading-1.25 ${
                    error && touched ? "text-red" : ""
                  }`}
                >
                  {error && touched
                    ? "Required"
                    : selected
                    ? selected.name
                    : "Select"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <div className={`h-5 w-5 transition-transform duration-300`}>
                    {!open ? (
                      <Image
                        src="/assets/images/angle-down.svg"
                        alt=""
                        width={10}
                        height={10}
                      />
                    ) : (
                      <Image
                        src="/assets/images/angle-up.svg"
                        alt=""
                        width={10}
                        height={10}
                      />
                    )}
                  </div>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="w-full max-h-60 font-helveticaNeue400 bg-white text-xs absolute border border-mgrey border-t-0 overflow-auto scrollbar-thin z-10 outline-0 focus:outline-0 z-50">
                  {data.map(
                    (item, index) =>
                      item.name !== "Select" && (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              active ? "bg-gray-100" : "",
                              "cursor-pointer select-none relative hover:bg-[#111111] hover:text-white"
                            )
                          }
                          value={{
                            id: item.id ? item.id : index,
                            name: item.name,
                            value: item.value,
                            field: name,
                          }}
                        >
                          {({ selected }) => (
                            <span
                              className={classNames(
                                selected
                                  ? "font-medium bg-gray-100 py-2 px-3"
                                  : "font-normal",
                                "py-2 px-3 block truncate",
                                typeChar ? typeChar : "capitalize"
                              )}
                            >
                              {item.name}
                            </span>
                          )}
                        </Listbox.Option>
                      )
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
export default Select;
