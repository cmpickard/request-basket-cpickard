export interface HeadersType {
  [key: string]: string;
}

export interface Request {
  _id: string;
  method: string;
  headers: HeadersType;
  body: string | object;
  timestamp: string;
}

export interface BasketUrls {
  viewBasket: string;
  sendToBasket: string;
}

export interface BasketToken {
  [key: string]: string;
}
