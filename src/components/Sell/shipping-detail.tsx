import React from "react";

interface ShippingDetail {
  id: number;
  label: string;
  data: UpdateOrCreateAddress;
  checked?: number;
  onChooseRadio: (value: number) => void;
  onClickEdit: (value: UpdateOrCreateAddress) => void;
}

const ShippingDetail = ({
  id,
  data,
  label,
  checked,
  onChooseRadio,
  onClickEdit,
}: ShippingDetail) => {
  const handelClickEdit = () => {
    if (id === checked) onClickEdit(data);
  };
  return (
    <div className="w-full">
      <div className="w-full flex mt-[24px]">
        <input
          className="form-check-input appearance-none rounded-full h-[14px] w-[14px] border border-gray-300 bg-white checked:bg-[#111111] checked:border-[#111111] relative checked:before:absolute checked:before:content-[''] checked:before:w-[8px] checked:before:h-[8px] checked:before:top-[2px] checked:before:left-[2px] checked:before:bg-white checked:before:rounded-[50%] focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="bank"
          checked={id === checked}
          onChange={() => onChooseRadio(id)}
        />
        <p className="text-[14px]">{label}</p>
      </div>
      <div className="pt-[24px]">
        <p>
          {data.first_name} {data.last_name}
        </p>
        <p>{data.address_1}</p>
        <p>{data.city}</p>
        <p>{data.zipcode}</p>
        <p>{data.city}</p>
        <p>
          {`+${data.phone_code}`}
          {data.phone}
        </p>
      </div>
      <div className="pt-[24px]">
        <p
          className="tex-[14px] uppercase underline cursor-pointer"
          onClick={handelClickEdit}
        >
          Edit
        </p>
      </div>
    </div>
  );
};

export default ShippingDetail;
