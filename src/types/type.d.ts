type Product = {
  checkout_product: {
    data: {
      selling_price: number;
    };
  };
  seller_id: number;
  size_name: string;
  process_status: {
    data: {
      name: string;
    };
  };
  base_currency_price: number;
  media: {
    data: {
      original_image: string;
    }[];
  };
  id: number;
  designer_name: string;
  color_name: string;
  condition_name: string;
  name: string;
  size: { data: { name: string } };
  price: number;
  medium_image_path: string;
  process_status_name: string;
  seller_info: {
    city: string;
  };
  categories: Category[];
  user: {
    data: {
      customer: {
        data: {
          addresses: {
            data: {
              country: string;
            };
          };
        };
      };
    };
  };
};

type BankAccount = {
  data: {
    sort_code: string;
    account_number: string;
    country: string;
  };
  id: string;
  not_save_as_default: null;
  payment_method_id: 1;
};

type ProfilePaymentDetails = {
  payment_method_id: number;
  is_primary: boolean;
  data: {
    first_name: string;
    account_number: string;
    financial_instituition: string;
    bank_name: string;
  };
};

type Wishlist = {
  likes_count: number;
  id: number;
  product_id: number;
  product: { data: Product };
  count: number;
};

type Checkout = {
  order: {
    data: OrderApiData;
  };
  coupon: {
    data: {
      code: string;
    };
  };
  guest_listing_data?: {
    guest_id: number;
  };
  shipment_country: string;
  accumulated_discount: number;
  billing_address: {
    data: AddressType;
  };
  billing_address_id: number;
  billing_address_same_as_shipping_address: boolean;
  checkout_packages: { data: CheckoutPackage[] };
  checkout_shipping_method_id: number;
  comment: string;
  coupon_id: number;
  created_at: string;
  email: string;
  guest_id: number;
  id: number;
  payment_id: number;
  payment_method_id: number;
  products: {
    success: boolean;
    data: Product[];
  };
  products_discount: number;
  saving: number;
  set_free_shipping: null;
  shipping_address: {
    data: AddressType;
  };
  shipping_address_id: number;
  shipping_discount: number;
  shipping_rate: number;
  sub_total: number;
  total: number;
  tax_total: number;
  updated_at: string;
  user_id: number;
};

type CheckoutPackage = {
  products: Product[];
  product_ids: string;
  seller_id: number;
};

type StripeCard = {
  card_source: {
    data: StripeCardSource[];
  };
  default: string;
};

type StripeCardSource = {
  name: string;
  brand: string;
  last4: string;
  id: string;
};

type Address = {
  address_1: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  is_default: boolean;
  default_address: boolean;
  is_default_billing: boolean;
  first_name: string;
  last_name: string;
  is_home: boolean;
  phone: string;
  phone_code: string;
};

type ListingData = ListingItem[];
type ListingItem = {
  label: string;
  value: string[];
};

type TermsData = TermItem[];
type TermItem = Item & {
  values?: {
    label: string;
    sub_label?: {
      title: string;
      sub_title?: string[];
    }[];
    flag?: boolean;
  }[];
  flag?: number;
};
type Item = {
  title: string;
  sub_title?: string[];
};

type SelectItem = {
  label: string;
  value: string;
};

type InputItem = {
  name: string;
  value: string;
};

type Option = {
  id?: number;
  name: string;
  value?: string | boolean;
  field?: string;
};

type ImageItem = {
  id?: number;
  label: string;
  image: string;
  file?: File;
  url?: string;
};

type OptionImage = "create" | "add" | "delete";
type RadioInput = {
  target: {
    value: string;
  };
};

type RegisterFormValues = {
  email: string;
  confirm_email: string;
  password: string;
  re_password: string;
  first_name: string;
  last_name: string;
  user_name: string;
  ganni_emails: boolean;
  sellers_activity: boolean;
};
type LoginFormValues = {
  email: string;
  password: string;
};

type Category = {
  id: string;
  name: string;
  code: string;
  parent_id: number;
};

type Color = {
  id: string;
  name: string;
  sort_order: string;
  color_code: string;
  type: string;
};

type Material = {
  id: string;
  name: string;
  status: string;
};

type Offer = {
  buyer_prev_offer: number;
  product_original_price: number;
  amount: number;
  buyer_counteroffer_count: number;
  pending_buyer_response: boolean;
  buyer_username: string;
  seller_username: string;
  seller_id: number;
  product_id: number;
  id: string;
  status: string;
  created_at: string;
  user_id: number;
  product: {
    data: ProductApiData;
  };
  initial_amount: number;
  seller: { data: ProfileApiData };
  buyer: { data: ProfileApiData };
};

