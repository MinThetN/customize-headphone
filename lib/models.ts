export interface HeadphoneModel {
  id: string;
  name: string;
  tagline: string;
  price: number;
  baseColors: string[];
  customization: {
    tabs: Array<'color' | 'stickers' | 'text' | 'image'>;
    addOns: string[];
    allowPattern: boolean;
    allowEarpieceStyle: boolean;
  };
}

export const headphoneModels: HeadphoneModel[] = [
  {
    id: 'arc-studio',
    name: 'Base Model',
    tagline: 'Customisable wireless headphones',
    price: 129,
    baseColors: [
      '#020617',
      '#111827',
      '#1e293b',
      '#334155',
      '#475569',
      '#0f766e',
      '#0369a1',
      '#6d28d9',
      '#be123c',
      '#d97706',
    ],
    customization: {
      tabs: ['color', 'text'],
      addOns: [
        'Custom earpieces',
        'Music player',
        '2-year after-sales care',
        'Repair service',
      ],
      allowPattern: false,
      allowEarpieceStyle: false,
    },
  },
  {
    id: 'nova-pro',
    name: 'Premium Model',
    tagline: 'Premium headphones with after-sales and repair service options',
    price: 159,
    baseColors: [
      '#020617',
      '#111827',
      '#1e293b',
      '#334155',
      '#475569',
      '#0f766e',
      '#0369a1',
      '#6d28d9',
      '#be123c',
      '#d97706',
    ],
    customization: {
      tabs: ['color', 'stickers', 'text', 'image'],
      addOns: [
        'Custom earpieces',
        'Music player',
        '2-year after-sales care',
        'Repair service',
      ],
      allowPattern: true,
      allowEarpieceStyle: true,
    },
  },
];

export const getModelById = (id: string) => {
  return headphoneModels.find(model => model.id === id);
};
