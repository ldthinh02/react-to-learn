import React, { ReactNode } from "react";
import { Field } from "formik";

interface Checkbox {
  children?: string | ReactNode;
  name: string;
}

export const Checkbox = ({ children, name }: Checkbox) => (
  <>
    <label className="custom-checkbox type-lg cursor-pointer mb-px relative inline-block">
      <Field
        type="checkbox"
        name={name}
        className={`absolute top-[1px] left-0 w-[20px] h-[20px] border border-dark`}
      />
      <span className={`relative block pl-8 text-sm`}>{children}</span>
    </label>
  </>
);

export default Checkbox;