interface RecordPriceItem {
  product_id: {
    S: string;
  };
  name_of_partner_integrated: {
    S: string;
  };
  recommended_price: {
    S: string;
  };
  recommended_price_highest: {
    S: string;
  };
  recommended_price_high: {
    S: string;
  };
  recommended_price_low: {
    S: string;
  };
  recommended_price_lowest: {
    S: string;
  };
  marketplace: {
    S: string;
  };
  marketplace_group: {
    S: string;
  };
  brand: {
    S: string;
  };
  category: {
    S: string;
  };
  marketplace_category: {
    S: string;
  };
  condition: {
    S: string;
  };
  original_price_to_predict: {
    S: string;
  };
  price_chosen_by_user: {
    S: string;
  };
  product_in_cluster_count_threshold: {
    S: string;
  };
  user_comment: {
    S: string;
  };
  product_name: {
    S: string;
  };
  user_email: {
    S: string;
  };
  user_name: {
    S: string;
  };
}
interface RecordPrice {
  Item: RecordPriceItem;
  ReturnConsumedCapacity: string;
  TableName: string;
}

type AddressDetail = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
  phone: string;
};

type CustomerApiData = {
  email_verified: boolean;
  id: number;
  rate: number;
  number_rate: number;
  user_id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  birth: Date;
  gender: string;
  phone: string;
  phone_code: string;
  group: string;
  website: string;
  created_from: string;
  bottom_size: string;
  top_size: string;
  shoe_size: string;
  tax_number: string;
  bank_name: string;
  bank_code: string;
  bank_beneficiary: string;
  bank_account: string;
  bank_branch_code: string;
  offer_email: string;
  customer_type: string;
  whitegloveverify: boolean;
  enable_offer: boolean;
  can_do_pricing: boolean;
  private_note: string;
  bank_account_id: string;
  stripe_customer_id: string;
  account_connect_id: string;
  location_country_code: string;
  is_vacation_mode: boolean;
  language_preference: string;
  is_direct_mail_marketing: boolean;
  is_disabled: boolean;
  marketing_consent_last_accept_at: Date;
  marketing_consent_last_reject_at: Date;
  meetup: boolean;
  profile_picture: string;
  email: string;
  city: string;
  addresses: {
    data: AddressApiData[];
  };
  payment_details: { data: PaymentDetail[] };
  communication: { data: CommunicationPreferences[] };
};

type CommunicationPreferences = {
  id: number;
  status: number;
  unsubscribed_at: string;
  preference: { data: Preference };
};

type Preference = {
  id: number;
  name: string;
};

type ProfileApiData = {
  email: string;
  id: number;
  status: number;
  customer: { data: CustomerApiData };
};

type SellerProfile = {
  id: number;
  account_age: number;
  product_sold?: number;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  nickname: string;
  followers: number;
  following: number;
  number_rate: number;
  product_listing: number;
  profile_picture: string;
  rate: number;
  state: string;
};

type CheckProfile = {
  is_myself: boolean;
  first_name: string;
};

type UpdateMyProfile = {
  first_name: string;
  last_name: string;
  email: string;
  nickname: string;
  birth: string;
};

type UpdateProfilePictureData = {
  full_path: string;
};

type UpdateOrCreateAddress = {
  id?: number;
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  zipcode: string;
  country: string;
  phone_code?: string;
  phone: string;
  default_address?: boolean;
  is_default?: boolean;
  customer_id?: number;
};

type FollowUser = {
  follow_id: number;
};

type CountryApiData = {
  id?: number;
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  isDisabled?: boolean;
  currencies: Currency[];
};

type AddressApiData = {
  address_1: string;
  address_2?: string;
  city: string;
  company?: string;
  country: string;
  default_address: boolean;
  first_name: string;
  id: string | number;
  is_default_billing: boolean;
  is_home: boolean;
  last_name: string;
  phone: string;
  phone_code: string;
  special_code?: string;
  state?: string;
  title?: string;
  zipcode: string;
};

type Currency = {
  id: number;
  code: string;
  name: string;
  country: string;
  rate?: number;
  data?: {
    id: number;
    code: string;
    name: string;
    country: string;
    symbol: string;
  };
  symbol?: string;
};

type ImageApiData = {
  id: number;
  label: string;
  main: boolean;
  medium_image: string;
  medium_image_path: string;
  order: number;
  original_image: string;
  medium_image_path: string;
  original_image_path: string;
  relative_path: string;
  small_image_path: string;
  status: string;
  thumbnail_image: string;
  thumbnail_image_path: string;
};

