import TagManager from "react-gtm-module";

export const onInit = () => {
  TagManager.initialize({
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  });
};

export const onEvent = <Type>(event: string, params: Type) => {
  TagManager.dataLayer({
    dataLayer: {
      event,
      ...params,
    },
  });
};

export const initiateProductListing = () => {
  onEvent("initiate_product_listing", {});
};
