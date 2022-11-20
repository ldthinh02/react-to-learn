import { ChangeEvent, ReactNode } from "react";

interface CheckboxFormik {
  name: string;
  onChange: (e: ChangeEvent) => void;
  checked: boolean;
  content?: string | ReactNode;
  errorMessage?: string;
}

const CheckboxFormik = ({
  name,
  onChange,
  checked,
  content,
  errorMessage,
}: CheckboxFormik) => {
  return (
    <label className="custom-checkbox type-lg cursor-pointer mb-px inline-block">
      <input
        type="checkbox"
        className="hidden"
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <span
        className={`relative block pl-8 text-[14px] before:absolute before:top-[0px] before:left-0 before:w-[20px] before:h-[20px] before:border before:border-dark after:content-[url('/assets/icons/close.svg')] after:absolute after:top-[3px] after:left-[4px] after:text-white after:font-helveticaNeueLTCom85Heavy after:font-extrabold after:text-base after:hidden ${
          errorMessage && "text-red before:border-red"
        }`}
      >
        {content}
      </span>
    </label>
  );
};

export default CheckboxFormik;
