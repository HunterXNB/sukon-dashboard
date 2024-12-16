type Link = {
  url: string;
  label: string;
  active: boolean;
};
export type ResponseMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  per_page: number;
  to: number;
  total: number;
};
