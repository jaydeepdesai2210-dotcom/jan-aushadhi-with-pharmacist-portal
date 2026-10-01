/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem, CustomerOrderDetails } from '../types/pharmacy';

export interface OrderValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Normalizes phone number into international WhatsApp wa.me format
 * Ensures country code 91 for India so wa.me doesn't default to country 90 (Turkey)
 */
export function formatWhatsAppUrlPhone(rawPhone?: string): string {
  let cleaned = (rawPhone || '9190999820301').replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  // Ensure India country code 91 prefix
  if (!cleaned.startsWith('91')) {
    cleaned = `91${cleaned}`;
  }
  return cleaned;
}

/**
 * Validates cart items for availability and expiry before ordering
 */
export function validateCartForOrdering(cart: CartItem[]): OrderValidationResult {
  const errors: string[] = [];

  if (cart.length === 0) {
    errors.push('Your order list is empty. Please add medicines from the catalogue.');
    return { isValid: false, errors };
  }

  for (const item of cart) {
    if (item.product.isExpired) {
      errors.push(
        `"${item.product.productName}" has passed its expiry date and cannot be ordered.`
      );
    }
    if (item.product.availability === 'OUT_OF_STOCK') {
      errors.push(
        `"${item.product.productName}" is currently Out of Stock.`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generates formatted WhatsApp message string with all items in cart
 */
export function generateWhatsAppMessage(
  cart: CartItem[],
  details?: Partial<CustomerOrderDetails>,
  limitItems?: number
): string {
  const itemsToInclude = typeof limitItems === 'number' && limitItems > 0
    ? cart.slice(0, limitItems)
    : cart;

  const productList = itemsToInclude
    .map((item, index) => {
      const priceText = item.product.price ? `₹${(item.product.price * item.quantity).toFixed(2)}` : 'Price on Request';
      return `${index + 1}. Product: ${item.product.productName}\n   Packing: ${item.product.packing || 'Standard Pack'}\n   Company: ${item.product.company || 'BPP'}\n   Quantity: ${item.quantity}\n   Price: ${priceText}`;
    })
    .join('\n\n');

  const totalCalculated = cart.reduce((sum, item) => {
    if (typeof item.product.price === 'number') {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  let message = `Hello Jan Aushadhi Kendra Adajan,\n\n`;
  message += `I want to enquire/order:\n\n`;
  message += `${productList}\n\n`;

  if (typeof limitItems === 'number' && cart.length > limitItems) {
    message += `... and ${cart.length - limitItems} more medicines from the uploaded catalogue.\n\n`;
  }

  if (totalCalculated > 0) {
    message += `Estimated Total: ₹${totalCalculated.toFixed(2)}\n`;
  }
  if (details?.customerName) {
    message += `Customer Name: ${details.customerName}\n`;
  }
  if (details?.mobile) {
    message += `Mobile Number: ${details.mobile}\n`;
  }
  if (details?.deliveryType) {
    message += `Order Type: ${details.deliveryType}\n`;
  }
  if (details?.address) {
    message += `Address: ${details.address}\n`;
  }
  if (details?.prescriptionFileName) {
    message += `Prescription File: ${details.prescriptionFileName}\n`;
  }
  if (details?.notes) {
    message += `Note: ${details.notes}\n`;
  }

  message += `\nPlease confirm availability and final price.\n\nThank you.`;

  return message;
}

/**
 * Generates plain text of entire order list suitable for copying to clipboard
 */
export function generatePlainTextOrderList(
  cart: CartItem[],
  storePhone: string = '+91 90999 82030'
): string {
  let text = `🏥 MEDICINE ORDER LIST — Jan Aushadhi Kendra Adajan\n`;
  text += `WhatsApp/Call: ${storePhone}\n`;
  text += `Total Items: ${cart.length}\n`;
  text += `----------------------------------------\n\n`;

  cart.forEach((item, idx) => {
    const priceStr = item.product.price !== null ? ` | ₹${(item.product.price * item.quantity).toFixed(2)}` : '';
    text += `${idx + 1}. ${item.product.productName} (Pack: ${item.product.packing || 'Std'}) x ${item.quantity}${priceStr}\n`;
  });

  const totalCalculated = cart.reduce((sum, item) => {
    if (typeof item.product.price === 'number') {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  if (totalCalculated > 0) {
    text += `\nEstimated Total: ₹${totalCalculated.toFixed(2)}\n`;
  }

  return text;
}

/**
 * Generates the direct WhatsApp Buy URL for cart items to 9099982030
 * Ensures URL does not exceed browser URL length limits (safely truncates with note if large)
 */
export function createWhatsAppOrderUrl(
  whatsappPhone: string,
  cart: CartItem[],
  details?: Partial<CustomerOrderDetails>
): string {
  const cleanPhone = formatWhatsAppUrlPhone(whatsappPhone);
  
  // Try full message first
  let message = generateWhatsAppMessage(cart, details);
  let encoded = encodeURIComponent(message);

  // If URL length is too long for WhatsApp (safe threshold: 2400 chars)
  if (encoded.length > 2400) {
    // Determine reasonable item count that fits in the URL
    for (let count = Math.min(30, cart.length); count >= 5; count -= 5) {
      message = generateWhatsAppMessage(cart, details, count);
      encoded = encodeURIComponent(message);
      if (encoded.length <= 2400) break;
    }
  }

  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

/**
 * Generates WhatsApp direct order URL for a single product to 9099982030
 */
export function createSingleProductOrderUrl(
  whatsappPhone: string,
  productName: string,
  packing: string,
  price: number | null,
  quantity: number = 1,
  company?: string
): string {
  const cleanPhone = formatWhatsAppUrlPhone(whatsappPhone);
  const priceText = price !== null ? `₹${price.toFixed(2)}` : 'Price on Request';
  let text = `Hello Jan Aushadhi Kendra Adajan,\n\nI want to enquire/order:\n\nProduct: ${productName}\nPacking: ${packing || 'Standard Pack'}\n`;
  if (company) {
    text += `Company: ${company}\n`;
  }
  text += `Quantity: ${quantity}\n\nPlease confirm availability and price.\n\nThank you.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp inquiry URL for a single product (backward compatible)
 */
export function createSingleProductInquiryUrl(
  whatsappPhone: string,
  productName: string,
  packing: string,
  price?: number | null
): string {
  return createSingleProductOrderUrl(whatsappPhone, productName, packing, price ?? null, 1);
}
