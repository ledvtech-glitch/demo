export type CartItem = { id: string; qty: number };
export type CartState = { items: CartItem[] };

export const cartState: CartState = { items: [] };
