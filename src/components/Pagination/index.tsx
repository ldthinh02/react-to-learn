import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface Pagination {
  pageNumber: number;
}

const Pagination = ({ pageNumber }: Pagination) => {
  const [pageLeft, setPageLeft] = useState<number[]>([]);
  const [pageMid, setPageMid] = useState<number[]>();

  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const numberShow = 7;

  const onChangePage = (page: number) => {
    router.query.page = `${page}`;
    router.push(router);
  };

  const getArrayItems = (value: number) => {
    const items = [];
    for (let i = 0; i < value; i++) {
      items.push(i + 1);
    }
    return items;
  };
  const items = getArrayItems(pageNumber);

  const updatePageShow = () => {
    if (pageNumber < numberShow + 3) {
      setPageLeft(items);
    } else {
      if (currentPage <= numberShow || currentPage + 1 > pageNumber) {
        setPageLeft(items.slice(0, numberShow));
        setPageMid(undefined);
      } else {
        setPageLeft(items.slice(0, numberShow - 3));
        if (currentPage + 1 < pageNumber)
          setPageMid(items.slice(currentPage - 2, currentPage + 1));
        else setPageMid(items.slice(currentPage - 2, currentPage));
      }
    }
  };

  useEffect(() => {
    updatePageShow();
  }, [currentPage, pageNumber]);

  return (
    <ul className="inline-flex items-center">
      <li>
        <a
          onClick={() =>
            onChangePage(currentPage - 1 > 0 ? currentPage - 1 : 1)
          }
          className="mx-2 inline-block cursor-pointer"
        >
          <Image
            src="/assets/images/angle-left.svg"
            alt=""
            width={12}
            height={12}
          />
        </a>
      </li>
      {pageLeft.map((item) => {
        return (
          <li key={item}>
            <a
              onClick={() => onChangePage(item)}
              className={`font-helveticaNeue400 text-dark text-lg mx-2 inline-block cursor-pointer ${
                item === currentPage && "underline"
              }`}
            >
              {item}
            </a>
          </li>
        );
      })}
      {pageMid ? <li>....</li> : null}
      {pageMid &&
        pageMid.map((item) => {
          return (
            <li key={item}>
              <a
                onClick={() => onChangePage(item)}
                className={`font-helveticaNeue400 text-dark text-lg mx-2 inline-block cursor-pointer ${
                  item === currentPage && "underline"
                }`}
              >
                {item}
              </a>
            </li>
          );
        })}
      {pageNumber > numberShow + 2 ? (
        <>
          {currentPage + 2 < pageNumber || pageNumber === currentPage ? (
            <li>....</li>
          ) : null}
          <li>
            <a
              onClick={() => onChangePage(pageNumber)}
              className={`font-helveticaNeue400 text-dark text-lg mx-2 inline-block cursor-pointer ${
                pageNumber === currentPage && "underline"
              }`}
            >
              {pageNumber}
            </a>
          </li>
        </>
      ) : null}
      <li>
        <a
          onClick={() =>
            onChangePage(
              currentPage + 1 < pageNumber ? currentPage + 1 : pageNumber
            )
          }
          className="mx-2 inline-block cursor-pointer"
        >
          <Image
            src="/assets/images/angle-right.svg"
            alt=""
            width={12}
            height={12}
          />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