type UpdatePassword = {
  new_password: string;
  re_new_password: string;
  token?: string;
};

type CurrencyData = {
  id: number;
  code: string;
  symbol: string;
  country: string;
  base: boolean;
};

type ProductData = {
  id?: number;
  category: Option;
  designer?: Option;
  condition: Option;
  sub_category: Option;
  color_id: Option;
  size: Option;
  material: Option;
  styles?: Option[];
  composition: string;
  name: string;
  tag_signs?: Option[];
  description: string;
  images?: ImageItem[];
  currency?: Option;
  price?: number;
  location_code?: string;
  shipping?: "reflaunt" | "free";
  original_price_currency_id?: string;
  original_price?: string;
  original_currency?: Option;
  original_price_eur: number;
};

type MediaUrl = {
  id: number;
  original_image_path: string;
};

type ImageResult = {
  id: number;
  url?: string;
};

type ProductApiData = {
  currency_code: string;
  designer_name: string;
  condition_name: string;
  material_name: string;
  color_name: string;
  selling_price: number;
  created_at: string;
  official_wardrobe_updated_at: string;
  wardrobes?: { data: { name: string }[] };
  id: number;
  seller_info: CustomerApiData;
  name: string;
  categories: { data: { id: number; name: string; sizing_type: string }[] };
  currency: { data: { id: number; symbol: string; code: string } };
  size?: { data: { id: number; name: string; type: string } };
  price: number;
  media: { data: ImageApiData[] };
  user: {
    data: {
      id: number;
      rate: number;
      number_rate: number;
      customer: { data: CustomerApiData };
    };
  };
  size_name: string;
  seller_id: number;
  condition?: { data: { id: number; name: string } };
  color?: { data: { id: number; name: string } };
  designer?: { data: { id: number; name: string } };
  material?: { data: { id: number; name: string } };
  description?: string;
  medium_image_path: string;
  origin_image: string;
  base_currency_price: number;
  additional_material: string;
  process_status: { data: { name: string } };
  payment: { data: { type: string; max_amount: number } };
  order_product: { data: OrderProduct };
  original_price_currency_id?: string;
  original_price?: string;
  styles: { data: Style[] };
  calculated_payout_amount: number;
  main_image: { relative_full_path: string; relative_path: string };
  price_in_euro: number;
  shipping_type: "free" | "reflaunt";
  is_selling: boolean;
  enabled: boolean;
  process_status_name: string;
  ganni_love: boolean;
};

type FollowApiData = {
  id: number;
  follower: { data: { customer: { data: CustomerApiData } } };
  user: { data: { customer: { data: CustomerApiData } } };
};

type Media = {
  medium_image_path: string;
  original_image: string;
  relative_path: string;
  original_url: string;
};

type Message = {
  message: string;
  created_at: string;
  sender_id: number;
  send_date: string;
  type: string;
  id: number;
  user: { data: { customer: { data: CustomerApiData } } };
};

type ConversationApiData = {
  product: { data: ProductApiData };
  id: number;
  product_id: number;
  customer: { data: { customer: { data: CustomerApiData } } };
  order_package: { data: OrderPackage };
};

type ProfileResponse = {
  id: number;
  email: string;
  customer: {
    data: {
      first_name: string;
      last_name: string;
      birth: string;
      gender: string;
      profile_picture: string[];
      profile_picture_path?: string[];
      bio: string;
      addresses: {
        data: AddressType[];
      };
      payment_details: {
        data: PaymentDetail[];
      };
      is_disabled?: boolean;
      is_vacation_mode?: boolean;
    };
    bank_account: string;
    bank_beneficiary: string;
    bank_branch_code: string;
    bank_code: string;
    bank_name: string;
  };
  product_listing?: number;
  product_bought?: number;
};
type Courier = {
  id: number;
  name: string;
};

type ProductInOrderPackage = {
  id?: number;
  size?: { data: Size };
  colour?: Colour;
  condition?: Condition;
  price?: number;
  category_2?: Category;
  category_1?: Category;
  gender?: Category | string;
  product_number?: string;
  description?: string;
  shipping_type?: string;
  currency?: Currency;
  name?: string;
  images: Media[];
  image?: { data: { original_url: string }[] };
  location_code?: string;
  image_labels?: string[];
  selling_price?: number;
  seller_id?: number;
  color?: Colour;
  sizing_type?: string;
  category_code?: string;
  age_group?: string;
  checkout_product?: {
    data: {
      selling_price: number;
    };
  };
  media?: {
    data: {
      original_image_path: string | undefined;
      original_image: string | undefined;
      medium_image_path: string;
    }[];
  };
  user?: {
    data: ProfileResponse;
  };
  process_status?: {
    data: {
      name: string;
    };
  };
  base_currency_price: number;
  sku?: string;
  additional_material?: string;
  categories?: { data: Category[] };
};

