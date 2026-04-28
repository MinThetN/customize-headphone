export const ADD_ON_OPTIONS = [
  { name: 'Custom earpieces', fee: 25 },
  { name: 'Music player', fee: 40 },
  { name: '2-year after-sales care', fee: 30 },
  { name: 'Repair service', fee: 20 },
] as const;

const ADD_ON_FEE_MAP = Object.fromEntries(
  ADD_ON_OPTIONS.map((option) => [option.name, option.fee])
) as Record<string, number>;

export function getAddOnFee(addOnName: string): number {
  return ADD_ON_FEE_MAP[addOnName] ?? 0;
}

export function getAddOnsTotal(addOns: string[] = []): number {
  return addOns.reduce((sum, addOn) => sum + getAddOnFee(addOn), 0);
}

export function getCustomizedUnitPrice(basePrice: number, addOns: string[] = []): number {
  return basePrice + getAddOnsTotal(addOns);
}
