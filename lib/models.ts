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
    name: 'Arc Studio',
    tagline: 'Precision sound for the modern creator',
    price: 199,
    baseColors: ['#1a1a1a', '#2a4858', '#8b4513'],
  },
  {
    id: 'nova-pro',
    name: 'Nova Pro',
    tagline: 'Premium wireless audio excellence',
    price: 249,
    baseColors: ['#0a0a0a', '#4a4a4a', '#d4af37'],
  },
  {
    id: 'pulse-x',
    name: 'Pulse X',
    tagline: 'Dynamic bass for active lifestyles',
    price: 179,
    baseColors: ['#000000', '#c41e3a', '#00539f'],
  },
];

export const getModelById = (id: string) => {
  return headphoneModels.find(model => model.id === id);
};
