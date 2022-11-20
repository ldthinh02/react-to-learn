import { useEstimateShippingCost } from "@/hooks/useEstimateShippingCost";
import sum from "lodash/sum";
import { api } from "@/utils/api";
import { useMutation, useQuery } from "react-query";
import { useCart } from "@/hooks/useCart";
import { useAuthentication, useHasToken } from "@/hooks/useAuthentication";
import { useGetAddresses } from "./useGetAddresses";
import { useGetIpCountryCode } from "./useGetIpCountryCode";
import Cookies from "js-cookie";
import { onEvent } from "@/utils/gtag";

interface CreateGuestAddressResponse {
  address: {
    id: number;
  };
}

export const useApplyPromoCode = () => {
  return useMutation((values: { code: string }) =>
    api(`checkout/coupon/apply/${values.code}`, { method: "POST" })
  );
};

interface GuestToken {
  access_token: string;
}

export const useGetGuestToken = () => {
  return useMutation((values: { grant_type: "anonymous" }) =>
    api<GuestToken>("auth/token", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};

export const useCheckoutAsGuest = () => {
  return useMutation((values: { email: string }) =>
    api("checkout/guest", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};

export const useCreateGuestAddress = () => {
  return useMutation(
    (values: {
      guest_id: string;
      state: { shipping_address: UpdateOrCreateAddress };
    }) =>
      api<CreateGuestAddressResponse>("/listing-product-states", {
        method: "POST",
        body: JSON.stringify(values),
      })
  );
};

export const useUpdateGuestPaymentMethod = () => {
  return useMutation(
    (values: {
      state: { payout: { payment_method_name: string; card_source: string } };
      listing_id: string;
      guest_id: string;
      first_name: string;
    }) =>
      api(`/listing-product-states/${values.listing_id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      })
  );
};

export const useCheckoutPay = () => {
  const { isLoggedIn } = useAuthentication();
  return useMutation(
    (values: {
      billing_adddress_id: number;
      fallback_language: "en";
      product_ids: number[];
      shipping_address_id: number;
      source_id: string;
      selectedCurrency?: string;
    }) =>
      api<Checkout>("checkout/pay", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    {
      onSuccess: (data) => {
        if (!isLoggedIn) Cookies.remove("token");
        const prod_ids: number[] = [];
        const convertToGAItems = data.products.data.map((prod) => {
          prod_ids.push(prod.id);
          return {
            product_id: prod.id,
            product_name: prod.name,
            product_category: prod.categories[0].name,
            product_brand: prod.designer_name,
            product_price: prod.base_currency_price,
            product_condition: prod.condition_name,
            product_size: prod.size_name,
            product_color: prod.color_name,
            product_quantity: 1,
            list_position: 1,
          };
        });
        // onEvent("purchase", { purchase: null });
        if (data.order) {
          onEvent("purchase", {
            purchase: {
              transaction_id: data.order.data.order_id,
              value: data.order.data.total,
              currency: data.order.data.currency.data.code,
              shipping: data.order.data.shipping_fee,
              content_type: "product",
              product_ids: prod_ids,
              items: convertToGAItems,
            },
          });
        }
      },
    }
  );
};

export const useSetDefaultPaymentMethod = () => {
  return useMutation((value: { fallback_language: string }) =>
    api("checkout/payment/method/default", {
      method: "POST",
      body: JSON.stringify({ fallback_language: value.fallback_language }),
    })
  );
};

export const useSetDefaultCheckoutShipment = () => {
  return useMutation((value: { fallback_language: string }) =>
    api("checkout/shipment/method/default", {
      method: "POST",
      body: JSON.stringify({ fallback_language: value.fallback_language }),
    })
  );
};

export const useAddAndSetShippingAddress = () => {
  return useMutation((values: UpdateOrCreateAddress) =>
    api("checkout/address/shipping/new", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};

interface AddAndSetBillingAddress {
  billing_address: {
    data: {
      id: number;
    };
  };
}

export const useAddAndSetBillingAddress = () => {
  return useMutation((values: UpdateOrCreateAddress) =>
    api<AddAndSetBillingAddress>("checkout/address/billing/new", {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};

export const useSetShippingAddress = () => {
  return useMutation((values: { address_id: number }) =>
    api(`checkout/address/shipping/${values.address_id}`, {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};

export const useSetBillingAddress = () => {
  return useMutation((values: { address_id: number }) =>
    api(`checkout/address/billing/${values.address_id}`, {
      method: "POST",
      body: JSON.stringify(values),
    })
  );
};

export const useGetCheckoutCart = () => {
  const token = useHasToken();
  const setCart = useCart((state) => state.setCart);
  const { data: addresses } = useGetAddresses();
  const { countryCode: ipCountryCode } = useGetIpCountryCode();
  const defaultAddress =
    addresses && addresses.length > 0
      ? addresses.find((a) => a.is_default)
      : undefined;
  const countryCode = defaultAddress ? defaultAddress.country : ipCountryCode;
  const { mutate: estimateShippingCost } = useEstimateShippingCost();
  return useQuery(
    "checkout_cart",
    () => {
      return api<Checkout>("checkout?fallback_language=en", { method: "get" });
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        if (data) {
          if (data.checkout_packages.data.length > 0) {
            data.checkout_packages.data.map((i: CheckoutPackage) => {
              const product_ids = i.product_ids.split(",");
              const products = data.products.data.filter((product: Product) =>
                product_ids.includes(product.id.toString())
              );
              i.products = products;
            });
          } else {
            estimateShippingCost(
              {
                products: data.products.data,
                country: countryCode,
              },
              {
                onSuccess: (res) => {
                  data.shipping_rate = res.shipping_rate;
                  data.total = sum([
                    Number(data.sub_total),
                    res.shipping_rate,
                    data.tax_total,
                  ]);
                  setCart(data as Checkout);
                },
              }
            );
          }
        }
        setCart(data);
      },
    }
  );
};

export const useAddToCart = () => {
  return useMutation(
    (values: { fallback_language: string; product_id: number }) =>
      api(`checkout/cart/add/${values.product_id}`, {
        method: "POST",
        body: JSON.stringify(values),
      })
  );
};
