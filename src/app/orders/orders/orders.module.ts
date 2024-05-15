import { Timestamp, TimestampProvider } from "rxjs";

// product.model.ts
export interface Order {
  orderPrice: number;
  productName: Array<string>;
  userEmail: string;
  createdAt: TimestampProvider;
}