import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import BuyTitle from "@/components/BuyTitle";
import FilterSection from "@/components/FilterSection";
import { useGetAttributes } from "@/hooks/useGetAttributes";
import FilterTag from "@/components/FilterTag";
import uniqBy from "lodash/uniqBy";
import sortBy from "lodash/sortBy";

interface FilterComponent {
  children?: React.ReactNode;
  props: Attributes;
  wardrobeData?: WardrobeDataApi;
}

const FilterComponent = ({
  children,
  props,
  wardrobeData,
}: FilterComponent) => {
  const router = useRouter();
  const [showSorting, setShowSorting] = useState(false);
  const [sizeList, setSizeList] = useState<Attribute[]>();
  const [filteredSizesData, setFilteredSizesData] = useState<number[]>([]);
  const [toggleFilterMobile, setToggleFilterMobile] = useState<boolean>(false);
  const [subCategoryList, setSubCategoryList] = useState<Attribute[]>([]);

  const { category, search } = router.query;
  const [listFilterShow, setListFilterShow] = useState<string[]>([
    "categories",
    "subCategories",
    "sizes",
    "locations",
  ]);
  const {
    categories,
    subCategories,
    conditions,
    sizes,
    locations,
    colors,
    selected,
  } = useGetAttributes(props);

  useEffect(() => {
    if (categories.length > 0) {
      const filterSubCategories = props.subCategories.filter((item) =>
        categories.includes(Number(item.parent_id))
      );
      setSubCategoryList(filterSubCategories);

      const listCategoryName = props.categories
        .filter((item) => categories.includes(item.id))
        .map((c) => c.name);
      const filterSizes = (props.sizes as Size[]).filter((item) =>
        listCategoryName.includes(item.type)
      );
      setSizeList(sortBy(uniqBy(filterSizes, "name"), ["name"]));
    } else {
      setSubCategoryList(sortBy(props.subCategories, ["name"]));
      setSizeList(sortBy(uniqBy(props.sizes, "name"), ["name"]));
    }
  }, [categories]);

  useEffect(() => {
    let sizeListData: Attribute[] = [];
    if (categories.length > 0) {
      const filteredCategories = props.categories.filter((cat) =>
        categories.includes(cat.id)
      );
      sizeListData = (props.sizes as Size[]).filter((size) =>
        filteredCategories.map((cat) => cat.name).includes(size.type)
      );
    } else {
      sizeListData = props.sizes;
    }
    if (sizes.length > 0) {
      const filteredSizes = props.sizes.filter((size) =>
        sizes.includes(size.id)
      );
      const filteredSizesData = sizeListData
        .filter((size) =>
          filteredSizes.map((size) => size.name).includes(size.name)
        )
        .map((e) => e.id);
      setFilteredSizesData(filteredSizesData);
    } else {
      setFilteredSizesData([]);
    }
  }, [categories, sizes]);

  const toggleDropdownSorting = () => {
    setShowSorting(!showSorting);
  };

  const toggleFilterMobiles = () => {
    setToggleFilterMobile(!toggleFilterMobile);
  };

  const sortProduct = (value: string) => {
    router.query.sort = value;
    router.push(router);
  };

  const clearAll = () => {
    router.replace(
      router.pathname.replace("[category]", router.query.category as string),
      undefined,
      { shallow: true }
    );
  };

  const onRemoveTag = (attribute: string) => (value: string) => {
    const array = router.query[attribute]
      ? (router?.query[attribute] as string).split(",")
      : [];

    const filter = array.filter((f) => f !== value);

    if (filter.length) {
      router.query[attribute] = filter.join(",");
    } else {
      delete router.query[attribute];
    }

    router.push(router, {}, { shallow: true });
  };

  const onChangeStatusFilter = (value: string) => {
    if (listFilterShow.includes(value)) {
      setListFilterShow(listFilterShow.filter((c) => c !== value));
    } else {
      setListFilterShow([...listFilterShow, value]);
    }
  };

  const listFilter = () => {
    return (
      <React.Fragment>
        <FilterSection
          items={sortBy(props.categories, ["name"])}
          selected={categories}
          attributeName="categories"
          listActive={listFilterShow}
          onChangeStatus={onChangeStatusFilter}
        >
          Category
        </FilterSection>
        <FilterSection
          items={subCategoryList}
          selected={subCategories}
          attributeName="subCategories"
          listActive={listFilterShow}
          onChangeStatus={onChangeStatusFilter}
        >
          Sub-category
        </FilterSection>
        {sizeList && (
          <FilterSection
            items={sizeList}
            selected={filteredSizesData}
            attributeName="sizes"
            listActive={listFilterShow}
            onChangeStatus={onChangeStatusFilter}
          >
            Size
          </FilterSection>
        )}
        <FilterSection
          items={props.locations}
          selected={locations}
          attributeName="locations"
          listActive={listFilterShow}
          onChangeStatus={onChangeStatusFilter}
        >
          Shipped From
        </FilterSection>
        <FilterSection
          items={props.conditions}
          selected={conditions}
          attributeName="conditions"
          listActive={listFilterShow}
          onChangeStatus={onChangeStatusFilter}
        >
          Condition
        </FilterSection>
        <FilterSection
          items={props.colors}
          selected={colors}
          attributeName="colors"
          listActive={listFilterShow}
          onChangeStatus={onChangeStatusFilter}
        >
          Color
        </FilterSection>
      </React.Fragment>
    );
  };

  const listTag = () => {
    return (
      <React.Fragment>
        <div className="flex flex-wrap">
          {selected.categories.map((m) => (
            <FilterTag key={m} onClick={onRemoveTag("categories")}>
              {m}
            </FilterTag>
          ))}
          {selected.subCategories.map((m) => (
            <FilterTag key={m} onClick={onRemoveTag("subCategories")}>
              {m}
            </FilterTag>
          ))}
          {selected.sizes.map((m) => (
            <FilterTag key={m} onClick={onRemoveTag("sizes")}>
              {m}
            </FilterTag>
          ))}
          {selected.locations.map((m) => (
            <FilterTag key={m} onClick={onRemoveTag("locations")}>
              {m}
            </FilterTag>
          ))}
          {selected.conditions.map((m) => (
            <FilterTag key={m} onClick={onRemoveTag("conditions")}>
              {m}
            </FilterTag>
          ))}
          {selected.colors.map((m) => (
            <FilterTag key={m} onClick={onRemoveTag("colors")}>
              {m}
            </FilterTag>
          ))}
        </div>
      </React.Fragment>
    );
  };

  const listSortBy = () => {
    return (
      <React.Fragment>
        {showSorting && (
          <ul
            className="bg-white absolute right-0 top-7 text-base float-left py-2 list-none text-right border border-grey z-9999"
            style={{ minWidth: "fit-content" }}
            id="dropdown-sorting"
          >
            <li
              className={`cursor-pointer pt-[6px] pb-[5px] px-[18px] font-normal block w-full whitespace-nowrap bg-transparent transition-all text-dark hover:text-pink uppercase ${
                router.query.sort === "newest" && "text-pink"
              }`}
              onClick={() => {
                sortProduct("newest");
                toggleDropdownSorting();
              }}
            >
              <a className="currency-item font-helveticaNeue500 text-[14px]">
                Newest
              </a>
            </li>
            <li
              className={`cursor-pointer pt-[6px] pb-[5px] px-[18px] font-normal block w-full whitespace-nowrap bg-transparent transition-all text-dark hover:text-pink uppercase ${
                router.query.sort === "price" && "text-pink"
              }`}
              onClick={() => {
                sortProduct("price");
                toggleDropdownSorting();
              }}
            >
              <a className="currency-item font-helveticaNeue500 text-[14px]">
                Lowest Price
              </a>
            </li>
            <li
              className={`cursor-pointer pt-[6px] pb-[5px] px-[18px] font-normal block w-full whitespace-nowrap bg-transparent transition-all text-dark hover:text-pink uppercase ${
                router.query.sort === "-price" && "text-pink"
              }`}
              onClick={() => {
                sortProduct("-price");
                toggleDropdownSorting();
              }}
            >
              <a className="currency-item font-helveticaNeue500 text-[14px]">
                Highest Price
              </a>
            </li>
          </ul>
        )}
      </React.Fragment>
    );
  };

  return (
    <main>
      {!search && category === "new-in" && (
        <BuyTitle description="Shop the latest pre-loved styles uploaded by our GANNI REPEAT community">
          New in
        </BuyTitle>
      )}
      {!search && wardrobeData && (
        <BuyTitle
          description="Shop the latest pre-loved styles uploaded by our GANNI REPEAT community"
          wardrobeData={wardrobeData}
        >
          {wardrobeData.name}
        </BuyTitle>
      )}
      {search && (
        <div className="text-center text-dark py-6 font-helveticaNeue400 text-lg">
          <h1 className="">Search results for</h1>
          <div className="text-2xl uppercase font-helveticaNeue500">
            <p>&rdquo;{search}&rdquo;</p>
          </div>
        </div>
      )}
      <div className="listing-wrap py-8 md:p-12 flex transition-all ease-in">
        <aside
          id="toggle-filter"
          className="w-full md:w-48 fixed top-0 left-0 md:relative z-9999 md:z-0 bg-white px-4 py-8 md:p-0 h-screen md:h-auto overflow-y-visible overflow-x-hidden md:overflow-y-auto hidden md:block"
        >
          <div className="filter-single mb-4 lg:mb-8 flex justify-between items-center md:block">
            <h3 className="font-helveticaNeue500 text-dark uppercase text-2xl md:mb-4 lg:mb-8">
              Filter By
            </h3>
            <button
              onClick={clearAll}
              className="font-helveticaNeue500 text-sm uppercase text-dark underline"
            >
              Clear All
            </button>
          </div>
          {listFilter()}
        </aside>
        <div className="flex flex-col mb-4 md:pl-12 w-full">
          <div className="md:hidden block mb-[10px]">{listTag()}</div>
          <div
            className={`w-full product-actions justify-between flex items-baseline ${
              toggleFilterMobile ? "mb-5" : "mb-16"
            }`}
          >
            <div className="flex-1" onClick={toggleFilterMobiles}>
              <div className="flex md:hidden">
                <h3 className="font-helveticaNeue500 leading-none pt-2 pr-2 text-dark uppercase text-lg">
                  Filter By
                </h3>
                <Image
                  src="/assets/images/filter.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </div>

              <div className="hidden md:block">{listTag()}</div>
            </div>
            <div>
              <button
                onClick={clearAll}
                className={`font-helveticaNeue500 text-sm uppercase text-dark ${
                  toggleFilterMobile ? "block" : "hidden"
                } md:hidden`}
              >
                Clear All
              </button>
              <div
                className={`w-full ${toggleFilterMobile ? "hidden" : "block"}`}
              >
                <div className="relative inline-flex align-middle w-full">
                  <button
                    id="dropdown-toggler"
                    className={`text-dark transition-all leading-none duration-150 bg-no-repeat bg-right-center md:bg-bottom-center bg-12 pt-2 pr-7 text-[14px] md:text-[16px] font-helveticaNeue500 uppercase ${
                      showSorting ? "bg-collapse-title" : "bg-dropdown"
                    }`}
                    type="button"
                    onClick={toggleDropdownSorting}
                  >
                    sort by
                  </button>
                  {listSortBy()}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${toggleFilterMobile ? "block" : "hidden"} md:hidden`}
          >
            {listFilter()}
            <div className="w-full px-2">
              <div className="mt-[18px] mb-10">
                <button
                  type="submit"
                  className="text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4"
                  onClick={toggleFilterMobiles}
                >
                  view items
                </button>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};

export default FilterComponent;
