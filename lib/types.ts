export interface CustomizationState {
  modelId: string;
  colors: {
    shell: string;
    band: string;
    earCups: string;
  };
  stickers: string[];
  text: {
    content: string;
    font: string;
    color: string;
  };
  customImage: string | null;
}

export interface CartItem {
  id: string;
  modelId: string;
  modelName: string;
  modelPrice: number;
  customization: CustomizationState;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  provider: 'local' | 'google';
}

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Order {
  id: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'credit-card' | 'debit-card';
  shippingStatus: 'Processing' | 'Packed' | 'Shipped' | 'Delivered';
  address: Address;
  createdAt: string;
}

export const AVAILABLE_STICKERS = [
  '🎵', '🎸', '🎹', '🎧', '🎤', '🎼',
  '⚡', '🔥', '💎', '⭐', '🌙', '☀️',
  '🎨', '🖤', '💛', '🤍', '💚', '💙',
  '🦋', '🌺', '🌸', '🍃', '🌿', '🌊',
];

export const AVAILABLE_FONTS = [
  'font-sans',
  'font-playfair',
  'font-mono',
  'font-serif',
];

export const FONT_DISPLAY_NAMES: Record<string, string> = {
  'font-sans': 'DM Sans',
  'font-playfair': 'Playfair',
  'font-mono': 'Monospace',
  'font-serif': 'Serif',
};

export const COLOR_SWATCHES = [
  '#000000', '#ffffff', '#f5a623', '#c41e3a',
  '#00539f', '#2a4858', '#8b4513', '#4a4a4a',
  '#1a1a1a', '#d4af37', '#708090', '#556b2f',
];
