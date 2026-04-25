export interface HeadphoneModel {
  id: string;
  name: string;
  tagline: string;
  price: number;
  baseColors: string[];
}

export const headphoneModels: HeadphoneModel[] = [
  {
    id: 'arc-studio',
    name: 'Base Model',
    tagline: 'Customisable wireless headphones',
    price: 29,
    baseColors: ['#111827', '#1f2937', '#4b5563', '#9ca3af', '#f9fafb'],
  },
  {
    id: 'nova-pro',
    name: 'Premium Model',
    tagline: 'Customisable wireless headphones with gift-ready packaging',
    price: 59,
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
  },
];

export const getModelById = (id: string) => {
  return headphoneModels.find(model => model.id === id);
};