type OrderProduct = {
  cancel_reason: string;
  cancelled_at: string;
  cancelled_by_id: number;
  courier_id: number;
  created_at: string;
  discount_amount: number;
  generate_shipping_label_url: string;
  id: number;
  is_reflaunt_cancelled: boolean;
  is_return_allowed: boolean;
  order_id: number;
  partner_shipment_data: string;
  product: {
    data: ProductInOrderPackage | ProductApiData;
  };
  product_id: number;
  product_price: number;
  product_quantity_price: number;
  quantity: number;
  refund_amount: number;
  return_status_id: number;
  returnable: boolean;
  shipping_label_url: string;
  status: string;
  tax_fee: number;
  tracking_number: string;
  tracking_receipt: string;
  tracking_status_url: string;
  updated_at: string;
  order_package_id: number;
  receive_payment_url: string;
};
type PaginationType = {
  total: number;
  total_pages: number;
  current_page: number;
  per_page: number;
};

type GetProductBySellerApiData = {
  id: number;
  sku: string;
  name: string;
  price: string;
  media: { data: Media[] };
  currency: {
    data: Currency;
  };
  size: {
    data: Size;
  };
  created_at: string;
  updated_at: string;
  base_currency_price: number;
  process_status: {
    data: {
      id: number;
      name: string;
    };
  };
};

type Currency = {
  base: boolean;
  code: string;
  country: string;
  country_name: string;
  id: number;
  is_fallback: boolean;
  rate: number;
  sort_order: number;
  symbol: string;
};

type Size = {
  age_group: string;
  gender: string;
  id: number;
  is_universal: boolean;
  name: string;
  name_gender: string;
  sort_order: number;
  text: string;
  type: string;
  data?: Size;
};

type Designer = {
  id: number;
  name: string;
  sort_order: number;
};

type ProductDataApi = {
  id?: number;
  name: string;
  price: number;
  original_price: string;
  size_id: number;
  color_id: number[];
  condition_id: number;
  material_id: number;
  currency_id: number;
  designer_id?: string;
  additional_material: string;
  category_id: number;
  categories: number[];
  images: string[];
  image_labels: string[];
  seller_id: number;
  location_code: string;
  main_image: string;
  selected: boolean;
  is_international_free: boolean;
  material: string;
  description: string;
  media?: {
    data: MediaApi[];
  };
  original_price_currency_id: number;
  style_id: number[];
  price_in_euro: number;
  shipping_type?: "reflaunt" | "free";
};

type MediaApi = {
  id: number;
  label: string;
  original_image_path: string;
};

type Shipment = {
  courier_name: string;
  shipping_label_url: string;
  status: string;
  type: string;
};

type ProductReflaunt = {
  id?: number;
  size?: { data: Size };
  colour?: Colour;
  condition?: Condition;
  price?: { price: number };
  category_2?: Category;
  category_1?: Category;
  gender?: Category;
  user?: { data: { id: number } };
  product_number?: string;
  description?: string;
  shipping_type?: string;
  currency?: Currency;
  name?: string;
  images: { data: Media[] };
  image?: { data: { original_url: string }[] };
  location_code?: string;
  image_labels?: string[];
  selling_price?: number;
  color?: Colour;
  sizing_type?: string;
  category_code?: string;
  media?: {
    data: {
      original_image_path: string | undefined;
      medium_image_path: string;
    }[];
  };
};
type AddressType = {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  default_address: boolean;
  is_default: boolean;
  is_default_billing: boolean;
  is_save?: boolean;
  phone?: string;
  phone_code?: string;
  is_home: boolean;
  is_home?: boolean;
};

type MyConversationApiData = {
  inbox_message: { data: Message };
  inbox_conversation: { data: ConversationApiData };
  id: number;
  product_id: number;
  user_id: number;
  message_id: number;
  read_date: Date | undefined;
  conversation_id: number;
  remove_at: Date | undefined;
};

type MyUnreadMessageApiData = {
  reduce_conversation_unread_ids: number[];
  unreads_message: UnreadMessage[];
  unread: number;
};

type UnreadMessage = {
  id: number;
  message_id: number;
  user_id: number;
  conversation_id: number;
};

