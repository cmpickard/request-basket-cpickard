import type { BasketToken, Request } from "../types";

export async function createBasket(name: string): Promise<BasketToken> {
  const response = await fetch(`/api/baskets/create/${name}`, { method: 'POST' });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
  return response.json() as Promise<BasketToken>;
}

export async function getBasketRequests(endpoint: string): Promise<Request[]> {
  const response = await fetch(`/api/baskets/${endpoint}/`);
  if (!response.ok) {
    const { error } = await response.json() as { error: string };
    throw new Error(error);
  }
  return response.json() as Promise<Request[]>;
}

export async function clearBasket(endpoint: string): Promise<{ deletedCount: number }> {
  const response = await fetch(`/api/${endpoint}/clear`, { method: 'PUT' });
  if (!response.ok) {
    const { error } = await response.json() as { error: string };
    throw new Error(error);
  }
  return response.json() as Promise<{ deletedCount: number }>;
}
