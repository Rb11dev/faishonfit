import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().optional(),
  fullName: z.string().min(2, "Enter the recipient's full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  line1: z.string().min(3, "Enter a street address"),
  line2: z.string().optional(),
  city: z.string().min(2, "Enter a city"),
  state: z.string().min(2, "Enter a state or region"),
  postalCode: z.string().min(3, "Enter a postal code"),
  country: z.string().min(2, "Select a country"),
  isDefault: z.boolean().default(false),
});

export const cartItemSchema = z.object({
  productId: z.string().cuid(),
  variantId: z.string().cuid(),
  quantity: z.number().int().min(1).max(10),
});

export const checkoutSchema = z.object({
  shippingAddressId: z.string().cuid(),
  billingAddressId: z.string().cuid(),
  shippingMethod: z.enum(["STANDARD", "EXPRESS", "OVERNIGHT"]),
  couponCode: z.string().optional(),
  paymentMethodId: z.string().min(1, "Select a payment method"),
});

export const applyCouponSchema = z.object({
  code: z.string().min(3, "Enter a coupon code"),
});

export const reviewSchema = z.object({
  productId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  body: z.string().min(10, "Share a little more detail in your review").max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Enter a subject"),
  message: z.string().min(10, "Your message is a little short"),
});

// Shipping rate table — used by /api/checkout to compute shippingTotal server-side
export const SHIPPING_RATES = {
  STANDARD: { label: "Standard (5–7 business days)", cost: 0 },
  EXPRESS: { label: "Express (2–3 business days)", cost: 14.99 },
  OVERNIGHT: { label: "Overnight", cost: 34.99 },
} as const;

// Flat-rate tax placeholder — production build should call a tax provider
// (Stripe Tax, TaxJar) keyed off the shipping address' state/country.
export const DEFAULT_TAX_RATE = 0.08;