type AddressRfReuest = {
  address_1: string;
  address_2: string;
  city: string;
  country: string;
  country_alpha2_code: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_code: string;
  postal_code: string;
  state: string;
  title: string;
  token: string;
  zipcode: string;
  transaction_id: string;
  type: string;
};

type MarkAsReadRequest = {
  user_id: number;
  message_id: number;
  conversation_id: number;
};

type Step1ProductInitialValue = {
  category: Option | string;
  designer: Option | string;
  condition: Option | string;
  sub_category: Option | string;
  color: Option | string;
  size: Option | string;
  material: Option | string;
  styles: Option[];
  composition: string;
  name: string;
  tag_signs: Option[];
  description: string;
  original_price_currency_id: string;
  original_price: string;
};

type BankAccountLandingPage = {
  first_name?: string;
  account_number: string;
  sort_code: string;
  name: string;
  bank_name: string;
  is_primary?: boolean;
  currency_code?: string;
  country_code?: string;
  beneficiary_name?: string;
};

type PaymentDetail = {
  id?: number;
  data: BankAccountLandingPage;
  is_primary: true;
  payment_method_id: number;
};

type WardrobeDataApi = {
  id: number;
  name: string;
  is_secondary: boolean;
  is_main: boolean;
  products: { data: ProductApiData[] };
  slug_name: string;
};

type ErrorCurrency = {
  currency_1: string;
  currency_2: string;
};
type OrderPackage = {
  rating: number;
  seller_id: number;
  id: number;
  order_products: { data: OrderProduct[] };
  products: ProductApiData[];
  order_product_status: string[];
  status: string;
  created_at: string;
  user: { data: { customer: { data: CustomerApiData } } };
  tracking_status_url: string;
  tracking_number: string;
  courier_id: string;
  order: { data: OrderApiData };
  shipping_type: string;
  generate_shipping_label_url: string;
  package_index: number;
  tracking_status_url: string;
  buyer: {
    id: number;
    order_id: string;
    first_name: string;
    username: string;
  };
};

type OrderApiData = {
  order_id: number;
  id: number;
  status: string;
  created_at: string;
  total: number;
  sub_total: number;
  total_paid: number;
  shipping_fee: number;
  currency: { data: Currency };
  products: { data: ProductApiData[] };
  order_packages: { data: OrderPackage[] };
  order_index: number;
  user_id: number;
};

type Sidebar = {
  title: string;
  url: string;
  href?: string;
};

type ClaimFormApiRequest = {
  problem: string;
  images: string[];
  comment: string;
  order_package_id: string;
};

type Currency = {
  id: number;
  code: string;
  name: string;
  country: string;
  rate?: number;
  data?: {
    id: number;
    code: string;
    name: string;
    country: string;
    symbol: string;
  };
  symbol?: string;
};

type StyleData = "STYLES" | "WEARS";
type Style = {
  id?: number;
  name: string;
  sort_order: number;
  style_type: StyleData;
};
type BrowserCurrency = {
  currency?: string | undefined;
  currencies?: Currency[];
  current_country?: string;
};

type RfCategory = {
  created_at: string;
  id: number;
  name: string;
  parent_id: number;
  sizing_type: string;
  sort_order: number;
  tag_group: string;
  updated_at: string;
};

type RfCondition = {
  created_at: string;
  id: number;
  name: string;
  sort_order: number;
  status: number;
  updated_at: string;
};

type RfBrand = {
  created_at: string;
  id: number;
  name: string;
  sort_order: number;
  status: number;
  updated_at: string;
};

type Sketches = {
  title: string[];
  image: string;
};

type CustomerUpdateNotificationApi = {
  id: number;
  communication: CommunicationType[];
  email: string;
};

type CommunicationType = {
  name: string;
  status: boolean;
};

type CheckPaymentAccount = {
  country: string;
  title_1: TitlePaymentAccount;
  title_2?: TitlePaymentAccount;
};

type TitlePaymentAccount = {
  label: string;
  digit: number;
};

type ChatBoxType = {
  profileId: number;
  product: ProductApiData;
  conversation: ConversationApiData;
  unreadList: UnreadMessage[];
  customer?: CustomerApiData;
  buyer_id?: number;
  is_buyer?: boolean;
  order?: OrderDetailChatBox;
};

type OrderDetailChatBox = {
  order_id: string;
  order_package_id: number;
  user: {
    first_name: string;
    nickname: string;
  };
};

type ConversationPostData = {
  product_id: string | null;
  title: string;
  buyer_id: string | null;
  order_package_id: string | null;
};
