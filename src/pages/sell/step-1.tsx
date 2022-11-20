import Input from "@/components/Input";
import { ConditionModal } from "@/components/Modals/ConditionModal";
import Select from "@/components/Select";
import SellComponent from "@/components/Sell";
import Tag from "@/components/Tag";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetColors } from "@/hooks/useGetColor";
import { useGetMaterials } from "@/hooks/useMaterial";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetSizes } from "@/hooks/useGetSize";
import { useAddProduct } from "@/hooks/useProductHooks";
import { useAuthentication } from "@/hooks/useAuthentication";
import isEmpty from "lodash/isEmpty";
import InputFormik from "@/components/InputFormik";
import { useGetConditions } from "@/hooks/useGetCondition";
import { stepOneSchema } from "@/utils/validations";
import { useGetCurrencies } from "@/hooks/useGetCurrencies";
import { useGetStyles } from "@/hooks/useGetStyles";
import { getPriceInEuro } from "@/utils/index";
import { useBrowserCurrency } from "@/hooks/useBrowserCurrency";
import Authenticate from "@/components/Authenticate";

export default function SellStep1() {
  const [category, setCategory] = useState<string>();
  const [subCategory, setSubCategory] = useState<Option[]>();
  const [sizeByCategory, setSizeByCategory] = useState<Option[]>();
  const [submit, setSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>(["name", "description"]);
  const [showConditionModal, setShowConditionModal] = useState<boolean>(false);
  const [valueSub, setValueSub] = useState<string>();
  const { categories, subCategories } = useGetCategories();
  const { colors } = useGetColors();
  const { sizes } = useGetSizes();
  const { materials } = useGetMaterials();
  const { conditions } = useGetConditions();
  const { data: currencies } = useGetCurrencies();
  const [currencyOptions, setCurrencyOptions] = useState<Option[]>();
  const { browserCurrency } = useBrowserCurrency();
  const [tagOfStyles, setTagOfStyles] = useState<Option[]>([]);
  const [tagOfWears, setTagOfWears] = useState<Option[]>([]);

  useEffect(() => {
    if (currencies && currencies.length > 0) {
      const currencyOptionsData = currencies
        .filter((item) => !item.base)
        .map((currency) => ({
          value: `${currency.id}`,
          name: currency.code,
        }));
      setCurrencyOptions(currencyOptionsData);
    }
  }, [currencies]);

  const { tagStyes, tagWears } = useGetStyles();
  const { setProduct, setStep, product } = useAddProduct();

  useEffect(() => {
    if (tagOfStyles.length < 1) setTagOfStyles(tagStyes);
    if (tagOfWears.length < 1) setTagOfWears(tagWears);
  }, [tagOfStyles, tagOfWears, tagStyes, tagWears]);

  useEffect(() => {
    if (
      !isEmpty(product) &&
      categories.length > 0 &&
      subCategories &&
      subCategories.length > 0
    ) {
      setErrors([]);
      setCategory((product.category as Option)?.value as string);
      formik.setFieldValue("category", formatString(product.category.value));
      formik.setFieldValue("color", formatString(product.color_id.value));
      formik.setFieldValue("size", formatString(product.size.value));
      formik.setFieldValue("condition", formatString(product.condition.value));
      formik.setFieldValue(
        "sub_category",
        formatString(product.sub_category.value)
      );
      formik.setFieldValue("material", formatString(product.material.value));
      formik.setFieldValue("composition", formatString(product.composition));
      formik.setFieldValue("name", formatString(product.name));
      formik.setFieldValue("description", formatString(product.description));
      formik.setFieldValue("styles", product.styles);
      formik.setFieldValue("tag_signs", product.tag_signs);
      formik.setFieldValue(
        "original_price_currency_id",
        formatString(product.original_price_currency_id)
      );
      formik.setFieldValue("original_price", product.original_price);
    }
  }, [product, categories, subCategories]);

  useEffect(() => {
    if (category && product && sizes) {
      if (category === String(product.category?.id))
        onChangeCategory(product.category);
    }
  }, [category, product, sizes]);

  const { isLoggedIn } = useAuthentication();
  const changeErrors = (value: string, remove?: boolean) => {
    if (!remove && !errors.includes(value)) setErrors([...errors, value]);
    else {
      const newErrors = errors.filter((item) => item !== value);
      setErrors([...newErrors]);
    }
  };

  const formatString = (value?: string | boolean) => {
    return String(value);
  };

  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: "",
      designer: "",
      condition: "",
      sub_category: "",
      color: "",
      size: "",
      material: "",
      styles: [],
      composition: "",
      name: "",
      tag_signs: [],
      description: "",
      original_price_currency_id: "",
      original_price: "",
    } as Step1ProductInitialValue,
    validationSchema: stepOneSchema,
    onSubmit: (values) => {
      if (errors.length < 1 && values) {
        const original_currency = currencyOptions
          ? currencyOptions.find(
              (currency) => currency.value === values.original_price_currency_id
            )
          : undefined;
        const newProduct: ProductData = {
          category: formatResult(categories, String(values.category)) as Option,
          condition: formatResult(
            conditions,
            String(values.condition)
          ) as Option,
          color_id: formatResult(colors, String(values.color)) as Option,
          size: formatResult(sizes, String(values.size)) as Option,
          material: formatResult(materials, String(values.material)) as Option,
          sub_category: formatResult(
            subCategory,
            String(values.sub_category)
          ) as Option,
          styles: values.styles,
          composition: values.composition,
          name: values.name,
          tag_signs: values.tag_signs,
          description: values.description,
          original_price: values.original_price,
          original_price_currency_id: values.original_price_currency_id,
          original_currency,
          original_price_eur: getPriceInEuro(
            Number(values.original_price),
            original_currency ? original_currency.name : "EUR",
            browserCurrency
          ),
        };
        setProduct({
          ...product,
          ...newProduct,
        });
        if (!product.id) setStep(1);
        router.push("/sell/step-2");
      }
    },
  });

  const formatResult = (data: Option[] | undefined, value: string) => {
    return data && data.find((item) => String(item.value) === value);
  };

  const onChangeSelect = (value: Option) => {
    formik.setFieldValue(`${value.field}`, value.value);
  };

  const onChangeCategory = (value: Option) => {
    onChangeSelect(value);
    const temp = categories?.find((c) => c.name === value.name);
    let newValueSub = "";
    if (subCategories) {
      const findCategory: Option[] = subCategories
        .filter((item: Category) => item.parent_id === temp?.id)
        .map((c) => ({ id: Number(c.id), name: c.name, value: c.code }));
      const findSub = findCategory.find(
        (item) => String(item.value) === (product.sub_category?.value as string)
      );
      newValueSub = String(findSub?.value);
      setValueSub(newValueSub);
      setSubCategory(findCategory);
    }
    if (sizes) {
      const findListSize = sizes.filter(
        (item) => String(item.field) === String(temp?.name)
      );
      setSizeByCategory(findListSize);
    }
    if (newValueSub && product.sub_category) {
      formik.setFieldValue("sub_category", newValueSub);
    } else {
      formik.setFieldValue("sub_category", "");
    }

    setCategory(value.value as string);
  };

  if (!isLoggedIn) return <Authenticate />;

  return (
    <div className={`${!category && "!pb-[280px]"} md:pb-0`}>
      <SellComponent title="List your item">
        <form onSubmit={formik.handleSubmit}>
          <Select
            label="Category"
            name="category"
            onChange={(value) => onChangeCategory(value)}
            data={categories || []}
            classes="mt-[12px]"
            value={(product.category as Option)?.name}
          />

          {category && (
            <div className="w-full">
              <div className="w-full pt-[24px]">
                We would love to know more about your item and its condition.
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 mt-[24px]">
                <Select
                  label="Sub-category"
                  name="sub_category"
                  classes="mt-[12px]"
                  onChange={onChangeSelect}
                  data={subCategory || []}
                  require
                  value={valueSub}
                  error={formik.errors.sub_category}
                  touched={formik.touched.sub_category}
                  errorMessage={
                    formik.errors.sub_category && formik.touched.sub_category
                      ? formik.errors.sub_category
                      : ""
                  }
                />
                <Select
                  label="Colour"
                  name="color"
                  classes="mt-[12px]"
                  onChange={onChangeSelect}
                  data={colors || []}
                  require
                  value={(product.color_id as Option)?.value}
                  error={formik.errors.color}
                  touched={formik.touched.color}
                  errorMessage={
                    formik.errors.color && formik.touched.color
                      ? formik.errors.color
                      : ""
                  }
                />
                <Select
                  label="Size"
                  name="size"
                  onChange={onChangeSelect}
                  classes="mt-[12px]"
                  data={sizeByCategory || []}
                  require
                  value={(product.size as Option)?.value}
                  error={formik.errors.size}
                  touched={formik.touched.size}
                  errorMessage={
                    formik.errors.size && formik.touched.size
                      ? formik.errors.size
                      : ""
                  }
                />
              </div>

              <div className="w-full my-[48px]">
                <hr className="w-full border border-b-[#111111]" />
              </div>

              <div className="w-full border border-[#E25B8B] h-[60px] sm:h-[48px] flex">
                <div className="w-[48px] h-[48px] pt-[4px] sm:pt-[0px] sm:w-[24px] sm:h-[24px] m-[12px]">
                  <Image
                    src="/assets/icons/info.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <span className="text-[14px] pt-[10px] md:pt-[14px] lg:pt-[16px]">
                  Please provide as accurate information on your item as
                  possible to keep your buyer happy.
                </span>
              </div>

              <div className="w-full h-auto mt-[24px]">
                <Input
                  title="item title"
                  name="name"
                  numberCheck={28}
                  placeholder="Eg. Leather mini dress"
                  onChange={formik.handleChange}
                  onError={(value, option) => {
                    if (value) changeErrors(value, option);
                  }}
                  click={submit}
                  require
                  valueInput={product?.name}
                />
              </div>

              <div className="w-full mt-[24px]">
                <Tag
                  label="Tag any relevant pattern(s)"
                  options={tagOfStyles}
                  onChange={(value) => formik.setFieldValue("styles", value)}
                  selectedValues={product.styles || []}
                />
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 mt-[24px]">
                <Select
                  label="Condition"
                  name="condition"
                  classes="mt-[12px]"
                  onChange={onChangeSelect}
                  data={conditions || []}
                  require
                  value={(product.condition as Option)?.value}
                  error={formik.errors.condition}
                  touched={formik.touched.condition}
                  errorMessage={
                    formik.errors.condition && formik.touched.condition
                      ? formik.errors.condition
                      : ""
                  }
                />
                <div className="w-full">
                  <div className="w-full mt-[28px] border border-[#E25B8B] h-[48px] flex">
                    <div className="pt-[0px] w-[24px] h-[24px] m-[12px]">
                      <Image
                        src="/assets/icons/info.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="text-[14px] pt-[14px]">
                      See our{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => setShowConditionModal(true)}
                      >
                        Condition guide
                      </span>{" "}
                      for more information.
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full mt-[24px]">
                <label htmlFor="" className="uppercase text-[14px]">
                  Estimated original price*
                </label>
                <div className="flex space-x-2 items-end">
                  {currencyOptions && (
                    <div className="w-[30%] sm:w-[15%] md:w-[10%] relative">
                      <Select
                        label=""
                        name="original_price_currency_id"
                        classes="mt-[12px] mb-[3px] absolute top-[3px] left-[0px]"
                        onChange={onChangeSelect}
                        data={currencyOptions}
                        value={formik.values.original_price_currency_id}
                        error={formik.errors.original_price_currency_id}
                        touched={formik.touched.original_price_currency_id}
                        errorMessage={
                          formik.errors.original_price_currency_id &&
                          formik.touched.original_price_currency_id
                            ? formik.errors.original_price_currency_id
                            : ""
                        }
                      />
                    </div>
                  )}
                  <div className="w-[70%] sm:w-[85%] md:w-[90%]">
                    <InputFormik
                      name="original_price"
                      label=""
                      labelClasses="font-helveticaNeue400 text-sm"
                      value={formik.values.original_price}
                      classes="h-[20px]"
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.errors.original_price &&
                        formik.touched.original_price
                          ? formik.errors.original_price
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mt-[24px]">
                <Tag
                  label="Tag any signs of wear"
                  options={tagOfWears}
                  onChange={(value) => formik.setFieldValue("tag_signs", value)}
                  selectedValues={product.tag_signs || []}
                  isAdd
                />
              </div>

              <div className="w-full mt-[24px]">
                <Input
                  title="item description"
                  name="description"
                  numberCheck={250}
                  placeholder="Please describe your item and it's condition"
                  onChange={formik.handleChange}
                  onError={(value, option) => {
                    if (value) changeErrors(value, option);
                  }}
                  click={submit}
                  textarea
                  require
                  valueInput={product?.description}
                />
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 mt-[24px]">
                <Select
                  label="main material"
                  name="material"
                  classes="mt-[12px]"
                  onChange={onChangeSelect}
                  data={materials || []}
                  require
                  value={(product.material as Option)?.value}
                  error={formik.errors.material}
                  touched={formik.touched.material}
                  errorMessage={
                    formik.errors.material && formik.touched.material
                      ? formik.errors.material
                      : ""
                  }
                />
                <Input
                  title="Material composition"
                  name="composition"
                  placeholder="This can be found on your item's label"
                  onChange={formik.handleChange}
                  onError={(value, option) => {
                    if (value) changeErrors(value, option);
                  }}
                  click={submit}
                  valueInput={product?.composition}
                />
              </div>

              <div className="w-full mt-[24px]">
                <p>*Mandatory fields</p>
              </div>
            </div>
          )}
        </form>
        {category && (
          <div className="flex justify-center items-center -mx-2 mt-[48px] mb-[40px]">
            <div className="w-2/4 px-2">
              <div className="mb-6">
                <button
                  type="submit"
                  className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                  onClick={() => {
                    setSubmit(true);
                    formik.handleSubmit();
                  }}
                >
                  next step
                </button>
              </div>
            </div>
          </div>
        )}
      </SellComponent>
      <ConditionModal
        active={showConditionModal}
        toggleConditionModal={() => setShowConditionModal(false)}
      />
    </div>
  );
}
