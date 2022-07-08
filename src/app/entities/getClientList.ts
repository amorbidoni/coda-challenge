export interface ClientList {
  success: boolean;
  response: Response;
}

export interface Response {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  photo: string;
  caption: null | string;
  created_at: Date;
  updated_at: Date;
  deleted: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
