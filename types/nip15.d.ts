export type CreateStallEvent = {
  id: string;
  name: string;
  description?: string;
  currency: string;
  shipping: ShippingZone[];
  tags: [["d", string]];
};

type ShippingZone = {
  id: string;
  name?: string;
  cost: number;
  regions: string[];
};

export type CreateOrUpdateProductEvent = {
  id: string;
  stall_id: string;
  name: string;
  description?: string;
  images?: string[];
  currency: string;
  price: number;
  quantity: number | null;
  specs?: [string, string][];
  shipping?: ProductShipping[];
  tags: [["d", string], ...["t", string][]];
};

type ProductShipping = {
  id: string;
  cost: number;
};

type ProductTags = [["d", string], ...["t", string][]];

// Checkout Events

export type CustomerOrder = {
  id: string;
  type: 0;
  name?: string;
  address?: string;
  message?: string;
  contact: {
    nostr: string;
    phone?: string;
    email?: string;
  };
  items: {
    product_id: string;
    quantity: number;
  }[];
  shipping_id: string;
};

export type MerchantPaymentRequest = {
  id: string;
  type: 1;
  message?: string;
  payment_options: {
    type: string;
    link: string;
  }[];
};

export type MerchantOrderStatus = {
  id: string;
  type: 2;
  message: string;
  paid: boolean;
  shipped: boolean;
};

export type MarketplaceCustomization = {
  name?: string;
  about?: string;
  ui?: {
    picture?: string;
    banner?: string;
    theme?: string;
    darkMode: boolean;
  };
  merchants?: string[];
};

export type EncryptedMessageContent = CustomerOrder | MerchantPaymentRequest | MerchantOrderStatus;
