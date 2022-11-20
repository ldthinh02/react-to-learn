import React from "react";
import Image from "next/image";

interface PhotoGuideModal {
  togglePhotoGuideModal: () => void;
  active: boolean;
}

export const PhotoGuideModal = ({
  togglePhotoGuideModal,
  active,
}: PhotoGuideModal) => (
  <div>
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative my-6 mx-auto w-11/12 md:w-420">
        <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-end px-4 py-4">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={togglePhotoGuideModal}
            >
              <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]">
                <Image src="/assets/images/close.svg" alt="" layout="fill" />
              </span>
            </button>
          </div>
          <div className="relative flex-auto pb-16 px-6">
            <div className="text-sm">
              <h3 className="font-helveticaNeue500 text-2xl uppercase mb-4 text-center">
                Photo guide
              </h3>
              <ul className="list-disc px-[24px]">
                <li className="mb-5">
                  The first, main image should always show the front of the item
                  in full.
                </li>
                <li className="mb-5">
                  Minimum image dimensions are 800px x 800px.
                </li>
                <li className="mb-5">
                  All images should have a light background, for example white,
                  light grey, wood.
                </li>
                <li className="mb-5">{`Keep vertical and horizontals 'straight'.`}</li>
                <li className="mb-5">
                  Outfit shots are useful to include, this shows the variation
                  of styling options.
                </li>
                <li className="mb-5">
                  Attention to detail is key, please ensure garments are neatly
                  presented.
                </li>
                <li className="mb-5">
                  Images should ideally not include mannequins, clothing rails
                  or other background distractions.
                </li>
                <li>
                  Avoid window or glass reflections in imagery, images should
                  never feel cluttered.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PhotoGuideModal;
