import { getClient } from "@/utils/algolia";
import { SyntheticEvent, useRef } from "react";
import { AutocompleteProvided, BasicDoc } from "react-instantsearch-core";
import {
  InstantSearch,
  connectAutoComplete,
  Configure,
} from "react-instantsearch-dom";
import Image from "next/image";

interface Search {
  open: boolean;
  onSearch: (value: string) => void;
  setShowSearch: (value: boolean) => void;
  onChangeStatus: () => void;
}

const SearchInput = connectAutoComplete(
  ({
    currentRefinement,
    refine,
    onSearch,
    setShowSearch,
  }: AutocompleteProvided<BasicDoc> & {
    onSearch: (value: string) => void;
    setShowSearch: (value: boolean) => void;
  }) => {
    const search = (value?: string) => (event: SyntheticEvent) => {
      event.preventDefault();
      onSearch(value || currentRefinement);
    };

    return (
      <form onSubmit={search()} className="py-0 relative border border-dark">
        <div className="absolute top-[11px] lg:top-[8px] left-[10px] w-[20px] h-[20px]">
          <Image
            className="w-full h-full"
            src="/assets/images/search-icon.svg"
            width={24}
            height={24}
            alt="close"
          />
        </div>
        <input
          type="text"
          className="search-input w-[95%] pl-12 h-12 focus:outline-none text-dark text-lg"
          placeholder="Search for an item..."
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
          spellCheck="false"
        />
        <div className="absolute top-[13px] right-[10px] cursor-pointer">
          <div className="hidden lg:block" onClick={() => refine("")}>
            <Image
              src="/assets/images/close.svg"
              width={14}
              height={14}
              alt="close"
            />
          </div>
          <div
            className="block lg:hidden"
            onClick={() => {
              refine("");
              setShowSearch(false);
            }}
          >
            <Image
              src="/assets/images/close.svg"
              width={14}
              height={14}
              alt="close"
            />
          </div>
        </div>
      </form>
    );
  }
);

const Search = ({ open, onSearch, setShowSearch, onChangeStatus }: Search) => {
  const client = useRef(getClient());

  return (
    <div className="transition-all ease-in">
      <div
        className={`absolute w-full cursor-pointer top-full -left-[10px] lg:left-0 h-[100vh] bg-[#111111] z-99 ${
          open ? "opacity-30" : "hidden"
        }`}
        onMouseMove={onChangeStatus}
      ></div>
      <div
        className={`absolute w-full top-full left-[0px] pl-2 lg:pl-0 lg:left-0 h-[63px] lg:h-[161px] bg-white z-9999 ${
          open ? "block" : "hidden"
        }`}
      >
        <div className={`container m-auto pr-3 md:px-4 lg:px-18 lg:pt-5`}>
          <InstantSearch
            searchClient={client.current}
            indexName="products_suggestions"
          >
            <SearchInput onSearch={onSearch} setShowSearch={setShowSearch} />
            <Configure hitsPerPage={5} />
          </InstantSearch>
        </div>
      </div>
    </div>
  );
};

export default Search;
