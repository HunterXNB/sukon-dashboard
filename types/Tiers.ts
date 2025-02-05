import { Permission } from "./Permission";

export type Tier = {
  id: number;
  name: string;
  description: string;
  usd_price: string;
  egp_price: string;
  commission: string;
};
export type TierFullData = Tier & {
  permissions: Permission[];
};
